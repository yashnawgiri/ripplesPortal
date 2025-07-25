/* eslint-disable max-len */
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FloatingPhone from "./FloatingPhone";
import { LOCAL_CREATOR_IMAGES } from "@/assets/influencerImages";
import { useImagePreloader } from "@/hooks/UseImagePreloader";

// Phone content will be generated and memoized inside the component

const MOBILE_CONFIG = {
  phoneCount: 3,
  animationDuration: 20,
  verticalSpacing: 10,
  delay: 0,
  size: "small" as const,
};

const DESKTOP_CONFIG = {
  phoneCount: 6,
  animationDuration: 60,
  verticalSpacing: 100,
  horizontalSpacing: 80,
  delay: 0,
  size: "medium" as const,
};

export default function AnimatedBreak() {
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Preload all creator images for better performance
  useImagePreloader(LOCAL_CREATOR_IMAGES);

  // Memoize phone content to prevent recreation on every render
  const phoneContent = useMemo(
    () =>
      LOCAL_CREATOR_IMAGES.map((image, index) => ({
        image,
        username: `@creator_${index + 1}`,
        likes: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}K`,
        caption: `Amazing content ${index + 1} ✨`,
        platform: ["instagram", "facebook", "reels"][index % 3] as
          | "instagram"
          | "facebook"
          | "reels",
        isVideo: index % 2 === 0,
      })),
    []
  );

  // Cache the visible phones for initial render
  const visiblePhones = useMemo(
    () => phoneContent.slice(0, MOBILE_CONFIG.phoneCount),
    [phoneContent]
  );

  // Create phone rows for mobile animation with proper repetition for smooth looping
  const mobilePhoneRows = useMemo(() => {
    const rows = [];
    const phonesPerRow = MOBILE_CONFIG.phoneCount;
    const totalPhones = phoneContent.length;
    const repetitions = 4; // Increase repetitions for smoother looping

    // Create repeated rows for seamless loop
    for (let r = 0; r < repetitions; r++) {
      for (let i = 0; i < totalPhones; i += phonesPerRow) {
        const row = phoneContent.slice(i, i + phonesPerRow);
        // If the last row is incomplete, fill it with phones from the beginning
        while (row.length < phonesPerRow) {
          row.push(phoneContent[row.length]);
        }
        rows.push(row);
      }
    }
    return rows;
  }, [phoneContent]);

  // Create phone grid for desktop animation
  const desktopPhones = useMemo(() => {
    const phones = [];
    const totalPhones = phoneContent.length;
    const repetitions = 6; // Increased repetitions for more continuous flow

    for (let r = 0; r < repetitions; r++) {
      for (let i = 0; i < totalPhones; i++) {
        phones.push({
          ...phoneContent[i],
          delay: (i % DESKTOP_CONFIG.phoneCount) * 0.3 + r * 0.1, // Stagger the animations with row variation
          row: r, // Add row info for positioning
        });
      }
    }
    return phones;
  }, [phoneContent]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="py-24 px-4 bg-[#0B011B] relative overflow-hidden min-h-screen flex items-center"
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 md:mb-8 font-sans">
              Let Your Brand Speak Through{" "}
              <span className="text-custom-gradient">Real Creators</span>
            </h2>
            <p className="text-lg md:text-2xl text-[#CFCFCF] leading-relaxed font-medium max-w-4xl mx-auto">
              Ripples makes every shopper a marketer. No chasing. No
              spreadsheets. Just scale.
            </p>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-center items-center space-x-4">
              {visiblePhones.map((content, index) => (
                <FloatingPhone
                  key={`static-${index}`}
                  delay={0}
                  content={content}
                  size={MOBILE_CONFIG.size}
                  animationDuration={0}
                  className="scale-75 transform-gpu"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-10 px-4 bg-[#0B011B] relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-custom-radial2 rounded-full blur-2xl opacity-5 pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-5 max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 md:mb-8 font-sans"
          >
            Let Your Brand Speak Through{" "}
            <span className="text-custom-gradient">Real Creators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-2xl text-[#CFCFCF] leading-relaxed font-medium max-w-4xl mx-auto"
          >
            Ripples makes every shopper a marketer. No chasing. No spreadsheets.
            Just scale.
          </motion.p>
        </div>

        {isInView && (
          <div
            className="relative max-w-7xl mx-auto overflow-hidden"
            style={{ height: isMobile ? "600px" : "800px" }}
          >
            {/* Mobile Scroll Loop */}
            <div className="md:hidden relative h-[600px] overflow-hidden">
              {/* Top blur gradient */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0B011B] to-transparent z-10" />

              <motion.div
                key="mobile-scroll-loop"
                initial={{ y: 0 }}
                animate={{
                  y: -(mobilePhoneRows.length * MOBILE_CONFIG.verticalSpacing),
                }}
                transition={{
                  duration: MOBILE_CONFIG.animationDuration,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: MOBILE_CONFIG.delay,
                }}
                className="absolute w-full top-0"
              >
                {mobilePhoneRows.map((row, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="flex justify-center items-center space-x-4 w-full"
                    style={{
                      marginTop: rowIndex * MOBILE_CONFIG.verticalSpacing,
                    }}
                  >
                    {row.map((content, phoneIndex) => (
                      <FloatingPhone
                        key={`phone-${rowIndex}-${phoneIndex}`}
                        delay={0}
                        content={content}
                        size={MOBILE_CONFIG.size}
                        animationDuration={0}
                        className="scale-75 transform-gpu will-change-transform"
                      />
                    ))}
                  </div>
                ))}
              </motion.div>

              {/* Bottom blur gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B011B] to-transparent z-10" />
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:block relative h-[800px] overflow-hidden">
              {/* Top blur gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B011B] to-transparent z-10" />

              <motion.div
                className="absolute inset-0 flex flex-wrap justify-center items-center gap-8"
                animate={{
                  y: [0, -100, 0],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: DESKTOP_CONFIG.animationDuration,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {desktopPhones.map((content, index) => (
                  <FloatingPhone
                    key={`desktop-${index}`}
                    delay={content.delay}
                    content={content}
                    size={DESKTOP_CONFIG.size}
                    animationDuration={DESKTOP_CONFIG.animationDuration}
                    className="transform-gpu will-change-transform"
                  />
                ))}
              </motion.div>

              {/* Bottom blur gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B011B] to-transparent z-10" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
