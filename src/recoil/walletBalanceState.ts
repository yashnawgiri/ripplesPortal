import { atom, selector } from "recoil";
import { authTokenState } from "./authTokenState";
import { fetchWalletBalanceService } from "@/services/apiService";

interface WalletBalanceType {
  current_balance: number;
  lifetime_earnings: number;
}

export const walletBalanceState = atom<WalletBalanceType|null>({
  key: "walletBalanceState",
  default: null,
});


export const fetchWalletBalance = selector<WalletBalanceType | null>({
  key: "fetchWalletBalance",
  get: async ({ get }) => {
    const token = get(authTokenState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchWalletBalanceService(token);
      return response.data;
    } catch (error) {
      console.error("Error fetching referral links:", error);
      return null;
    }
  },
});
