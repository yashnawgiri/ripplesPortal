import * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  value: string;
  description: string;
}

interface StatsSectionProps {
  statsData: StatCardProps[];
}

const StatCard: React.FC<StatCardProps> = ({ value, description }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col items-center justify-center bg-primary/5 backdrop-blur-sm border border-[#282D45] rounded-lg p-4 sm:p-6 md:p-8 text-center w-full transition-all duration-300 hover:bg-primary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
        {value}
      </h3>
      <p className="text-white text-sm sm:text-base md:text-lg max-w-[200px] md:max-w-none">
        {description}
      </p>
    </motion.div>
  );
};

const StatsSection: React.FC<StatsSectionProps> = ({ statsData }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {statsData.map((stat, index) => (
          <StatCard
            key={`stat-${index}`}
            description={stat.description}
            value={stat.value}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
