import endpoints from "./endpoints";

import { apiCall } from "@/utils/utils";

interface LoginResponse {
  message: string;
  data: {
    email: string;
  };
}

export const emailLogin = async (credentials: {
  email: string;
}): Promise<LoginResponse> => {
  return apiCall<LoginResponse>(endpoints.EMAIL_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

interface OtpResponse {
  message: string;
  data: {
    userId: string;
    token: string;
  };
}

export const otpVerify = async (credentials: {
  email: string;
  otp: string;
}): Promise<OtpResponse> => {
  return apiCall<OtpResponse>(endpoints.OTP_VERIFY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};
