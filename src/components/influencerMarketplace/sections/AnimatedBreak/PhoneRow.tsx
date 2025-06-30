import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import type { PhoneContent } from "./types";

// Lazy load FloatingPhone component
const FloatingPhone = lazy(
  () => import("@/components/influencerMarketplace/ui/FloatingPhone")
);

// Loading component for Suspense
const PhoneLoading = () => (
  <div className="w-32 h-64 bg-gray-800 rounded-[1.75rem] animate-pulse" />
);

interface PhoneRowProps {
  contents: PhoneContent[];
  size: "small" | "medium" | "large";
  delayStart: number;
  rowKeyPrefix: string;
  animationDuration?: number;
  className?: string;
  opacity?: number;
  animationClass?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export default function PhoneRow({
  contents,
  size,
  delayStart,
  rowKeyPrefix,
  animationDuration = 12,
  className = "",
  opacity = 1,
  animationClass = "animate-float-continuous",
}: PhoneRowProps) {
  return (
    <motion.div
      className={`absolute flex justify-center items-center space-x-4 w-full ${className}`}
      style={{ opacity }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="presentation"
      aria-hidden="true"
    >
      {contents.map((content, index) => (
        <motion.div
          key={`${rowKeyPrefix}-${index}`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Suspense fallback={<PhoneLoading />}>
            <FloatingPhone
              delay={delayStart + index * 0.2}
              content={content}
              size={size}
              animationDuration={animationDuration}
              useCSSAnimation={true}
              animationClass={animationClass}
            />
          </Suspense>
        </motion.div>
      ))}
    </motion.div>
  );
}
