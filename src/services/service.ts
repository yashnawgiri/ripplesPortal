import endpoints from "@/services/endpoints";

interface ApiOptions extends RequestInit {
  body?: string;
}

export const apiCall = async <T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("API Call Error:", (error as Error).message);
    throw error;
  }
};

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
  otp: number;
}): Promise<OtpResponse> => {
  return await apiCall<OtpResponse>(endpoints.OTP_VERIFY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};
