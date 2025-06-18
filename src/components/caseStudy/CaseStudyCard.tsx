import type React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowUpRight, TrendingUp, Users, IndianRupeeIcon } from "lucide-react";

interface CaseStudyCardProps {
  id: string;
  name: string;
  industry: string;
  badge: string;
  logo: string;
  imageSrc: string;
  website: string;
  results: {
    roi: string;
    sales: string;
    referrals: string;
  };
  onReadMore: () => void;
  colorScheme: "purple" | "green";
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  name,
  industry,
  website,
  logo,
  imageSrc,
  results,
  onReadMore,
  colorScheme,
}) => {
  const colors = {
    purple: {
      primary: "from-purple-600 to-violet-600",
      secondary: "from-purple-500/10 to-violet-500/10",
      accent: "purple-500",
      hoverBg: "from-purple-500/5 to-violet-500/5",
      border: "border-purple-500/20 hover:border-purple-400/40",
      text: "text-purple-400",
      button: "from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500",
    },
    green: {
      primary: "from-emerald-600 to-teal-600",
      secondary: "from-emerald-500/10 to-teal-500/10",
      accent: "emerald-500",
      hoverBg: "from-emerald-500/5 to-teal-500/5",
      border: "border-emerald-500/20 hover:border-emerald-400/40",
      text: "text-emerald-400",
      button: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
    },
  };

  const color = colors[colorScheme];

  return (
    <Card className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 overflow-hidden cursor-pointer w-full max-w-md mx-auto">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.hoverBg} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      
      {/* Subtle top border accent */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color.primary} opacity-60`} />

      <CardContent className="relative p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div className={`w-14 h-14 bg-gradient-to-br ${color.primary} rounded-sm shadow-lg flex items-center justify-center p-0.5`}>
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                  <img
                    src={logo}
                    alt={name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              {/* Subtle glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color.primary} rounded-xl blur-md opacity-30 -z-10`} />
            </div>
            
            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-1 truncate">{name}</h3>
              <span className="text-sm text-slate-400 font-medium">{industry}</span>
            </div>
          </div>
          
          {/* Arrow Icon */}
          <a href={website} target="_blank" rel="noopener noreferrer" className="no-ripple">
          <ArrowUpRight className={`w-5 h-5 text-slate-400 group-hover:${color.text} group-hover:scale-110 transition-all duration-300 flex-shrink-0`} />
          </a>
        </div>

        {/* Store Image */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={`${name} store`}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Subtle inner border */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
        </div>

        {/* Impact Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-semibold text-white">Impact Results</h4>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* ROI Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group/metric">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-500/20 rounded-md flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-xs text-slate-400 font-medium">ROI</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {results.roi.split(" ")[0]}
              </div>
              <div className="text-xs text-slate-500">in 60 days</div>
            </div>

            {/* Sales Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group/metric">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center">
                  <IndianRupeeIcon className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-xs text-slate-400 font-medium">Sales</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {results.sales.split(" ")[0]}
              </div>
              <div className="text-xs text-slate-500">contribution</div>
            </div>

            {/* Referrals Card - Full Width */}
            <div className="col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group/metric">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 bg-${color.accent}/20 rounded-md flex items-center justify-center`}>
                  <Users className={`w-3 h-3 ${color.text}`} />
                </div>
                <span className="text-xs text-slate-400 font-medium">Referral Growth</span>
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-white">
                  {results.referrals.split(" ")[0]}
                </div>
                <div className="text-xs text-slate-500">increase in referrals</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onReadMore}
            className={`w-full bg-gradient-to-r ${color.button} text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-${color.accent}/25 active:scale-[0.98] group/button`}
          >
            <span className="flex items-center justify-center gap-2">
              Read Full Case Study
              <ArrowUpRight className="w-4 h-4 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudyCard;
