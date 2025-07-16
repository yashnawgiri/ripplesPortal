/* eslint-disable max-len */
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Camera, DollarSign, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetDemo = () => {
    navigate("/get-demo");
  };

  return (
    <section className="min-h-screen bg-custom-radial flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
        <div className="absolute top-32 left-32 w-1 h-1 bg-[#CA00E8] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-[#CA00E8] rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-secondary rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-2 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-2 animate-fadeIn text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] font-poppins">
                The Influencer & UGC{" "}
                <span className="text-custom-gradient">Marketplace</span> Built
                for D2C Brands
              </h1>
              <p className="text-xl md:text-2xl text-[#CFCFCF] max-w-2xl leading-relaxed font-medium">
                {/* Get discovered by{" "} */}
                Ripples facilitates influencer{" "}
                {/* <span className="font-bold text-white">10,000+ creators</span>. */}
                {/* Run cashback-powered UGC campaigns without chasing influencers. */}
                and UGC campaigns tailor-made for D2C brands.
                <br />
                <span className="font-bold text-white">
                  {" "}
                  Creator count 10,000+
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                data-demo-button
                onClick={handleGetDemo}
                className="bg-custom-gradient hover:glow-custom text-white px-10 py-4 text-lg font-bold shadow-3xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
              >
                Get a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            
            </div>
          </div>

          {/* Right Side - 3-Step Flow Illustration */}
          <div className="relative animate-fadeIn">
            {/* Add floating elements for more visual interest */}
            <div className="absolute -top-4 -left-8 w-16 h-16 bg-secondary rounded-full opacity-20 animate-pulse blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-[#CA00E8] rounded-full opacity-30 animate-pulse delay-1000 blur-xl"></div>

            <div className="bg-[#18082A] rounded-3xl p-10 md:p-20 shadow-3xl border border-[#2E1A47] backdrop-blur-sm">
              {/* Mobile: Horizontal Layout */}
              <div className="md:hidden">
                <div className="flex items-center justify-between space-x-2">
                  {/* Step 1: Shop */}
                  <div className="flex flex-col items-center text-center space-y-2 flex-1">
                    <div className="w-12 h-12 bg-custom-gradient rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white font-poppins">
                        Shop
                      </h3>
                      <p className="text-sm text-[#CFCFCF]">
                        Customer purchases
                      </p>
                    </div>
                    <div className="text-[#2E1A47]">
                      <span className="text-xl font-bold font-poppins">1</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="h-4 w-4 text-[#2E1A47] rotate-90" />

                  {/* Step 2: Post */}
                  <div className="flex flex-col items-center text-center space-y-2 flex-1">
                    <div className="w-12 h-12 bg-custom-gradient rounded-full flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white font-poppins">
                        Post
                      </h3>
                      <p className="text-sm text-[#CFCFCF]">
                        Create content
                      </p>
                    </div>
                    <div className="text-[#2E1A47]">
                      <span className="text-xl font-bold font-poppins">2</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="h-4 w-4 text-[#2E1A47] rotate-90" />

                  {/* Step 3: Earn */}
                  <div className="flex flex-col items-center text-center space-y-2 flex-1">
                    <div className="w-12 h-12 bg-custom-gradient rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white font-poppins">
                        Earn
                      </h3>
                      <p className="text-sm text-[#CFCFCF]">
                        Get rewarded
                      </p>
                    </div>
                    <div className="text-[#2E1A47]">
                      <span className="text-xl font-bold font-poppins">3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Vertical Layout */}
              <div className="hidden md:block space-y-8">
                {/* Step 1: Shop */}
                <div className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-custom-gradient rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white font-poppins">
                      Shop
                    </h3>
                    <p className="text-sm text-[#CFCFCF]">
                      Customer purchases your product
                    </p>
                  </div>
                  <div className="text-[#2E1A47]">
                    <span className="text-2xl font-bold font-poppins">1</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-[#2E1A47]" />
                </div>

                {/* Step 2: Post */}
                <div className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-custom-gradient rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white font-poppins">
                      Post
                    </h3>
                    <p className="text-sm text-[#CFCFCF]">
                      They create and share content
                    </p>
                  </div>
                  <div className="text-[#2E1A47]">
                    <span className="text-2xl font-bold font-poppins">2</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-[#2E1A47]" />
                </div>

                {/* Step 3: Earn */}
                <div className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-custom-gradient rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white font-poppins">
                      Earn
                    </h3>
                    <p className="text-sm text-[#CFCFCF]">
                      They get rewarded for engagement
                    </p>
                  </div>
                  <div className="text-[#2E1A47]">
                    <span className="text-2xl font-bold font-poppins">3</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full opacity-60 blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#CA00E8] rounded-full opacity-40 blur-sm"></div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-custom-radial2 rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
