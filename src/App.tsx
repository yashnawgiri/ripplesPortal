import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

import { MetaTags } from "./components/SEO/MetaTags";
import { metaTags } from "./config/metaTags";
import Logout from "./pages/auth-page/Logout";
import Fallback from "./components/Fallback";
import ShopperHomePage from "./pages/ShopperHome";
import UGCLanding from "./pages/ugcLanding";
import ReferralCommissionCalculatorPage from "./pages/ReferralCommissionCalculatorPage";
import Referrals from "./pages/referrals";
import { AffiliateGenerator } from "./pages/affiliateForm";
import FreeTools from "./pages/freeTools";
import InstagramEngagementPage from "./pages/instagramEngagementPage";
import CROChecklistPage from "./components/leadMagnet/CROChecklistPage";

import { siteConfig } from "@/config/site";
import HomePage from "@/pages/home";
import GetDemo from "@/pages/getDemo";
import AboutPage from "@/pages/about";
import PrivacyPolicy from "@/pages/privacyPolicy";
import TermsAndConditions from "@/pages/termsAndConditions";
import NotFound from "@/pages/notFound";
import AuthPage from "@/pages/auth-page/AuthPage";
import CaseStudyPage from "@/pages/CaseStudyPage";

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
        tag.path === pathWithoutQuery,
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
            element={<PrivacyPolicy />}
            path={siteConfig.path.privacyPolicy}
          />
          <Route
            element={<TermsAndConditions />}
            path={siteConfig.path.terms}
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
