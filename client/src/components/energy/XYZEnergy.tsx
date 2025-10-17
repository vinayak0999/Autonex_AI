import { useEffect, useRef } from "react";

interface XYZEnergyProps {
  onComplete: () => void;
  maxDurationMs?: number;
  enableSound?: boolean;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number; // target x
  ty: number; // target y
  life: number; // 0..1
  size: number;
};

export default function XYZEnergy({ onComplete, maxDurationMs = 3000, enableSound = true }: XYZEnergyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    // Resize to viewport
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Prepare target points by sampling text mask
    const targets = sampleTextTargets(canvas, ctx);
    particlesRef.current = createParticles(targets);

    // Setup audio (optional)
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (enableSound && !prefersReduced && !audioCtxRef.current) {
      try {
        // WebAudio may be blocked until user gesture; best-effort
        const Ctor: any = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (Ctor) {
          const ctx: AudioContext = new Ctor();
          audioCtxRef.current = ctx;
          if (ctx.state === "suspended") {
            ctx.resume().catch(() => {});
          }
          playBlip(ctx, 220, 0.08); // explode cue
          setTimeout(() => audioCtxRef.current && playBlip(audioCtxRef.current as AudioContext, 420, 0.10), 700); // assemble cue
        }
      } catch {}
    }

    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const progress = Math.min(1, elapsed / maxDurationMs);

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // orbiting ring particles
      drawRings(ctx, elapsed);

      updateAndDrawParticles(ctx, particlesRef.current, elapsed);

      if (progress >= 1) {
        cleanup();
        onComplete();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const cleanup = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      ro.disconnect();
      const ctxToClose = audioCtxRef.current;
      audioCtxRef.current = null;
      if (ctxToClose && (ctxToClose as any).state !== "closed") {
        try { (ctxToClose as AudioContext).close().catch(() => {}); } catch {}
      }
    };

    return cleanup;
  }, [onComplete, maxDurationMs, enableSound]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

function sampleTextTargets(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d")!;
  // center large XYZ text
  const fontSize = Math.min(w, h) * 0.18; // responsive
  octx.clearRect(0, 0, w, h);
  octx.fillStyle = "#fff";
  octx.font = `${Math.floor(fontSize)}px Inter, system-ui, Arial`;
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.fillText("XYZ", w / 2, h / 2);
  const { data } = octx.getImageData(0, 0, w, h);
  const step = 6; // sampling step in px
  const pts: { x: number; y: number }[] = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const idx = (y * w + x) * 4 + 3; // alpha channel
      if (data[idx] > 10) pts.push({ x, y });
    }
  }
  return pts;
}

function createParticles(targets: { x: number; y: number }[]): Particle[] {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const out: Particle[] = [];
  for (const t of targets) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 120 + Math.random() * 180; // initial outward burst
    out.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      tx: t.x,
      ty: t.y,
      life: 1,
      size: 1 + Math.random() * 1.5,
    });
  }
  return out;
}

function updateAndDrawParticles(ctx: CanvasRenderingContext2D, p: Particle[], elapsedMs: number) {
  const assembleStart = 550; // ms
  const assembleDur = 900; // ms
  const t = Math.max(0, Math.min(1, (elapsedMs - assembleStart) / assembleDur));
  const cx = ctx.canvas.clientWidth / 2;
  const cy = ctx.canvas.clientHeight / 2;

  for (const pt of p) {
    if (elapsedMs < assembleStart) {
      // outward burst
      pt.x += pt.vx * (1 / 60);
      pt.y += pt.vy * (1 / 60);
      // slow drag
      pt.vx *= 0.96;
      pt.vy *= 0.96;
    } else {
      // attraction towards target
      const ax = (pt.tx - pt.x) * (0.15 + t * 0.85);
      const ay = (pt.ty - pt.y) * (0.15 + t * 0.85);
      pt.vx = ax;
      pt.vy = ay;
      pt.x += pt.vx * (1 / 12);
      pt.y += pt.vy * (1 / 12);
      // fade in as it assembles
      pt.life = Math.min(1, 0.3 + t);
    }
  }

  // draw
  ctx.save();
  // soft additive glow
  ctx.globalCompositeOperation = "lighter";
  for (const pt of p) {
    const alpha = 0.65 * pt.life;
    ctx.fillStyle = `rgba(22,55,145,${alpha})`;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // subtle white core to sharpen edges as it finishes
  if (elapsedMs > assembleStart + 300) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let i = 0; i < p.length; i += 12) {
      const pt = p[i];
      ctx.fillRect(pt.x - 0.5, pt.y - 0.5, 1, 1);
    }
    ctx.restore();
  }
}

function drawRings(ctx: CanvasRenderingContext2D, elapsedMs: number) {
  const cx = ctx.canvas.clientWidth / 2;
  const cy = ctx.canvas.clientHeight / 2;
  const t = elapsedMs / 1000;
  ctx.save();
  ctx.strokeStyle = "rgba(22,55,145,0.15)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    const r = 40 + i * 18 + Math.sin(t + i) * 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 2.2, r, Math.sin(t + i) * 0.3, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function playBlip(ctx: AudioContext, freq: number, duration: number) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.value = freq;
  o.type = "sine";
  g.gain.value = 0.0001;
  o.connect(g);
  g.connect(ctx.destination);
  const now = ctx.currentTime;
  g.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  o.start();
  o.stop(now + duration + 0.02);
}


