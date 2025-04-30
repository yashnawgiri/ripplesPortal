import type React from "react";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link,
  Share2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@nextui-org/react";
import { CardContent } from "@/components/ugc-landing/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ugc-landing/ui/input";
import { Button } from "@/components/ugc-landing/ui/button";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaReddit,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  generateAffiliateLink,
  getAffiliateRewardsService,
} from "@/services/apiService";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ugc-landing/ui/spinner";

interface MilestoneReward {
  reward_details: {
    giftType?: "product" | "bonus";
    type: string;
    amount: number;
    product?: {
      id: string;
      title: string;
      handle: string;
      images: Array<{
        id: string;
        originalSrc: string;
        altText: string;
      }>;
      variants: Array<{
        price: string;
      }>;
    };
  };
  milestone_details?: {
    nth: number;
  };
  referral_eligible?: string;
}

const getOrdinalSuffix = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const MilestoneRewards = ({
  rewards,
  brandIdentifier,
}: {
  rewards: MilestoneReward[];
  brandIdentifier: string;
}) => {
  return (
    <motion.div
      className="mt-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-center">Milestone Rewards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl m-2">
        {rewards.map((reward, index) => {
          if (reward.reward_details.product) {
            const product = reward.reward_details.product;
            const nth = reward.milestone_details?.nth || 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={product.images[0]?.originalSrc}
                      alt={product.images[0]?.altText || product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{product.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 font-bold">
                      {getOrdinalSuffix(nth)} Referral Reward
                    </p>
                    <p className="text-sm text-gray-600">
                      Value: ₹{product.variants[0]?.price}
                    </p>
                    <a
                      href={`https://${brandIdentifier}.myshopify.com/products/${product.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View Product
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          } else if (reward.reward_details.giftType === "bonus") {
            const rewardAmount = reward.reward_details.type === "FIXED_INR" ? "₹" + reward.reward_details.amount : reward.reward_details.amount + "%";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <span className="text-3xl">₹</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Bonus</h4>
                    <p className="text-sm text-gray-600 mt-1 font-bold">
                      {reward.milestone_details?.nth
                        ? getOrdinalSuffix(reward.milestone_details?.nth)
                        : "Every "}{" "}
                      Referral Reward
                    </p>
                    <p className="text-sm text-gray-600">
                      Value: {rewardAmount}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          }
        })}
      </div>
    </motion.div>
  );
};

export interface AffiliateRewards {
  reward_program_id: number;
  active_version: number;
  brand_id: number;
  brand_name: string;
  brand_identifier: string;
  referred_user_rewards: {
    reward_details: {
      type: string;
      amount: number;
    }
  };
  referring_user_commission: MilestoneReward[];
  name: string;
  min_amount: number | null;
  created_at: string;
  updated_at: string;
}

export function AffiliateGenerator() {
  const { brand_id, referral_program_id } = useParams();
  const [affiliateRewards, setAffiliateRewards] = useState<AffiliateRewards | null>(null);
  const [affiliateLink, setAffiliateLink] = useState("");
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "success">("form");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const affiliateLinkResponse = await generateAffiliateLink(
        String(brand_id),
        String(referral_program_id),
        {
          name: formData.firstName,
          email: formData.email,
          contact_number: formData.phoneNumber,
        }
      );
      console.log(affiliateLinkResponse, "from the affiliateLinkResponse");
      setAffiliateLink(affiliateLinkResponse.data.link);
      setIsLoading(false);
      setStep("success");
    } catch (error: any) {
      console.error("Error generating affiliate link:", error);
      setError(error.response?.data?.message || "Failed to generate affiliate link");
      setIsLoading(false);

      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to generate affiliate link",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setIsCopied(true);
    toast({
      title: "Link copied!",
      description: "Your affiliate link has been copied to clipboard.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this great offer!",
          text: `Get ${referralAmount} off. Use my link!`,
          url: affiliateLink,
        })
        .catch(console.error);
    } else {
      copyToClipboard();
      toast({
        title: "Ready to share!",
        description: "Link copied. Paste it in your preferred app to share.",
      });
    }
  };

  // Social media sharing functions
  const shareVia = {
    twitter: () =>
      window.open(
        `https://twitter.com/intent/tweet?text=Get ${referralAmount} off. Use my link! ${encodeURIComponent(affiliateLink)}`,
        "_blank"
      ),
    facebook: () =>
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}&quote=Get ${referralAmount} off. Use my link!`,
        "_blank"
      ),
    linkedin: () =>
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(affiliateLink)}`,
        "_blank"
      ),
    whatsapp: () =>
      window.open(
        `https://wa.me/?text=Get ${referralAmount} off. Use my link! ${encodeURIComponent(affiliateLink)}`,
        "_blank"
      ),
    telegram: () =>
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(affiliateLink)}&text=Get ${referralAmount} off. Use my link!`,
        "_blank"
      ),
    reddit: () =>
      window.open(
        `https://www.reddit.com/submit?url=${encodeURIComponent(affiliateLink)}&title=Get ${referralAmount} off. Use my link!`,
        "_blank"
      ),
    email: () =>
      window.open(
        `mailto:?subject=Get ${referralAmount} off. Use my link!&body=Use my link: ${encodeURIComponent(affiliateLink)}`,
        "_blank"
      ),
    sms: () =>
      window.open(
        `sms:?body=Get ${referralAmount} off. Use my link: ${encodeURIComponent(affiliateLink)}`,
        "_blank"
      ),
    instagram: () => {
      copyToClipboard();
      toast({
        title: "Link copied for Instagram!",
        description:
          "Open Instagram and paste the link in your story or direct message.",
      });
    },
  };

  const socialPlatforms = [
    {
      name: "Twitter",
      icon: <FaXTwitter className="h-5 w-5" />,
      color: "#1DA1F2",
      action: shareVia.twitter,
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="h-5 w-5" />,
      color: "#4267B2",
      action: shareVia.facebook,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="h-5 w-5" />,
      color: "#25D366",
      action: shareVia.whatsapp,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="h-5 w-5" />,
      color: "#0077B5",
      action: shareVia.linkedin,
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane className="h-5 w-5" />,
      color: "#0088cc",
      action: shareVia.telegram,
    },
    {
      name: "Reddit",
      icon: <FaReddit className="h-5 w-5" />,
      color: "#FF4500",
      action: shareVia.reddit,
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="h-5 w-5" />,
      color: "#E1306C",
      action: shareVia.instagram,
    },
    {
      name: "Email",
      icon: <FaEnvelope className="h-5 w-5" />,
      color: "#BB001B",
      action: shareVia.email,
    },
    {
      name: "SMS",
      icon: <FaPaperPlane className="h-5 w-5" />,
      color: "#37474F",
      action: shareVia.sms,
    },
  ];

  const referralAmount =
    affiliateRewards &&
    affiliateRewards?.referred_user_rewards?.reward_details?.type ===
      "FIXED_INR"
      ? "₹" + affiliateRewards?.referred_user_rewards?.reward_details?.amount
      : affiliateRewards?.referred_user_rewards?.reward_details?.amount + "%";
  const commissionAmount =
    affiliateRewards &&
    affiliateRewards?.referring_user_commission[0]?.reward_details?.type ===
      "FIXED_INR"
      ? "₹" +
        affiliateRewards?.referring_user_commission[0]?.reward_details?.amount
      : affiliateRewards?.referring_user_commission[0].reward_details?.amount +
        "%";
  console.log(
    affiliateRewards?.referring_user_commission[0]?.reward_details?.type,
    "from the affiliateRewards"
  );

  useEffect(() => {
    const fetchAffiliateRewards = async () => {
      try {
        setIsLoading(true);
        const affiliateRewards = await getAffiliateRewardsService(
          String(brand_id),
          String(referral_program_id)
        );
        console.log(affiliateRewards, "from the affiliateRewards");
        if (affiliateRewards.data) {
          setAffiliateRewards(affiliateRewards.data as any);
        }
      } catch (error: any) {
        console.error("Error fetching affiliate rewards:", error);
        setError(error.response?.data?.message || "Failed to load referral program");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAffiliateRewards();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden border-none shadow-2xl">
            <div className="bg-red-500 text-white p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">
                Error Loading Referral Program
              </h2>
              <p className="text-center text-white/90">{error}</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">
                The referral program could not be loaded. This link may be
                invalid or expired.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="w-full"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Spinner className="h-12 w-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Loading Referral Program
          </h2>
          <p className="text-gray-600">
            Please wait while we set up your referral experience...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto md:px-4 md:py-8">
      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-none shadow-2xl">
              <motion.div
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-8 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-grid-white/[0.05] bg-grid text-white"
                  style={{ backgroundSize: "30px 30px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />

                <motion.div
                  className="text-center relative z-10 px-6 py-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <motion.div
                    className="capitalize mb-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: "2.5rem" }}
                  >
                    <div className="font-bold">
                      {affiliateRewards?.brand_name}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-3"
                  >
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full  text-xl font-medium">
                      Referral Program
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-xl font-medium">
                      Give{" "}
                      <span className="text-yellow-300 font-bold">
                        {referralAmount}
                      </span>{" "}
                      off, Get{" "}
                      <span className="text-yellow-300 font-bold">
                        {commissionAmount}
                      </span>{" "}
                      cash
                    </p>
                    <p className="text-white">
                      Refer friends, family and followers, earn rewards with
                      every purchase
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <CardContent className="p-8 pt-6 bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        Your First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        className="h-12 text-lg"
                      />
                      <p className="text-sm text-gray-500">
                        Friends will be able to see this when you share links
                      </p>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                        className="h-12 text-lg"
                      />
                      <p className="text-sm text-gray-500">
                        We will send your notifications here
                      </p>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label
                        htmlFor="phoneNumber"
                        className="text-sm font-medium"
                      >
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        className="h-12 text-lg"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-14 text-lg font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span>Generating link...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <span>Activate and Share</span>
                            <Link className="h-5 w-5" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  <motion.div
                    className="mt-8 border-t pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3 className="text-lg font-semibold text-center mb-4">How It Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="font-bold text-blue-600">1</span>
                        </div>
                        <h4 className="font-medium mb-1">Get your link</h4>
                        <p className="text-sm text-gray-600">Your referral link will appear after activation.</p>
                      </div>
                      <div className="text-center p-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="font-bold text-blue-600">2</span>
                        </div>
                        <h4 className="font-medium mb-1">Share the link</h4>
                        <p className="text-sm text-gray-600">Send it via text or share on your social media.</p>
                      </div>
                      <div className="text-center p-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="font-bold text-blue-600">3</span>
                        </div>
                        <h4 className="font-medium mb-1">Get paid for referrals</h4>
                        <p className="text-sm text-gray-600">Receive your earnings when friends make purchases.</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-700">
                        <span className="font-semibold">Note:</span> You'll receive rewards after referred friends make a purchase and the return period is over.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-none shadow-2xl">
              <motion.div
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-8 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-grid-white/[0.05] bg-grid text-white   "
                  style={{ backgroundSize: "30px 30px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />

                <motion.div
                  className="text-center relative z-10 px-6 py-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <motion.div
                    className="capitalize mb-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: "2.5rem" }}
                  >
                    <div className="font-bold">
                      {affiliateRewards?.brand_name}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-3"
                  >
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white">
                      Referral Program
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-xl font-medium">
                      Give{" "}
                      <span className="text-yellow-300 font-bold">
                        {referralAmount}
                      </span>{" "}
                      off, Get{" "}
                      <span className="text-yellow-300 font-bold">
                        {commissionAmount}
                      </span>{" "}
                      cash
                    </p>
                    <p className="text-white">
                      Refer friends, family and followers, earn rewards with
                      every purchase
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <CardContent className="p-8 pt-6 bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-8"
                >
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <div className="flex items-center gap-3 text-green-600 font-medium bg-green-50 p-4 rounded-lg">
                      <CheckCircle2 className="h-6 w-6" />
                      <span>Your affiliate gift has been approved.</span>
                    </div>

                    <div className="flex items-stretch">
                      <div className="flex-1 border rounded-l-lg bg-gray-50 p-4 truncate text-base">
                        {affiliateLink}
                      </div>
                      <Button
                        onClick={copyToClipboard}
                        variant="secondary"
                        className="rounded-l-none h-auto px-6"
                      >
                        {isCopied ? "Copied!" : "Copy"}
                      </Button>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={shareLink}
                        className="flex-1 h-14 text-lg font-medium"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <span>Share Now</span>
                          <Share2 className="h-5 w-5" />
                        </div>
                      </Button>
                    </div>

                    <motion.div
                      className="mt-8 space-y-6 mx-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex flex-wrap justify-center items-center gap-4">
                        {socialPlatforms.map((platform) => (
                          <button
                            key={platform.name}
                            onClick={platform.action}
                            className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            title={`Share via ${platform.name}`}
                          >
                            <span
                              className="flex items-center justify-center w-10 h-10 rounded-full text-white"
                              style={{ backgroundColor: platform.color }}
                            >
                              {platform.icon}
                            </span>
                            <span className="text-xs font-medium text-gray-600">
                              {platform.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="mt-8 border-t pt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="text-lg font-semibold text-center mb-4">How It Works</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="font-bold text-blue-600">1</span>
                          </div>
                          <h4 className="font-medium mb-1">Get your link</h4>
                          <p className="text-sm text-gray-600">Your referral link will appear after activation.</p>
                        </div>
                        <div className="text-center p-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="font-bold text-blue-600">2</span>
                          </div>
                          <h4 className="font-medium mb-1">Share the link</h4>
                          <p className="text-sm text-gray-600">Send it via text or share on your social media.</p>
                        </div>
                        <div className="text-center p-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="font-bold text-blue-600">3</span>
                          </div>
                          <h4 className="font-medium mb-1">Get paid for referrals</h4>
                          <p className="text-sm text-gray-600">Receive your earnings when friends make purchases.</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">Note:</span> You'll receive rewards after referred friends make a purchase and the return period is over.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {affiliateRewards?.referring_user_commission && (
          <MilestoneRewards
            rewards={affiliateRewards.referring_user_commission}
            brandIdentifier={affiliateRewards.brand_identifier}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
