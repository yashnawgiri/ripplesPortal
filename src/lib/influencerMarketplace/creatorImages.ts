import { LOCAL_CREATOR_IMAGES, getRandomLocalCreatorImage, getRandomLocalCreatorImages } from '@/assets/influencerImages';

// Use local images instead of remote URLs
export const CREATOR_IMAGES = LOCAL_CREATOR_IMAGES;

// Function to get a random image from the array
export function getRandomCreatorImage(): string {
  return getRandomLocalCreatorImage();
}

// Function to get multiple random images
export function getRandomCreatorImages(count: number): string[] {
  return getRandomLocalCreatorImages(count);
} 