import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StaggerChildren = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div
    className={cn(className)}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    {...props}
  >
    {children}
  </motion.div>
);

// Shared card motion used across Services, Industries, Vision, Products, and Data Services
export const serviceCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const serviceCardHover = {
  y: -8,
  transition: { duration: 0.3 },
};

// Helper for split entry (cards slide from left/right halves toward center)
export function splitEntry(index: number, total: number) {
  const middleIndex = Math.floor(total / 2);
  const isMiddle = total % 2 === 1 && index === middleIndex;
  const fromLeft = index < middleIndex;
  const distanceFromCenter = Math.abs(index - middleIndex);
  const initX = isMiddle ? 0 : fromLeft ? -200 : 200;
  const delay = 0.12 * distanceFromCenter;
  return { initX, delay };
}