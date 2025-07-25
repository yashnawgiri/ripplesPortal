import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import toast from "react-hot-toast";

import { CopyIcon, HalfArrowIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import UserDefaultLayout from "@/layouts/userDefault";
import { loadingState } from "@/recoil/loadingState";
import {
  fetchReferralLinks,
  referralLinksState,
} from "@/recoil/referralLinksState";
import {
  fetchWalletBalance,
  walletBalanceState,
} from "@/recoil/walletBalanceState";
import { formatRewardString } from "@/utils/utils";

export default function MyRewards() {
  const [rewards, setRewards] = useRecoilState(referralLinksState);
  const [walletBalance, setWalletBalance] = useRecoilState(walletBalanceState);
  const fetchBalance = useRecoilValue(fetchWalletBalance);
  const fetchLinks = useRecoilValue(fetchReferralLinks);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    setLoading(true);
    if (fetchLinks) {
      setRewards(fetchLinks);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (fetchBalance) {
      setWalletBalance(fetchBalance);
    }
  }, [fetchBalance, setWalletBalance]);

  const handleCopyClick = (textToCopy: string): void => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Text copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };

  if (loading) {
    return <>loading</>;
  }

  return (
    <UserDefaultLayout>
      <div className="flex justify-center items-center">
        <div className="w-full sm:w-2/3 mb-4">
          <div className="bg-primary flex justify-between w-full p-5 rounded-sm items-center border border-gray-800 space-y-1">
            <div>
              <p className="text-gray-400 text-sm">Rewards Earned</p>
              <p className="text-white text-3xl font-bold">
                ₹{walletBalance?.wallet_balance}
              </p>
            </div>
            <Link
              className="flex items-center space-x-2 heading-color font-semibold bg-gray-800 rounded-full px-6 py-2"
              to={siteConfig.path.withdraw}
            >
              <p>{"Withdraw"}</p>
              <HalfArrowIcon />
            </Link>
          </div>
          {/* <p className="text-color text-center mt-2">
            Your friends will get a Rs.{"500"} discount at {"Neck Massager"}{" "}
            Sell.
          </p> */}
          <h3 className="text-lg lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
            Transaction History
          </h3>
          <div className="bg-primary flex justify-between w-full p-3 md:p-5 rounded-sm items-center border border-gray-800 space-y-1">
            <div className="flex items-center space-x-2">
              <p className="text-gray-400 text-xs md:text-lg">
                Total Rewards Earned
              </p>
              <p className="text-white text-sm md:text-lg font-semibold">
                ₹{walletBalance?.lifetime_earnings}
              </p>
            </div>
            <Link
              className="flex items-center space-x-2 heading-color font-semibold bg-gray-800 rounded-full px-6 py-2"
              to={`/my-ripples/${siteConfig.path.userTransaction}`}
            >
              <p className="text-xs md:text-base">See Transactions</p>
              <HalfArrowIcon />
            </Link>
          </div>
          <h3 className="text-lg lg:text-2xl font-extrabold font-poppins text-center mt-14 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
            Referrel Links
          </h3>
          {rewards?.length &&
            rewards?.map((reward, index) => (
              <button
                key={index}
                className="bg-primary flex flex-col md:flex-row justify-between w-full px-5 py-4 mb-4 rounded-lg items-center border border-gray-800"
                onClick={() => handleCopyClick(reward.link)}
              >
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 w-full">
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-white text-lg md:text-xl font-semibold">
                      {reward.brand_name}
                    </h4>
                    <p className="text-gray-400 text-md">
                      {formatRewardString(
                        reward.referring_user_commission.type,
                        reward.referring_user_commission.amount,
                        reward.referred_user_rewards.reward_details.type,
                        reward.referred_user_rewards.reward_details.amount,
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-center md:justify-end space-x-3 md:space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-transparent text-white rounded-md hover:bg-opacity-90 transition">
                      <CopyIcon />
                      <p>Copy Link</p>
                    </button>
                  </div>
                </div>
              </button>
            ))}

          {/* {rewards?.length && (
            <button
              className="bg-gray-800 flex mx-auto mt-4 heading-color px-6 py-2 font-poppins rounded-full"
              onClick={() => {}}
            >
              See Others
            </button>
          )} */}
        </div>
      </div>
    </UserDefaultLayout>
  );
}
