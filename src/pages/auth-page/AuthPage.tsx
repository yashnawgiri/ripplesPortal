import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { emailLogin, otpVerify } from "../../services/authService.ts";

import SignUp from "./authComponents/signUp";
import EmailSignUp from "./authComponents/emailSignUp";
import OTP from "./authComponents/otp";

import { siteConfig } from "@/config/site";

import "@/styles/auth/auth.css";
import { useRecoilState } from "recoil";

import { loadingState } from "@/recoil/loadingState";
import { authTokenState } from "@/recoil/authTokenState";
import { userIdState } from "@/recoil/userIdState";
import { validateEmail } from "@/utils/utils.ts";

const AuthPage: React.FC = () => {
  const [step, setStep] = useState<"signup" | "email-signup" | "otp">("signup");
  const [, setAuthToken] = useRecoilState(authTokenState);
  const [, setUserId] = useRecoilState(userIdState);
  const [email, setEmail] = useState<string>("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
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

  const handleOtpChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    if (/^[0-9]$/.test(value)) {
      const newValues = [...otpValues];

      newValues[index] = value;
      setOtpValues(newValues);

      if (value && index < 3) {
        const nextSibling = document.querySelector<HTMLInputElement>(
          `input[name=input-${index + 1}]`,
        );

        nextSibling?.focus();
      }

      // Verify OTP when all 4 inputs are filled
      if (newValues.join("").trim().length === 4) {
        handleVerifyAndLogin(newValues.join(""));
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      const newValues = [...otpValues];

      newValues[index] = "";
      setOtpValues(newValues);

      if (index > 0) {
        const prevSibling = document.querySelector<HTMLInputElement>(
          `input[name=input-${index - 1}]`,
        );

        prevSibling?.focus();
      }
    }
  };

  const handleVerifyAndLogin = async (num?: string) => {
    const otp: string = num || otpValues.join("");

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
            otpValues={otpValues}
            onOtpChange={handleOtpChange}
            onOtpKeyDown={handleOtpKeyDown}
            onVerify={handleVerifyAndLogin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="authPageContainer">
      <div className="authFormContainer">
        <div className="authFormInner">
          <div className="authFormHeader">
            <h2>{siteConfig.name}</h2>
            <h2 className="text-2xl text-secondary">.</h2>
          </div>
          {renderForm()}
          <div>
            <p className="authFormSubtext">
              By continuing, you agree to the{" "}
              <Link className="authFormLink" to={"/terms-and-conditions"}>
                Terms of Service
              </Link>
            </p>
            <p className="authFormSubtext">
              and acknowledge you’ve read our{" "}
              <Link className="authFormLink" to={"/privacy-policy"}>
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
