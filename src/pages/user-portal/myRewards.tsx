import { CopyIcon, HalfArrowIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import UserDefaultLayout from "@/layouts/userDefault";
import { loadingState } from "@/recoil/loadingState";
import {
  fetchReferralLinks,
  referralLinksState,
} from "@/recoil/referralLinksState";
import { walletBalanceState } from "@/recoil/walletBalanceState";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

export default function MyRewards() {
  const [rewards, setRewards] = useRecoilState(referralLinksState);
  const walletBalance = useRecoilValue(walletBalanceState);
  const fetchLinks = useRecoilValue(fetchReferralLinks);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    setLoading(true);
    if (fetchLinks) {
      setRewards(fetchLinks);
    }
    setLoading(false);
  }, []);

  const handleCopyClick = (textToCopy: string): void => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
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
              to={siteConfig.path.userRewards}
              className="flex items-center space-x-2 heading-color font-semibold bg-gray-800 rounded-full px-6 py-2"
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
            {"4"} Ripplers Used Your Link
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
              to={"/transactions"}
              className="flex items-center space-x-2 heading-color font-semibold bg-gray-800 rounded-full px-6 py-2"
            >
              <p className="text-xs md:text-base">See Transactions</p>
              <HalfArrowIcon />
            </Link>
          </div>
          <h3 className="text-lg lg:text-2xl font-extrabold font-poppins text-center mt-14 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
            Referrel Links
          </h3>
          {rewards?.length &&
            rewards?.map((reward) => (
              <div
                onClick={() => handleCopyClick(reward.link_code)}
                className="bg-primary flex justify-between w-full px-5 py-3 mb-3 rounded-md items-center border border-gray-800 space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <h4 className="text-white text-lg md:text-xl font-semibold">
                    ₹{"100"}
                  </h4>
                  <p className="text-gray-400 text-md">{reward.brand_name}</p>
                  <p className="text-gray-400 text-sm md:text-md">
                    {"Product Name"}
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center space-x-2 text-color font-semibold px-6 py-2">
                    <CopyIcon />
                    <p>Copy Link</p>
                  </div>
                </div>
              </div>
            ))}

          {rewards?.length && (
            <button
              onClick={() => {}}
              className="bg-gray-800 flex py-1 mx-auto mt-4 heading-color px-6 py-2 font-poppins rounded-full"
            >
              See Others
            </button>
          )}
        </div>
      </div>
    </UserDefaultLayout>
  );
}
