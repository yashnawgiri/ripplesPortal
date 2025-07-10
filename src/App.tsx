import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";

import { MetaTags } from "./components/SEO/MetaTags";
import { metaTags } from "./config/metaTags";
import Fallback from "./components/Fallback";
import {
  preloadCriticalRoutes,
  preloadSecondaryRoutes,
  preloadTertiaryRoutes,
  performanceOptimizer,
} from "@/utils/performance.ts";

import { siteConfig } from "@/config/site";
import InfluencerMarketplace from "./pages/influencerMarketplace-page/InfluencerMarketplace";

// Lazy load all page components for better performance
const Logout = lazy(() => import("./pages/auth-page/Logout"));
const ShopperHomePage = lazy(() => import("./pages/ShopperHome"));
const UGCLanding = lazy(() => import("./pages/ugcLanding"));
const ReferralCommissionCalculatorPage = lazy(
  () => import("./pages/ReferralCommissionCalculatorPage")
);
const Referrals = lazy(() => import("./pages/referrals"));
const AffiliateGenerator = lazy(() =>
  import("./pages/affiliateForm").then((module) => ({
    default: module.AffiliateGenerator,
  }))
);
const FreeTools = lazy(() => import("./pages/freeTools"));
const InstagramEngagementPage = lazy(
  () => import("./pages/instagramEngagementPage")
);
const CROChecklistPage = lazy(
  () => import("./components/leadMagnet/CROChecklistPage")
);
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const HomePage = lazy(() => import("@/pages/home"));
const GetDemo = lazy(() => import("@/pages/getDemo"));
const AboutPage = lazy(() => import("@/pages/about"));
const PrivacyPolicy = lazy(() => import("@/pages/privacyPolicy"));
const TermsAndConditions = lazy(() => import("@/pages/termsAndConditions"));
const NotFound = lazy(() => import("@/pages/notFound"));
const AuthPage = lazy(() => import("@/pages/auth-page/AuthPage"));
const CaseStudyPage = lazy(() => import("@/pages/CaseStudyPage"));

// Define the type for meta tag entries
type MetaTagEntry = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

function App() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Enhanced route preloading with performance optimization
  useEffect(() => {
    // Preload critical routes immediately
    preloadCriticalRoutes();

    // Preload secondary routes after a delay
    const secondaryTimer = setTimeout(() => {
      preloadSecondaryRoutes();
    }, 2000);

    // Preload tertiary routes when idle
    const tertiaryTimer = setTimeout(() => {
      preloadTertiaryRoutes();
    }, 5000);

    // Optimize image loading
    performanceOptimizer.optimizeImageLoading();

    return () => {
      clearTimeout(secondaryTimer);
      clearTimeout(tertiaryTimer);
    };
  }, []);

  // Get meta tags based on current path
  const getMetaTagsForPath = (path: string): MetaTagEntry => {
    const pathWithoutQuery = path.split("?")[0];

    // Handle case study pages
    if (pathWithoutQuery.startsWith("/case-study/")) {
      const brand = params.brand || "";
      const lift = params.lift || "8%";

      return metaTags.individualCaseStudy(brand, lift);
    }

    // Handle other pages
    const metaTag = Object.values(metaTags).find(
      (tag) =>
        typeof tag === "object" &&
        "path" in tag &&
        tag.path === pathWithoutQuery
    ) as MetaTagEntry | undefined;

    return metaTag || metaTags.home;
  };

  const currentMetaTags = getMetaTagsForPath(location.pathname);
  const fullTitle = `${currentMetaTags.title} | ${siteConfig.seo.defaultTitle}`;

  return (
    <HelmetProvider>
      <MetaTags
        canonicalUrl={`https://goripples.com${location.pathname}`}
        description={
          currentMetaTags.description || siteConfig.seo.defaultDescription
        }
        keywords={siteConfig.seo.defaultKeywords}
        noindex={currentMetaTags.noindex}
        title={fullTitle}
        type={
          location.pathname.startsWith("/case-study/") ? "article" : "website"
        }
      />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route
            element={<AffiliateGenerator />}
            path={siteConfig.path.affiliateLink}
          />
          <Route element={<HomePage />} path={siteConfig.path.home} />
          <Route element={<Referrals />} path={siteConfig.path.referrals} />
          <Route element={<FreeTools />} path={siteConfig.path.freeTools} />
          <Route
            element={<InstagramEngagementPage />}
            path={siteConfig.path.instagramCalculator}
          />
          <Route
            element={<CROChecklistPage />}
            path={siteConfig.path.leadMagnet}
          />
          <Route
            element={<ReferralCommissionCalculatorPage />}
            path={siteConfig.path.referralCalculator}
          />
          <Route
            element={<ShopperHomePage />}
            path={siteConfig.path.shopperHome}
          />
          <Route element={<UGCLanding />} path={siteConfig.path.ugcHome} />
          <Route element={<GetDemo />} path={siteConfig.path.getDemo} />
          <Route element={<AboutPage />} path={siteConfig.path.about} />
          <Route element={<CaseStudyPage />} path={siteConfig.path.caseStudy} />
          <Route
            element={<CaseStudiesPage />}
            path={siteConfig.path.caseStudies}
          />
          <Route
            element={<PrivacyPolicy />}
            path={siteConfig.path.privacyPolicy}
          />
          <Route
            element={<TermsAndConditions />}
            path={siteConfig.path.terms}
          />
          <Route
            element={<InfluencerMarketplace />}
            path={siteConfig.path.influencerMarketplace}
          />
          <Route element={<Logout />} path={siteConfig.path.logout} />
          <Route element={<AuthPage />} path={siteConfig.path.signIn} />
          <Route element={<NotFound />} path={siteConfig.path.default} />
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
