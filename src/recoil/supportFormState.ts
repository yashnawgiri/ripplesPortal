import { atom } from "recoil";

import { SupportForm } from "@/services/apiService";

export const supportFormState = atom<SupportForm>({
  key: "supportFormState",
  default: {
    email: "",
    subject: "",
    category: "",
    brand_name: "",
    description: "",
  },
});
