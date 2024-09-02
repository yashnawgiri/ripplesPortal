const BASE_URL = "http://20.244.26.175";

const endpoints = {
  EMAIL_AUTH: `${BASE_URL}/api/temp/auth/email`,
  OTP_VERIFY: `${BASE_URL}/api/temp/auth/verify-otp`,
  REFER_LINKS: `${BASE_URL}/api/temp/user/referral/links`,
  WALLET_BALANCE: `${BASE_URL}/api/temp/wallet/balance`,
  TRANSACTIONS: `${BASE_URL}/api/temp/wallet/transactions`,
  PROFILE: `${BASE_URL}/api/temp/profile`,
  SUPPORT_REQUEST: `${BASE_URL}/api/temp/support-request`,
} as const;

export default endpoints;
