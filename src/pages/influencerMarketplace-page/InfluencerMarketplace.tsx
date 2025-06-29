import AnimatedBreak from "@/components/influencerMarketplace/sections/AnimatedBreak/AnimatedBreak";
import DemoBlock from "@/components/influencerMarketplace/sections/DemoBlock/DemoBlock";
import Explainer from "@/components/influencerMarketplace/sections/Explainer/Explainer";
import FeaturesGrid from "@/components/influencerMarketplace/sections/FeaturesGrid/FeaturesGrid";
import FinalCTA from "@/components/influencerMarketplace/sections/FinalCTA/FinalCTA";
import HeroSection from "@/components/influencerMarketplace/sections/HeroSection/HeroSection";
import SocialProof from "@/components/influencerMarketplace/sections/SocialProof/SocialProof";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

const InfluencerMarketplace = () => {
  return (
    <div className="relative flex flex-col items-center h-fit bg-custom-radial">
      <Navbar />
      <div className="w-full mt-28">
        <main className="flex-grow items-center">
          <HeroSection />
          <AnimatedBreak />
          <SocialProof />
          <Explainer />
          <FeaturesGrid />
          <DemoBlock />
          <FinalCTA />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default InfluencerMarketplace;
