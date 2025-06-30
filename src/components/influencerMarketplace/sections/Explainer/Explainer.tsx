import { Button } from "@/components/ui/Button";
import StepCard from "@/components/influencerMarketplace/ui/StepCard";
import { ArrowRight } from "lucide-react";
import {
  EXPLAINER_STEPS,
  iconMap,
} from "@/lib/influencerMarketplace/constants";

export default function Explainer() {
  const handleTryItLive = () => {
    // Scroll to hero section (top of page)
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for scroll to complete, then highlight the demo button
    setTimeout(() => {
      const demoButton = document.querySelector("[data-demo-button]");
      if (demoButton) {
        demoButton.classList.add("animate-pulse", "glow-brand");
        setTimeout(() => {
          demoButton.classList.remove("animate-pulse", "glow-brand");
        }, 2000);
      }
    }, 1000);
  };

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-[#0B011B]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-[#CFCFCF] max-w-3xl mx-auto leading-relaxed">
            Transform your customers into content creators with our simple
            3-step process. No briefs, no chasing influencers — just authentic
            UGC that drives results.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-16 mb-16">
            {EXPLAINER_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <div key={index} className="relative">
                  <StepCard
                    icon={Icon}
                    title={step.title}
                    description={step.description}
                    stepNumber={index + 1}
                    isLast={index === EXPLAINER_STEPS.length - 1}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical Layout */}
          <div className="lg:hidden space-y-8 mb-16">
            {EXPLAINER_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <div key={index} className="relative">
                  <StepCard
                    icon={Icon}
                    title={step.title}
                    description={step.description}
                    stepNumber={index + 1}
                    isLast={true} // No arrows on mobile
                  />

                  {/* Mobile Arrow */}
                  {index < EXPLAINER_STEPS.length - 1 && (
                    <div className="flex justify-center my-6">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-[#EF3AF1] to-[#6244F5]"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-[#18082A] rounded-3xl p-8 md:p-12 border border-[#2E1A47]">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to See It in Action?
            </h3>
            <p className="text-lg text-[#CFCFCF] mb-8 max-w-2xl mx-auto">
              Watch how brands are turning their customers into their best
              marketing channel
            </p>
            <Button
              size="lg"
              onClick={handleTryItLive}
              className="bg-brand-gradient hover:glow-brand text-white px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
            >
              Try It Live
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
