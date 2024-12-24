import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";

import { referral } from "@/data/landing.json";
import campaignImg from "@/assets/images/campaign.png";

function ReferralManagement() {
  return (
    <div className="py-2 md:py-4 flex flex-col lg:flex-row gap-8 text-white px-4 md:px-8 text-center md:text-start">
      {/* Text Section */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }} // Ensure animations trigger every time the element enters the viewport
        whileInView={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-2xl font-bold py-2 ">{referral.heading}</h2>
        <h1 className="text-4xl md:text-6xl font-bold">
          <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 py-2 ">
            {referral.heading2[1]}
          </p>
          <p className="text-[#EA63FE]">{referral.heading2[1]}</p>
        </h1>
        <p className="text-gray-300 py-4 text-lg md:text-xl">
          {referral.description}
        </p>
        <ol className="md:list-disc pl-4 flex flex-col gap-4 text-lg md:text-xl ">
          {referral.lists.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="flex-1 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: false, amount: 0.3 }} // Ensure animations trigger every time the element enters the viewport
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <Image
          alt="Referral Campaigns"
          className="max-w-full rounded-lg shadow-lg"
          src={campaignImg}
          width={900}
        />
      </motion.div>
    </div>
  );
}

export default ReferralManagement;
