import { Image } from "@nextui-org/image";
import { motion } from "framer-motion"; // Import Framer Motion

import contactUsImg from "@/assets/images/contactus.png";

function ResponsibilitySection() {
  return (
    <div className="flex flex-col lg:flex-row items-center py-16 gap-8">
      {/* Text Content */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-6xl font-bold home-heading">
          We take ownership of your referral outcomes
        </h1>
        <p className="text-[#8F9BB7] py-6 sm:py-8 text-lg sm:text-xl">
          With our 24*7 dedicated customer service and complete involvement in
          setup and running your referral programs, we ensure you get the
          necessary outcomes.
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Image className="max-w-full h-auto" src={contactUsImg} width={1300} />
      </motion.div>
    </div>
  );
}

export default ResponsibilitySection;
