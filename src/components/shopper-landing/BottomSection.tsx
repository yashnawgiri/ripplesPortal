/* eslint-disable max-len */
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import dashboardData from "@/data/shopperLanding.json";
import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";
// import bottomSectionImage from "@/assets/images/bottomSectionImage.png";
import { imageUrls } from "@/utils/imageUrl";

// Preload LCP image
const preloadImage = () => {
  const link = document.createElement("link");

  link.rel = "preload";
  link.as = "image";
  link.href = imageUrls.bottomSectionImage;
  document.head.appendChild(link);
};

function BottomSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05,
  });
  const controls = useAnimation();

  useEffect(() => {
    preloadImage();
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Simplified animation variants for better performance
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, delay: 0.1 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div ref={ref} className="homeContainer mb-8" id="home">
      <motion.div
        animate={controls}
        className="flex flex-col md:flex-row items-center justify-between gap-8"
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <motion.h1 className="home-h1 home-heading text-center md:text-left" variants={headingVariants}>
            {dashboardData.bottomSection.heading}
          </motion.h1>

          <motion.div className="mt-6" variants={descriptionVariants}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <CustomButton
                ariaLabel="Sign-In"
                className="font-bold bg-custom-gradient md:text-2xl text-xl"
                onClick={() => navigate(siteConfig.path.signIn)}
              >
                {dashboardData.bottomSection.button}
              </CustomButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={controls}
          className="w-full md:w-2/3"
          initial="hidden"
          style={{
            overflow: "hidden",
            borderRadius: "24px",
            boxShadow: "0 20px 70px rgba(0, 0, 0, 0.2)",
          }}
          variants={imageVariants}
        >
          <img
            alt="GoRipples dashboard interface showcasing analytics and features"
            aria-label="GoRipples dashboard interface showcasing analytics and features"
            className="w-full h-auto"
            loading="lazy"
            src={imageUrls.bottomSectionImage}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              transform: "scale(1.05)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BottomSection;
