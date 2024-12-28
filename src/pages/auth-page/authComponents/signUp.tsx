import React from "react";
import "@/styles/auth/signUp.css";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";

import { siteConfig } from "@/config/site";

interface SignUpProps {
  onEmailSignup: () => void;
  onGoogleSignup: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onEmailSignup }) => {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center ">
      <div className="w-full max-w-md md:max-w-2xl text-center space-y-6 md:space-y-8">
        <h1 className="text-3xl font-semibold mb-2">
          Ripples
          <span className="text-secondary text-4xl h-1 rounded-full">.</span>
        </h1>

        <div className="space-y-3 md:space-y-4">
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight md:px-16">
            Share the Love: Get Cash
            <span className="block text-gray-300 md:text-white md:inline md:ml-2">
              Rewards for Referring
            </span>
            <span className="block text-gray-300 md:text-white">
              Your Favorite Brands!
            </span>
          </h2>
          <p className="text-sm md:text-md text-gray-400 md:text-gray-300">
            Sign in to see more
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-md mx-auto px-10 md:px-0">
          <Button
            className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700"
            onClick={onEmailSignup}
          >
            <span className="flex items-center justify-center gap-2 text-white font-bold">
              Continue with email
            </span>
          </Button>
        </div>

        <p className="text-xs md:text-sm text-gray-400 px-6">
          By continuing, you agree to the&nbsp;
          <Link
            className="underline hover:text-white"
            to={siteConfig.path.terms}
          >
            Terms of Service&nbsp;
          </Link>
          and acknowledge you&apos;ve read our&nbsp;
          <Link
            className="underline hover:text-white"
            to={siteConfig.path.privacyPolicy}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
