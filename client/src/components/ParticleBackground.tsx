// src/components/ParticleBackground.tsx

import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[];
    let primaryColorHsl = '28 92% 56%';

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
        ctx.fillStyle = `hsl(${primaryColorHsl} / 1.0)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      updateColor();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.body.scrollHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.body.scrollHeight}px`;
      ctx.scale(dpr, dpr);

      particles = [];
      
      // --- CHANGE #2: Parameters tuned for MORE visibility and presence ---
      const width = window.innerWidth;
      const height = document.body.scrollHeight;
      const numberOfParticles = Math.floor((width * height) / 25000); // More particles than before
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
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = 1 - (distance / 100);
            ctx.strokeStyle = `hsl(${primaryColorHsl} / ${opacity})`;
            ctx.lineWidth = 0.3; // Thicker lines for more visibility
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!particles) return;
      
      // --- CHANGE #3: Add a solid black background on every frame ---
      // We use canvas.width/height because fillRect is not affected by the scale transform
      // This ensures a high-contrast background for the particles at all times.
      ctx.fillStyle = '#09090b'; // A very dark gray, matching theme
      ctx.fillRect(0, 0, canvas.width, canvas.height); 

      particles.forEach(p => { p.update(); p.draw(); });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();

    const handleResize = () => { init(); };
    window.addEventListener('resize', handleResize);
    
    const observer = new MutationObserver(handleResize);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 max-w-full" />;
};