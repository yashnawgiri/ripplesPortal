import FeatureCard from "@/components/influencerMarketplace/ui/FeatureCard";
import { FEATURES_DATA, iconMap } from "@/lib/influencerMarketplace/constants";
import { useNavigate } from "react-router-dom";

export default function FeaturesGrid() {
  const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate("/get-demo");
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0B011B]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Built for Hands-Free Growth
          </h2>
          <p className="text-xl text-[#CFCFCF] max-w-3xl mx-auto leading-relaxed">
            Automate every step of your UGC and influencer marketing workflow.
            From discovery to payouts, we handle the heavy lifting so you can
            focus on scaling your brand.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {FEATURES_DATA.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <FeatureCard
                key={index}
                icon={Icon}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-[#18082A] rounded-3xl p-8 md:p-12 border border-[#2E1A47]">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Automate Your Growth?
            </h3>
            <p className="text-lg text-[#CFCFCF] mb-8 max-w-2xl mx-auto">
              Join hundreds of D2C brands already scaling their UGC campaigns
              with zero manual work
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Start Free Trial
              </button>
              <button
                onClick={handleBookDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
