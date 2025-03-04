/* eslint-disable max-len */
import { Suspense, lazy } from "react";

import DefaultLayout from "@/layouts/default";
import ShopperHeroSection from "@/components/shopper-landing/ShopperHeroSection";
import dashboardData from "@/data/shopperLanding.json";

const StatsSection = lazy(() => import("./StatsSection"));
const HowDoesItWork = lazy(() => import("@/components/HowDoesItWork"));
const BenefitsSection = lazy(
  () => import("@/components/shopper-landing/BenefitsSection"),
);
const BottomSection = lazy(
  () => import("@/components/shopper-landing/BottomSection"),
);

export default function ShopperHomePage() {
  return (
    <DefaultLayout>
      <section className="main-section">
        <ShopperHeroSection />
        <Suspense fallback={<div>Loading stats...</div>}>
          <StatsSection statsData={dashboardData.stats} />
        </Suspense>
        <Suspense fallback={<div>Loading how it works...</div>}>
          <HowDoesItWork howDoesItWorkData={dashboardData.HowDoesItWorks} />
        </Suspense>
        <Suspense fallback={<div>Loading benefits...</div>}>
          <BenefitsSection />
        </Suspense>
        <Suspense fallback={<div>Loading bottom section...</div>}>
          <BottomSection />
        </Suspense>
      </section>
    </DefaultLayout>
  );
}
