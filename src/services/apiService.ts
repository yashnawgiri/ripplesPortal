import endpoints from "./endpoints";

import { apiCall, GroupedTransactions } from "@/utils/utils";

interface RewardDetails {
  type: "FIXED_INR" | "PERCENTAGE";
  amount: number;
}

export interface ReferralType {
  id: number;
  state: string;
  link: string;
  link_code: string;
  brand_id: bigint;
  brand_name: string;
  referred_user_rewards: ReferredUserRewards;
  referring_user_commission: RewardDetails;
  totalEarning: number;
}

interface ReferralLinksResponse {
  message: string;
  data: ReferralType[];
}

export const fetchReferralLinksService = async (
  authToken: string,
  userId: string,
): Promise<ReferralLinksResponse> => {
  return apiCall<ReferralLinksResponse>(
    endpoints.REFER_LINKS.replace(":userId", userId.toString()),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    },
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
  userId: string,
): Promise<WalletBalanceResponse> => {
  return apiCall<WalletBalanceResponse>(
    endpoints.WALLET_BALANCE.replace(":userId", userId.toString()),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    },
  );
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
  userId: string,
): Promise<ProfileResponse> => {
  return apiCall<ProfileResponse>(
    endpoints.PROFILE.replace(":userId", userId.toString()),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    },
  );
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
  userId: string,
): Promise<UpdateProfileResponse> => {
  return apiCall<UpdateProfileResponse>(
    endpoints.PROFILE.replace(":userId", userId.toString()),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    },
  );
};

export interface Transaction {
  created_at: Date;
  amount: number;
  transaction_type: "CREDITED" | "DEBITED";
}

export interface TransactionGroup {
  data: Transaction[];
  pagination: Pagination;
}

export interface TransactionFilteredGroup {
  data: GroupedTransactions[];
  pagination: Pagination;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_transactions: number;
}

interface TransactionsResponse {
  message: string;
  data: TransactionGroup;
}

export const fetchTransactionsService = async (
  token: string,
  userId: string,
  page: number = 1,
  limit: number = 10,
): Promise<TransactionsResponse> => {
  const url: string = endpoints.TRANSACTIONS.replace(
    ":userId",
    userId.toString(),
  ).concat(`?page=${page}?limit=${limit}`);

  return apiCall<TransactionsResponse>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  token: string,
): Promise<SupportResponse> => {
  return apiCall(endpoints.SUPPORT_REQUEST, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supportForm),
  });
};

interface RewardDetails {
  type: "PERCENTAGE" | "FIXED_INR";
  amount: number;
}

export interface MilestoneDetails {
  nth?: number;
}

export interface ReferringUserCommission {
  reward_details: RewardDetails;
  milestone_details?: MilestoneDetails;
  referral_eligible: "every_referral" | "milestone_referral" | string;
}

export interface ReferredUserRewards {
  reward_details: RewardDetails;
}

export interface UserRewards {
  id: number;
  brand_id: number;
  referral_program_id: number;
  referral_program_state: "ACTIVE" | "INACTIVE" | string;
  user_id: number;
  link: string;
  link_code: string;
  link_code_state: "ACTIVE" | "INACTIVE" | string;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  referring_user_commission: ReferringUserCommission[];
  referred_user_rewards: ReferredUserRewards;
  min_amount: number | null;
  discount_type: "FIXED_INR" | string;
  discount_amount: number;
  commission_type: string;
  commission_amount: number;
  referrer_first_name: string;
}

interface LinkDetailResponse {
  data: UserRewards;
  message: string;
}

export const fetchLinkDetailsService = async (
  linkCode: string,
  brandId: number,
): Promise<LinkDetailResponse> => {
  return apiCall<LinkDetailResponse>(
    endpoints.LINK_DETAILS.replace(":link_code", linkCode)
      .replace(":brand_id", String(brandId))
      .replace("portal/", ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
