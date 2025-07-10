import type { LucideIcon } from "lucide-react";

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stepNumber: number;
  isLast?: boolean;
}

export default function StepCard({
  icon: Icon,
  title,
  description,
  stepNumber,
  isLast = false,
}: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Step Card */}
      <div className="relative bg-[#18082A] rounded-2xl p-8 border border-[#2E1A47] hover:border-[#EF3AF1] hover:glow-primary transition-all duration-300 hover:-translate-y-2 hover:scale-105 w-full max-w-sm">
        {/* Step Number Badge */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-gradient rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {stepNumber}
        </div>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#EF3AF1]/20 to-[#6244F5]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#2E1A47]">
          <Icon className="h-8 w-8 text-[#EF3AF1]" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#EF3AF1] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#CFCFCF] leading-relaxed">{description}</p>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#EF3AF1]/5 to-[#6244F5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Arrow Connector (Desktop Only) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2 z-10">
          <div className="h-0.5 bg-gradient-to-r from-[#EF3AF1] to-[#6244F5] w-11"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-[#EF3AF1] border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent"></div>
        </div>
      )}
    </div>
  );
}
