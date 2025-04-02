import type React from "react";

import { Image } from "@nextui-org/react";
import { motion, useReducedMotion } from "framer-motion";

import referralScreenshot from "./../assets/images/referralApp.svg";
import ugcScreenshot from "./../assets/images/ugcContent.svg";

import analyticsPerformanceCardSvg from "./../assets/images/analyticsPerformanceCard.png";
import ugcPopupCard from "./../assets/images/ugcPopup.png";
import ugcContentCardSvg from "./../assets/images/ugcContentManagementCard.png";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

const MarketingSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.3 : 0.8 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0.3 : 0.6 },
    },
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.03,
          boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
          transition: { duration: 0.3 },
        },
  };

  return (
    <div className="w-full text-white py-16">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        {/* Main Headline */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Ripples offers the tech to Scale word of mouth marketing for your
            brand
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Unlock a new Marketing channel - Build & Grow customers as a
            scalable revenue channel
          </motion.p>
        </motion.div>

        {/* Two Column Cards */}
        <div className="grid md:grid-cols-2 gap-4 justify-center items-center">
          {/* Left Card */}
          <motion.div
            className="bg-[#0a0e2e] p-6 rounded-xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-4 text-center"
              variants={itemVariants}
            >
              Brands are leaving money on the table by not tapping into their
              shoppers for referrals
            </motion.h2>
            <motion.p
              className="text-gray-400 mb-6 md:text-md text-center"
              variants={itemVariants}
            >
              Move away from boring old referral programs by giving cash in the
              bank/store wallet, free gifts & Gamify the post purchase
              experience
            </motion.p>
            <motion.button
              className="bg-secondary text-white font-medium py-2 px-6 rounded-full flex items-center justify-center mx-auto"
              variants={itemVariants}
            >
              <Link to={siteConfig.path.referrals}>Learn more</Link>
            </motion.button>

            <motion.div className="mt-8 relative" variants={itemVariants}>
              <Image
                disableSkeleton
                alt="Referral program mobile app screenshot"
                className="mx-auto"
                loading="lazy"
                src={referralScreenshot || "/placeholder.svg"}
                width={1500}
              />
            </motion.div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="bg-[#0a0e2e] p-6 rounded-xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-4 text-center"
              variants={itemVariants}
            >
              Convert customers into high performing UGC content creators
            </motion.h2>
            <motion.p
              className="text-gray-400 mb-6 md:text-md text-center"
              variants={itemVariants}
            >
              Designed in a way to get you real, authentic, ad-worthy content.
              Set and repeat
            </motion.p>
            <motion.button
              className="bg-secondary text-white font-medium py-2 px-6 rounded-full flex items-center justify-center mx-auto"
              variants={itemVariants}
            >
              <Link to={siteConfig.path.ugcHome}>Learn more</Link>
            </motion.button>

            <motion.div
              className="mt-8 relative hidden md:block"
              variants={itemVariants}
            >
              <Image
                disableSkeleton
                alt="UGC content management dashboard"
                className="mx-auto"
                loading="lazy"
                src={ugcScreenshot}
                width={1500}
              />
            </motion.div>
            <motion.div
              className="mt-8 relative block md:hidden"
              variants={itemVariants}
            >
              <Image
                disableSkeleton
                alt="UGC content management dashboard"
                className="mx-auto py-2"
                loading="lazy"
                src={ugcPopupCard}
                width={500}
              />
              <Image
                disableSkeleton
                alt="UGC content management dashboard"
                className="mx-auto py-2"
                loading="lazy"
                src={ugcContentCardSvg}
                width={500}
              />
              <Image
                disableSkeleton
                alt="UGC content management dashboard"
                className="mx-auto py-2"
                loading="lazy"
                src={analyticsPerformanceCardSvg}
                width={500}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketingSection;
