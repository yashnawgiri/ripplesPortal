import { Image } from "@nextui-org/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import BrandsJoined from "./BrandsJoined";
import dashboardData from "./../data/landing.json";

import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";
import flyer from "@/assets/images/flayer.png";

function HeroSection() {
  const navigate = useNavigate();
  const ref = useRef(null);

  // Use the `useInView` hook for scroll tracking. Removed triggerOnce: true to trigger animations every time the section is in view
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    // Start the animation when the section is in view and stop it when it's out of view
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.4 },
    },
  };

  return (
    <div ref={ref} className="homeContainer" id="home">
      <motion.div
        animate={controls}
        className="home-div"
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h1 className="home-h1 home-heading" variants={headingVariants}>
          {dashboardData.home.heading1}
        </motion.h1>

        <motion.p className="home-p" variants={descriptionVariants}>
          {dashboardData.home.description}
        </motion.p>

        <motion.div
          animate={controls}
          className="home-img-mob md:hidden"
          initial="hidden"
          variants={imageVariants}
        >
          <Image
            disableSkeleton
            alt="home-image"
            className=""
            height="280px"
            isZoomed={true}
            src={flyer}
          />
        </motion.div>

        <motion.div className="home-demo-div" variants={descriptionVariants}>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <CustomButton
              className="font-bold bg-custom-gradient md:text-2xl text-xl"
              onClick={() => navigate(siteConfig.path.getDemo)}
            >
              {dashboardData.home.demoButton}
            </CustomButton>
          </motion.div>
        </motion.div>

        {/* <BrandsJoined /> */}
      </motion.div>

      <motion.div
        animate={controls}
        className="home-img"
        initial="hidden"
        variants={imageVariants}
      >
        <Image
          disableSkeleton
          alt="home-image"
          className="my-4"
          height="550px"
          isZoomed={true}
          src={flyer}
        />
      </motion.div>
    </div>
  );
}

export default HeroSection;
