import { SiNike, SiAdidas, SiPuma } from "react-icons/si";
import { motion } from "framer-motion";
import { Button, Card, Progress } from "@nextui-org/react";

import { BrandStats } from "@/services/apiService";
import { copyToClipboard, formatRewardString } from "@/utils/utils";

interface BrandCardProps {
  brand: BrandStats;
}

const brandIcons: Record<string, React.ComponentType> = {
  Nike: SiNike,
  Adidas: SiAdidas,
  Puma: SiPuma,
};

const MotionCard = motion(Card);

export function BrandCard({ brand }: BrandCardProps) {
  const BrandIcon = brandIcons[brand.brand_name];
  const rewardString = formatRewardString(
    brand.referred_user_rewards.type,
    brand.referred_user_rewards.amount,
    brand.referring_user_commission.type,
    brand.referring_user_commission.amount
  );

  const statusColors: Record<string, "green" | "grey" | "grey"> = {
    ACTIVE: "green",
    INACTIVE: "grey",
    DELETED: "grey",
  };
  console.log(brand, "from brandcard.tsx");
  return (
    <MotionCard
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary w-72 text-white shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <div className="p-6 text-white">
        <div className="flex flex-col gap-6">
          {/* Brand Stats */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              {BrandIcon && <BrandIcon />}
              <motion.h3
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-semibold text-white"
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
              >
                {brand.brand_name}
              </motion.h3>
            <span
              className="rounded-full text-xs font-semibold text-white p-2 py-0.5 capitalize"
              style={{
                backgroundColor: statusColors[brand.referral_program_state],
              }}
            >
             {brand.referral_program_state=="ACTIVE"?"Active":"Inactive"}
            </span>
            </div>

            <div className="space-y-6">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center text-sm text-white mb-2">
                  <div className="flex items-center gap-2">
                    <span>Referred Users</span>
                  </div>
                  <motion.span
                    key={brand.users}
                    animate={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 1.2, opacity: 0 }}
                  >
                    {brand.users}
                  </motion.span>
                </div>
                <Progress
                  className="h-2 bg-purple-100 rounded-lg"
                  classNames={{ indicator: "bg-purple-500" }}
                  value={(brand.users / 50) * 100}
                />
              </motion.div>

              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center text-sm text-white mb-2">
                  <div className="flex items-center gap-2">
                    <span>Lifetime Cash</span>
                  </div>
                  <motion.span
                    key={brand.totalEarning}
                    animate={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 1.2, opacity: 0 }}
                  >
                    ₹{brand.totalEarning.toFixed(2)}
                  </motion.span>
                </div>
                <Progress
                  className="h-2 bg-green-100 rounded-lg"
                  classNames={{ indicator: "bg-green-500" }}
                  value={(brand.totalEarning / 1000) * 100}
                />
              </motion.div>

              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between items-center text-sm text-white mb-2">
                  <div className="flex items-center gap-2">
                    <span>Pending Cash</span>
                  </div>
                  <motion.span
                    key={brand.pendingEarning}
                    animate={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 1.2, opacity: 0 }}
                  >
                    ₹{brand.pendingEarning.toFixed(2)}
                  </motion.span>
                </div>
                <Progress
                  className="h-2 bg-blue-100 rounded-lg"
                  classNames={{ indicator: "bg-blue-500" }}
                  value={(brand.pendingEarning / 2000) * 100}
                />
              </motion.div>
            </div>
          </div>

          {/* Program Details */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="md:w-72 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.6 }}
          >
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">
                Referral Program Details
              </p>
              <div className="text-sm text-white space-y-1">
                <p className="font-bold text-wrap w-[90%]">{rewardString}</p>
              </div>
            </div>
            
            {brand.referral_program_state=="ACTIVE" && 
            <Button
            className=" bg-secondary text-white hover:bg-secondary/90 w-60"
            onClick={() => copyToClipboard(brand.link)}
            >
              Share Referral Link
              {BrandIcon && <BrandIcon />}
            </Button>
            }
          </motion.div>
        </div>
      </div>
    </MotionCard>
  );
}
