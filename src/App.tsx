import {Route, Routes} from "react-router-dom";

import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import FeaturesPage from "@/pages/features";
import HomePage from "./pages/home";

function App() {
    return (
        <Routes>
            <Route element={<HomePage/>} path="/"/>
            <Route element={<DocsPage/>} path="/docs"/>
            <Route element={<PricingPage/>} path="/pricing"/>
            <Route element={<FeaturesPage/>} path="/features"/>
            <Route element={<BlogPage/>} path="/blog"/>
            <Route element={<AboutPage/>} path="/about"/>
        </Routes>
    );
}

export default App;
