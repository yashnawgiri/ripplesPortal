import { atom, selector } from "recoil";

import { authTokenState } from "./authTokenState";
import { userIdState } from "./userIdState";

import {
  fetchTransactionsService,
  TransactionFilteredGroup,
} from "@/services/apiService";
import { groupTransactionsByDate } from "@/utils/utils";

// Atom to hold transactions state
export const transactionsState = atom<TransactionFilteredGroup | null>({
  key: "transactionsState",
  default: null, // Initial state set to null
});

// Selector to fetch and process transactions
export const fetchTransactions = selector<TransactionFilteredGroup | null>({
  key: "fetchTransactions",
  get: async ({ get }) => {
    const token = get(authTokenState);
    const userId = get(userIdState);

    if (!token) {
      console.error("No authentication token found");

      return null; // Returning null when there's no token
    }

    try {
      const response = await fetchTransactionsService(token, userId);
      // Group transactions by date
      const transactions = groupTransactionsByDate(response.data.data);
      const pagination = response.data.pagination;

      // Return the processed transactions as TransactionFilteredGroup
      return { data: transactions, pagination } as TransactionFilteredGroup;
    } catch (error) {
      console.error("Error fetching transactions:", error);

      // Return null to indicate an error occurred
      return null;
    }
  },
});
