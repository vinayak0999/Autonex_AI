import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

const sweepVariants: Variants = {
  // Snap back immediately on hover-out (no reverse glow)
  rest: { opacity: 0, x: "-120%", transition: { duration: 0 } },
  // Animate only on hover-in
  hover: { opacity: 1, x: "120%", transition: { duration: 0.8, ease: "easeInOut" } },
};

const cardVariants: Variants = {
  rest: { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,.15)" },
  hover: { y: -6, scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,.35)" },
};


type MotionDivBaseProps = React.ComponentProps<typeof motion.div>
interface MotionDivProps extends Omit<MotionDivBaseProps, "children"> {
  children?: React.ReactNode;
  interactive?: boolean; // disable hover/tap/shadow/sweep when false
}

const Card = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  MotionDivProps
>(({ className, children, interactive = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "group shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm relative overflow-hidden after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-gradient-to-r after:from-primary/0 after:via-primary after:to-primary/0",
      className
    )}
    variants={interactive ? cardVariants : undefined}
    initial={interactive ? "rest" : undefined}
    animate={interactive ? "rest" : undefined}
    whileHover={interactive ? "hover" : undefined}
    whileTap={interactive ? { scale: 0.98, filter: "brightness(1.05)" } : undefined}
    transition={interactive ? { type: "spring", stiffness: 300, damping: 20 } : undefined}
    style={{ perspective: 1000, transformStyle: "flat" }}
    {...props}
  >
    {children}
    {/* Glow sweep overlay */}
    {interactive && (
      <motion.span
        variants={sweepVariants}
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent)" }}
      />
    )}
  </motion.div>
));
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
