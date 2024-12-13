import { atom } from "recoil";

export const authTokenState = atom<string | null>({
  key: "authTokenState",
  default: "",
});
