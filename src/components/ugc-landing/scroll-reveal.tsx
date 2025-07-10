import { useEffect, useRef } from "react";

import { cn } from "@/utils/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 500,
  direction = "up",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when element comes into view
            element.style.opacity = "1";
            element.style.transform = "translate(0, 0)";
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when even 10% of the element is visible
        rootMargin: "50px", // Start animation slightly before the element comes into view
      },
    );

    // Set initial styles
    element.style.opacity = "0";
    element.style.transform =
      {
        up: "translateY(20px)",
        down: "translateY(-20px)",
        left: "translateX(20px)",
        right: "translateX(-20px)",
      }[direction] || "translateY(0)";
    element.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, duration, direction]);

  return (
    <div ref={elementRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
