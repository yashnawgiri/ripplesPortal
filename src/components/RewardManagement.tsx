import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Image } from "@nextui-org/image";

import data from "@/data/landing.json";
import ruppes from "@/assets/images/rupees.webp";
import rewardmanage from "@/assets/images/rewardmanage.svg";
import cashbackImg from "@/assets/images/cashback.png";
import wallet from "@/assets/images/wallet.svg";
import milestone from "@/assets/images/milestone.png";

function RewardManagement() {
  return (
    <div className="px-4 md:px-8  md:py-8 py-2">
      <Reward />
      <CashbackAndMileStone />
    </div>
  );
}

export default RewardManagement;

const Reward: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className="flex flex-col md:flex-row gap-8 md:gap-28 justify-between"
      initial="hidden"
      transition={{ duration: 1 }}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="flex flex-col md:flex-row gap-6 text-white">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold py-4 text-[#EA63FE] bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
            {data.reward.rewardManagement.heading[0]}{" "}
            <span className="text-[#EA63FE]">
              {data.reward.rewardManagement.heading[1]}
            </span>
          </h1>
          <p className="text-gray-300 md:w-2/3">
            {data.reward.rewardManagement.description}
          </p>
        </div>

        <motion.div className="flex justify-center" whileHover={{ scale: 1.1 }}>
          <Image
            disableSkeleton
            className="w-full max-w-[300px] md:max-w-[500px] object-contain"
            src={rewardmanage}
          />
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="hidden lg:block"
        initial={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          disableSkeleton
          className="w-full max-w-[200px] lg:max-w-[300px]"
          src={ruppes}
        />
      </motion.div>
    </motion.div>
  );
};

const CashbackAndMileStone = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className="flex flex-col gap-8 mt-10">
      <motion.div
        animate={controls}
        className="flex flex-col md:flex-row gap-8 justify-between"
        initial="hidden"
        transition={{ duration: 0.8 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="text-gray-300 md:text-start text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#EA63FE] py-2">
            {data.reward.cashback.heading}
          </h1>
          <p className="pb-4 text-gray-300 md:w-2/3">
            {data.reward.cashback.description}
          </p>
        </div>

        <motion.div
          className="flex flex-col md:flex-row md:gap-4 gap-10 items-center justify-center md:justify-start"
          whileHover={{ rotate: 10 }}
        >
          <Image
            disableSkeleton
            className="w-[200px] max-w-[400px] md:max-w-[600px] mx-auto"
            src={cashbackImg}
          />
          <Image
            disableSkeleton
            className="w-[200px] max-w-[300px] md:max-w-[500px]"
            src={wallet}
          />
        </motion.div>
      </motion.div>

      <motion.div
        animate={controls}
        className="flex flex-col md:flex-row justify-center md:justify-start text-center mt-8"
        initial="hidden"
        transition={{ duration: 0.8 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl md:text-start font-bold text-[#EA63FE]">
            <span className="bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
              {data.reward.milestone.heading[0]}
            </span>
            &nbsp;{data.reward.milestone.heading[1]}
          </h1>
          <p className="text-gray-300 md:text-start md:w-2/3 md:pb-0 pb-4">
            {data.reward.milestone.description}
          </p>
        </div>
        <motion.div
          className="flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            disableSkeleton
            className="w-full max-w-[250px] md:max-w-[400px]"
            src={milestone}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
