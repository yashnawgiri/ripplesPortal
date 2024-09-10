import { atom, selector } from "recoil";
import { authTokenState } from "./authTokenState";
import { fetchProfileService } from "@/services/apiService";
import { userIdState } from "./userIdState";

interface ProfileType {
  id?: bigint ;
  first_name: string;
  last_name: string;
  email?: string;
  contact_number?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export const profileState = atom<ProfileType|null>({
  key: "profileState",
  default: null
});

export const fetchProfile = selector<ProfileType|null>({
  key: "fetchProfile",
  get: async ({ get }) => {
    const token = get(authTokenState);
    const userId = get(userIdState);

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetchProfileService(token,userId);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },
});