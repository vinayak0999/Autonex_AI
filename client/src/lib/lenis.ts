import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;

export function initLenis() {
  if (typeof window === "undefined" || lenis) return lenis;
  
  const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  lenis = new Lenis({
    // Slightly shorter duration on mobile to reduce rubber-band feel
    duration: prefersReducedMotion ? 0.6 : (isMobile ? 0.9 : 1.2),
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // Normalize and smooth default inputs for better cross-device feel
    normalizeWheel: true as any,
    smoothWheel: true as any,
    smoothTouch: true as any,
    touchMultiplier: isMobile ? 1.1 : 1.0,
  } as any);

  function raf(time: number) {
    // Keep RAF cadence regular; on very low-end devices we naturally drop frames
    lenis?.raf(time as number);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function scrollTo(target: string | number, options?: { offset?: number }) {
  if (lenis) {
    lenis.scrollTo(target, options);
  }
}