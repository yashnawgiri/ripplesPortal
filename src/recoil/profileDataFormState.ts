import { atom } from "recoil";

export const profileDataFormState = atom({
  key: "profileDataFormState",
  default: {
    first_name: "",
    last_name: "",
  },
});
