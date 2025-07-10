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
import { fetchProfile, profileState } from "@/recoil/profileState";
import {
  fetchWalletBalance,
  walletBalanceState,
} from "@/recoil/walletBalanceState";
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

  return (
    <UserDefaultLayout>
      {walletBalance && <UserAnalytics wallet={walletBalance} />}
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
