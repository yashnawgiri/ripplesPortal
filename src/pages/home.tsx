import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import CustomButton from "@/components/CustomElements/CustomButton";
import GradiantCards from "@/components/GradiantCards";
import FAQ from "@/components/FAQ";
import DashboardCard from "@/components/dashboardCard";
import "@/styles/home/home.css";
import { siteConfig } from "@/config/site";
import dashboardData from "@/data/landing.json";

import StatsSection from "./StatsSection";

// import Testimonials from "@/components/Testimonials";

import ResponsibilitySection from "./ResponsibilitySection";
import HeroSection from "./HeroSection";

import DataPrivacyComponent from "@/components/DataPrivacyComponent";
import IntegrationSlider from "@/components/IntegrationSlider";
import CashbackHeroSection from "@/components/CashbackHeroSection";
import MarketingSection from "@/components/MarketingSection";
import AdvantagesSection from "@/components/AdvantageSection";
import HowItWorksSection from "@/components/UgcHowItWorks";
import CTASection from "@/components/CtaSection";
import TouchpointSection from "@/components/TouchpointSection";
import BrandLogos from "@/components/caseStudy/BrandLogos";
import TestimonialsCarousel from "@/components/caseStudy/TestimonialsCarousel";
import testimonialsData from "@/data/testimonials.json";

function DemoButton() {
  const navigate = useNavigate();

  return (
    <CustomButton
      className="my-14 font-bold bg-custom-gradient"
      onClick={() => navigate(siteConfig.path.getDemo)}
    >
      {dashboardData.home.demoButton}
    </CustomButton>
  );
}

interface Testimonial {
  id: number;
  company: string;
  quote: string;
  logo: string;
  description: string;
  conclusion: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
}

export default function HomePage() {
  // const navigate = useNavigate();

  const testimonials = testimonialsData.testimonials as Testimonial[];

  return (
    <DefaultLayout>
      <section className="main-section w-full">
        <HeroSection />
        <StatsSection statsData={dashboardData.stats} />
        <CashbackHeroSection />
        <MarketingSection />
        <HowItWorksSection />
        <TestimonialsCarousel testimonials={testimonials} />
        <BrandLogos />
        <CTASection />
        <TouchpointSection />
        <CTASection />
        <IntegrationSlider />
        <AdvantagesSection />
        <DashboardCard />
        <GradiantCards />
        <ResponsibilitySection />
        <DemoButton />
        <DataPrivacyComponent />
        <FAQ />
      </section>
    </DefaultLayout>
  );
}
