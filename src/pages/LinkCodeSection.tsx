import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Image } from "@nextui-org/image";

import { linkCode } from "@/data/landing.json";
import linkModalImg from "@/assets/images/linkModal.png";
import linkImg from "@/assets/images/link.webp";
import editShareImg from "@/assets/images/editShare.webp";

function LinkCodeSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationControls = useAnimation();

  useEffect(() => {
    if (inView) {
      animationControls.start("visible");
    }
  }, [inView, animationControls]);

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className="flex flex-col lg:flex-row items-center justify-between gap-8 relative"
    >
      {/* Text Content */}
      <motion.div
        animate={animationControls}
        className="w-full lg:w-1/2"
        initial="hidden"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <h2 className="text-4xl sm:text-6xl font-bold home-heading">
          {linkCode.heading}
        </h2>
        <p className="text-gray-300 py-6 sm:py-8 text-lg sm:text-xl">
          {linkCode.description}
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        animate={animationControls}
        className="absolute bottom-5 left-10 hidden lg:block"
        initial="hidden"
        transition={{ duration: 0.3, delay: 0.2 }}
        variants={variants}
      >
        <div className="flex justify-between w-96">
          <Image
            disableSkeleton
            alt="Edit and share options interface"
            className="object-contain"
            loading="lazy"
            src={editShareImg}
            style={{ willChange: "transform" }}
            width={200}
          />
          <Image
            disableSkeleton
            alt="Link sharing interface"
            loading="lazy"
            src={linkImg}
            style={{ willChange: "transform" }}
            width={200}
          />
        </div>
      </motion.div>

      <motion.div
        animate={animationControls}
        className="flex-1 flex justify-center items-center"
        initial="hidden"
        transition={{ duration: 0.3, delay: 0.1 }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        }}
      >
        <Image
          disableSkeleton
          alt="Link sharing modal with customization options"
          className="max-w-full rounded-lg shadow-lg"
          loading="lazy"
          src={linkModalImg}
          style={{ willChange: "transform" }}
          width={600}
        />
      </motion.div>
    </div>
  );
}

export default LinkCodeSection;
