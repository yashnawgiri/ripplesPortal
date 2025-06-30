import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import dashboardImg1 from "@/assets/dashboardImages/dashboard_img1.png";
import dashboardImg2 from "@/assets/dashboardImages/dashboard_img2.png";
import dashboardImg3 from "@/assets/dashboardImages/dashboard_img3.png";
import dashboardImg4 from "@/assets/dashboardImages/dashboard_img4.png";

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
    description:
      "View campaign rewards, performance metrics, and application guidelines",
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
];

export default function DemoBlock() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate("/get-demo");
  };

  // Intersection Observer to detect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-transition between steps when in view
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= DEMO_STEPS.length) {
            return 1;
          }
          return prev + 1;
        });
      }, 3000); // 3 seconds per step

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const currentStepData =
    DEMO_STEPS.find((step) => step.id === currentStep) || DEMO_STEPS[0];

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="py-8 sm:py-12 lg:py-24 bg-custom-radial"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 font-poppins px-2"
            >
              Here's what your dashboard looks like when{" "}
              <span className="text-custom-gradient">
                UGC runs on autopilot
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-[#CFCFCF] leading-relaxed max-w-3xl mx-auto px-4"
            >
              From campaign setup to creator payouts — watch how Ripples
              automates your entire UGC workflow
            </motion.p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {DEMO_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-custom-gradient"
                        : currentStep === step.id
                          ? "bg-secondary animate-pulse"
                          : "bg-[#2E1A47]"
                    }`}
                    animate={{
                      scale: currentStep === step.id ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {index < DEMO_STEPS.length - 1 && (
                    <div
                      className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 transition-all duration-500 ${
                        currentStep > step.id
                          ? "bg-custom-gradient"
                          : "bg-[#2E1A47]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Title */}
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

          {/* Demo Content - Image Display */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
            {/* Image Container */}
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
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 sm:mt-12 px-4"
          >
            <p className="text-sm sm:text-base lg:text-lg text-[#CFCFCF] mb-4 sm:mb-6">
              Ready to see this in action for your brand?
            </p>
            <Button
              className="bg-custom-gradient hover:glow-custom text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-3xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0 font-poppins"
              onClick={handleBookDemo}
            >
              Book Your Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
