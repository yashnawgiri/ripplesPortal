import {
  LOCAL_CREATOR_IMAGES,
  getRandomRemoteCreatorImage,
  getRandomRemoteCreatorImages,
} from "@/assets/influencerImages";

export const CREATOR_IMAGES = LOCAL_CREATOR_IMAGES;

// Function to get a random image from the array
export function getRandomCreatorImage(): string {
  return getRandomRemoteCreatorImage();
}

// Function to get multiple random images
export function getRandomCreatorImages(count: number): string[] {
  return getRandomRemoteCreatorImages(count);
}
