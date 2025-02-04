import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";


interface StatCardProps {
  value: string;
  description: string;
}

interface StatsSectionProps {
  statsData: StatCardProps[];
}

const StatCard: React.FC<StatCardProps> = ({ value, description }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-primary border border-[#282D45] rounded-md py-2 px-4 text-center md:px-20 md:py-8"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-gray-300 text-xl md:pb-2 font-bold md:text-7xl">
        {value}
      </h3>
      <p className="text-gray-300 text-sm md:text-lg">{description}</p>
    </motion.div>
  );
};

const StatsSection: React.FC<StatsSectionProps> = ({ statsData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // Set `once: false` to allow repeated animations

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      className="flex justify-center gap-4 px-4 py-8 md:flex-nowrap md:gap-8"
      initial="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3 },
        },
      }}
    >
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          description={stat.description}
          value={stat.value}
        />
      ))}
    </motion.div>
  );
};

export default StatsSection;
