import React from "react";
import CustomButton from "@/components/CustomElements/CustomButton";

interface OTPProps {
    otpValues: string[];
    onOtpChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    onOtpKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
    onVerify: () => void;
}

const OTP: React.FC<OTPProps> = ({ otpValues, onOtpChange, onOtpKeyDown, onVerify }) => {
    return (
        <>
            <div>
                <h2 className="text-xl lg:text-2xl font-extrabold font-poppins text-center leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    OTP Verification
                </h2>
                <p className="text-color font-poppins text-sm pt-2">Enter the code sent to your email</p>
            </div>
            <div>
                <div className="flex space-x-4 justify-center my-6">
                    {otpValues.map((value, index) => (
                        <input
                            key={index}
                            name={`input-${index}`}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(event) => onOtpChange(index, event)}
                            onKeyDown={(event) => onOtpKeyDown(index, event)}
                            className="w-14 h-14 border border-gray-500 rounded-full text-center text-white bg-gray-900 text-lg focus:outline-none"
                        />
                    ))}
                </div>
                <CustomButton
                    onClick={onVerify}
                    className="bg-secondary mx-auto w-full mt-4 py-4"
                >
                    <p className="flex justify-center font-poppins w-full text-md space-x-2">
                        Verify & login
                    </p>
                </CustomButton>
            </div>
        </>
    );
};

export default OTP;