import { atom, selector } from "recoil";
import { authTokenState } from "./authTokenState";
import { fetchReferralLinksService } from "@/services/apiService";

export const referralLinksState = atom<string[]>({
  key: "referralLinksState",
  default: [],
});

export const fetchReferralLinks = selector<string[]>({
  key: "fetchReferralLinks",
  get: async ({ get }) => {
    const token = get(authTokenState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const data = await fetchReferralLinksService(token);
      return data.links;
    } catch (error) {
      console.error("Error fetching referral links:", error);
      return [];
    }
  },
});