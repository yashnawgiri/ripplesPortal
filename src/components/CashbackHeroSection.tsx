import React from "react";
import { Image } from "@nextui-org/react";
import { motion, useReducedMotion } from "framer-motion";

const PromoSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 1,
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0.3 : 1 },
    },
  };

  const hoverEffect = shouldReduceMotion
    ? {}
    : {
        hover: {
          scale: 1.05,
          rotate: 2,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
        },
      };

  return (
    <motion.div
      className="flex flex-wrap-reverse items-center gap-4 justify-center md:h-[500px] my-4"
      initial="hidden"
      viewport={{ once: true, amount: 0.2 }}
      whileInView="visible"
    >
      <motion.div
        className="text-center md:text-left w-full md:w-2/5 px-4"
        variants={textVariants}
      >
        <motion.h1
          className="text-white text-xl md:text-4xl font-bold relative"
          variants={textVariants}
        >
          Give cashback in Store Wallet or cash in the bank to your Shoppers for
          creating Authentic Content on Social Media & Referring their network
        </motion.h1>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex justify-center px-4 md:px-0"
        variants={imageVariants}
      >
        <motion.div
          className="w-full max-w-[500px] md:max-w-[600px]"
          whileHover={hoverEffect.hover}
        >
          <Image
            disableSkeleton
            alt="GoRipples promotional features and benefits showcase"
            className="w-full md:scale-105"
            loading="lazy"
            src="https://ripples1static.blob.core.windows.net/images/cashbackHero.png"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PromoSection;
