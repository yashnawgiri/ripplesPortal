/* eslint-disable max-len */

// Keep the original array for future use
// export const LOCAL_CREATOR_IMAGES = [
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator1.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator2.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator3.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator4.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator5.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator6.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator7.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator8.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator9.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator10.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator13.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator14.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator15.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator16.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator17.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator18.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator19.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator20.jpg",
//   "https://ripples1static.blob.core.windows.net/images/Influencer/creator21.jpg",
// ];
export const LOCAL_CREATOR_IMAGES = [
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752660985/User_default_l8raxp.png",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752660984/Sponsored_default_k5xnda.png",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752660983/Feed_Post_-_1_1_photo_1_u6y6wx.png",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752660983/Pull_to_refresh_hbcpje.png",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752660983/Mockup_bnlkgr.png",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752660983/Mockup_1_fqoeka.png",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752660982/Feed_Post_-_Sponsored_wlhjvw.png",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752729912/WhatsApp_Image_2025-07-17_at_10.28.12_ff16ac01_ytbel7.jpg",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752729912/WhatsApp_Image_2025-07-17_at_10.28.11_a8c979e4_qd8kpx.jpg",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752729912/WhatsApp_Image_2025-07-17_at_10.28.11_1e003766_r4pdnl.jpg",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752729912/WhatsApp_Image_2025-07-17_at_10.28.12_4c1a50d6_weldja.jpg",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752729912/WhatsApp_Image_2025-07-17_at_10.28.11_6fa857f9_v9nzsb.jpg",
];

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
