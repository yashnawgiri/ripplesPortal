import { useState, useEffect } from "react";
import { Slider, Spacer } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RevenueBoostCalculator = () => {
  const [spend, setSpend] = useState(500);
  const [ordersPerWeek, setOrdersPerWeek] = useState(100);
  const [referralRate, setReferralRate] = useState(0.2);
  const [conversionRate, setConversionRate] = useState(0.5);
  const [animationKey, setAnimationKey] = useState(0);
  const inputConfig = [
    {
      label: "Average customer spend",
      value: spend,
      step: 10,
      maxValue: 2500,
      minValue: 0,
      formatOptions: { style: "currency" as const, currency: "INR" as const },
      onChange: (value: any) => setSpend(Number(value)),
    },
    {
      label: "Weekly Orders",
      value: ordersPerWeek,
      step: 10,
      maxValue: 25000,
      minValue: 0,
      onChange: (value: any) => setOrdersPerWeek(Number(value)),
    },
    {
      label: "Estimated Referral Rate",
      value: referralRate,
      step: 0.01,
      maxValue: 1,
      minValue: 0,
      formatOptions: { style: "percent" as const },
      onChange: (value: any) => setReferralRate(Number(value)),
    },
    {
      label: "Conversion Rate",
      value: conversionRate,
      step: 0.01,
      maxValue: 1,
      minValue: 0,
      formatOptions: { style: "percent" as const },
      onChange: (value: any) => setConversionRate(Number(value)),
    },
  ];

  const calculateBoost = () => {
    const annualBoost =
      spend * ordersPerWeek * 52 * referralRate * conversionRate || 0;

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(annualBoost);
  };

  // Re-trigger animation when component mounts
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      key={animationKey} // Key ensures re-mount triggers animation
      animate="visible"
      className="py-12 px-4 max-w-4xl mx-auto"
      initial="hidden"
      variants={fadeIn}
    >
      <header className="text-center mb-1">
        <motion.h1
          animate={{ opacity: 1, scale: 1 }}
          className="md:text-6xl text-3xl font-semibold mb-4 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
        >
          Boost Your Revenue by 10% with Cash Back Referrals
        </motion.h1>
        <motion.p
          animate={{ opacity: 1 }}
          className="text-md md:text-medium text-white max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Transform customers into advocates with cash incentives. Quick
          5-minute integration.
        </motion.p>
      </header>

      <section>
        <motion.header
          animate={{ opacity: 1 }}
          className="flex justify-center text-white"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Revenue Boost Calculator
          </h2>
        </motion.header>
        <motion.div
          animate="visible"
          className="space-y-8 text-white"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {inputConfig.map((slider, index) => (
            <motion.div
              key={index}
              className="slider-container"
              variants={fadeIn}
            >
              <Slider {...slider} color="secondary" />
            </motion.div>
          ))}
        </motion.div>

        <Spacer y={6} />

        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-white flex items-center justify-center py-1 px-6">
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between max-w-4xl w-full space-y-6 md:space-y-0 md:space-x-12">
              {/* Left Section - Projected Boost */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-6 w-full md:w-1/2 text-center">
                <p className="md:text-5xl text-2xl font-bold text-white md:mb-2">
                {calculateBoost()}
                </p>
                <p className="md:text-medium text-medium font-medium text-white">
                  Projected annual revenue boost
                </p>
              </div>

              {/* Right Section - CTA */}
              <div className="flex flex-col space-y-4 text-left md:w-1/2">
                <p className="text-lg">
                  That's what your customers could be driving with{" "}
                  <span className="font-semibold text-secondary">Ripples</span>.
                  Want to see the full impact?{" "}
                  <Link
                    className="text-purple-500 underline font-semibold"
                    to="/get-demo"
                  >
                    Unlock your growth potential today!
                  </Link>
                  .
                </p>
                <p className="text-sm text-gray-400">
                  Many merchants see even greater gains through consistent
                  customer engagement. Let's make those numbers work for you.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default RevenueBoostCalculator;
