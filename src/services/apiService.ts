import { apiCall } from "@/utils/utils";
import endpoints from "./endpoints";

interface ReferralLinksResponse {
  message: string;
  data: {
    link_code: string;
    state: string;
    brand_id: bigint;
    brand_name: string;
  }[];
}

export const fetchReferralLinksService = async (
  authToken: string,
  userId: string
): Promise<ReferralLinksResponse> => {
  return await apiCall<ReferralLinksResponse>(
    endpoints.REFER_LINKS.replace(":userId", userId.toString()),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

interface WalletBalanceResponse {
  message: string;
  data: {
    wallet_balance: string;
    lifetime_earnings: number;
  };
}

export const fetchWalletBalanceService = async (
  authToken: string,
  userId: string
): Promise<WalletBalanceResponse> => {
  return await apiCall<WalletBalanceResponse>(
    endpoints.WALLET_BALANCE.replace(":userId", userId.toString()), 
    {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

interface ProfileResponse {
  message: string;
  data: {
    id: bigint;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string | null;
    created_at: Date;
    updated_at: Date;
  };
}

export const fetchProfileService = async (
  authToken: string,
  userId: string
): Promise<ProfileResponse> => {
  return await apiCall<ProfileResponse>(
    endpoints.PROFILE.replace(":userId", userId.toString()), 
    {
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
    id: bigint;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string | null;
    created_at: Date;
    updated_at: Date;
  };
}

export const updateProfileService = async (
  info: {
    first_name: string;
    last_name: string;
  },
  authToken: string,
  userId: string
): Promise<UpdateProfileResponse> => {
  return await apiCall<UpdateProfileResponse>(
    endpoints.PROFILE.replace(":userId", userId.toString()), 
    {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
};

export interface Transaction {
  created_at: Date;
  amount: string;
  transaction_type: string;
}

export interface Pagination {
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
  userId: string,
  page: number = 1,
  limit: number = 10,
): Promise<TransactionsResponse> => {
  const url: string = endpoints.TRANSACTIONS.replace(":userId", userId.toString())
    .concat(`?page=${page}?limit=${limit}`);
  return await apiCall<TransactionsResponse>(url,
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