import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

import UserAnalytics from "./UserAnalytics";

import {
  CartIcon,
  ShopIcon,
  BagIcon,
  MessageIcon,
  MoneyRecieveIcon,
} from "@/components/icons";
import UserDefaultLayout from "@/layouts/userDefault";
import myRipplesData from "@/data/user-portal.json";
// import CustomButton from "@/components/CustomElements/CustomButton";
import { fetchProfile, profileState } from "@/recoil/profileState";
import {
  fetchWalletBalance,
  walletBalanceState,
} from "@/recoil/walletBalanceState";
import {
  fetchReferralLinks,
  referralLinksState,
} from "@/recoil/referralLinksState";
// import { ReferredUserRewards } from "@/services/apiService";
// import { copyToClipboard } from "@/utils/utils";

const iconMap = {
  CartIcon: <CartIcon />,
  ShopIcon: <ShopIcon />,
  BagIcon: <BagIcon />,
  MessageIcon: <MessageIcon />,
  MoneyRecieveIcon: <MoneyRecieveIcon />,
};

export interface CardItem {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

interface CardProps {
  item: CardItem;
}

function Card({ item }: CardProps) {
  return (
    <div className="flex bg-primary w-full sm:w-2/3 p-5 rounded-sm items-center border border-gray-800 space-x-8">
      {iconMap[item.icon]}
      <div className="ml-4">
        <h3 className="heading-color font-bold lg:text-lg text-sm">
          {item.title}
        </h3>
        <p className="text-color font-poppins lg:text-base text-xs">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function MyRipples() {
  const [, setRewards] = useRecoilState(referralLinksState);
  const fetchLinks = useRecoilValue(fetchReferralLinks);
  const [walletBalance, setWalletBalance] = useRecoilState(walletBalanceState);
  const [, setProfile] = useRecoilState(profileState);
  const fetchProfileData = useRecoilValue(fetchProfile);
  const fetchBalance = useRecoilValue(fetchWalletBalance);

  useEffect(() => {
    if (fetchProfileData) {
      setProfile(fetchProfileData);
    }
  }, [fetchProfileData, setProfile]);

  useEffect(() => {
    if (fetchBalance) {
      setWalletBalance(fetchBalance);
    }
  }, [fetchBalance, setWalletBalance]);

  useEffect(() => {
    if (fetchLinks) {
      setRewards(fetchLinks);
    }
  }, []);

  // const haveRipples = rewards?.length && walletBalance;

  return (
    <UserDefaultLayout>
      {walletBalance && <UserAnalytics wallet={walletBalance} />}
      {/* {haveRipples ? (
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-2/3">
            {rewards.map((reward) => (
              <MyRewards
                key={reward.link_code}
                brandName={reward.brand_name}
                link={reward.link}
                referredReward={reward.referred_user_rewards}
                referringCommission={reward.referring_user_commission}
                totalEarning={reward.totalEarning}
              />
            ))}

            {rewards.length > 10 && (
              <button
                className="bg-gray-800 flex mx-auto mt-4 heading-color px-6 py-2 font-poppins rounded-full"
                onClick={() => {}}
              >
                See Others
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg lg:text-2xl font-extrabold font-poppins text-center leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
            {myRipplesData.myRipples.noRipples.title1}
          </div>
          <Card
            item={{
              ...myRipplesData.myRipples.noRipples.card1,
              icon: myRipplesData.myRipples.noRipples.card1
                .icon as keyof typeof iconMap,
            }}
          />
        </div>
      )} */}

      <div className="text-lg lg:text-2xl font-extrabold font-poppins text-center mt-14 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
        {myRipplesData.myRipples.noRipples.title2}
      </div>
      <div className="flex flex-col items-center space-y-3 pb-4">
        {myRipplesData.myRipples.noRipples.cards.map((item, index) => (
          <Card
            key={index}
            item={{
              ...item,
              icon: item.icon as keyof typeof iconMap,
            }}
          />
        ))}
      </div>
    </UserDefaultLayout>
  );
}

// type CardProps2 = {
//   totalEarning: number;
//   link: string;
//   brandName: string;
//   referringCommission: {
//     amount: number;
//     type: "FIXED_INR" | "PERCENTAGE";
//   };
//   referredReward: ReferredUserRewards;
// };

// function MyRewards({
//   totalEarning,
//   brandName,
//   link,
//   referredReward,
//   referringCommission,
// }: CardProps2) {
//   return (
//     <>
//       <h3 className="text-lg lg:text-2xl font-extrabold font-poppins text-center mt-14 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
//         Give Rs.{referredReward.reward_details.amount} off , Get Rs.
//         {referringCommission.amount}
//         &nbsp;cash
//       </h3>
//       <p className="text-white text-md mb-2">{`${brandName} Sell`}</p>
//       <div className="bg-primary w-full p-5 rounded-sm items-center border border-gray-800 space-y-1">
//         <p className="text-gray-400 text-sm">Rewards Earned</p>
//         <p className="text-white text-3xl font-bold">₹{totalEarning}</p>
//       </div>
//       <CustomButton
//         className="bg-secondary mx-auto mt-4 flex justify-center w-full space-x-2"
//         onClick={() => copyToClipboard(link)}
//       >
//         <p>Copy Ripples Link</p>
//         <MessageIcon />
//       </CustomButton>
//       <p className="text-color text-center mt-2">
//         Your friends will get a Rs.{referredReward.reward_details.amount}{" "}
//         discount at&nbsp;
//         {brandName}&nbsp;Sell.
//       </p>
//     </>
//   );
// }
