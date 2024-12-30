const BASE_URL =
  "https://ripples-backend-stg-dsc5gveccgfrg3fr.centralindia-01.azurewebsites.net/api/v1/portal";

const endpoints = {
  EMAIL_AUTH: `${BASE_URL}/auth/email-login`,
  OTP_VERIFY: `${BASE_URL}/auth/verify-otp`,
  REFER_LINKS: `${BASE_URL}/users/:userId/referral-links`,
  WALLET_BALANCE: `${BASE_URL}/users/:userId/wallet/balance`,
  TRANSACTIONS: `${BASE_URL}/users/:userId/wallet/transactions`,
  PROFILE: `${BASE_URL}/users/:userId/profile`,
  SUPPORT_REQUEST: `${BASE_URL}/support-requests`,
  LINK_DETAILS: `${BASE_URL}/brand/:brand_id/link_code/:link_code`,
  USER_STATISTICS: `${BASE_URL}/users/:userId/statistics`,
  REWARD_PROGRAM_DETAIL: `${BASE_URL}/users/:brandId/:linkCode/reward_program_detail`,
} as const;

export default endpoints;
