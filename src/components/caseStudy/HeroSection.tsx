import type React from "react";

import { Sparkles } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6 md:mb-8">
          <Sparkles
            className="w-3 md:w-4 h-3 md:h-4 text-purple-400"
            size={16}
          />
          <span className="text-purple-300 text-xs md:text-sm font-medium">
            Success Stories
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight px-1 sm:px-2">
          <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            Brands Growing with
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Ripples
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
          🧠 See how leading consumer brands turned customers into their best
          influencers —
          <span className="text-purple-300 font-semibold">
            {" "}
            boosting sales, referrals, and UGC at scale.
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
