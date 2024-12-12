import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center bg-[#0A1238] border border-[#1A2A5E] rounded-lg px-4 py-6 text-center md:px-20 md:py-8"
    >
      <h3 className="text-white text-2xl pb-2 font-bold md:text-7xl">
        {value}
      </h3>
      <p className="text-[#8F9BB7] text-sm md:text-md">{description}</p>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // Set `once: false` to allow repeated animations

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3 },
        },
      }}
      className="flex justify-center gap-4 px-4 py-8 md:flex-nowrap md:gap-8"
    >
      {[
        { value: "4X", description: "Average Conversion rate" },
        { value: "22%", description: "Average Conversion rate" },
        { value: "5X", description: "Average Conversion rate" },
      ].map((stat, index) => (
        <StatCard
          key={index}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </motion.div>
  );
};

export default StatsSection;
