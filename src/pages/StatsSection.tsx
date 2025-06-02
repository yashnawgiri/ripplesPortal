import * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  value: string;
  description: string;
  icon?: React.ReactNode;
}

interface StatsSectionProps {
  statsData: StatCardProps[];
  title?: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, description, icon }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col items-center justify-center bg-primary/5 backdrop-blur-sm border border-[#282D45] rounded-xl p-4 sm:p-6 md:p-8 text-center w-full transition-all duration-300 hover:bg-primary/10 hover:scale-[1.02] hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {icon && (
        <div className="mb-3 sm:mb-4 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-300">
        {value}
      </h3>
      <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-[200px] md:max-w-none">
        {description}
      </p>
    </motion.div>
  );
};

const StatsSection: React.FC<StatsSectionProps> = ({ 
  statsData, 
  title = "Our Impact", 
  subtitle = "Key metrics that showcase our growth and success" 
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
    >
      <motion.div
        className="text-center mb-8 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          {title}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap md:flex-nowrap h-full gap-8"
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
            icon={stat.icon}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
