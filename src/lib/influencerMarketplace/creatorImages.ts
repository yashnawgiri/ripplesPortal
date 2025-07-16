import {
  LOCAL_INFLUENCER_IMAGES,
  getRandomLocalCreatorImage,
  getRandomLocalCreatorImages,
} from "@/assets/influencerImages";

export const CREATOR_IMAGES = LOCAL_INFLUENCER_IMAGES;

// Function to get a random image from the array
export function getRandomCreatorImage(): string {
  return getRandomLocalCreatorImage();
}

// Function to get multiple random images
export function getRandomCreatorImages(count: number): string[] {
  return getRandomLocalCreatorImages(count);
}
