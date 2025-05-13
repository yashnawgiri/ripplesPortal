import { useState } from "react";
import {
  X,
  Users,
  Heart,
  MessageCircle,
  Mail,
  AlertTriangle,
  ImageIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { fetchInstagramProfile } from "../../components/action/instagram";
import type { EngagementData } from "../../types";
import { ReportRequestModal } from "./ReportRequestModal";
import { Input } from "@/components/ugc-landing/ui/input";
import { Button } from "@/components/ugc-landing/ui/button";
import { Card, CardContent } from "@/components/ugc-landing/ui/card";
import { Alert, AlertDescription } from "@/components/ugc-landing/ui/alert";

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
        err instanceof Error ? err.message : "Failed to fetch Instagram data"
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
        {/* Animated background gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* Search Section */}
        <div className="relative mb-12 max-w-xl mx-auto transform hover:scale-[1.02] transition-all duration-300 rounded-l-xl rounded-r-none">
          <div className="flex shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-xl">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 bg-primary flex items-center ">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Instagram username"
                className="pl-20 pr-12 text-white py-6 rounded-l-xl rounded-r-none h-16 text-lg bg-transparent backdrop-blur-xl transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              {username && (
                <button
                  onClick={() => setUsername("")}
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  <X className="h-6 w-6 text-gray-400 hover:text-white transition-colors duration-300" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !username}
              className="rounded-l-none h-16 bg-secondary  text-white px-8 text-lg font-medium transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Check"
              )}
            </Button>
          </div>

          {error && (
            <Alert className="mt-6 bg-destructive/10 border border-destructive/20 backdrop-blur-xl text-white animate-fadeIn">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertDescription className="font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Results Card */}
        {data && (
          <div className="flex justify-center animate-fadeIn">
            <Card className="overflow-hidden max-w-md w-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
              <CardContent className="p-0">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-primary/20  p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                  <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={data.profilePicUrl || "/placeholder.svg"}
                      alt={data.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-secondary mr-3 flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">@</span>
                      </div>
                      <span className="font-bold text-2xl text-white">
                        {data.username}
                      </span>
                      {data.isVerified && (
                        <div className="ml-3 text-secondary">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    {data.fullName && (
                      <p className="text-lg text-gray-300 mt-2">
                        {data.fullName}
                      </p>
                    )}
                  </div>
                  {data.biography && (
                    <div className="text-gray-300 mt-4 max-h-24 overflow-y-auto">
                      {data.biography}
                    </div>
                  )}
                </div>

                {/* Stats Section */}
                <div className="p-8">
                  <div className="text-center mb-10">
                    <h3 className="text-secondary font-semibold mb-4 text-xl">
                      Engagement Rate
                    </h3>
                    <div className="text-7xl font-bold mb-4  text-white">
                      {data.engagementRate}%
                    </div>
                    <div
                      className={`px-6 py-2 rounded-full text-base ${getQualityColor(data.engagementQuality)} text-white mb-4 inline-block backdrop-blur-sm`}
                    >
                      {data.engagementQuality}
                    </div>
                    <p className="text-gray-300">
                      {getQualityDescription(data.engagementQuality)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <span className="text-gray-400 mb-2">Followers</span>
                      <span className="font-bold text-2xl text-white">
                        {data.followers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <span className="text-gray-400 mb-2">Following</span>
                      <span className="font-bold text-2xl text-white">
                        {data.following?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Heart, label: "Likes/post", value: data.likesPerPost },
                      { icon: MessageCircle, label: "Comments/post", value: data.commentsPerPost },
                      { icon: ImageIcon, label: "Posts", value: data.mediaCount || "N/A" },
                      { icon: XCircle, label: "Private", value: data.isPrivate ? "Yes" : "No" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4">
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-medium text-white">{item.label}</span>
                        </div>
                        <div className="font-bold text-2xl text-white">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Share Section */}
                  <div className="mt-10 space-y-4">
                    <div className="text-center mb-4 text-white font-semibold text-lg">
                      Share Results
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={shareOnWhatsApp}
                        className="flex items-center justify-center p-4 bg-[#25D366] bg-opacity-20 text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm border border-[#25D366]/30"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-3"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span className="font-medium">WhatsApp</span>
                      </button>
                      <button
                        onClick={shareByEmail}
                        className="flex items-center justify-center p-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/30"
                      >
                        <Mail className="h-6 w-6 mr-3" />
                        <span className="font-medium">Email</span>
                      </button>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <Button
                    className="w-full mt-8 bg-secondary hover:from-secondary hover:to-primary text-white h-14 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-500 rounded-xl"
                    onClick={() => setIsModalOpen(true)}
                  >
                    GET DETAILED REPORT
                  </Button>

                  {data.cachedTimestamp && (
                    <div className="text-sm text-gray-400 text-center mt-6">
                      Data last updated: {formatCachedDate(data.cachedTimestamp)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Report Request Modal */}
        {data && (
          <ReportRequestModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            username={data.username}
          />
        )}
      </div>
    </div>
  );
}
