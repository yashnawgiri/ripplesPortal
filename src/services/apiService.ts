import { apiCall } from "@/utils/utils";
import endpoints from "./endpoints";

interface ReferralLinksResponse {
  links: string[];
}

export const fetchReferralLinksService = async (
  authToken: string
): Promise<ReferralLinksResponse> => {
  return await apiCall<ReferralLinksResponse>(endpoints.REFER_LINKS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

interface WalletBalanceResponse {
  total: string;
}

export const fetchWalletBalanceService = async (
  authToken: string
): Promise<WalletBalanceResponse> => {
  return await apiCall<WalletBalanceResponse>(endpoints.WALLET_BALANCE, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

export interface ProfileResponse {
  firstname: string;
  lastname: string;
  email: string;
}

export const fetchProfileService = async (
  authToken: string
): Promise<ProfileResponse> => {
  return await apiCall<ProfileResponse>(endpoints.PROFILE, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

interface UpdateProfileResponse {
  message: string;
  data: {
    first_name: string;
    last_name: string;
  };
}

export const updateProfileService = async (
  info: {
    first_name: string;
    last_name: string;
  },
  authToken: string
): Promise<UpdateProfileResponse> => {
  return await apiCall<UpdateProfileResponse>(endpoints.PROFILE, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
};

export interface Transaction {
  amount: number;
  type: "credited" | "debited";
  date: string;
}

interface Pagination {
  current_page: number;
  total_pages: number;
  total_transactions: number;
}

interface TransactionsResponse {
  message: string;
  data: Transaction[];
  pagination: Pagination;
}

export const fetchTransactionsService = async (
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<TransactionsResponse> => {
  return await apiCall<TransactionsResponse>(
    `${endpoints.TRANSACTIONS}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

interface SupportResponse {
  message: string;
  data: {
    email: string;
    subject: string;
    category: string;
    brand_name: string;
    description: string;
  };
}

export interface SupportForm {
  email: string;
  subject: string;
  category: string;
  brand_name: string;
  description: string;
}

export const SubmitSupportService = async (
  supportForm: SupportForm,
  token: string
): Promise<SupportResponse> => {
  return await apiCall(endpoints.SUPPORT_REQUEST, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supportForm),
  });
};