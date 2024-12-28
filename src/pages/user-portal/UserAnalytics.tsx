import { Card, Skeleton, useDisclosure } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import ReferralPopup from "./ReferralPopup";

import { userStatsIcons, walletStatsIcons } from "@/components/icons";
import { BrandCard } from "@/components/BrandCard";
import { formatRewardString } from "@/utils/utils";
import { BrandStats, getUserStatistics } from "@/services/apiService";
import { WalletBalanceType } from "@/recoil/walletBalanceState";

interface UserStatistics {
  totalReferredUsers: number;
  totalLifeTimeCash: number;
  totalLinkClicks: number;
  brandStats: BrandStats[];
}

interface ModalData {
  rewardStr: string;
  link: string;
  brandId: number | null;
  referredUsers: number;
}

interface Props {
  wallet: WalletBalanceType;
}

// Constants
const WALLET_STATS = [
  {
    icon: 1,
    title: "Lifetime Earnings",
    value: "lifetime_earnings",
    info: "Total cash rewards earned by you to date",
  },
  {
    icon: 2,
    title: "Cash in Wallet",
    value: "wallet_balance",
    info: "Total cash that is withdrawable",
  },
  {
    icon: 3,
    title: "Pending Cash",
    value: "pending_earnings",
    info: "Cash that will be transferred to your wallet when the product return period is over",
  },
];

const MotionCard = motion(Card);

export function UserAnalytics({ wallet }: Props) {
  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [modalData, setModalData] = useState<ModalData>({
    rewardStr: "",
    link: "",
    brandId: null,
    referredUsers: 0,
  });

  // Handlers
  const handleModalOpen = (brand: BrandStats) => {
    setModalData({
      rewardStr: formatRewardString(
        brand.referred_user_rewards.type,
        brand.referred_user_rewards.amount,
        brand.referring_user_commission.type,
        brand.referring_user_commission.amount,
      ),
      link: brand.link,
      brandId: brand.brand_id,
      referredUsers: brand.users,
    });
    onOpen();
  };

  // Data fetching
  useEffect(() => {
    const fetchStatistics = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("Authentication required");
        setIsLoading(false);

        return;
      }

      try {
        const response = await getUserStatistics(token, userId);

        setStatistics(response.data);
      } catch (error) {
        setError("Failed to fetch statistics");
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Derived state
  const userOverallAnalytics = statistics
    ? [
        {
          icon: 1,
          title: "Total Referred Users",
          value: statistics.totalReferredUsers,
          info: "Total number of users you have referred",
        },
        {
          icon: 2,
          title: "Lifetime Cash Earned",
          value: statistics.totalLifeTimeCash,
          info: "Total cash earned by you through referrals",
        },
        {
          icon: 3,
          title: "Total Link Clicks",
          value: statistics.totalLinkClicks,
          info: "Total number of times your referral links have been clicked",
        },
      ]
    : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-white p-8">
        <h2 className="text-xl">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold text-white">
          My Referral Dashboard
        </h1>
      </motion.div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WALLET_STATS.map((stat, index) => (
          <MotionCard
            key={stat.title}
            animate={{ opacity: 1, y: 0 }}
            className="border bg-primary border-primary shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-white">{stat.title}</p>
                  <motion.h3
                    key={wallet[stat.value as keyof WalletBalanceType]}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl text-white font-semibold mt-1"
                    initial={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ₹{wallet[stat.value as keyof WalletBalanceType]}
                  </motion.h3>
                </div>
                <Tooltip content={stat.info}>
                  <span>{walletStatsIcons(stat.icon)}</span>
                </Tooltip>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      {/* Analytics Section */}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-white pt-12">
          My Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userOverallAnalytics.map((stat) => (
            <MotionCard
              key={stat.title}
              className="border border-primary bg-primary text-white"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm text-white">{stat.title}</p>
                    <span>{userStatsIcons(stat.icon)}</span>
                  </div>
                  <motion.h3
                    key={stat.value}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-semibold mt-1"
                    initial={{ scale: 1.2, opacity: 0 }}
                  >
                    {stat.value}
                  </motion.h3>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </motion.div>

      {/* Brand Analytics */}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-white pt-12">
          Brand Analytics
        </h2>
        <div className="flex flex-row flex-wrap gap-8 justify-center items-center">
          {statistics?.brandStats.length ? (
            statistics.brandStats.map((brand, index) => (
              <motion.div
                key={brand.brand_name}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2 * index }}
                onClick={() => handleModalOpen(brand)}
              >
                <BrandCard brand={brand} />
              </motion.div>
            ))
          ) : (
            <div className="text-white text-xl text-center">
              No brand stats available
            </div>
          )}
        </div>
      </motion.div>

      {/* Referral Popup */}
      {modalData.brandId && (
        <ReferralPopup
          brandId={modalData.brandId}
          isOpen={isOpen}
          link={modalData.link}
          referredUsers={modalData.referredUsers}
          rewardString={modalData.rewardStr}
          onClose={onClose}
          onOpen={onOpen}
        />
      )}
    </div>
  );
}

export default UserAnalytics;
