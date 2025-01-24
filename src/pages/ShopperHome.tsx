/* eslint-disable max-len */
import DefaultLayout from "@/layouts/default";
import ShopperHeroSection from "@/components/shopper-landing/ShopperHeroSection";
import StatsSection from "./StatsSection";

import dashboardData from "@/data/shopperLanding.json";
import HowDoesItWork from "@/components/HowDoesItWork";
import BenefitsSection from "@/components/shopper-landing/BenefitsSection";
import BottomSection from "@/components/shopper-landing/BottomSection";

export default function ShopperHomePage() {
    return (
        <DefaultLayout>
            <section className="main-section">
                <ShopperHeroSection/>
                <StatsSection statsData={dashboardData.stats}/>
                <HowDoesItWork 
                   howDoesItWorkData={dashboardData.HowDoesItWorks}
                />
                <BenefitsSection/>
                <BottomSection/>
            </section>
        </DefaultLayout>
    );
}