import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

export function UserAnalytics({ wallet }: Props) {
  // Hooks
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (brand.referral_program_state != "DELETED") {
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
      setIsModalOpen(true);
    } else {
      toast.error("Program is deleted");
    }
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
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="bg-blue-600 text-white rounded-lg shadow-md p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">
            Oops! Something went wrong.
          </h2>
          <button
            className="mt-6 bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold text-white">
          My Referral Dashboard
        </h1>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WALLET_STATS.map((stat) => (
          <div
            key={stat.title}
            className="border bg-blue-600 border-blue-700 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-white">{stat.title}</p>
                <h3 className="text-2xl text-white font-semibold mt-1">
                  ₹{wallet[stat.value as keyof WalletBalanceType]}
                </h3>
              </div>
              <div title={stat.info}>{walletStatsIcons(stat.icon)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white pt-12">
          My Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userOverallAnalytics.map((stat) => (
            <div
              key={stat.title}
              className="border border-blue-700 bg-blue-600 text-white rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm text-white">{stat.title}</p>
                  <span>{userStatsIcons(stat.icon)}</span>
                </div>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Analytics */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white pt-12">
          Brand Analytics
        </h2>
        <div className="flex flex-row flex-wrap gap-8 justify-center items-center">
          {statistics?.brandStats.length ? (
            statistics.brandStats.map((brand) => (
              <div
                key={brand.brand_name}
                className="cursor-pointer"
                onClick={() => handleModalOpen(brand)}
              >
                <BrandCard brand={brand} />
              </div>
            ))
          ) : (
            <div className="text-white text-xl text-center">
              No brand stats available
            </div>
          )}
        </div>
      </div>

      {/* Referral Popup */}
      {modalData.brandId && (
        <ReferralPopup
          brandId={modalData.brandId}
          isOpen={isModalOpen}
          link={modalData.link}
          referredUsers={modalData.referredUsers}
          rewardString={modalData.rewardStr}
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
        />
      )}
    </div>
  );
}

export default UserAnalytics;
