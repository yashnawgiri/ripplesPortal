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

import CaseStudiesPage from "../components/caseStudy/CaseStudiesPage";

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

export default function HomePage() {
  // const navigate = useNavigate();

  return (
    <DefaultLayout>
      <section className="main-section w-full">
        <HeroSection />
        <StatsSection statsData={dashboardData.stats} />
        <CashbackHeroSection />
        <MarketingSection />
        <HowItWorksSection />
        <CaseStudiesPage />
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
