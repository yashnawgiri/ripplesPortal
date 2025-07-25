import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import MemoizedImage from "@/components/ui/MemoizedImages";

interface FloatingPhoneProps {
  delay: number;
  content: {
    image: string;
    username: string;
    likes: string;
    caption: string;
    platform: "instagram" | "facebook" | "reels";
    isVideo?: boolean;
    profileImage?: string;
  };
  className?: string;
  size?: "small" | "medium" | "large";
  animationDuration?: number;
}

const FloatingPhone = memo(function FloatingPhone({
  delay,
  content,
  className = "",
  size = "medium",
  animationDuration = 20,
}: FloatingPhoneProps) {
  const sizeClasses = {
    small: "w-32 h-64",
    medium: "w-40 h-80",
    large: "w-44 h-88",
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamically adjust animation parameters for mobile
  const scrollDistance = isMobile ? -1000 : -2000;
  const scrollSpeed = isMobile ? 30 : animationDuration;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{ y: [0, scrollDistance] }}
        transition={{
          duration: scrollSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: delay * 0.5,
        }}
        className={`relative ${sizeClasses[size]} overflow-hidden rounded-lg shadow-2xl`}
        style={{
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div className="w-full h-full overflow-hidden relative">
          <div className="h-full relative">
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MemoizedImage
                src={content.image}
                alt="Creator content"
                className="max-w-full max-h-full object-contain rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

              {content.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
            </div>

            {/* Top Bar - Commented out */}
            {/* <div className="absolute top-0 left-0 right-0 z-20 pt-8">
              {(content.platform === "reels" || content.platform === "facebook") && (
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center"> 
                    <span className="text-white text-sm font-medium">{content.username}</span>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-white" />
                </div>
              )}
            </div> */}

            {/* Bottom UI - Commented out */}
            {/* <div className="absolute bottom-0 left-0 right-0 z-20">
              {content.platform === "instagram" && (
                <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center mb-3">
                   
                    <span className="text-white text-sm font-medium">{content.username}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <Heart className="w-6 h-6 text-white" />
                      <MessageCircle className="w-6 h-6 text-white" />
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <Bookmark className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white text-sm font-medium mb-1">{content.likes} likes</div>
                </div>
              )}

              {(content.platform === "reels" || content.platform === "facebook") && (
                <>
                  <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
                    <div className="flex flex-col items-center">
                      <Heart className="w-7 h-7 text-white mb-1" />
                      <span className="text-white text-xs">{content.likes}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-7 h-7 text-white mb-1" />
                      <span className="text-white text-xs">89</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Share2 className="w-7 h-7 text-white mb-1" />
                      <span className="text-white text-xs">12</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2"></div>
                      <span className="text-white text-sm">{content.username}</span>
                    </div>
                    <p className="text-white text-sm mt-1 opacity-90">{content.caption}</p>
                  </div>
                </>
              )}
            </div> */}

            {/* Facebook logo - Commented out */}
            {/* {content.platform === "facebook" && (
              <div className="absolute top-12 right-4 z-20">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Phone reflection - Commented out */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[1.75rem] pointer-events-none"></div> */}
      </motion.div>
    </motion.div>
  );
});

export default FloatingPhone;
