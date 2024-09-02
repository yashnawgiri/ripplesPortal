import { atom, selector } from "recoil";
import { authTokenState } from "./authTokenState";
import { fetchWalletBalanceService } from "@/services/apiService";

export const walletBalanceState = atom<string | null>({
  key: "walletBalanceState",
  default: null,
});


export const fetchWalletBalance = selector({
  key: "fetchWalletBalance",
  get: async ({ get }) => {
    const token = get(authTokenState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const data = await fetchWalletBalanceService(token);
      return data.total;
    } catch (error) {
      console.error("Error fetching referral links:", error);
      return [];
    }
  },
});
