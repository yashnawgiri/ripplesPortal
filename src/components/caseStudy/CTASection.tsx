import type React from "react";
import { Sparkles } from "lucide-react";
import CustomButton from "../CustomElements/CustomButton";
import { useNavigate } from "react-router-dom";
import { siteConfig } from "@/config/site";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-transparent rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl blur-sm sm:blur-md md:blur-lg lg:blur-xl"></div>
      <div className="relative text-center py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent backdrop-blur-sm sm:backdrop-blur-md md:backdrop-blur-lg lg:backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-slate-700/30 sm:border-slate-700/40 md:border-slate-700/50">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-transparent backdrop-blur-sm border border-purple-500/20 rounded-full px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 md:py-2 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <Sparkles className="w-3 sm:w-3.5 md:w-4 lg:w-5 h-3 sm:h-3.5 md:h-4 lg:h-5 text-purple-400" />
          <span className="text-purple-300 text-xs sm:text-sm md:text-base font-medium">
            Ready to Scale?
          </span>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 lg:mb-6 px-2 sm:px-4 leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
          Ready to Turn Your Customers into Growth Partners?
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
          Join hundreds of D2C brands using Ripples to scale referrals, boost
          sales, and reduce CAC.
          <span className="text-purple-300 font-semibold">
            {" "}
            Start your growth journey today.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center">
          <CustomButton
            className="w-full sm:w-auto my-2 sm:my-3 md:my-4 lg:my-6 xl:my-8 font-bold bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105"
            onClick={() => navigate(siteConfig.path.getDemo)}
          >
            Book a Demo
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
