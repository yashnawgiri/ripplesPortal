import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { authTokenState } from "@/recoil/authTokenState";

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

interface PrivateRouteProps {
  children: ReactNode;
  redirect: string;
}

const PrivateRoute = ({ children, redirect }:PrivateRouteProps) => {
  const [authToken,setAuthToken] = useRecoilState(authTokenState);
  const storedToken = localStorage.getItem('authToken');
  if (authToken!==storedToken) {
    setAuthToken(storedToken);
  }
  return authToken ? (
    children
  ) : (
    <Navigate to={redirect}/>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={siteConfig.path.home} />
      <Route element={<GetDemo />} path={siteConfig.path.getDemo} />
      <Route element={<AboutPage />} path={siteConfig.path.about} />
      <Route element={<PrivacyPolicy />} path={siteConfig.path.privacyPolicy} />
      <Route element={<TermsAndConditions />} path={siteConfig.path.terms} />
      <Route element={<PrivateRoute redirect={siteConfig.path.signIn}><MyRipples /></PrivateRoute>}path={siteConfig.path.myRipples}/>
      <Route element={<PrivateRoute redirect={siteConfig.path.signIn}><MyContent /></PrivateRoute>}path={siteConfig.path.userContent}/>
      <Route element={<PrivateRoute redirect={siteConfig.path.signIn}><MyRewards /></PrivateRoute>}path={siteConfig.path.userRewards}/>
      <Route element={<PrivateRoute redirect={siteConfig.path.signIn}><FAQUserPortal /></PrivateRoute>}path={siteConfig.path.userFaq}/>
      <Route element={<PrivateRoute redirect={siteConfig.path.signIn}><Support /></PrivateRoute>}path={siteConfig.path.userSupport}/>
      <Route element={<PrivateRoute redirect={siteConfig.path.signIn}><MyAccount /></PrivateRoute>}path={siteConfig.path.userAccount}/>
      <Route element={<PrivateRoute redirect={siteConfig.path.signIn}><Transactions /></PrivateRoute>}path={siteConfig.path.userTransaction}/>      
      <Route element={<AuthPage />} path={siteConfig.path.signIn} />
      <Route element={<NotFound />} path={siteConfig.path.default} />
    </Routes>
  );
}

export default App;
