import React from "react";
import { Link } from "react-router-dom";

import { siteConfig } from "@/config/site";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-ripples-dark text-white pt-10 pb-20 relative z-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">
              Free Marketing &nbsp;
              <span className="text-secondary font-extrabold">Tools</span>
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-lg text-center md:text-left">
              Boost your social media presence with our collection of powerful,
              easy-to-use marketing tools
            </p>
            <div className="flex flex-col md:flex-row justify-center md:justify-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-4">
              <a
                className="px-6 py-3 bg-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                href="#tools"
              >
                Explore Tools
              </a>
              <Link
                className="px-6 py-3 bg-primary border-1 border-gray-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                to={siteConfig.path.instagramCalculator}
              >
                Try Instagram Tool
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  alt="Marketing Tools Illustration"
                  className="w-10/12 md:w-[100rem] h-auto rounded-lg"
                  src="https://ripples1static.blob.core.windows.net/images/Free Marketing Image.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
