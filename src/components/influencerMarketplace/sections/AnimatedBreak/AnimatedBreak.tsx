/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import ResponsivePhoneStream from "./ResponsivePhoneStream";

interface AnimatedBreakProps {
  className?: string;
}

export default function AnimatedBreak({ className = "" }: AnimatedBreakProps) {
  const [isActive, setIsActive] = useState(false);
  const { elementRef, isInView } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  // Activate animations when component comes into view
  useEffect(() => {
    if (isInView && !isActive) {
      // Small delay to ensure smooth activation
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!isInView && isActive) {
      setIsActive(false);
    }
  }, [isInView, isActive]);

  return (
    <section
      ref={elementRef}
      className={`relative py-16 md:py-24 overflow-hidden bg-[#0B011B] ${className}`}
      style={{ minHeight: "600px" }}
    >
      {/* Removed gray/white gradient background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50" /> */}
      {/* Optional: Add a subtle vignette or glow if desired */}
      {/* <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(80,0,120,0.15) 0%, transparent 70%)" }} /> */}
      {/* Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Content */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            See Your Content Come to Life
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Watch as your influencer campaigns transform into engaging content
            that captures attention and drives results across all platforms.
          </p>
        </div>

        {/* Phone Animation Area - no extra background */}
        <div className="relative h-96 md:h-[500px] lg:h-[600px] w-full">
          <ResponsivePhoneStream isActive={isActive} />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-lg text-gray-300 mb-6">
            Ready to create your next viral campaign?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
