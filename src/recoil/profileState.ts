import { atom, selector } from "recoil";
import { authTokenState } from "./authTokenState";
import { fetchProfileService, ProfileResponse } from "@/services/apiService";

export const profileState = atom<ProfileResponse>({
  key: "profileState",
  default: {
    firstname: "", 
    lastname: "", 
    email: ""
  }
});

export const fetchProfile = selector({
  key: "fetchProfile",
  get: async ({ get }) => {
    const token = get(authTokenState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const data = await fetchProfileService(token);
      return data;
    } catch (error) {
      console.error("Error fetching referral links:", error);
      return null;
    }
  },
});