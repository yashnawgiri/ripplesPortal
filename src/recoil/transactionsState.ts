import { atom, selector } from "recoil";

import { authTokenState } from "./authTokenState";
import { userIdState } from "./userIdState";

import {
  fetchTransactionsService,
  TransactionGroup,
} from "@/services/apiService";

export const transactionsState = atom<TransactionGroup | null>({
  key: "transactionsState",
  default: null, // Updated default to be compatible with TransactionGroup | null
});

export const fetchTransactions = selector<TransactionGroup | null>({
  key: "fetchTransactions",
  get: async ({ get }) => {
    const token = get(authTokenState);
    const userId = get(userIdState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchTransactionsService(token, userId);

      return response.data as TransactionGroup;
    } catch (error) {
      console.error("Error fetching transactions:", error);

      return null; // Returning null to align with updated type
    }
  },
});
