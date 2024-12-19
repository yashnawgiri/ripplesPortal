import { atom, selector } from "recoil";

import { authTokenState } from "./authTokenState";
import { userIdState } from "./userIdState";

import { fetchReferralLinksService, ReferralType } from "@/services/apiService";

export const referralLinksState = atom<ReferralType[] | null>({
  key: "referralLinksState",
  default: null,
});

export const fetchReferralLinks = selector<ReferralType[] | null>({
  key: "fetchReferralLinks",
  get: async ({ get }) => {
    const token = get(authTokenState);
    const userId = get(userIdState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchReferralLinksService(token, userId);

      return response.data;
    } catch (error) {
      console.error("Error fetching referral links:", error);

      return null;
    }
  },
});
