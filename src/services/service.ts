import ENDPOINTS from "@/services/endpoints";

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
  token: string;
  user: {
    id: string;
    name: string;
  };
}

export const loginUser = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  return await apiCall<LoginResponse>(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};
