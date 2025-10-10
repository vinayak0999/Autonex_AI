import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: "default" | "secondary" | "gradient";
  maxWidth?: "4xl" | "5xl" | "6xl" | "7xl";
  padding?: "sm" | "md" | "lg" | "xl";
}

export function Section({ 
  id, 
  children, 
  className, 
  background = "default", 
  maxWidth = "7xl", 
  padding = "lg" 
}: SectionProps) {
  const backgroundClasses = {
    // Make sections inherit the page background (so we can force pure black sitewide)
    default: "bg-transparent",
    secondary: "bg-transparent",
    gradient: "bg-transparent"
  };

  const maxWidthClasses = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl", 
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl"
  };

  const paddingClasses = {
    sm: "py-16",
    md: "py-20",
    lg: "py-24",
    xl: "py-32"
  };

  return (
    <section 
      id={id}
      className={cn(
        "relative",
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", maxWidthClasses[maxWidth])}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeader({ 
  eyebrow, 
  title, 
  subtitle, 
  centered = true, 
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const titleContainerRef = useRef<HTMLSpanElement>(null);
  const [sweepActive, setSweepActive] = useState(false);

  useEffect(() => {
    // Continuous flow effect: keep sweep active
    setSweepActive(true);
  }, []);
  return (
    <div className={cn(
      "mb-16", 
      centered && "text-center max-w-4xl mx-auto",
      className
    )}>
      {/* Light sweep + glow keyframes for section titles */}
      <style>{`
        @keyframes sectionTitleSweepOnce { 
          0% { transform: translateX(-120%); opacity: 0.0; }
          10% { opacity: 0.5; }
          50% { opacity: 0.6; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes sectionTitleFlow { 
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes sectionTitleWaveFlow {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(120%); }
        }
        @keyframes sectionTitleWaveBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes sectionTitlePulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.85; } }
      `}</style>
      {eyebrow && (
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <span ref={titleContainerRef} className="relative inline-block align-top overflow-hidden">
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground inline-block",
              titleClassName
            )}
            style={{ textShadow: "0 0 12px rgba(255,255,255,0.06)" }}
          >
            {title}
          </h2>
          {/* Glow halo constrained to text width */}
          <span className="pointer-events-none absolute -inset-2 -z-10 blur-2xl opacity-40 block" style={{ background: "radial-gradient(60% 60% at 50% 50%, hsl(var(--primary)/0.25) 0%, transparent 70%)", animation: "sectionTitlePulse 4s ease-in-out infinite" }} />
          {/* Wave-like multi-sweep constrained to text width, continuous and soft */}
          {sweepActive && (
            <span className="pointer-events-none absolute inset-0 block overflow-hidden" style={{ animation: "sectionTitleWaveBob 2.8s ease-in-out infinite" }}>
              <span className="absolute top-0 bottom-0 left-0 w-1/3 opacity-35 mix-blend-screen blur-[1px]" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)", animation: "sectionTitleWaveFlow 3s linear infinite" }} />
              <span className="absolute top-0 bottom-0 left-0 w-1/4 opacity-25 mix-blend-screen blur-[2px]" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)", animation: "sectionTitleWaveFlow 2.2s linear infinite", animationDelay: "0.6s" }} />
            </span>
          )}
        </span>
      </div>
      
      {subtitle && (
        <p className={cn("text-xl md:text-2xl text-muted-foreground leading-relaxed", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}