import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import PrivateRoute from "./pages/auth-page/authComponents/PrivateRoute";
import Logout from "./pages/auth-page/Logout";
import Fallback from "./components/Fallback";

import { siteConfig } from "@/config/site";
import HomePage from "@/pages/home";
import GetDemo from "@/pages/getDemo";
import AboutPage from "@/pages/about";
import PrivacyPolicy from "@/pages/privacyPolicy";
import TermsAndConditions from "@/pages/termsAndConditions";
import MyRipples from "@/pages/user-portal/myRipples";
import MyContent from "@/pages/user-portal/myContent";
import MyRewards from "@/pages/user-portal/myRewards";
import FAQUserPortal from "@/pages/user-portal/faq";
import Support from "@/pages/user-portal/support";
import MyAccount from "@/pages/user-portal/myAccount";
import Transactions from "@/pages/user-portal/Transactions";
import NotFound from "@/pages/notFound";
import AuthPage from "@/pages/auth-page/AuthPage";
import Withdraw from "./components/Withdraw";

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<HomePage />} path={siteConfig.path.home} />
        <Route element={<GetDemo />} path={siteConfig.path.getDemo} />
        <Route element={<AboutPage />} path={siteConfig.path.about} />
        <Route
          element={<PrivacyPolicy />}
          path={siteConfig.path.privacyPolicy}
        />
        <Route element={<TermsAndConditions />} path={siteConfig.path.terms} />
        <Route element={<PrivateRoute />} path={siteConfig.path.myRipples}>
          <Route element={<MyRipples />} path={siteConfig.path.userHome} />
          <Route element={<MyContent />} path={siteConfig.path.userContent} />
          <Route element={<MyRewards />} path={siteConfig.path.userRewards} />
          <Route element={<FAQUserPortal />} path={siteConfig.path.userFaq} />
          <Route element={<Support />} path={siteConfig.path.userSupport} />
          <Route element={<MyAccount />} path={siteConfig.path.userAccount} />
          <Route element={<Withdraw />} path={siteConfig.path.withdraw} />
          <Route
            element={<Transactions />}
            path={siteConfig.path.userTransaction}
          />
        </Route>
        <Route element={<Logout />} path={siteConfig.path.logout} />
        <Route element={<AuthPage />} path={siteConfig.path.signIn} />
        <Route element={<NotFound />} path={siteConfig.path.default} />
      </Routes>
    </Suspense>
  );
}

export default App;
