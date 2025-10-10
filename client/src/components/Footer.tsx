import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer({ hideCta = false }: { hideCta?: boolean }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isProducts = pathname === "/products";
  const isAbout = pathname === "/about";
  const isDataServices = pathname === "/data-services";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const goToContact = () => {
    if (window.location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.location.href = "/#contact";
  };

  const bookACall = () => {
    const mail = "nikhilg@autonexai360.com";
    const subject = encodeURIComponent("Book a Call - Data Annotation Services");
    const body = encodeURIComponent("Hi Autonex AI team,\n\nI would like to book a call to discuss data annotation needs.\n\nThanks,");
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
  };

  const handleNavClick = (sectionId: string) => {
    if (window.location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.location.href = `/#${sectionId}`;
  };

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: 'electron' | 'proton';
      charge: number;
      trail: Array<{x: number, y: number}>;
    }> = [];

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      particles = [];
      const particleCount = Math.floor((rect.width * rect.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.5 ? 'electron' : 'proton';
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: type === 'electron' ? 1.5 : 2.5,
          type,
          charge: type === 'electron' ? -1 : 1,
          trail: []
        });
      }
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 8) particle.trail.shift();

        // Apply electromagnetic forces
        particles.forEach(other => {
          if (particle === other) return;
          
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0 && distance < 100) {
            const force = (particle.charge * other.charge) / (distance * distance) * 0.001;
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            
            particle.vx += fx;
            particle.vy += fy;
          }
        });

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Draw trail
        if (particle.trail.length > 1) {
          ctx.strokeStyle = particle.type === 'electron' 
            ? `rgba(255, 165, 0, ${0.3})` 
            : `rgba(255, 140, 0, ${0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          ctx.stroke();
        }

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        
        if (particle.type === 'electron') {
          gradient.addColorStop(0, 'rgba(255, 165, 0, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 165, 0, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(255, 140, 0, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = particle.type === 'electron' ? '#ffa500' : '#ff8c00';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Footer hero copy (page-specific overrides)
  const titleText = isAbout
    ? "Ready to Connect?"
    : isDataServices
    ? "Ready to Scale Your AI Training?"
    : isProducts
    ? "Ready To Transform Your Operations?"
    : "Ready to get started?";
  const subtitleText = isAbout
    ? "Reach out to us to discuss how we can transform your industrial operations"
    : isDataServices
    ? "Contact us to discuss your data annotation needs. We'll get back within 24 hours with a customized solution."
    : isProducts
    ? "Discover how our AI-powered solutions can revolutionize your industrial processess."
    : "Schedule a consultation to discuss your industrial automation needs";
  const primaryLabel = isDataServices
    ? "Book a Call"
    : isProducts || isAbout
    ? "Contact Us"
    : "Schedule Consultation";
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @keyframes rotateAurora {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
      <footer className="relative w-full">
      {/* Particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ background: 'transparent' }}
      />
      
      {/* CTA/Hero section - hidden when hideCta is true */}
      {!hideCta && (
        <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 0%, hsl(var(--background)/0.1) 15%, hsl(var(--card)/0.2) 30%, hsl(25, 85%, 55%, 0.15) 50%, hsl(25, 85%, 55%, 0.3) 75%, hsl(25, 85%, 55%, 0.5) 100%)"
            }}
          />
          {/* subtle texture overlay */}
          <div className="pointer-events-none absolute inset-0"
            style={{ 
              background: "linear-gradient(45deg, transparent 0%, hsl(25, 85%, 55%, 0.05) 50%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)"
            }}
          />
          {/* seamless top blend */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-hsl(var(--background)) to-transparent" />
          
          {/* bottom inner glow */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(60%_100%_at_50%_100%,hsl(25, 85%, 55%, 0.15),transparent_70%)]" />

          {/* Content wrapped in bordered-black container */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
            <div
              className="relative mx-auto p-10 md:p-14"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{titleText}</h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">{subtitleText}</p>

              {/* Hero-style badge */}
              <div className="mb-4" onClick={() => (window.location.href = "/contact")}>
                <div className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full">
                  <div className="absolute top-1/2 left-1/2 w-[200%] h-[400%]" style={{ background: 'conic-gradient(from 0deg at 50% 50%, hsl(25, 85%, 55%, 0.5), hsl(25, 85%, 55%, 0), hsl(25, 85%, 55%, 0.5))', animation: 'rotateAurora 4s linear infinite' }} />
                  <div className="relative flex items-center px-6 py-3 rounded-full bg-zinc-900/70 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 mr-2" style={{ color: 'hsl(25, 85%, 55%)' }} />
                    <span className="text-sm font-semibold tracking-wider uppercase text-white">{primaryLabel}</span>
                  </div>
                </div>
              </div>

              {/* Shadow removed as requested */}
            </div>
          </div>

          {/* angled cut overlay with transparent corners */}
          <div className="absolute inset-x-0 bottom-0 h-24" style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(var(--background)/0.6) 50%, hsl(var(--background)/0.3) 100%)",
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)"
          }} />
          
          {/* Additional corner transparency masks */}
          <div className="absolute bottom-0 left-0 w-32 h-24 bg-gradient-to-tr from-transparent to-hsl(var(--background)/0.2)" />
          <div className="absolute bottom-0 right-0 w-32 h-24 bg-gradient-to-tl from-transparent to-hsl(var(--background)/0.2)" />
        </div>
      )}

      {/* Secondary footer (marketing) */}
      <div className="relative z-10">
        <div className="px-4 md:px-6 py-14">
          <div
            className="max-w-7xl mx-auto rounded-md bg-black p-8 md:p-12 relative overflow-visible"
          >
            {/* < 1280px (xl) – three-column compact grid */}
            <div className="xl:hidden text-[11px] sm:text-xs md:text-sm leading-5 text-muted-foreground">
              <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                {/* Left: Socials (vertical) */}
                <div className="space-y-1.5 text-left">
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors">Instagram</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors">Facebook</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors">LinkedIn</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors">X</button>
                </div>
                {/* Middle: Navigation (vertical) */}
                <div className="space-y-1.5 text-center">
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors" onClick={() => handleNavClick('home')}>Home</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors" onClick={() => handleNavClick('vision')}>Our Vision</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors" onClick={() => handleNavClick('services')}>Services</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors" onClick={() => handleNavClick('industries')}>Industries</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors" onClick={() => handleNavClick('contact')}>Contact</button>
                </div>
                {/* Right: Legal (vertical) */}
                <div className="space-y-1.5 text-right">
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors">Terms of Services</button>
                  <button className="block px-1 py-0.5 hover:text-foreground transition-colors">Public Policy</button>
                </div>
              </div>
            </div>

            {/* >= 1280px – single line, three groups with adjusted left bias */}
            <div className="hidden xl:flex w-full items-center justify-between gap-x-8 gap-y-4 pl-8 pr-4 text-sm text-muted-foreground flex-wrap">
              {/* Left: Socials */}
              <div className="flex items-center gap-6 xl:gap-8 2xl:gap-12">
                <button className="hover:text-foreground transition-colors">Instagram</button>
                <button className="hover:text-foreground transition-colors">Facebook</button>
                <button className="hover:text-foreground transition-colors">LinkedIn</button>
                <button className="hover:text-foreground transition-colors">X</button>
              </div>

              {/* Center: Navigation */}
              <div className="flex items-center gap-6 xl:gap-8 2xl:gap-12">
                <button className="hover:text-foreground transition-colors" onClick={() => handleNavClick('home')}>Home</button>
                <button className="hover:text-foreground transition-colors" onClick={() => handleNavClick('vision')}>Our Vision</button>
                <button className="hover:text-foreground transition-colors" onClick={() => handleNavClick('services')}>Services</button>
                <button className="hover:text-foreground transition-colors" onClick={() => handleNavClick('industries')}>Industries</button>
                <button className="hover:text-foreground transition-colors" onClick={() => handleNavClick('contact')}>Contact</button>
              </div>

              {/* Right: Legal */}
              <div className="flex items-center gap-6 xl:gap-8 2xl:gap-12">
                <button className="hover:text-foreground transition-colors">Terms of Service</button>
                <button className="hover:text-foreground transition-colors">Privacy Policy</button>
              </div>
            </div>

            {/* Thin divider visible on all sizes */}
            <Separator className="my-6 bg-white/10" />

            {/* Bottom bar for < 1280px */}
            <div className="xl:hidden w-full mt-2">
              {/* Stacked layout on extra-small screens */}
              <div className="sm:hidden flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/path25.png"
                    alt="Autonex Home"
                    className="h-6 w-auto object-contain cursor-pointer"
                    onClick={() => handleNavClick('home')}
                  />
                  <span className="text-muted-foreground">|</span>
                  <p className="text-muted-foreground text-xs">© {currentYear} XYZ. All rights reserved.</p>
                </div>
                <div className="h-px w-4/5 bg-white/10" />
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-900/70 text-white px-3 py-1.5 text-xs shadow-sm hover:bg-emerald-900 transition-colors"
                >
                  <span className="inline-block h-5 w-5 rounded-full bg-white/10 grid place-items-center">⚡</span>
                  <span>Presented by Autonex AI</span>
                </a>
              </div>

              {/* Single row with equal spacing on small-to-large (<1280px) */}
              <div className="hidden sm:flex items-center justify-between px-4 sm:px-6 md:px-8 gap-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-nowrap">
                  <img
                    src="/path25.png"
                    alt="Autonex Home"
                    className="h-6 w-auto object-contain cursor-pointer flex-shrink-0"
                    onClick={() => handleNavClick('home')}
                  />
                  <span className="text-muted-foreground flex-shrink-0">|</span>
                  <p className="text-muted-foreground whitespace-nowrap text-[10px] sm:text-xs md:text-sm truncate">© {currentYear} XYZ. All rights reserved.</p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-900/70 text-white px-3 py-1.5 text-xs shadow-sm hover:bg-emerald-900 transition-colors flex-shrink-0"
                >
                  <span className="inline-block h-5 w-5 rounded-full bg-white/10 grid place-items-center">⚡</span>
                  <span>Presented by Autonex AI</span>
                </a>
              </div>
            </div>

            {/* Bottom bar for >= 1280px */}
            <div className="hidden xl:flex items-center justify-between gap-10 text-left mt-12 pl-8 pr-4">
              <div className="flex items-center gap-3">
                <img
                  src="/path25.png"
                  alt="Autonex Home"
                  className="h-7 w-auto object-contain cursor-pointer"
                  onClick={() => handleNavClick('home')}
                />
                <span className="text-muted-foreground">|</span>
                <p className="text-muted-foreground text-sm">© {currentYear} XYZ. All rights reserved.</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-900/70 text-white px-4 py-2 text-sm shadow-sm hover:bg-emerald-900 transition-colors"
                >
                  <span className="inline-block h-5 w-5 rounded-full bg-white/10 grid place-items-center">⚡</span>
                  <span>Presented by Autonex AI</span>
                </a>
              </div>
            </div>

            {/* Removed: shadow here now connects to the Schedule Consultation bordered box above */}
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}