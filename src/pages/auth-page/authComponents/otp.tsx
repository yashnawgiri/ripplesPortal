import React from "react";
import CustomButton from "@/components/CustomElements/CustomButton";
import "@/styles/auth/otp.css";

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
                <h2 className="otpHeader">
                    OTP Verification
                </h2>
                <p className="text-color otpSubtext">
                    Enter the code sent to your email
                </p>
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
                            className="otpInput"
                        />
                    ))}
                </div>
                <CustomButton
                    onClick={onVerify}
                    className="otpVerifyButton"
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