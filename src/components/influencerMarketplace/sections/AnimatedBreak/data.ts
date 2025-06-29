/* eslint-disable max-len */
import type { PhoneContent, PhoneRows } from "./types";
import { LOCAL_CREATOR_IMAGES } from "@/assets/influencerImages";

// Use local images instead of remote URLs
const PLACEHOLDER_IMAGES = LOCAL_CREATOR_IMAGES;

export const PHONE_CONTENT: PhoneContent[] = [
  // Row 1 - Top (8 phones for overlapping cycles)
  {
    username: "@sarah_styles",
    likes: "2.4K",
    caption: "Summer collection drop ✨",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[0],
    isVideo: false,
  },
  {
    username: "@mike_fashion",
    likes: "1.8K",
    caption: "OOTD vibes",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[1],
    isVideo: true,
  },
  {
    username: "@style_queen",
    likes: "3.2K",
    caption: "New brand collab 💫",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[2],
    isVideo: false,
  },
  {
    username: "@trendy_tom",
    likes: "1.5K",
    caption: "Unboxing magic",
    platform: "tiktok",
    image: PLACEHOLDER_IMAGES[3],
    isVideo: true,
  },
  {
    username: "@fashion_forward",
    likes: "2.9K",
    caption: "Brand ambassador ❤️",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[4],
    isVideo: true,
  },
  {
    username: "@creative_mind",
    likes: "2.1K",
    caption: "Behind the lens",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[5],
    isVideo: false,
  },
  {
    username: "@trend_hunter",
    likes: "3.7K",
    caption: "Style inspiration",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[6],
    isVideo: true,
  },
  {
    username: "@fashion_insider",
    likes: "1.9K",
    caption: "Daily fashion tips",
    platform: "tiktok",
    image: PLACEHOLDER_IMAGES[7],
    isVideo: true,
  },

  // Row 2 - Middle (8 phones for overlapping cycles)
  {
    username: "@creator_life",
    likes: "4.1K",
    caption: "Behind the scenes",
    platform: "tiktok",
    image: PLACEHOLDER_IMAGES[0],
    isVideo: true,
  },
  {
    username: "@lifestyle_guru",
    likes: "2.7K",
    caption: "Product review 🔥",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[1],
    isVideo: false,
  },
  {
    username: "@content_king",
    likes: "3.5K",
    caption: "Viral moment!",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[2],
    isVideo: true,
  },
  {
    username: "@brand_lover",
    likes: "1.9K",
    caption: "Shopping haul",
    platform: "tiktok",
    image: PLACEHOLDER_IMAGES[3],
    isVideo: true,
  },
  {
    username: "@style_inspo",
    likes: "2.1K",
    caption: "Outfit transition",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[4],
    isVideo: true,
  },
  {
    username: "@fashion_curator",
    likes: "3.3K",
    caption: "Trend analysis",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[5],
    isVideo: false,
  },
  {
    username: "@style_master",
    likes: "2.8K",
    caption: "Fashion education",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[6],
    isVideo: true,
  },
  {
    username: "@brand_ambassador",
    likes: "4.5K",
    caption: "Exclusive content",
    platform: "tiktok",
    image: PLACEHOLDER_IMAGES[7],
    isVideo: true,
  },

  // Row 3 - Bottom (8 phones for overlapping cycles)
  {
    username: "@fashion_diary",
    likes: "1.7K",
    caption: "Daily look",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[0],
    isVideo: false,
  },
  {
    username: "@trend_setter",
    likes: "3.8K",
    caption: "Fashion week ready",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[1],
    isVideo: true,
  },
  {
    username: "@style_maven",
    likes: "2.3K",
    caption: "Brand partnership",
    platform: "tiktok",
    image: PLACEHOLDER_IMAGES[2],
    isVideo: true,
  },
  {
    username: "@creator_hub",
    likes: "1.6K",
    caption: "Content creation",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[3],
    isVideo: false,
  },
  {
    username: "@fashion_fix",
    likes: "2.8K",
    caption: "Style tips",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[4],
    isVideo: true,
  },
  {
    username: "@trend_spotter",
    likes: "3.1K",
    caption: "Emerging trends",
    platform: "tiktok",
    image: PLACEHOLDER_IMAGES[5],
    isVideo: true,
  },
  {
    username: "@style_guide",
    likes: "2.4K",
    caption: "Fashion advice",
    platform: "instagram",
    image: PLACEHOLDER_IMAGES[6],
    isVideo: false,
  },
  {
    username: "@creative_force",
    likes: "3.9K",
    caption: "Artistic expression",
    platform: "reels",
    image: PLACEHOLDER_IMAGES[7],
    isVideo: true,
  },
];

// Memoized phone rows to prevent re-creation on re-renders
export const PHONE_ROWS: PhoneRows = {
  row1: PHONE_CONTENT.slice(0, 8),
  row2: PHONE_CONTENT.slice(8, 16),
  row3: PHONE_CONTENT.slice(16, 24),
  mobile: PHONE_CONTENT.slice(8, 16), // Use middle row for mobile
}; 