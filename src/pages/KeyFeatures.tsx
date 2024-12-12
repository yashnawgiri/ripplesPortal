import keyFeaturesData from "@/data/landing.json";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import step1 from "@/assets/images/step1.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";

type Props = {};

const steps = [step1, step2, step3];

function KeyFeatures({}: Props) {
  return (
    <div className="px-4 py-8">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 py-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Key Features
      </motion.h1>
      <ol className="flex flex-col md:flex-row items-center md:items-end gap-8 justify-center mt-8">
        {keyFeaturesData.steps.map((ele, index) => (
          <Card key={index} title={ele.title} index={index} />
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
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="text-white text-2xl font-bold flex flex-col cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      viewport={{ once: false, amount: 0.3 }} // Ensures animation triggers every time it enters the viewport
    >
      <h1 className="py-8 text-xl md:text-2xl flex gap-2">
        <p>{`${index + 1}. `}</p> <p>{title}</p>
      </h1>
      <Image
        src={steps[index]}
        width={350}
        className="transition-transform duration-300 hover:scale-105"
        alt={`Step ${index + 1}`}
      />
    </motion.li>
  );
};
