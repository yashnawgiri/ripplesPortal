import { useEffect, useState } from "react";
import { FaFacebook, FaGift, FaLink, FaLinkedin } from "react-icons/fa";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import {
  fetchRewardProgramDetailService,
  ReferralEligible,
  RewardType,
} from "@/services/apiService";
import { copyToClipboard, organizeRewardData } from "@/utils/utils";
import { CopyIcon, TwitterIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

interface Props {
  rewardString: string;
  link: string;
  brandId: number;
  referredUsers: number;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

type Rewards = {
  type: RewardType;
  amount: number;
  milestone: number | null;
  referralEligible: ReferralEligible;
};

export default function ReferralPopup({
  rewardString,
  brandId,
  link,
  referredUsers,
  isOpen,
  onClose,
}: Props) {
  const [rewards, setRewards] = useState<Rewards[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchRewardDetail = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("authToken") || "";
      const response = await fetchRewardProgramDetailService(
        link.split("=")[1],
        brandId.toString(),
        token,
      );

      setRewards(organizeRewardData(response.data));
    } catch (error) {
      console.error("Error fetching rewards:", error);
      setError("Failed to load reward details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRewardDetail();
    }
  }, [isOpen]);

  const handleCopy = async () => {
    await copyToClipboard(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform: string) => {
    const text = encodeURIComponent(
      `Check out this amazing offer! ${rewardString}`,
    );
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(link)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    };

    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <Modal
      className="bg-gray-900 text-white"
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
    >
      <ModalHeader className="flex flex-col items-center gap-1 border-gray-700">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
          <FaGift color="white" size={20} />
        </div>
        <h2 className="text-xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {rewardString}
        </h2>
        <p className="text-sm text-gray-400 text-center">
          Share with friends and both of you will get rewards on your next
          purchase!
        </p>
      </ModalHeader>
      <ModalBody>
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-full h-32 animate-pulse bg-gray-800 rounded-lg"
              />
            ))}
          </div>
        ) : (
          <>
            <p className="text-center text-white font-semibold text-md">
              Unlock Amazing Rewards
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-h-80 md:max-h-64 overflow-y-auto">
              {rewards.map((item, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 ${
                    referredUsers >= (item.milestone || 1)
                      ? "border-blue-500"
                      : "border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">
                      {item.milestone ? `${item.milestone}th` : "Every"}{" "}
                      Referral
                    </h3>
                    <span className="text-2xl font-bold text-blue-500">
                      {item.type === "FIXED_INR"
                        ? `₹${item.amount}`
                        : `${item.amount}%`}
                    </span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                        style={{
                          width: `${(referredUsers / (item.milestone || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    {index !== 0 && (
                      <p className="text-xs text-gray-400">
                        {`${referredUsers} of ${item.milestone} `}
                        referrals completed
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white font-semibold flex gap-3 items-center justify-center">
              <FaLink /> Share your Referral Link
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  readOnly
                  className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-lg"
                  value={link}
                />
                <button
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title={copied ? "Copied!" : "Copy link"}
                  onClick={handleCopy}
                >
                  <CopyIcon />
                </button>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Share on Facebook"
                  onClick={() => shareOnSocial("facebook")}
                >
                  <FaFacebook size={20} />
                </button>
                <button
                  className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  title="Share on Twitter"
                  onClick={() => shareOnSocial("twitter")}
                >
                  <TwitterIcon size={20} />
                </button>
                <button
                  className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  title="Share on LinkedIn"
                  onClick={() => shareOnSocial("linkedin")}
                >
                  <FaLinkedin size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </ModalBody>
      <ModalFooter className="border-gray-700">
        <Button>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
