const BASE_URL =
  "https://7f48-2401-4900-5307-8190-7938-96be-1f73-e5bd.ngrok-free.app/api/v1/portal";

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
  WITHDRAW_REQUEST: `${BASE_URL}/:userId/withdraw-request`,
  AFFILIATE_REWARDS: `${BASE_URL}/:brand_id/:referral_program_id/affiliate-rewards`,
  GENERATE_AFFILIATE_LINK: `${BASE_URL}/identifier/:brand_id/program/:referral_program_id/affiliate/create`,
} as const;

export default endpoints;
