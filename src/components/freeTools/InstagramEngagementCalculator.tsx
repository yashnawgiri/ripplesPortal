import type { EngagementData } from "../../types";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaHeart,
  FaComment,
  FaImage,
  FaLock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import { fetchInstagramProfile } from "../../components/action/instagram";

import { ReportRequestModal } from "./ReportRequestModal";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Alert, AlertDescription } from "@/components/ui/Alert";

export function InstagramEngagementCalculator() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EngagementData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!username) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchInstagramProfile(username);

      setData(result);
    } catch (err) {
      console.error("Error in component:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch Instagram data",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Excellent":
        return "bg-success";
      case "Good":
        return "bg-success/80";
      case "Average":
        return "bg-warning";
      case "Poor":
        return "bg-destructive";
      default:
        return "bg-gray-400";
    }
  };

  const getQualityDescription = (quality: string) => {
    switch (quality) {
      case "Excellent":
        return "This account has exceptional engagement! It's in the top tier of Instagram profiles.";
      case "Good":
        return "This account has strong engagement, performing better than average.";
      case "Average":
        return "This account has typical engagement levels for Instagram.";
      case "Poor":
        return "This account has below-average engagement and could be improved.";
      default:
        return "";
    }
  };

  const shareOnWhatsApp = () => {
    if (!data) return;

    const text = `Check out @${data.username}'s Instagram engagement stats:
• Engagement Rate: ${data.engagementRate}% (${data.engagementQuality})
• Followers: ${data.followers.toLocaleString()}
• Likes per post: ${data.likesPerPost}
• Comments per post: ${data.commentsPerPost}

Analyze your own profile at: https://free-tools.goripples.com/tools/instagram-engagement`;

    const encodedText = encodeURIComponent(text);

    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  const shareByEmail = () => {
    if (!data) return;

    const subject = `Instagram Engagement Stats for @${data.username}`;
    const body = `Check out @${data.username}'s Instagram engagement stats:

• Engagement Rate: ${data.engagementRate}% (${data.engagementQuality})
• Followers: ${data.followers.toLocaleString()}
• Likes per post: ${data.likesPerPost}
• Comments per post: ${data.commentsPerPost}

Analyze your own profile at: https://free-tools.goripples.com/tools/instagram-engagement`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    window.location.href = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
  };

  // Format the cached timestamp to a readable date
  const formatCachedDate = (timestamp: number | undefined) => {
    if (!timestamp) return "N/A";

    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto text-white relative pt-12">
        {/* Enhanced animated background gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[150px] animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            style={{ animationDelay: "0s" }}
            transition={{ duration: 1 }}
          />
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px] animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            style={{ animationDelay: "1s" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Enhanced Search Section with better input design */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 w-full max-w-xl mx-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-row shadow-3xl rounded-2xl overflow-hidden border border-white/10 bg-primary/80 backdrop-blur-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-0"
              style={{
                background:
                  "linear-gradient(91.78deg, #7214FF -10.05%, #CA00E8 150.35%)",
              }}
            >
              <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg" />
            </div>
            <Input
              className="flex-1 bg-transparent text-white py-2 sm:py-3 px-3 sm:px-4 h-10 sm:h-12 text-sm sm:text-base border-0 focus:ring-2 focus:ring-secondary focus:outline-none placeholder:text-gray-400 transition-all duration-300 rounded-none shadow-none min-w-0"
              placeholder="Enter Instagram username"
              style={{
                background: "rgba(14, 19, 48, 0.85)",
                backdropFilter: "blur(8px)",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <motion.div
              className="transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97, boxShadow: "0 0 0 8px #CA00E833" }}
            >
              <Button
                className="h-10 sm:h-12 px-3 sm:px-6 text-sm sm:text-base font-semibold rounded-none rounded-r-2xl border-0 shadow-lg text-white"
                disabled={isLoading || !username}
                style={{
                  background:
                    "linear-gradient(91.78deg, #7214FF -10.05%, #CA00E8 150.35%)",
                }}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Check"
                )}
              </Button>
            </motion.div>
          </motion.div>

          {error && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                className="mt-6 bg-destructive/20 border border-destructive/30 backdrop-blur-xl text-white"
                variant="destructive"
              >
                <FaExclamationTriangle className="h-5 w-5" />
                <AlertDescription className="font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Results Card with more animations */}
        {data && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex justify-center px-2 sm:px-0"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="overflow-hidden w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] rounded-2xl">
              <CardContent className="p-0">
                {/* Enhanced Profile Header with animations */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-primary/30 to-secondary/30 p-8 text-center relative overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                  <motion.div
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    initial={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <img
                      alt={data.username}
                      className="w-full h-full object-cover"
                      src={data.profilePicUrl || "/placeholder.svg"}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary mr-3 flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">@</span>
                      </div>
                      <span className="font-bold text-2xl text-white">
                        {data.username}
                      </span>
                      {data.isVerified && (
                        <motion.div
                          animate={{ scale: 1 }}
                          className="ml-3 text-secondary"
                          initial={{ scale: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          <FaCheckCircle className="h-6 w-6" />
                        </motion.div>
                      )}
                    </div>
                    {data.fullName && (
                      <p className="text-lg text-gray-200 mt-2">
                        {data.fullName}
                      </p>
                    )}
                  </motion.div>
                  {data.biography && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="text-gray-200 mt-4 max-h-24 overflow-y-auto"
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {data.biography}
                    </motion.div>
                  )}
                </motion.div>

                {/* Enhanced Stats Section */}
                <div className="p-8">
                  <div className="text-center mb-10">
                    <h3 className="text-secondary font-semibold mb-4 text-xl">
                      Engagement Rate
                    </h3>
                    <div className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      {data.engagementRate}%
                    </div>
                    <div
                      className={`px-6 py-2 rounded-full text-base ${getQualityColor(data.engagementQuality)} text-white mb-4 inline-block backdrop-blur-sm shadow-lg`}
                    >
                      {data.engagementQuality}
                    </div>
                    <p className="text-gray-200">
                      {getQualityDescription(data.engagementQuality)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors duration-300">
                      <span className="text-gray-300 mb-2">Followers</span>
                      <span className="font-bold text-2xl text-white">
                        {data.followers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors duration-300">
                      <span className="text-gray-300 mb-2">Following</span>
                      <span className="font-bold text-2xl text-white">
                        {data.following?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: FaHeart,
                        label: "Likes/post",
                        value: data.likesPerPost,
                      },
                      {
                        icon: FaComment,
                        label: "Comments/post",
                        value: data.commentsPerPost,
                      },
                      {
                        icon: FaImage,
                        label: "Posts",
                        value: data.mediaCount || "N/A",
                      },
                      {
                        icon: FaLock,
                        label: "Private",
                        value: data.isPrivate ? "Yes" : "No",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-between items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center mr-4 shadow-lg">
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-medium text-white">
                            {item.label}
                          </span>
                        </div>
                        <div className="font-bold text-2xl text-white">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Share Section */}
                  <div className="mt-10 space-y-4">
                    <div className="text-center mb-4 text-white font-semibold text-lg">
                      Share Results
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        className="flex items-center justify-center p-4 bg-[#25D366]/20 text-white rounded-xl hover:bg-[#25D366]/30 transition-all duration-300 backdrop-blur-sm border border-[#25D366]/30 shadow-lg hover:shadow-xl"
                        onClick={shareOnWhatsApp}
                      >
                        <FaWhatsapp className="h-6 w-6 mr-3" />
                        <span className="font-medium">WhatsApp</span>
                      </button>
                      <button
                        className="flex items-center justify-center p-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl"
                        onClick={shareByEmail}
                      >
                        <FaEnvelope className="h-6 w-6 mr-3" />
                        <span className="font-medium">Email</span>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Call to Action */}
                  <Button
                    className="w-full mt-8 bg-secondary text-white h-14 text-lg font-medium shadow-xl hover:scale-105 transition-all duration-500 rounded-xl"
                    onClick={() => setIsModalOpen(true)}
                  >
                    GET DETAILED REPORT
                  </Button>

                  {data.cachedTimestamp && (
                    <div className="text-sm text-gray-400 text-center mt-6">
                      Data last updated:{" "}
                      {formatCachedDate(data.cachedTimestamp)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Report Request Modal */}
        {data && (
          <ReportRequestModal
            isOpen={isModalOpen}
            username={data.username}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
