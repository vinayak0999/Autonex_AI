import React from "react";

interface MagneticExplodeProps {
  children: React.ReactNode;
  radiusPx?: number; // how far particles travel
  particleCount?: number;
  particleColor?: string; // tailwind-compatible color style
  triggerSelector?: string; // optional CSS selector to listen on a larger hover area (e.g., the whole card)
}

// Magnetic + explode effect: the child is slightly attracted to the cursor.
// On click or strong hover enter, particles burst outward and then fade.
export function MagneticExplode({
  children,
  radiusPx = 36,
  particleCount = 16,
  particleColor = "hsl(var(--primary))",
  triggerSelector,
}: MagneticExplodeProps) {
  return (
    <div className="inline-flex items-center justify-center select-none">
      {children}
    </div>
  );
}

export default MagneticExplode;


