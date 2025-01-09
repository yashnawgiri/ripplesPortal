import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Image } from "@nextui-org/image";

import { emailLogin, otpVerify } from "../../services/authService.ts";

import SignUp from "./authComponents/signUp";
import EmailSignUp from "./authComponents/emailSignUp";
import OTP from "./authComponents/otp";

import "@/styles/auth/auth.css";
import { useRecoilState } from "recoil";

import { loadingState } from "@/recoil/loadingState";
import { authTokenState } from "@/recoil/authTokenState";
import { userIdState } from "@/recoil/userIdState";
import { validateEmail } from "@/utils/utils.ts";
import gift1 from "@/assets/images/login/gift1.webp";
import gift2 from "@/assets/images/login/gift2.webp";
import gift3 from "@/assets/images/login/gift3.webp";
import rupee from "@/assets/images/rupees.webp";
import coins from "@/assets/images/coins.webp";
import backgroundImg from "@/assets/images/login/login-bg.webp";

const AuthPage: React.FC = () => {
  const [step, setStep] = useState<"signup" | "email-signup" | "otp">("signup");
  const [, setAuthToken] = useRecoilState(authTokenState);
  const [, setUserId] = useRecoilState(userIdState);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useRecoilState(loadingState);
  const navigate = useNavigate();

  const handleEmailSignup = () => {
    setStep("email-signup");
  };

  const handleGoogleSignup = () => {
    console.log("Google Signup Clicked");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleContinueToOTP = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email");

      return;
    }
    setLoading(true);
    try {
      const res = await emailLogin({ email });

      //   console.log(res);
      toast.success(res.message);
      setEmail(email);
      setStep("otp");
    } catch (error) {
      if (error instanceof Error) {
        // console.error(error);
        toast.error(error.message);
      } else {
        toast.error("Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndLogin = async (num: string) => {
    const otp: string = num;

    setLoading(true);
    try {
      const res = await otpVerify({ email, otp });

      console.log(res);
      toast.success(res.message);
      if (res.data) {
        setAuthToken(res.data.token);
        setUserId(res.data.userId);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setTimeout(() => navigate("/my-ripples/home"), 100);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Invalid OTP");
      } else {
        toast.error("Failed to verify OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const zendeskScript = document.getElementById("ze-snippet");

    if (zendeskScript) {
      zendeskScript.remove();
    }
  }, []);

  const renderForm = () => {
    switch (step) {
      // TODO: add email validation
      case "signup":
        return (
          <SignUp
            onEmailSignup={handleEmailSignup}
            onGoogleSignup={handleGoogleSignup}
          />
        );
      case "email-signup":
        return (
          <EmailSignUp
            email={email}
            loading={loading}
            onContinue={handleContinueToOTP}
            onEmailChange={handleEmailChange}
          />
        );
      case "otp":
        return (
          <OTP
            email={email}
            handleEmailSignup={handleEmailSignup}
            loading={loading}
            onVerify={handleVerifyAndLogin}
            sendOtp={handleContinueToOTP}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-primary text-white relative overflow-hidden px-4">
      {/* Decorative Elements */}
      {/* Left decorations */}
      <div className="absolute top-10 left-0 md:top-1/2 md:-translate-y-1/2 md:left-0 z-0">
        <Image
          disableSkeleton
          alt="Phone with gifts"
          className="z-10 w-48 md:w-[30rem]"
          src={gift3}
        />
      </div>
      <div className="absolute hidden md:block md:top-15 md:left-[20%] z-0">
        <Image
          disableSkeleton
          alt="Coins"
          className="animate-float"
          src={coins}
          width={350}
        />
      </div>

      {/* Right decorations */}
      <div className="absolute top-0 right-0 md:right-0 md:top-0 z-0">
        <Image
          disableSkeleton
          alt="Phone with shopping"
          className=" w-80 relative z-10 md:w-[800px] "
          src={gift1}
          width={700}
        />
      </div>
      <div className="absolute bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-0 md:right-10 z-0">
        <Image
          disableSkeleton
          alt="Shopping bag"
          className="animate-float-delayed"
          src={gift2}
          width={600}
        />
      </div>

      {/* Bottom decorations */}
      <div className="hidden md:block absolute md:bottom-2 md:left-80 z-0">
        <Image
          disableSkeleton
          alt="rupees icon"
          className="animate-float"
          src={rupee}
          width={300}
        />
      </div>

      <div className="hidden  md:block md:absolute md:w-svw md:h-svh md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-0 ">
        <Image
          disableSkeleton
          alt="background shadow"
          className="animate-float"
          src={backgroundImg}
          width={"100%"}
        />
      </div>

      {/* Main Content */}

      <div className="max-w-3/4 mx-auto z-10">{renderForm()}</div>
    </div>
  );
};

export default AuthPage;
