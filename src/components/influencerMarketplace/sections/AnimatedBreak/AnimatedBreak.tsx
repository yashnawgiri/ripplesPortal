/* eslint-disable max-len */
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import FloatingPhone from "./FloatingPhone"
import { LOCAL_CREATOR_IMAGES } from "@/assets/influencerImages"
import phoneData from "./data.json"

// Preload images function
const preloadImages = (images: string[]) => {
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// Map the data to include the actual image URLs based on imageIndex
const PHONE_CONTENT = phoneData.map(item => ({
  ...item,
  image: LOCAL_CREATOR_IMAGES[item.imageIndex % LOCAL_CREATOR_IMAGES.length],
  platform: item.platform as "instagram" | "facebook" | "reels"
}))

// Extract first 8 images for mobile view
const INITIAL_IMAGES = PHONE_CONTENT.slice(0, 8).map(item => item.image)

// Mobile-specific configurations
const MOBILE_CONFIG = {
  phoneCount: 2,
  animationDuration: 10,
  verticalSpacing: 200,
  delay: 0.5,
  size: "small" as const
}

export default function AnimatedBreak() {
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Preload images on mount
  useEffect(() => {
    preloadImages(INITIAL_IMAGES)
    setImagesPreloaded(true)
  }, [])

  // Check for mobile viewport with debounced handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const checkMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768)
      }, 100)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.15 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Create different content sets for each row
  const mobileContent1 = PHONE_CONTENT.slice(0, 2)
  const mobileContent2 = PHONE_CONTENT.slice(2, 4)
  const mobileContent3 = PHONE_CONTENT.slice(4, 6)
  const mobileContent4 = PHONE_CONTENT.slice(6, 8)

  // Static layout for reduced motion preference
  if (prefersReducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="py-24 px-4 bg-[#0B011B] relative overflow-hidden min-h-screen flex items-center"
      >
        <div className="container mx-auto relative z-10">
          {/* Text Content */}
          <div className="text-center mb-20 max-w-5xl mx-auto px-4">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 md:mb-8 font-sans">
                Let Your Brand Speak Through <span className="text-custom-gradient">Real Creators</span>
              </h2>
              <p className="text-lg md:text-2xl text-[#CFCFCF] leading-relaxed font-medium max-w-4xl mx-auto">
                Ripples makes every shopper a marketer. No chasing. No spreadsheets. Just scale.
              </p>
            </div>
          </div>

          {/* Static Phone Grid */}
          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-center items-center space-x-4">
              {PHONE_CONTENT.slice(0, isMobile ? 2 : 3).map((content, index) => (
                <FloatingPhone
                  key={`static-${index}`}
                  delay={0}
                  content={content}
                  size={isMobile ? "small" : "medium"}
                  animationDuration={0}
                  className="scale-75 transform-gpu"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-[#0B011B] relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B011B] to-transparent"></div>

      {/* Subtle background glow - reduced blur on mobile */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-custom-radial2 rounded-full ${isMobile ? 'blur-2xl' : 'blur-3xl'} opacity-5 pointer-events-none`}></div>

      <div className="container mx-auto relative z-10">
        {/* Text Content - Adjusted font sizes for mobile */}
        <div className="text-center mb-20 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView && imagesPreloaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 md:mb-8 font-sans">
              Let Your Brand Speak Through <span className="text-custom-gradient">Real Creators</span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-lg md:text-2xl text-[#CFCFCF] leading-relaxed font-medium max-w-4xl mx-auto"
            >
              Ripples makes every shopper a marketer. No chasing. No spreadsheets. Just scale.
            </motion.p>
          </motion.div>
        </div>

        {/* Phone Grid with Infinite Upward Movement */}
        {isInView && imagesPreloaded && (
          <div className="relative max-w-7xl mx-auto overflow-hidden" style={{ height: isMobile ? "600px" : "800px" }}>
            {/* Mobile Layout */}
            <div className="md:hidden">
              {/* First Row */}
              <div className="absolute flex justify-center items-center space-x-3 w-full" style={{ top: "40px" }}>
                {mobileContent1.map((content, index) => (
                  <FloatingPhone
                    key={`mobile-1-${index}`}
                    delay={MOBILE_CONFIG.delay + index * 0.15}
                    content={content}
                    size={MOBILE_CONFIG.size}
                    animationDuration={MOBILE_CONFIG.animationDuration}
                    className="scale-75 transform-gpu will-change-transform"
                  />
                ))}
              </div>
              {/* Second Row */}
              <div 
                className="absolute flex justify-center items-center space-x-3 w-full" 
                style={{ top: `${MOBILE_CONFIG.verticalSpacing}px` }}
              >
                {mobileContent2.map((content, index) => (
                  <FloatingPhone
                    key={`mobile-2-${index}`}
                    delay={MOBILE_CONFIG.delay + 0.5 + index * 0.15}
                    content={content}
                    size={MOBILE_CONFIG.size}
                    animationDuration={MOBILE_CONFIG.animationDuration}
                    className="scale-75 transform-gpu will-change-transform"
                  />
                ))}
              </div>
              {/* Third Row */}
              <div 
                className="absolute flex justify-center items-center space-x-3 w-full" 
                style={{ top: `${MOBILE_CONFIG.verticalSpacing * 2}px` }}
              >
                {mobileContent3.map((content, index) => (
                  <FloatingPhone
                    key={`mobile-3-${index}`}
                    delay={MOBILE_CONFIG.delay + 1 + index * 0.15}
                    content={content}
                    size={MOBILE_CONFIG.size}
                    animationDuration={MOBILE_CONFIG.animationDuration}
                    className="scale-75 transform-gpu will-change-transform"
                  />
                ))}
              </div>
              {/* Fourth Row */}
              <div 
                className="absolute flex justify-center items-center space-x-3 w-full" 
                style={{ top: `${MOBILE_CONFIG.verticalSpacing * 3}px` }}
              >
                {mobileContent4.map((content, index) => (
                  <FloatingPhone
                    key={`mobile-4-${index}`}
                    delay={MOBILE_CONFIG.delay + 1.5 + index * 0.15}
                    content={content}
                    size={MOBILE_CONFIG.size}
                    animationDuration={MOBILE_CONFIG.animationDuration}
                    className="scale-75 transform-gpu will-change-transform"
                  />
                ))}
              </div>
            </div>

            {/* Desktop Layout - Hidden on Mobile */}
            <div className="hidden md:block">
              {/* Row 1 - Top (5 phones, slightly faded) */}
              <div className="absolute flex justify-center items-end space-x-2 opacity-60 w-full">
                {PHONE_CONTENT.slice(0, 5).map((content, index) => (
                  <FloatingPhone
                    key={`row1-${index}`}
                    delay={0.1 + index * 0.05}
                    content={content}
                    size="small"
                    className="hidden lg:block"
                    animationDuration={12 + index * 1} // Varying speeds
                  />
                ))}
              </div>
              {/* Row 1 - Top (5 phones, slightly faded) - Duplicated */}
              <div
                className="absolute flex justify-center items-end space-x-2 opacity-60 w-full"
                style={{ transform: "translateY(400px)" }}
              >
                {PHONE_CONTENT.slice(0, 5).map((content, index) => (
                  <FloatingPhone
                    key={`row1-dup-${index}`}
                    delay={1.5 + index * 0.05}
                    content={content}
                    size="small"
                    className="hidden lg:block"
                    animationDuration={12 + index * 1} // Varying speeds
                  />
                ))}
              </div>

              {/* Row 2 - Middle (5 phones, full opacity) */}
              <div className="absolute flex justify-center items-center space-x-3 w-full top-20">
                {PHONE_CONTENT.slice(5, 10).map((content, index) => (
                  <FloatingPhone
                    key={`row2-${index}`}
                    delay={0.3 + index * 0.08}
                    content={content}
                    size="medium"
                    className="hidden md:block"
                    animationDuration={10 + index * 0.8} // Varying speeds
                  />
                ))}
              </div>
              {/* Row 2 - Middle (5 phones, full opacity) - Duplicated */}
              <div
                className="absolute flex justify-center items-center space-x-3 w-full top-20"
                style={{ transform: "translateY(400px)" }}
              >
                {PHONE_CONTENT.slice(5, 10).map((content, index) => (
                  <FloatingPhone
                    key={`row2-dup-${index}`}
                    delay={1.8 + index * 0.08}
                    content={content}
                    size="medium"
                    className="hidden md:block"
                    animationDuration={10 + index * 0.8} // Varying speeds
                  />
                ))}
              </div>

              {/* Row 3 - Bottom (5 phones, slightly faded) */}
              <div className="absolute flex justify-center items-start space-x-2 opacity-70 w-full top-40">
                {PHONE_CONTENT.slice(10, 15).map((content, index) => (
                  <FloatingPhone
                    key={`row3-${index}`}
                    delay={0.5 + index * 0.06}
                    content={content}
                    size="small"
                    className="hidden lg:block"
                    animationDuration={15 + index * 1} // Varying speeds
                  />
                ))}
              </div>
              {/* Row 3 - Bottom (5 phones, slightly faded) - Duplicated */}
              <div
                className="absolute flex justify-center items-start space-x-2 opacity-70 w-full top-40"
                style={{ transform: "translateY(400px)" }}
              >
                {PHONE_CONTENT.slice(10, 15).map((content, index) => (
                  <FloatingPhone
                    key={`row3-dup-${index}`}
                    delay={2.0 + index * 0.06}
                    content={content}
                    size="small"
                    className="hidden lg:block"
                    animationDuration={15 + index * 1} // Varying speeds
                  />
                ))}
              </div>

              {/* Tablet Layout - Show middle row only with infinite movement */}
              <div className="hidden md:block lg:hidden absolute w-full top-10">
                <div className="flex justify-center items-center space-x-3">
                  {PHONE_CONTENT.slice(5, 8).map((content, index) => (
                    <FloatingPhone
                      key={`tablet-${index}`}
                      delay={0.2 + index * 0.1}
                      content={content}
                      size="medium"
                      animationDuration={12 + index * 1}
                    />
                  ))}
                </div>
              </div>
              {/* Tablet Layout - Duplicated */}
              <div className="hidden md:block lg:hidden absolute w-full" style={{ top: "300px" }}>
                <div className="flex justify-center items-center space-x-3">
                  {PHONE_CONTENT.slice(5, 8).map((content, index) => (
                    <FloatingPhone
                      key={`tablet-dup-${index}`}
                      delay={1.2 + index * 0.1}
                      content={content}
                      size="medium"
                      animationDuration={12 + index * 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Gradient masks - Adjusted opacity for mobile */}
            <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B011B] to-transparent z-10 pointer-events-none ${isMobile ? 'opacity-90' : 'opacity-100'}`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B011B] to-transparent z-10 pointer-events-none ${isMobile ? 'opacity-90' : 'opacity-100'}`}></div>
          </div>
        )}
      </div>
    </section>
  )
}
