export interface PhoneContent {
  username: string;
  likes: string;
  caption: string;
  platform: "instagram" | "tiktok" | "reels";
  image: string;
  isVideo: boolean;
}

export interface PhoneRows {
  row1: PhoneContent[];
  row2: PhoneContent[];
  row3: PhoneContent[];
  mobile: PhoneContent[];
} 