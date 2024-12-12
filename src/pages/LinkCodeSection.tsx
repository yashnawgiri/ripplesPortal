import discountCodeToggleImg from "@/assets/images/discountCodeToggle.png";
import linkModalImg from "@/assets/images/linkModal.png";
import linkImg from "@/assets/images/link.png";
import editShareImg from "@/assets/images/editShare.png";
import { Image } from "@nextui-org/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {};

function LinkCodeSection({}: Props) {
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
      className="container relative flex flex-col lg:flex-row gap-7 px-4 md:px-8 py-4"
    >
      <motion.div
        className="flex-1"
        initial="hidden"
        animate={animationControls}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold py-4">
          <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
            Link and
          </p>
          <p className="text-[#EA63FE]">Code Management</p>
        </h1>
        <p className="text-[#8F9BB7] w-full md:w-3/4 text-lg md:text-xl">
          Every customer is given their own vanity URL and code that is easy to
          remember and share. Our “one-time use codes” make sure there’s no code
          leakage across any discount site.
        </p>
        <div className="flex justify-end items-end w-full md:w-3/4 mt-8">
          <Image
            src={discountCodeToggleImg}
            width={400}
            alt="Discount Code Toggle"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-5 left-10 hidden md:block"
        initial="hidden"
        animate={animationControls}
        variants={variants}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex justify-between w-96">
          <Image src={editShareImg} width={200} alt="Edit Share" />
          <Image src={linkImg} width={200} alt="Link" />
        </div>
      </motion.div>

      <motion.div
        className="flex-1 flex justify-center items-center"
        initial="hidden"
        animate={animationControls}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src={linkModalImg}
          width={600}
          className="max-w-full rounded-lg shadow-lg"
          alt="Link Modal"
        />
      </motion.div>
    </div>
  );
}

export default LinkCodeSection;
