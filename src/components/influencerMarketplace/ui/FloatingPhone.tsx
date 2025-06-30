 

import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  MoreHorizontal,
} from "lucide-react";
import { getRandomCreatorImage } from "@/lib/influencerMarketplace/creatorImages";
import { useMemo } from "react";

interface FloatingPhoneProps {
  delay: number;
  content: {
    image: string;
    username: string;
    likes: string;
    caption: string;
    platform: "instagram" | "tiktok" | "reels";
    isVideo?: boolean;
    profileImage?: string;
  };
  className?: string;
  size?: "small" | "medium" | "large";
  animationDuration?: number;
  useCSSAnimation?: boolean;
  animationClass?: string;
  disableEntranceAnimation?: boolean;
}

export default function FloatingPhone({
  delay,
  content,
  className = "",
  size = "medium",
  animationDuration = 20,
  useCSSAnimation = false,
  animationClass = "",
  disableEntranceAnimation = false,
}: FloatingPhoneProps) {
  const sizeClasses = {
    small: "w-32 h-64",
    medium: "w-40 h-80",
    large: "w-44 h-88",
  };

  // Get a random image for this phone instance
  const randomImage = useMemo(() => getRandomCreatorImage(), []);

  // CSS animation styles for better performance
  const cssAnimationStyle = useCSSAnimation
    ? {
        animationDelay: `${delay}s`,
      }
    : {};

  return (
    <motion.div
      initial={
        disableEntranceAnimation
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 100, scale: 0.8 }
      }
      animate={
        disableEntranceAnimation
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={
        disableEntranceAnimation
          ? {}
          : {
              duration: 0.8,
              delay,
              ease: "easeOut",
            }
      }
      className={`relative ${className}`}
    >
      {/* Phone Container with optimized animation */}
      <motion.div
        animate={
          useCSSAnimation
            ? {}
            : {
                y: [0, -2000], // Move upward infinitely
              }
        }
        transition={
          useCSSAnimation
            ? {}
            : {
                duration: animationDuration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: disableEntranceAnimation ? 0 : delay * 0.5,
              }
        }
        style={{
          ...cssAnimationStyle,
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
        className={`relative ${
          sizeClasses[size]
        } bg-black rounded-[1.75rem] p-1 shadow-2xl ${
          useCSSAnimation ? animationClass : "animate-float"
        }`}
      >
        {/* Phone Screen */}
        <div className="w-full h-full bg-black rounded-[1.5rem] overflow-hidden relative">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-full z-30"></div>

          {/* Content Area */}
          <div className="h-full relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={randomImage || "/placeholder.svg"}
                alt="Creator content"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

              {/* Video play indicator */}
              {content.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
            </div>

            {/* Top UI Elements */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-8">
              {/* Stories/Reels Header */}
              {(content.platform === "reels" ||
                content.platform === "tiktok") && (
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2 border-2 border-white"></div>
                    <span className="text-white text-sm font-medium">
                      {content.username}
                    </span>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Bottom UI Elements */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
              {content.platform === "instagram" && (
                <>
                  {/* Instagram Post UI */}
                  <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
                    {/* Profile info */}
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-3 border border-white"></div>
                      <span className="text-white text-sm font-medium">
                        {content.username}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <Heart className="w-6 h-6 text-white" />
                        <MessageCircle className="w-6 h-6 text-white" />
                        <Share2 className="w-6 h-6 text-white" />
                      </div>
                      <Bookmark className="w-6 h-6 text-white" />
                    </div>

                    {/* Likes */}
                    <div className="text-white text-sm font-medium mb-1">
                      {content.likes} likes
                    </div>
                  </div>
                </>
              )}

              {(content.platform === "reels" ||
                content.platform === "tiktok") && (
                <>
                  {/* Reels/TikTok UI */}
                  <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
                    <div className="flex flex-col items-center">
                      <Heart className="w-7 h-7 text-white mb-1" />
                      <span className="text-white text-xs">
                        {content.likes}
                      </span>
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

                  {/* Bottom caption area */}
                  <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2"></div>
                      <span className="text-white text-sm">
                        {content.username}
                      </span>
                    </div>
                    <p className="text-white text-sm mt-1 opacity-90">
                      {content.caption}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Platform-specific indicators */}
            {content.platform === "tiktok" && (
              <div className="absolute top-12 right-4 z-20">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">♪</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Phone Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[1.75rem] pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
}
