/* eslint-disable max-len */
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

// import dashboardData from "./../data/landing.json";
import dashboardData from "@/data/shopperLanding.json";
import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";
import flyer from "@/assets/images/shopperPageFlayer.png";
import Typewriter from "@/components/Typewriter";

// Lazy load non-critical components
// const BrandsJoined = lazy(() => import("./BrandsJoined"));
const ShoppersBanner = lazy(
  () => import("@/components/shopper-landing/ShopperBanner"),
);

// Preload LCP image
const preloadImage = () => {
  const link = document.createElement("link");

  link.rel = "preload";
  link.as = "image";
  link.href = flyer;
  document.head.appendChild(link);
};

function ShopperHeroSection() {
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
    <div ref={ref} className="homeContainer" id="home">
      <motion.div
        animate={controls}
        className="home-div"
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <motion.h1 className="home-h1 home-heading" variants={headingVariants}>
          {dashboardData.home.heading1}
          <Typewriter words={dashboardData.home.heading1Array} />
        </motion.h1>

        <motion.p className="home-p" variants={descriptionVariants}>
          {dashboardData.home.description}
        </motion.p>

        <motion.div
          animate={controls}
          className="home-img-mob md:hidden"
          initial="hidden"
          style={{
            overflow: "hidden",
            borderRadius: "24px",
            boxShadow: "0 20px 70px rgba(0, 0, 0, 0.2)",
          }}
          variants={imageVariants}
        >
          <div className="transition-transform duration-300 ease-in-out hover:scale-110 origin-center mt-8">
            <img
              alt="GoRipples dashboard interface showcasing analytics and features - mobile view"
              className="blur-load"
              height={300}
              loading="eager"
              src={flyer}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                maxWidth: "100%",
                height: "auto",
                transform: "scale(1.1)",
                transformOrigin: "center",
              }}
              width={300}
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
              ariaLabel="Book a demo"
              className="font-bold bg-custom-gradient md:text-2xl text-xl"
              onClick={() => navigate(siteConfig.path.signIn)}
            >
              {dashboardData.home.demoButton}
            </CustomButton>
          </motion.div>
        </motion.div>

        <Suspense
          fallback={
            <div aria-label="Loading brands section" className="h-20" />
          }
        >
          <ShoppersBanner />
        </Suspense>
      </motion.div>

      <motion.div
        animate={controls}
        className="home-img hidden md:block"
        initial="hidden"
        style={{
          overflow: "hidden",
          borderRadius: "32px",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
        }}
        variants={imageVariants}
      >
        <div className="transition-transform duration-300 ease-in-out hover:scale-125 origin-center mt-8">
          <img
            alt="GoRipples dashboard interface showcasing analytics and features"
            className="my-4"
            height={1200}
            loading="lazy"
            src={flyer}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              maxWidth: "100%",
              height: "auto",
              transform: "scale(1.15)",
              transformOrigin: "center",
              willChange: "transform",
            }}
            width={1200}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default ShopperHeroSection;
