/* eslint-disable max-len */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useNavigate } from "react-router-dom"

import dashboardImg1 from "@/assets/dashboardImages/dashboard_img1.png"
import dashboardImg2 from "@/assets/dashboardImages/dashboard_img2.png"
import dashboardImg3 from "@/assets/dashboardImages/dashboard_img3.png"
import dashboardImg4 from "@/assets/dashboardImages/dashboard_img4.png"

const DEMO_STEPS = [
  {
    id: 1,
    title: "Creator Dashboard",
    description: "Track earnings, commissions, and brand partnerships",
    image: dashboardImg1,
  },
  {
    id: 2,
    title: "Campaign Details",
    description: "View campaign rewards, performance metrics, and application guidelines",
    image: dashboardImg2,
  },
  {
    id: 3,
    title: "Brand Management",
    description: "Manage active campaigns, creators, and reward programs",
    image: dashboardImg3,
  },
  {
    id: 4,
    title: "Campaign Application",
    description: "Apply to campaigns with clear requirements and reward tiers",
    image: dashboardImg4,
  },
]

export default function DemoBlock() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  // const navigate = useNavigate()

  // const handleBookDemo = () => {
  //   navigate("/get-demo")
  // }

  const goToNextStep = () => {
    setCurrentStep((prev) => (prev >= DEMO_STEPS.length ? 1 : prev + 1))
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }

  const goToPrevStep = () => {
    setCurrentStep((prev) => (prev <= 1 ? DEMO_STEPS.length : prev - 1))
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }

  const goToStep = (stepId: number) => {
    setCurrentStep(stepId)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isInView && !isPaused) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= DEMO_STEPS.length) {
            return 1
          }
          return prev + 1
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isInView, isPaused])

  const currentStepData = DEMO_STEPS.find((step) => step.id === currentStep) || DEMO_STEPS[0]

  return (
    <section ref={sectionRef} id="demo" className="py-8 lg:py-24 bg-custom-radial">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 font-poppins px-2"
            >
              Here's what your dashboard looks like when{" "}
              <span className="text-custom-gradient">UGC runs on autopilot</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-[#CFCFCF] leading-relaxed max-w-3xl mx-auto px-4"
            >
              From campaign setup to creator payouts — watch how Ripples automates your entire UGC workflow
            </motion.p>
          </div>

        

          {/* Step Counter & Title */}
        

          <div className="text-center mb-6 sm:mb-8">
            <motion.h3
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 font-poppins px-2"
            >
              {currentStepData.title}
            </motion.h3>
            <motion.p
              key={`desc-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm sm:text-base lg:text-lg text-[#CFCFCF] px-4"
            >
              {currentStepData.description}
            </motion.p>
          </div>

          {/* Image */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
            <div className="relative z-10 h-full flex items-center justify-center px-2 sm:px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 300, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -300, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="w-full max-w-4xl"
                >
                  <img
                    src={currentStepData.image || "/placeholder.svg"}
                    alt={currentStepData.title}
                    className="w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl border border-[#2E1A47] object-cover"
                    style={{
                      minHeight: "250px",
                      maxHeight: "600px",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            
                      {/* Step Indicators */}
          <div className="flex justify-center  align-middle mt-4">
            <div className="flex items-center space-x-2 sm:space-x-4 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              {DEMO_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    onClick={() => goToStep(step.id)}
                    className={`relative w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 cursor-pointer ${
                      currentStep === step.id ? "bg-custom-gradient shadow-lg" : "bg-[#2E1A47] hover:bg-[#3E2A57]"
                    }`}
                    animate={{
                      scale: currentStep === step.id ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {currentStep === step.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-custom-gradient"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        style={{ opacity: 0.3 }}
                      />
                    )}
                  </motion.button>
                  {index < DEMO_STEPS.length - 1 && (
                    <div
                      className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 transition-all duration-500 ${
                        currentStep > step.id ? "bg-custom-gradient" : "bg-[#2E1A47]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Slideshow Navigation Buttons (Below Image) */}
          <div className="mt-6 flex justify-center space-x-6">
            <button
              onClick={goToPrevStep}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1A1A2E] text-white rounded-full border border-[#3A3A5C] hover:bg-[#2B2B45] hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNextStep}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1A1A2E] text-white rounded-full border border-[#3A3A5C] hover:bg-[#2B2B45] hover:shadow-md hover:scale-105 transition-all duration-300"
            >
            <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 sm:mt-12 px-4"
          >
            <p className="text-sm sm:text-base lg:text-lg text-[#CFCFCF] mb-4 sm:mb-6">
              Ready to see this in action for your brand?
            </p>
            {/* <Button
              className="bg-custom-gradient hover:glow-custom text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-3xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0 font-poppins"
              onClick={handleBookDemo}
            >
              Book Your Demo
            </Button> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
