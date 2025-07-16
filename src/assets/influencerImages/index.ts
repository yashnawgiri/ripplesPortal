/* eslint-disable max-len */

// Local images from the influencerImages folder
export const LOCAL_INFLUENCER_IMAGES = [
  "/src/assets/influencerImages/User default.png",
  "/src/assets/influencerImages/Sponsored default.png",
  "/src/assets/influencerImages/Feed Post - 1_1 photo (1).png",
  "/src/assets/influencerImages/Feed Post - 1_1 photo.png",
  "/src/assets/influencerImages/Feed Post - Sponsored.png",
  "/src/assets/influencerImages/Mockup (1).png",
  "/src/assets/influencerImages/Mockup.png",
  "/src/assets/influencerImages/Pull to refresh.png",
];

// Keep the original array for future use
export const LOCAL_CREATOR_IMAGES = [
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator1.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator2.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator3.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator4.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator5.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator6.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator7.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator8.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator9.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator10.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator13.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator14.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator15.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator16.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator17.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator18.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator19.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator20.jpg",
  "https://ripples1static.blob.core.windows.net/images/Influencer/creator21.jpg",
];

// Function to get a random local image
export function getRandomLocalCreatorImage(): string {
  return LOCAL_INFLUENCER_IMAGES[
    Math.floor(Math.random() * LOCAL_INFLUENCER_IMAGES.length)
  ];
}

// Function to get multiple random local images
export function getRandomLocalCreatorImages(count: number): string[] {
  const shuffled = [...LOCAL_INFLUENCER_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get a random remote image (keeping for future use)
export function getRandomRemoteCreatorImage(): string {
  return LOCAL_CREATOR_IMAGES[
    Math.floor(Math.random() * LOCAL_CREATOR_IMAGES.length)
  ];
}

// Function to get multiple random remote images (keeping for future use)
export function getRandomRemoteCreatorImages(count: number): string[] {
  const shuffled = [...LOCAL_CREATOR_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
