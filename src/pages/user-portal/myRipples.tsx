import {
  CartIcon,
  ShopIcon,
  BagIcon,
  MessageIcon,
  MoneyRecieveIcon,
} from "@/components/icons";
import UserDefaultLayout from "@/layouts/userDefault";
import myRipplesData from "@/data/user-portal.json";
import CustomButton from "@/components/CustomElements/CustomButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchProfile, profileState } from "@/recoil/profileState";
import {
  fetchWalletBalance,
  walletBalanceState,
} from "@/recoil/walletBalanceState";
import { useEffect } from "react";
import {
  fetchReferralLinks,
  referralLinksState,
} from "@/recoil/referralLinksState";

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
  const [rewards, setRewards] = useRecoilState(referralLinksState);
  const fetchLinks = useRecoilValue(fetchReferralLinks);
  const [walletBalance, setWalletBalance] = useRecoilState(walletBalanceState);
  const [profile, setProfile] = useRecoilState(profileState);
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

  console.log(rewards);
  const haveRipples = rewards?.length;
  return (
    <UserDefaultLayout>
      {haveRipples ? (
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-2/3">
            <div className="flex bg-primary w-full p-5 rounded-sm items-center border border-gray-800 space-y-1">
              <div className="rounded-full bg-gray-400 h-10 w-10">
                {/* <Image 
                            /> */}
              </div>
              <h2 className="heading-color lg:text-lg text-md ml-4 py-2">
                {profile?.first_name} (you)
              </h2>
            </div>
            <h3 className="text-lg lg:text-2xl font-extrabold font-poppins text-center mt-14 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
              Give Rs.500 off,Get Rs.500 cash
            </h3>
            <p className="text-white text-md mb-2">{"Neck Massager Sell"}</p>
            <div className="bg-primary w-full p-5 rounded-sm items-center border border-gray-800 space-y-1">
              <p className="text-gray-400 text-sm">Rewards Earned</p>
              <p className="text-white text-3xl font-bold">
                ₹{walletBalance?.wallet_balance}
              </p>
            </div>
            <CustomButton
              onClick={() => {}}
              className="bg-secondary mx-auto mt-4 flex justify-center w-full space-x-2"
            >
              <p>Copy Ripples Link</p>
              <MessageIcon />
            </CustomButton>
            <p className="text-color text-center mt-2">
              Your friends will get a Rs.{"500"} discount at {"Neck Massager"}{" "}
              Sell.
            </p>
            <button
              onClick={() => {}}
              className="bg-gray-800 flex mx-auto mt-4 heading-color px-6 py-2 font-poppins rounded-full"
            >
              See Others
            </button>
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
      )}

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
