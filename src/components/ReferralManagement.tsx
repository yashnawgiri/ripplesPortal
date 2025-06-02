import { motion, useReducedMotion } from "framer-motion";

import { referral } from "@/data/landing.json";
import campaignImg from "@/assets/images/campaign.webp";

function ReferralManagement() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = window.innerWidth < 768;

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
      },
    },
  };

  return (
    <div className="py-2 md:py-4 flex flex-col lg:flex-row gap-8 text-white px-4 md:px-8 text-start">
      {/* Text Section */}
      <motion.div
        className="flex-1"
        initial="hidden"
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.8 }}
        variants={textVariants}
        viewport={{ once: true, amount: 0.3 }}
        whileInView="visible"
      >
        <h2 className="text-2xl font-bold py-2">{referral.heading}</h2>
        <h1 className="text-4xl md:text-6xl font-bold">
          <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 py-2">
            {referral.heading2[0]}
          </p>
          <p className="text-[#EA63FE]">{referral.heading2[1]}</p>
        </h1>
        <p className="text-gray-300 py-4 text-lg md:text-xl">
          {referral.description}
        </p>
        <ol className="list-disc pl-4 flex flex-col gap-4 text-lg md:text-xl">
          {referral.lists.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="flex-1 flex justify-center items-center"
        initial="hidden"
        variants={imageVariants}
        viewport={{ once: true, amount: 0.3 }}
        whileInView="visible"
      >
        <img
          alt="Referral Campaigns"
          className="max-w-full rounded-lg shadow-lg"
          loading={isMobile ? "eager" : "lazy"}
          src={campaignImg}
          style={{
            objectFit: "contain",
            maxWidth: "100%",
            height: "auto",
          }}
          width={isMobile ? 400 : 900}
        />
      </motion.div>
    </div>
  );
}

export default ReferralManagement;
