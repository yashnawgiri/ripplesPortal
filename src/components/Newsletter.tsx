import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import axios from "axios";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface NewsletterResponse {
  success: boolean;
  message?: string;
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      setError("Please provide an email address");

      return;
    }

    if (!validateEmail(email)) {
      setError("Please provide a valid email address");

      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const source = `Ripples Home page (${window.location.href})`;
      const response = await axios.post<NewsletterResponse>(
        "https://free-tools-function-app.azurewebsites.net/api/saveNewsletterEmail",
        { email, source },
      );

      if (response.data.success) {
        setIsSuccess(true);
        setEmail("");
      } else {
        throw new Error(response.data.message || "Failed to subscribe");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-transparent p-4 sm:p-6 md:p-8 md:w-10/12">
      <div className="max-w-xl mx-auto">
        <div className="grid gap-8 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight text-white">
                Subscribe to The Ripple Effect
              </h1>
            </div>

            {/* Arrow and description */}
            <div className="flex items-start gap-3 sm:gap-4">
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                Get insider tips from top consumer brands—real growth tactics,
                referral hacks, influencer & UGC strategies, and community
                playbooks. No fluff. Just actionable insights and product
                updates.
              </p>
            </div>

            {/* Email form */}
            <div className="space-y-3 sm:space-y-4">
              {isSuccess ? (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative"
                  role="alert"
                >
                  <strong className="font-bold">Success! </strong>
                  <span className="block sm:inline">
                    Thank you for subscribing to our newsletter!
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-stretch gap-3">
                    <Input
                      className="flex-1 h-12 text-base border-gray-300 data-[hover=true]:border-purple-500 group-data-[focus=true]:border-purple-500 rounded-lg"
                      error={!!error}
                      placeholder="pat@saturn.dev"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                    />
                    <Button
                      className="h-12 text-white font-medium w-full sm:w-auto rounded-lg hover:bg-purple-600 transition-colors duration-200"
                      disabled={isLoading}
                      size="lg"
                      variant="secondary"
                      onClick={handleSubscribe}
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                      {!isLoading && (
                        <IoArrowForward className="w-5 h-5 ml-2" />
                      )}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 mt-2">{error}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
