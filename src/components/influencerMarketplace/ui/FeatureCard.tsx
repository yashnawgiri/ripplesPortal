import type { LucideIcon } from "lucide-react";
// import { iconMap } from "@/lib/influencerMarketplace/constants";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group bg-[#18082A] rounded-2xl p-8 border border-[#2E1A47] hover:border-[#6244F5] hover:glow-secondary transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#EF3AF1]/5 to-[#6244F5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center lg:text-left">
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-r from-[#EF3AF1]/20 to-[#6244F5]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#2E1A47] mx-auto lg:mx-0">
          <Icon className="h-6 w-6 text-[#EF3AF1]" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#EF3AF1] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#CFCFCF] leading-relaxed">{description}</p>
      </div>

      {/* Subtle border pulse on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#EF3AF1]/0 group-hover:border-[#EF3AF1]/20 transition-all duration-300"></div>
    </div>
  );
}
