import React from "react";

import CustomButton from "@/components/CustomElements/CustomButton";
// import { GoogleIcon } from "@/components/icons";
import "@/styles/auth/signUp.css";

interface SignUpProps {
  onEmailSignup: () => void;
  onGoogleSignup: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onEmailSignup }) => {
  return (
    <>
      <div>
        <h2 className="signUpHeader">
          Share the Love: Get Cash Rewards for Referring Your Favorite Brands!
        </h2>
        <p className="text-color signUpSubtext">Sign in to see more</p>
      </div>
      <div>
        <CustomButton className="signUpButton" onClick={onEmailSignup}>
          <p className="flex justify-center font-poppins w-full text-md space-x-2">
            Continue with Email
          </p>
        </CustomButton>
        {/* <CustomButton
                    onClick={onGoogleSignup}
                    className="signUpGoogleButton"
                >
                    <GoogleIcon />
                    <p className="text-md signUpGoogleText">
                        Continue with Google
                    </p>
                </CustomButton> */}
      </div>
    </>
  );
};

export default SignUp;
