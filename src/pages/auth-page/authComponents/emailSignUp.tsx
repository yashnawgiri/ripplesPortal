import React from "react";
import CustomButton from "@/components/CustomElements/CustomButton";
import "@/styles/auth/emailSignUp.css";
import { Spinner } from "@nextui-org/spinner";

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
      <div>
        <h2 className="emailSignUpHeader">
          Earn cash rewards from your favorite brands
        </h2>
        <p className="emailSignUpSubtext text-color">Sign in to see more</p>
      </div>
      <div>
        <div className="w-full">
          <p className="emailInputLabel text-md text-color">Email Address</p>
          <input
            type="email"
            placeholder="eg. example@gmail.com"
            value={email}
            onChange={onEmailChange}
            className="emailInputField text-color text-md"
          />
        </div>

        <CustomButton
          onClick={onContinue}
          className="emailContinueButton"
          disabled={loading ? true : false}
        >
          <p className="flex justify-center font-poppins w-full text-md space-x-2">
            {loading ? <Spinner /> : "Continue with Email"}
          </p>
        </CustomButton>
      </div>
    </>
  );
};

export default EmailSignUp;
