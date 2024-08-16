import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import GetDemo from "@/pages/getDemo";
import AboutPage from "@/pages/about";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsAndConditions from "./pages/termsAndConditions";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<GetDemo />} path="/get-demo" />
      {/* <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<FeaturesPage />} path="/features" />
      <Route element={<BlogPage />} path="/blog" /> */}
      <Route element={<AboutPage />} path="/about" /> 
      <Route element={<PrivacyPolicy/>} path="/privacy-policy"/>
      <Route element={<TermsAndConditions/>} path="/terms-and-conditions"/>
    </Routes>
  );
}

export default App;
