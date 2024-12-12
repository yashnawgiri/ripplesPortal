import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import campaignImg from "@/assets/images/campaign.png";

type Props = {};

function ReferralManagement({}: Props) {
  return (
    <div className="container flex flex-col lg:flex-row gap-8 text-white my-20 px-4 md:px-8">
      {/* Text Section */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }} // Ensure animations trigger every time the element enters the viewport
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold py-2">Direct Referrals ✨</h2>
        <h1 className="text-4xl md:text-6xl font-bold">
          <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 py-2">
            Automate Your
          </p>
          <p className="text-[#EA63FE]">Referral Campaigns</p>
        </h1>
        <p className="text-[#8F9BB7] py-4 text-lg md:text-xl">
          Let Ripples manage your referral campaigns while you stay focused on
          your products. Our system rewards customers for bringing in new
          sign-ups and purchases, with seamless payouts for everyone involved.
        </p>
        <ol className="list-disc pl-4 flex flex-col gap-4 text-lg md:text-xl">
          <li>Automate & streamline direct referral campaigns with ease</li>
          <li>Earn rewards for every referral-driven sign-up and purchase</li>
          <li>Fast, automatic payouts for both referrers and new customers</li>
        </ol>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="flex-1 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }} // Ensure animations trigger every time the element enters the viewport
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src={campaignImg}
          width={900}
          className="max-w-full rounded-lg shadow-lg"
          alt="Referral Campaigns"
        />
      </motion.div>
    </div>
  );
}

export default ReferralManagement;
