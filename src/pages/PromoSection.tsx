import type { FC } from "react";
import { motion, useReducedMotion } from "framer-motion"; // Import useReducedMotion
import { useNavigate } from "react-router-dom";

import { imageUrls } from "@/utils/imageUrl";

import dashboardData from "@/data/landing.json";
import promoData from "@/data/landing.json";
import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";

function DemoButton() {
  const navigate = useNavigate();

  return (
    <CustomButton
      className="w-fit font-bold bg-custom-gradient self-center md:self-start m-0 p-0"
      onClick={() => navigate(siteConfig.path.getDemo)}
    >
      {dashboardData.home.demoButton}
    </CustomButton>
  );
}

const PromoSection: FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Simplified variants for mobile
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
      className="flex flex-col-reverse lg:flex-row items-center justify-between px-4"
      initial="hidden"
      viewport={{ once: true, amount: 0.2 }}
      whileInView="visible"
    >
      <motion.div className="home-div lg:w-1/2 w-full" variants={textVariants}>
        <motion.h1 className="home-h1 home-heading" variants={textVariants}>
          {promoData.promo.heading1}
          <motion.span
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
            whileHover={hoverEffect.hover}
          >
            {" "}
            {promoData.promo.heading2}{" "}
          </motion.span>
        </motion.h1>
        <motion.p className="home-p" variants={textVariants}>
          {promoData.promo.description}
        </motion.p>
        <DemoButton />
      </motion.div>

      {/* Mobile Image Section */}
      <motion.div className="home-img-mob lg:hidden" variants={imageVariants}>
        <motion.div className="mb-4 w-full">
          <img
            alt="GoRipples promotional features showcase"
            height={300}
            loading="eager"
            src={imageUrls.promoImg}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
            width={300}
          />
        </motion.div>
      </motion.div>

      {/* Desktop Image Section */}
      <motion.div
        className="home-img hidden lg:block lg:w-1/2"
        variants={imageVariants}
      >
        <motion.div className="my-4" whileHover={hoverEffect.hover}>
          <img
            alt="GoRipples promotional features and benefits showcase"
            loading="lazy"
            src={imageUrls.promoImg}
            width={900}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PromoSection;
