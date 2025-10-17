// src/components/ParticleBackground.tsx

import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const context = ctx as CanvasRenderingContext2D;
    
    let animationFrameId: number;
    let particles: Particle[];
    let lastFrameTime = 0;
    const isMobile = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let primaryColorHsl = '28 92% 56%';
    let running = true;

    const updateColor = () => {
      try {
        const colorValue = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        if (colorValue) primaryColorHsl = colorValue;
      } catch (e) {
        console.error("Could not read --primary CSS variable.", e);
      }
    };
    
    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
        this.x = x; this.y = y; this.size = size; this.speedX = speedX; this.speedY = speedY;
      }
      update() {
        if (this.x > window.innerWidth || this.x < 0) this.speedX = -this.speedX;
        if (this.y > document.body.scrollHeight || this.y < 0) this.speedY = -this.speedY;
        this.x += this.speedX;
        this.y += this.speedY;
      }
      draw() {
        // --- CHANGE #1: Made particles fully opaque for better visibility ---
        context.fillStyle = `hsl(${primaryColorHsl} / 1.0)`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const init = () => {
      updateColor();
      const dpr = window.devicePixelRatio || 1;
      // Cap DPR on mobile to reduce fill cost
      const effectiveDpr = isMobile ? Math.min(1.5, dpr) : dpr;
      // Viewport-only canvas; fixed background does not need full page height
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      canvas.width = vw * effectiveDpr;
      canvas.height = vh * effectiveDpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(effectiveDpr, effectiveDpr);

      particles = [];
      
      // --- CHANGE #2: Parameters tuned for MORE visibility and presence ---
      const width = vw;
      const height = vh;
      // Reduce density on mobile while keeping visual richness
      const densityDivisor = isMobile ? 60000 : 30000;
      const numberOfParticles = Math.min(isMobile ? 500 : 1200, Math.floor((width * height) / densityDivisor));
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 0.5; // Larger particles
        const x = Math.random() * width;
        const y = Math.random() * height;
        const speedX = (Math.random() * 0.3) - 0.15; // A bit faster
        const speedY = (Math.random() * 0.3) - 0.15;
        particles.push(new Particle(x, y, size, speedX, speedY));
      }
    };

    const connect = () => {
      if (!particles) return;
      // On mobile, skip expensive O(n^2) linking to prevent jank
      if (isMobile) return;
      // Sample pairs to reduce complexity
      for (let a = 0; a < particles.length; a += 3) {
        for (let b = a + 3; b < particles.length; b += 3) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = 1 - (distance / 100);
            context.strokeStyle = `hsl(${primaryColorHsl} / ${opacity})`;
            context.lineWidth = 0.3; // Thicker lines for more visibility
            context.beginPath();
            context.moveTo(particles[a].x, particles[a].y);
            context.lineTo(particles[b].x, particles[b].y);
            context.stroke();
          }
        }
      }
    };

    const animate = (ts?: number) => {
      if (!particles || !running) return;
      // Throttle to ~30fps on mobile
      if (isMobile && ts !== undefined) {
        if (ts - lastFrameTime < 33) {
          animationFrameId = requestAnimationFrame(animate);
          return;
        }
        lastFrameTime = ts;
      }

      // --- CHANGE #3: Add a solid black background on every frame ---
      // We use canvas.width/height because fillRect is not affected by the scale transform
      // This ensures a high-contrast background for the particles at all times.
      // Non-null: context established above
      context.fillStyle = '#09090b'; // A very dark gray, matching theme
      context.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => { p.update(); p.draw(); });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();

    const handleResize = () => { init(); };
    const handleVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) {
        // reset lastFrameTime to avoid burst
        lastFrameTime = 0;
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    
    const observer = new MutationObserver(handleResize);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 max-w-full" />;
};