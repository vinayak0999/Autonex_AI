import React, { useId } from "react";

interface ElectricBorderProps {
  color?: string; // CSS color, e.g. 'hsl(220 73% 33%)' or '#163791'
  radius?: number; // px radius
  strokeWidth?: number; // px border width
  className?: string; // additional classes for the container
}

// Renders an animated electric/plasma border using an SVG turbulence + displacement filter
// and layered glows. It mounts absolutely over its parent.
export default function ElectricBorder({
  color = "#163791",
  radius = 16,
  strokeWidth = 2,
  className,
}: ElectricBorderProps) {
  const filterId = useId().replace(/:/g, "");

  const lightColor = color;

  return (
    <div className={`pointer-events-none absolute inset-0`} style={{ borderRadius: radius }}>
      {/* SVG filter (scoped unique id) */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={`turbulent-displace-${filterId}`} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed={1} />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed={1} />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed={2} />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed={2} />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      {/* Outer fine border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          border: `${strokeWidth}px solid rgba(72,87,221,0.5)`,
        }}
      />

      {/* Main border with turbulence displacement */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          border: `${strokeWidth}px solid ${lightColor}`,
          filter: `url(#turbulent-displace-${filterId})`,
          marginTop: -strokeWidth,
          marginLeft: -strokeWidth,
          width: `calc(100% + ${strokeWidth}px)`,
          height: `calc(100% + ${strokeWidth}px)`,
        } as React.CSSProperties}
      />

      {/* Glow layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          border: `${strokeWidth}px solid rgba(22,55,145,0.6)`,
          filter: "blur(1px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          border: `${strokeWidth}px solid ${lightColor}`,
          filter: "blur(4px)",
          opacity: 0.9,
        }}
      />

      {/* Overlays and background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          transform: "scale(1.1)",
          filter: "blur(16px)",
          mixBlendMode: "overlay",
          background: "linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)",
          opacity: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          transform: "scale(1.1)",
          filter: "blur(16px)",
          mixBlendMode: "overlay",
          background: "linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          transform: "scale(1.1)",
          filter: "blur(32px)",
          opacity: 0.3,
          zIndex: -1,
          background: `linear-gradient(-30deg, ${lightColor}, transparent, ${color})`,
        }}
      />
    </div>
  );
}


