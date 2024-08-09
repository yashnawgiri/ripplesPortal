import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home";
import GetDemo from "@/pages/getDemo";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<GetDemo />} path="/get-demo" />
      {/* <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<FeaturesPage />} path="/features" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" /> */}
    </Routes>
  );
}

export default App;
