import { atom, selector } from "recoil";

import { authTokenState } from "./authTokenState";
import { userIdState } from "./userIdState";

import { fetchTransactionsService, Transaction } from "@/services/apiService";

export const transactionsState = atom<Transaction[]>({
  key: "transactionsState",
  default: [],
});

export const fetchTransactions = selector<Transaction[]>({
  key: "fetchTransactions",
  get: async ({ get }) => {
    const token = get(authTokenState);
    const userId = get(userIdState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchTransactionsService(token, userId);

      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);

      return [];
    }
  },
});
