import { SupportForm } from "@/services/apiService";
import { atom } from "recoil";

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