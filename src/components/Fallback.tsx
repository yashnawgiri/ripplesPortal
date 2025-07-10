import { useState, useEffect } from "react";

// Random motivational quotes for referral marketing
const quotes = [
  "Your customers are your best advocates",
  "Every referral is a vote of confidence",
  "Word of mouth is the best marketing",
  "Build relationships, earn referrals",
  "Great service creates loyal customers",
  "Referrals are the currency of trust",
  "Your network is your net worth",
  "Happy customers bring more customers",
  "Quality service speaks for itself",
  "Referrals happen when you exceed expectations"
];

export default function Fallback() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Change quote every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setCurrentQuote(quotes[(quoteIndex + 1) % quotes.length]);
    }, 3000);

    return () => clearInterval(interval);
  }, [quoteIndex]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="text-center text-white">
        {/* Simple Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Ripples<span className="text-purple-500 text-4xl">.</span></h1>
        </div>

        {/* Simple Loading Animation */}
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold mb-4">
          Loading your experience...
        </h2>

        {/* Random Quote */}
        <div className="max-w-md mx-auto">
          <p className="text-white/80 text-lg italic">
            "{currentQuote}"
          </p>
        </div>
      </div>
    </div>
  );
}
