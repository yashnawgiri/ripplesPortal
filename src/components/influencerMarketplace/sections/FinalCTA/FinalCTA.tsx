import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FinalCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate("/get-demo");
  };

  return (
    <section
      id="cta"
      className="relative py-12 lg:py-24 overflow-hidden bg-custom-radial"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-custom-radial2"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-30">
        <div className="w-16 h-16 bg-secondary rounded-full animate-pulse blur-xl"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-12 h-12 bg-[#CA00E8] rounded-full animate-bounce blur-xl"></div>
      </div>
      <div className="absolute top-1/2 left-20 opacity-25">
        <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
      </div>
      <div className="absolute top-1/3 right-32 opacity-30">
        <Users className="h-6 w-6 text-[#CA00E8] animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8 animate-fadeIn">
          {/* Headline */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-3xl mb-2 md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight font-poppins">
              Ready to turn every{" "}
              <span className="relative">
                <span className="text-custom-gradient mb-2 z-10">shopper</span>
                <div className="absolute -bottom-1 z-0 left-0 right-0 h-1 bg-custom-gradient rounded-full opacity-60"></div>
              </span>{" "} {" "}
              into a{" "}
              <span className="relative">
                <span className="text-custom-gradient mt-2">creator?</span>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-custom-gradient rounded-full opacity-60"></div>
              </span>
            </h2>

            <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium">
              Plug into Ripples. Let your community do the marketing — we'll
              handle the automation, tracking, and payouts.
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-4 lg:space-y-6">
            <Button
              size="lg"
              onClick={handleBookDemo}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                relative overflow-hidden bg-custom-gradient hover:glow-custom
                text-white px-6 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold shadow-3xl transition-all duration-300 transform hover:scale-110 border-0 font-poppins w-full max-w-sm md:max-w-none mx-auto
                ${isHovered ? "glow-custom" : ""}
              `}
            >
              {/* Button Background Animation */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-transform duration-300 ${
                  isHovered ? "translate-x-full" : "-translate-x-full"
                }`}
              />

              {/* Button Content */}
              <span className="relative flex items-center">
                <Zap className="mr-3 h-6 w-6" />
                Book a Free Demo
                <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>

            {/* Caption */}
            <p className="text-white text-base md:text-lg font-medium">
              Takes 2 minutes. No credit card required. See results in your
              first campaign.
            </p>
          </div>

          {/* Social Proof Elements */}
          <div className="pt-6 lg:pt-8 border-t border-[#2E1A47] text-white">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-white">
              <div className="flex items-center space-x-2 animate-fadeIn">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm">500+ brands already growing</span>
              </div>
              <div
                className="flex items-center space-x-2 animate-fadeIn"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-2 h-2 bg-[#CA00E8] rounded-full animate-pulse delay-500"></div>
                <span className="text-sm">10,000+ creators ready</span>
              </div>
              <div
                className="flex items-center space-x-2 animate-fadeIn"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-1000"></div>
                <span className="text-sm">$2M+ in UGC generated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent"></div>
    </section>
  );
}
