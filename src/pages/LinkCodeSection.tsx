import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Image } from "@nextui-org/image";

import { linkCode } from "@/data/landing.json";
import discountCodeToggleImg from "@/assets/images/discountCodeToggle.png";
import linkModalImg from "@/assets/images/linkModal.png";
import linkImg from "@/assets/images/link.png";
import editShareImg from "@/assets/images/editShare.png";

function LinkCodeSection() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2, // Trigger animation when 20% of the component is in view
  });

  const animationControls = useAnimation();

  useEffect(() => {
    if (inView) {
      animationControls.start("visible");
    } else {
      animationControls.start("hidden");
    }
  }, [inView, animationControls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={sectionRef}
      className="container relative flex flex-col lg:flex-row gap-7 px-4 md:px-8 md:py-4 py-2"
    >
      <motion.div
        animate={animationControls}
        className="flex-1"
        initial="hidden"
        transition={{ duration: 0.8 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold py-4 text-center md:text-start">
          <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
            {linkCode.heading[0]}{" "}
          </p>
          <p className="text-[#EA63FE]">{linkCode.heading[1]}</p>
        </h1>
        <h2 className="text-gray-300 w-full md:w-3/4 text-lg md:text-xl text-center md:text-start">
          {linkCode.description}
        </h2>
        <div className="flex justify-end items-end w-full md:w-3/4 mt-8">
          <Image
            disableSkeleton
            alt="Discount Code Toggle"
            src={discountCodeToggleImg}
            width={400}
          />
        </div>
      </motion.div>

      <motion.div
        animate={animationControls}
        className="absolute bottom-5 left-10 hidden lg:block"
        initial="hidden"
        transition={{ duration: 0.8, delay: 0.5 }}
        variants={variants}
      >
        <div className="flex justify-between w-96">
          <Image
            disableSkeleton
            alt="Edit Share"
            src={editShareImg}
            width={200}
          />
          <Image disableSkeleton alt="Link" src={linkImg} width={200} />
        </div>
      </motion.div>

      <motion.div
        animate={animationControls}
        className="flex-1 flex justify-center items-center"
        initial="hidden"
        transition={{ duration: 0.8, delay: 0.3 }}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
      >
        <Image
          disableSkeleton
          alt="Link Modal"
          className="max-w-full rounded-lg shadow-lg"
          src={linkModalImg}
          width={600}
        />
      </motion.div>
    </div>
  );
}

export default LinkCodeSection;
