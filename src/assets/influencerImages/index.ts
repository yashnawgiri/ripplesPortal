/* eslint-disable max-len */

// Keep the original array for future use

export const LOCAL_CREATOR_IMAGES = [
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746668/assets_task_01k0btrgc7e1nas4j9cv1sydxc_1752743938_img_0_j7m6uz.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746665/assets_task_01k0bwkp4xffv9xm0vsvgf7rwv_1752745965_img_0_dmhvva.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746667/assets_task_01k0bw6076egsb60vzqnzaere1_1752745437_img_1_hnzmsi.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746668/assets_task_01k0bwkp4xffv9xm0vsvgf7rwv_1752745965_img_1_dj5kxl.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746665/assets_task_01k0bwy31xeaj8j5emma4n50kj_1752746300_img_1_iukgwg.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746664/assets_task_01k0bwbndhe4j8j41pr5eyz400_1752745697_img_0_bv3pw9.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746660/assets_task_01k0bwy31xeaj8j5emma4n50kj_1752746300_img_0_dc00c7.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752746659/assets_task_01k0bx5ja1f2sb1an7k9pbam7v_1752746548_img_0_i41lby.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752747103/assets_task_01k0bxdv6me12sqwv1bqgbnshz_1752746820_img_1_tvx3q9.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752747189/assets_task_01k0bxp1cfeykv9g18t331svx0_1752747089_img_1_soq9zi.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752747550/assets_task_01k0bxyv9jf6qt28cz17ydz4d4_1752747383_img_0_crbka8.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752747788/assets_task_01k0by8zv1fnevde246k24nz41_1752747703_img_0_xn9qlz.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752747791/assets_task_01k0by8zv1fnevde246k24nz41_1752747703_img_1_lrd0wy.webp",
  "https://res.cloudinary.com/dcgrzxf9v/image/upload/v1752748985/40352b28-97b0-4f60-a207-a33171c1f83b_xddphe.png",
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
