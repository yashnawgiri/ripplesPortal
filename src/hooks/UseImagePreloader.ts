import { useEffect, useRef } from "react";

export function useImagePreloader(imageUrls: string[]) {
  const preloadedImages = useRef<Set<string>>(new Set());

  useEffect(() => {
    const preloadImage = (url: string) => {
      if (preloadedImages.current.has(url)) return;

      const img = new Image();
      img.onload = () => {
        preloadedImages.current.add(url);
      };
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
      };
      img.src = url;
    };

    // Preload all images
    imageUrls.forEach(preloadImage);

    return () => {
      // Cleanup if needed
      preloadedImages.current.clear();
    };
  }, [imageUrls]);

  return preloadedImages.current;
}
