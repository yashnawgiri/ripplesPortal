import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import { FaFacebook, FaGift, FaLink, FaLinkedin } from "react-icons/fa";

import {
  fetchRewardProgramDetailService,
  ReferralEligible,
  RewardType,
} from "@/services/apiService";
import { copyToClipboard, organizeRewardData } from "@/utils/utils";
import { CopyIcon, TwitterIcon } from "@/components/icons";

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
      backdrop="opaque"
      classNames={{
        base: "bg-primary",
        header: "border-b border-zinc-700",
        body: "py-6",
      }}
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                <FaGift color="white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {rewardString}
              </h2>
              <p className="text-sm text-zinc-400 text-center">
                Share with friends and both of you will get rewards on your next
                purchase!
              </p>
            </ModalHeader>
            <ModalBody>
              {error ? (
                <div className="text-center text-danger">{error}</div>
              ) : loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card
                      key={i}
                      className="w-full h-32 animate-pulse bg-zinc-800"
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
                      <Card
                        key={index}
                        className={`border-2 ${
                          referredUsers >= (item.milestone || 1)
                            ? "border-primary"
                            : "border-zinc-700"
                        }`}
                      >
                        <CardBody className="gap-3 bg-primary border rounded-xl text-white">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">
                              {item.milestone ? `${item.milestone}th` : "Every"}{" "}
                              Referral
                            </h3>
                            <span className="text-2xl font-bold text-secondary">
                              {item.type === "FIXED_INR"
                                ? `₹${item.amount}`
                                : `${item.amount}%`}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <Progress
                              classNames={{
                                base: "h-3",
                                indicator:
                                  "bg-gradient-to-r from-blue-500 to-purple-500",
                              }}
                              value={
                                (referredUsers / (item.milestone || 1)) * 100
                              }
                            />
                            <p className="text-xs text-zinc-400">
                              {referredUsers} of {item.milestone || "∞"}{" "}
                              referrals completed
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                  <p className="text-white font-semibold flex gap-3 items-center justify-center">
                    <FaLink /> Share your Referral Link
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        readOnly
                        classNames={{
                          input: "bg-white",
                          inputWrapper: "bg-white",
                        }}
                        value={link}
                      />
                      <Tooltip content={copied ? "Copied!" : "Copy link"}>
                        <Button
                          isIconOnly
                          color="secondary"
                          variant="flat"
                          onClick={handleCopy}
                        >
                          <CopyIcon />
                        </Button>
                      </Tooltip>
                    </div>

                    <div className="flex justify-center gap-2">
                      <Button
                        isIconOnly
                        className="bg-blue-600 text-white"
                        variant="flat"
                        onClick={() => shareOnSocial("facebook")}
                      >
                        <FaFacebook size={20} />
                      </Button>
                      <Button
                        isIconOnly
                        className="bg-sky-500 text-white"
                        variant="flat"
                        onClick={() => shareOnSocial("twitter")}
                      >
                        <TwitterIcon size={20} />
                      </Button>
                      <Button
                        isIconOnly
                        className="bg-blue-700 text-white"
                        variant="flat"
                        onClick={() => shareOnSocial("linkedin")}
                      >
                        <FaLinkedin size={20} />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
