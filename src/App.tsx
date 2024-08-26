import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import GetDemo from "@/pages/getDemo";
import AboutPage from "@/pages/about";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsAndConditions from "./pages/termsAndConditions";
import { siteConfig } from "./config/site";
import MyRipples from "./pages/user-portal/myRipples";
import MyContent from "./pages/user-portal/myContent";
import MyRewards from "./pages/user-portal/myRewards";
import FAQUserPortal from "./pages/user-portal/faq";
import Support from "./pages/user-portal/support";
import MyAccount from "./pages/user-portal/myAccount";
import Transactions from "./pages/user-portal/Transactions";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={siteConfig.path.home} />
      <Route element={<GetDemo />} path={siteConfig.path.getDemo} />
      <Route element={<AboutPage />} path={siteConfig.path.about} /> 
      <Route element={<PrivacyPolicy />} path={siteConfig.path.privacyPolicy} />
      <Route element={<TermsAndConditions />} path={siteConfig.path.terms} />
      {/* <Route element={<DocsPage />} path={siteConfig.path.docs} />
      <Route element={<PricingPage />} path={siteConfig.path.pricing} />
      <Route element={<BlogPage />} path={siteConfig.path.blog} /> */}
      <Route element={<MyRipples/>} path={"/my-ripples"}/>
      <Route element={<MyContent/>} path={"/my-content"}/>
      <Route element={<MyRewards/>} path={"/my-rewards"}/>
      <Route element={<FAQUserPortal/>} path={"/faq"}/>
      <Route element={<Support/>} path={"/support"}/>
      <Route element={<MyAccount/>} path={"/my-account"}/>
      <Route element={<Transactions/>} path={"/transactions"}/>
    </Routes>
  );
}

export default App;
