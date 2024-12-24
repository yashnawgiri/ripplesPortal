import React from "react";


import "@/styles/auth/emailSignUp.css";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

interface EmailSignUpProps {
  email: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
  loading: boolean | null;
}

const EmailSignUp: React.FC<EmailSignUpProps> = ({
  loading,
  email,
  onEmailChange,
  onContinue,
}) => {
  return (
    <>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-md md:max-w-2xl text-center space-y-3 md:space-y-8">
          <h1 className="text-2xl font-semibold mb-2">Ripples<span className="text-secondary text-4xl h-1 rounded-full">.</span></h1>

          <div className="space-y-3 md:space-y-4 md:px-20">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Share the Love: Get Cash Rewards for Referring Your Favorite Brands!
            </h2>
            <p className="text-sm md:text-lg text-gray-400 md:text-gray-300">
              Sign in to see more
            </p>
          </div>

          <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-2 md:px-20">
            <input id='email' onChange={onEmailChange} value={email}  className=" text-white text-xl w-full outline-none bg-primary py-2 px-4 rounded-md" placeholder="Enter your email" type="email" />
            <Button
              className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              disabled={loading ?? false}
              onClick={onContinue}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Please wait</span>
                  </>
                ) : (
                  "Continue with email"
                )}
              </span>
            </Button>
          </div>

          <p className="text-xs md:text-sm text-gray-400 px-6">
            By continuing, you agree to the&nbsp;
            <Link to={siteConfig.path.terms} className="underline hover:text-white">
              Terms of Service&nbsp;
            </Link>
            and acknowledge you've read our&nbsp;
            <Link to={siteConfig.path.privacyPolicy} className="underline hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default EmailSignUp;
