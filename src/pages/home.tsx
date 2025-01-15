import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomElements/CustomButton";
import GradiantCards from "@/components/GradiantCards";
import FAQ from "@/components/FAQ";
import DashboardCard from "@/components/dashboardCard";
import "@/styles/home/home.css";
import { siteConfig } from "@/config/site";
import dashboardData from "@/data/landing.json";

import StatsSection from "./StatsSection";
import PromoSection from "./PromoSection";

import RewardManagement from "@/components/RewardManagement";
import ReferralManagement from "@/components/ReferralManagement";

import LinkCodeSection from "./LinkCodeSection";
import KeyFeatures from "./KeyFeatures";

import Testimonials from "@/components/Testimonials";

import ResponsibilitySection from "./ResponsibilitySection";
import HeroSection from "./HeroSection";
import RevenueBoostCalculator from "@/components/RevenueBoostCalculator";
import DataPrivacyComponent from "@/components/DataPrivacyComponent";

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
      <section className="main-section">
        <HeroSection />
        <StatsSection />
        <PromoSection />
        <RevenueBoostCalculator />
        <DataPrivacyComponent />
        <DashboardCard />
        <RewardManagement />
        <ReferralManagement />
        <LinkCodeSection />
        <KeyFeatures />
        <DemoButton />
        <HowDoesItWork />
        <Testimonials />
        <GradiantCards />
        <DemoButton />
        <FAQ />
        <ResponsibilitySection />
        <DemoButton />
        {/* <Testimonials /> */}
      </section>
    </DefaultLayout>
  );
}
