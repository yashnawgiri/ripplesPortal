import { atom, selector } from "recoil";

import { authTokenState } from "./authTokenState";
import { userIdState } from "./userIdState";

import { fetchWalletBalanceService } from "@/services/apiService";

export interface WalletBalanceType {
  wallet_balance: string;
  lifetime_earnings: number;
}

export const walletBalanceState = atom<WalletBalanceType | null>({
  key: "walletBalanceState",
  default: null,
});

export const fetchWalletBalance = selector<WalletBalanceType | null>({
  key: "fetchWalletBalance",
  get: async ({ get }) => {
    const token = get(authTokenState);
    const userId = get(userIdState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchWalletBalanceService(token, userId);

      return response.data;
    } catch (error) {
      console.error("Error fetching wallet Balance:", error);

      return null;
    }
  },
});
