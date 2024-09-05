import { atom, selector } from "recoil";
import { authTokenState } from "./authTokenState";
import { fetchProfileService } from "@/services/apiService";

interface ProfileType {
  first_name: string;
  last_name: string;
  email: string;
}

export const profileState = atom<ProfileType|null>({
  key: "profileState",
  default: null
});

export const fetchProfile = selector<ProfileType|null>({
  key: "fetchProfile",
  get: async ({ get }) => {
    const token = get(authTokenState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchProfileService(token);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },
});