/* eslint-disable max-len */
import type { PhoneContent, PhoneRows } from "./types";
import { LOCAL_CREATOR_IMAGES } from "@/assets/influencerImages";
import phoneContentJson from "./data.json";

const phoneContentArray = phoneContentJson as Array<Omit<PhoneContent, "image"> & { imageIndex: number }>;
export const PHONE_CONTENT: PhoneContent[] = phoneContentArray.map((item) => ({
  ...item,
  image: LOCAL_CREATOR_IMAGES[item.imageIndex],
}));

// Memoized phone rows to prevent re-creation on re-renders
export const PHONE_ROWS: PhoneRows = {
  row1: PHONE_CONTENT.slice(0, 8),
  row2: PHONE_CONTENT.slice(8, 16),
  row3: PHONE_CONTENT.slice(16, 24),
  mobile: PHONE_CONTENT.slice(8, 16), // Use middle row for mobile
}; 