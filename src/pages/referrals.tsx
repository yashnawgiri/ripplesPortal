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


import RewardManagement from "@/components/RewardManagement";
import ReferralManagement from "@/components/ReferralManagement";



import Testimonials from "@/components/Testimonials";


import RevenueBoostCalculator from "@/components/RevenueBoostCalculator";
import DataPrivacyComponent from "@/components/DataPrivacyComponent";
import PromoSection from "./PromoSection";
import LinkCodeSection from "./LinkCodeSection";
import KeyFeatures from "./KeyFeatures";
import ResponsibilitySection from "./ResponsibilitySection";


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

export default function Referrals() {
  // const navigate = useNavigate();

  return (
    <DefaultLayout>
      <section className="main-section">
        <PromoSection />
        <RevenueBoostCalculator />
        <RewardManagement />
        <ReferralManagement />
        <LinkCodeSection />
        <KeyFeatures />
        <DemoButton />
        {/* <ReferralCommissionCalculator/> */}
        <HowDoesItWork
          howDoesItWorkData={dashboardData.ComponentsData.HowDoesItWorks}
        />
        <DashboardCard />
        {/* <Testimonials /> */}
        {/* <GradiantCards /> */}
        {/* <DemoButton /> */}
        {/* <FAQ /> */}
        {/* <ResponsibilitySection /> */}
        {/* <DemoButton /> */}
        {/* <DataPrivacyComponent /> */}
      </section>
    </DefaultLayout>
  );
}
