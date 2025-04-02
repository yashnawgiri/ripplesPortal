"use client"

import type React from "react"
import { motion } from "framer-motion"

const HowItWorksSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const steps = [
    {
      number: 1,
      title: "We Integrate With Purchase & Post-Purchase User Journey",
      description: "Use our Shopify app to set up the rewards program & activate shoppers at POS",
    },
    {
      number: 2,
      title: "Customers Share & Drive Traffic",
      description:
        "After purchasing, customers get a prompt (via pop-up, email, or SMS) to share their unique link & post on social media",
    },
    {
      number: 3,
      title: "Track Sales & Auto-Payout",
      description:
        "Track sales and traffic from shared links. Reward your customers with cash rewards or perks for each successful referral and reel on IG.",
      badge: true,
    },
  ]

  return (
    <div className="w-full bg-primary text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">How does it work?</h2>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Timeline connector - Desktop only */}
          <div className="hidden md:block absolute top-[30px] left-0 right-0 h-0.5">
            <div className="w-full h-full flex justify-between items-center px-16">
              <div className="w-full border-t-3 border-dashed border-gray-600"></div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center relative"
                variants={itemVariants}
              >
                {/* Number Circle */}
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>

                {/* Mobile connector line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 border-l-2 border-dashed border-gray-600 my-4 mx-auto"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HowItWorksSection
