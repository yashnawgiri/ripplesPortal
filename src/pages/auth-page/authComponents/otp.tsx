import React from "react";

import CustomButton from "@/components/CustomElements/CustomButton";

import "@/styles/auth/otp.css";
import { Spinner } from "@nextui-org/spinner";

interface OTPProps {
  otpValues: string[];
  onOtpChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onOtpKeyDown: (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  onVerify: () => void;
  email: string;
  loading: boolean | null;
  handleEmailSignup: () => void;
}

const OTP: React.FC<OTPProps> = ({
  handleEmailSignup,
  loading,
  email,
  otpValues,
  onOtpChange,
  onOtpKeyDown,
  onVerify,
}) => {
  return (
    <>
      <div>
        <h2 className="otpHeader">OTP Verification</h2>
        <p className="text-color otpText text-xl pt-1  truncate">{email}</p>
        <p className="text-color otpSubtext">
          Enter the code sent to your email
        </p>
      </div>
      <div>
        <div className="flex space-x-4 justify-center my-6">
          {otpValues.map((value, index) => (
            <input
              key={index}
              className="otpInput"
              maxLength={1}
              name={`input-${index}`}
              type="text"
              value={value}
              onChange={(event) => onOtpChange(index, event)}
              onKeyDown={(event) => onOtpKeyDown(index, event)}
            />
          ))}
        </div>
        <CustomButton
          className="otpVerifyButton"
          disabled={loading ? true : false}
          onClick={onVerify}
        >
          <p className="flex justify-center font-poppins w-full text-md space-x-2">
            {loading ? <Spinner /> : "Verify & login"}
          </p>
        </CustomButton>
      </div>
      <p>
        <button
          className="text-white cursor-pointer border-none bg-transparent underline"
          onClick={handleEmailSignup}
        >
          Incorrect email? Click here to sign in and update it
        </button>
      </p>
    </>
  );
};

export default OTP;
