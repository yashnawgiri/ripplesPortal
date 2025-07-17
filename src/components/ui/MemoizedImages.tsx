import { memo, useState } from "react";

interface MemoizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const MemoizedImage = memo(function MemoizedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  onError,
  onLoad,
}: MemoizedImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    onError?.(e);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onLoad?.(e);
  };

  return (
    <img
      src={imageError ? "/placeholder.svg" : src}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
});

export { MemoizedImage as default, MemoizedImage };
