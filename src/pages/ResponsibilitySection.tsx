import { motion } from "framer-motion";

import { responsibility } from "@/data/landing.json";
import { imageUrls } from "@/utils/imageUrl";

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
        <h2 className="text-4xl sm:text-6xl font-bold home-heading">
          {responsibility.heading}
        </h2>
        <p className="text-gray-300 py-6 sm:py-8 text-lg sm:text-xl">
          {responsibility.description}
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
      >
        <img
          alt="Contact us section showing customer support and communication features"
          className="max-w-full h-auto"
          loading="lazy"
          src={imageUrls.contactus}
          width={1300}
        />
      </motion.div>
    </div>
  );
}

export default ResponsibilitySection;
