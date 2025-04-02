import type React from "react";

import { motion } from "framer-motion";
import {
  Bot,
  ShoppingBag,
  Palette,
  Settings,
  Gift,
  Award,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const AdvantagesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
  };

  const advantages = [
    {
      icon: <Bot className="w-8 h-8 text-white" />,
      title: "AI powered - Fully Automated from start to payout",
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: "100% Attributable Sales from the Ripples Network",
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "Everything customized for your Brand",
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      title:
        "Advanced Settings - minimum cart values, credit expiry, return windows",
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: "Multiple Rewards Options & Gamification",
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title:
        "Run Different Reward Programs - for shoppers, influencers & affiliates",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      title: "Personalized Communication for each shopper",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "Detailed Analytics - that go beyond surface level",
    },
  ];

  return (
    <div className="w-full text-white py-8">
      <div className="mx-auto px-4 text-center">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white">
            The Ripples Advantage
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          {advantages.slice(0, 6).map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-[#0a0e2e] p-6 rounded-lg flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="mb-4 text-white">{advantage.icon}</div>
              <h3 className="text-xl font-semibold text-white">
                {advantage.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Last row with 2 cards centered */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          {advantages.slice(6, 8).map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-[#0a0e2e] p-6 rounded-lg flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-semibold">{advantage.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
