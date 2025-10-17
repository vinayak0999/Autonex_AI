import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  durationMs?: number;
}

// Helper component for the animated logo
// Upar se 'import' waali line hata di gayi hai

function AnimatedLogo({ docked }: { docked: boolean }) {
  const size = docked ? 28 : 64;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      style={{ width: size, height: size }}
    >
      <img src="/7.png" alt="Company Logo" style={{ width: '100%', height: '100%' }} />
    </motion.div>
  );
}

// Main Preloader component
export default function Preloader({ durationMs = 2000 }: PreloaderProps) {
  const [phase, setPhase] = useState<"center" | "docking" | "hidden">("center");
  const anchorRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const vortexRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Timers to control the animation phases
  useEffect(() => {
    const toDockTimer = setTimeout(() => setPhase("docking"), 1200); // Start docking after 1.2s
    const toHideTimer = setTimeout(() => setPhase("hidden"), 1200 + 800); // Hide 0.8s after docking starts
    return () => {
      clearTimeout(toDockTimer);
      clearTimeout(toHideTimer);
    };
  }, []);

  // Notify when preloader is fully hidden
  useEffect(() => {
    if (phase === "hidden") {
      try {
        window.dispatchEvent(new CustomEvent("preloader:done"));
      } catch {}
    }
  }, [phase]);

  // Measure the brand anchor element for precise docking
  useEffect(() => {
    const anchor = document.getElementById("brand-anchor");
    if (!anchor) return;
    const update = () => {
      const rect = anchor.getBoundingClientRect();
      anchorRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update as any);
    };
  }, []);

  // Vortex canvas animation effect
  useEffect(() => {
    if (phase !== "docking") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const canvas = vortexRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };
    resize();

    let start = performance.now();
    const maxMs = 1000;
    const draw = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const target = anchorRectRef.current;
      if (target) {
        const cx = (target.left + target.width / 2) * dpr;
        const cy = (target.top + target.height / 2) * dpr;
        const radius = Math.max(canvas.width, canvas.height) * 0.25;
        const rings = 18;
        for (let i = 0; i < rings; i++) {
          const p = i / rings;
          const r = radius * (0.2 + 0.8 * p);
          const alpha = Math.max(0, (1 - p) * 0.12 * (1 - elapsed / maxMs));
          if (alpha <= 0.001) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(22,55,145,${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.2 * dpr;
          const angle = (elapsed * 0.01 + i * 0.4);
          ctx.arc(cx, cy, r, angle, angle + Math.PI * 1.2);
          ctx.stroke();
        }
      }

      if (elapsed < maxMs && phase === "docking") {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    rafRef.current = requestAnimationFrame(draw);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          style={{ pointerEvents: phase === "center" ? "auto" : "none" }}
          className="fixed inset-0 z-[1000] bg-black"
        >
          {/* Vortex canvas */}
          {phase === "docking" && (
            <canvas ref={vortexRef} className="absolute inset-0 pointer-events-none" />
          )}

          {/* Logo animation + docking movement */}
          <motion.div
            initial={{ x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={(() => {
              if (phase === "center") return { scale: 1 };
              const target = anchorRectRef.current;
              const finalScale = (target?.width ?? 28) / 64; // Calculate scale based on target size
              return {
                left: target?.left ?? 16,
                top: target?.top ?? 16,
                x: 0,
                y: 0,
                scale: finalScale,
              };
            })()}
            transition={{ type: "tween", duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
          >
            <AnimatedLogo docked={phase !== "center"} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}