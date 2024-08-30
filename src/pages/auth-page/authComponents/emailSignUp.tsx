import React from "react";
import CustomButton from "@/components/CustomElements/CustomButton";

interface EmailSignUpProps {
    email: string;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onContinue: () => void;
}

const EmailSignUp: React.FC<EmailSignUpProps> = ({ email, onEmailChange, onContinue }) => {
    return (
        <>
            <div>
                <h2 className="text-xl lg:text-2xl font-extrabold font-poppins text-center leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Earn cash rewards from your favorite brands
                </h2>
                <p className="text-color font-poppins text-sm pt-2">Sign in to see more</p>
            </div>
            <div>
                <div className="w-full">
                    <p className="text-color text-start text-md mb-1 font-poppins">Email Address</p>
                    <input
                        type="email"
                        placeholder="eg. example@gmail.com"
                        value={email}
                        onChange={onEmailChange}
                        className="w-full py-4 px-6 bg-primary text-color text-md font-poppins rounded-full border border-gray-700 focus:outline-none"
                    />
                </div>

                <CustomButton
                    onClick={onContinue}
                    className="bg-secondary mx-auto w-full mt-4 py-4"
                >
                    <p className="flex justify-center font-poppins w-full text-md space-x-2">
                        Continue with Email
                    </p>
                </CustomButton>
            </div>
        </>
    );
};

export default EmailSignUp;
