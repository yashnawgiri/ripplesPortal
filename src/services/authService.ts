import endpoints from "./endpoints";
import { apiCall } from "@/utils/utils";

interface LoginResponse {
  message: string;
  data: {
    email: string;
    verification_id: number;
  };
}

export const emailLogin = async (credentials: {
  email: string;
}): Promise<LoginResponse> => {
  return await apiCall<LoginResponse>(endpoints.EMAIL_AUTH, {
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
    user_id: number;
    email: string;
    auth_token: string;
  };
}

export const otpVerify = async (credentials: {
  email: string;
  otp: string;
}): Promise<OtpResponse> => {
  return await apiCall<OtpResponse>(endpoints.OTP_VERIFY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};
