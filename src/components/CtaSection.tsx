import type { FC } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { siteConfig } from "@/config/site";

const CTASection: FC = () => {
  return (
    <div className="w-full text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto bg-[#0a0e2e] rounded-2xl p-4 md:p-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Scale word of mouth marketing and convert customers into Brand
            Advocates & SuperFans
          </motion.h2>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Link
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
              to={siteConfig.path.getDemo}
            >
              Book a Demo Call
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
