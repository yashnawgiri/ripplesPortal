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