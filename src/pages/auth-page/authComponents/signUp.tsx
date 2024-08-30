import React from "react";
import CustomButton from "@/components/CustomElements/CustomButton";
import { GoogleIcon } from "@/components/icons";

interface SignUpProps {
    onEmailSignup: () => void;
    onGoogleSignup: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onEmailSignup, onGoogleSignup }) => {
    return (
        <>
            <div>
                <h2 className="text-xl lg:text-2xl font-extrabold font-poppins text-center leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Share the Love: Get Cash Rewards for Referring Your Favorite Brands!
                </h2>
                <p className="text-color font-poppins text-sm pt-2">Sign in to see more</p>
            </div>
            <div>
                <CustomButton
                    onClick={onEmailSignup}
                    className="bg-secondary mx-auto w-full mt-4 py-4"
                >
                    <p className="flex justify-center font-poppins w-full text-md space-x-2">
                        Continue with Email
                    </p>
                </CustomButton>
                <CustomButton
                    onClick={onGoogleSignup}
                    className="flex justify-center bg-white mx-auto w-full mt-4 space-x-3 py-4"
                >
                    <GoogleIcon />
                    <p className="flex justify-center font-poppins text-black text-md space-x-2">
                        Continue with Google
                    </p>
                </CustomButton>
            </div>
        </>
    );
};

export default SignUp;
