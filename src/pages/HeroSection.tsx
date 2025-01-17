/* eslint-disable max-len */
import { Image } from "@nextui-org/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

import dashboardData from "./../data/landing.json";
import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";
import flyer from "@/assets/images/flayer.webp";

// Lazy load BrandsJoined
const BrandsJoined = lazy(() => import("./BrandsJoined"));

function HeroSection() {
  const navigate = useNavigate();
  const ref = useRef(null);

  // Optimize intersection observer with larger threshold
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Use requestAnimationFrame to defer animation start
      requestAnimationFrame(() => {
        controls.start("visible");
      });
    }
  }, [isInView, controls]);

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const headingVariants = {
    hidden: { opacity: 0, transform: "translateY(-50px)" },
    visible: { 
      opacity: 1, 
      transform: "translateY(0)",
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    visible: { 
      opacity: 1, 
      transform: "translateY(0)",
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }
    },
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 0.8,
        delay: 0.2 
      },
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
          style={{
            overflow: "hidden",
            borderRadius: "24px",
            boxShadow: "0 20px 70px rgba(0, 0, 0, 0.3)"
          }}
        >
          <div className="transition-transform duration-500 ease-in-out hover:scale-125 origin-center mt-8">
            <Image
              isBlurred
              alt="GoRipples dashboard interface showcasing analytics and features - mobile view"
              className="blur-load"
              height={500}
              width={500}
              loading="eager"
              src={flyer}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                maxWidth: "100%",
                height: "auto",
                transform: "scale(1.15)",
                transformOrigin: "center"
              }}
              radius="lg"
            />
          </div>
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

        <Suspense fallback={<div className="h-20" />}>
          <BrandsJoined />
        </Suspense>
      </motion.div>

      <motion.div
        animate={controls}
        className="home-img"
        initial="hidden"
        variants={imageVariants}
        style={{
          overflow: "hidden",
          borderRadius: "32px",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)"
        }}
      >
        <div className="transition-transform duration-500 ease-in-out hover:scale-125 origin-center mt-8">
          <Image
            isBlurred
            alt="GoRipples dashboard interface showcasing analytics and features"
            className="my-4"
            height={1200}
            width={1200}
            loading="lazy"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              maxWidth: "100%",
              height: "auto",
              transform: "scale(1.15)",
              transformOrigin: "center"
            }}
            radius="lg"
            src={flyer}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
