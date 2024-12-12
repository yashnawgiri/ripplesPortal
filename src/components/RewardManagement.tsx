import { Image } from "@nextui-org/image";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ruppes from "@/assets/images/rupees.png";
import rewardmanage from "@/assets/images/rewardmanage.png";
import cashbackImg from "@/assets/images/cashback.png";
import wallet from "@/assets/images/wallet.png";
import milestone from "@/assets/images/milestone.png";

type Props = {};

function RewardManagement({}: Props) {
  return (
    <div className="px-4 md:px-8 py-4">
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
      className="flex flex-col md:flex-row gap-8 md:gap-28 justify-between"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col md:flex-row gap-6 text-white">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold py-4 text-[#EA63FE] bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
            Reward <span className="text-[#EA63FE]">Management</span>
          </h1>
          <p className="text-[#8F9BB7]">
            Empower your customers by providing attractive rewards, whether it's
            flat rate commissions or percentage-based benefits.
          </p>
        </div>

        <motion.div className="flex justify-center" whileHover={{ scale: 1.1 }}>
          <Image
            src={rewardmanage}
            className="w-full max-w-[300px] md:max-w-[500px]"
          />
        </motion.div>
      </div>

      <motion.div
        className="hidden lg:block"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src={ruppes} className="w-full max-w-[200px] lg:max-w-[300px]" />
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
        className="flex flex-col md:flex-row gap-8 justify-between"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-white md:text-start text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#EA63FE] py-2">
            Cashback
          </h1>
          <p className="pb-4 text-[#8F9BB7] md:w-2/3">
            Customers earn store credits or direct bank cashback on all their
            successful referrals. Let your customers enjoy seamless rewards!
          </p>
        </div>

        <motion.div className="flex flex-col md:flex-row md:gap-8 items-center justify-center" whileHover={{ rotate: 10 }}>
          <Image
            src={cashbackImg}
            className="w-full max-w-[400px] md:max-w-[600px] mx-auto"
          />
          <Image
            src={wallet}
            className="w-full max-w-[300px] md:max-w-[500px]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row justify-center items-center text-center mt-8"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl md:text-start font-bold py-4 text-[#EA63FE]">
            <span className="bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
              Milestone Based
            </span>{" "}
            Gifting
          </h1>
          <p className="text-[#8F9BB7] md:text-start md:w-2/3">
            Make rewards exciting by gamifying incentives. Set milestones that
            unlock exclusive gifts for referrals or orders.
          </p>
        </div>
        <motion.div
          className="flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={milestone}
            className="w-full max-w-[250px] md:max-w-[400px]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
