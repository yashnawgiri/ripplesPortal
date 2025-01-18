import { Image } from "@nextui-org/image";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import keyFeaturesData from "@/data/landing.json";
import step1 from "@/assets/images/step1.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";

const steps = [step1, step2, step3];

function KeyFeatures() {
  const shouldReduceMotion = useReducedMotion();

  const headingVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? -20 : -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.3 : 1 }
    }
  };

  return (
    <div className="px-4 py-8" id="features">
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 py-2"
        initial={{ opacity: 0, y: -50 }}
        variants={headingVariants}
      >
        Key Features
      </motion.h1>
      <ol className="flex flex-col md:flex-row items-center md:items-end gap-8 justify-center mt-8">
        {keyFeaturesData.steps.map((ele, index) => (
          <Card key={index} index={index} title={ele.title} />
        ))}
      </ol>
    </div>
  );
}

export default KeyFeatures;

type CardProps = {
  title: string;
  index: number;
};

const Card = ({ title, index }: CardProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  // Define the widths for the images in descending order
  const widths = {
    mobile: [200, 180, 200],
    desktop: [300, 260, 310]
  };

  const isMobile = window.innerWidth < 768;
  const currentWidths = isMobile ? widths.mobile : widths.desktop;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 20 : 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.3 : 0.5, 
        delay: shouldReduceMotion ? 0 : index * 0.2 
      }
    }
  };

  const imageHoverVariants = shouldReduceMotion ? {} : {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.li
      key={index}
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="text-white text-2xl font-bold flex flex-col cursor-pointer items-center md:items-start"
      initial="hidden"
      variants={cardVariants}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={imageHoverVariants.hover}
      whileTap={imageHoverVariants.tap}
    >
      <h1 className="py-8 text-xl md:text-2xl flex gap-1">
        <p>{`${index + 1}. `}</p> <p>{title}</p>
      </h1>
      <Image
        disableSkeleton
        alt={`Step ${index + 1}`}
        className="transition-transform duration-300"
        src={steps[index]}
        width={currentWidths[index]}
        loading={index === 0 ? "eager" : "lazy"}
        style={{
          objectFit: "contain",
          maxWidth: "100%",
          height: "auto"
        }}
      />
    </motion.li>
  );
};
