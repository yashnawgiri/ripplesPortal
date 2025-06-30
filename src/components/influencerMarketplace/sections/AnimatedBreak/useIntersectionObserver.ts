import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use setTimeout to delay rendering slightly and improve perceived performance
          setTimeout(() => {
            setIsInView(true);
          }, 0);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || "0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { elementRef, isInView };
} 