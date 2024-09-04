import { atom, selector } from "recoil";
import { authTokenState } from "./authTokenState";
import { fetchReferralLinksService } from "@/services/apiService";

interface ReferralType {
  brand: string;
  link: string;
  rewards_earned: number;
}

export const referralLinksState = atom<ReferralType[] | null>({
  key: "referralLinksState",
  default: null,
});

export const fetchReferralLinks = selector<ReferralType[] | null>({
  key: "fetchReferralLinks",
  get: async ({ get }) => {
    const token = get(authTokenState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchReferralLinksService(token);
      return response.data;
    } catch (error) {
      console.error("Error fetching referral links:", error);
      return null;
    }
  },
});