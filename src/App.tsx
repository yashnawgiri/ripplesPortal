import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import GetDemo from "@/pages/getDemo";
import AboutPage from "@/pages/about";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsAndConditions from "./pages/termsAndConditions";
import { siteConfig } from "./config/site";
import UserPortal from "./pages/userPortal";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={siteConfig.path.home} />
      <Route element={<GetDemo />} path={siteConfig.path.getDemo} />
      <Route element={<AboutPage />} path={siteConfig.path.about} />  
      <Route element={<HomePage />} path={siteConfig.path.features} />  
      <Route element={<PrivacyPolicy />} path={siteConfig.path.privacyPolicy} />
      <Route element={<TermsAndConditions />} path={siteConfig.path.terms} />
      {/* <Route element={<DocsPage />} path={siteConfig.path.docs} />
      <Route element={<PricingPage />} path={siteConfig.path.pricing} />
      <Route element={<BlogPage />} path={siteConfig.path.blog} /> */}
      <Route element={<UserPortal/>} path={"/user-portal"}/>
    </Routes>
  );
}

export default App;
