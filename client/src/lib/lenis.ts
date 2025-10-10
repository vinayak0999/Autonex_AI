import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;

export function initLenis() {
  if (typeof window === "undefined" || lenis) return lenis;
  
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time: number) {
    lenis?.raf(time);
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