import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";
import SignUp from "./authComponents/signUp";
import EmailSignUp from "./authComponents/emailSignUp";
import OTP from "./authComponents/otp";

const AuthPage: React.FC = () => {
    const [step, setStep] = useState<'signup' | 'email-signup' | 'otp'>('signup');
    const [email, setEmail] = useState<string>('');
    const [otpValues, setOtpValues] = useState(['', '', '', '']);

    const handleEmailSignup = () => {
        setStep('email-signup');
    };

    const handleGoogleSignup = () => {
        console.log("Google Signup Clicked");
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleContinueToOTP = () => {
        setStep('otp');
    };

    const handleOtpChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^[0-9]$/.test(value)) { 
            const newValues = [...otpValues];
            newValues[index] = value;
            setOtpValues(newValues);

            if (value && index < 3) {
                const nextSibling = document.querySelector<HTMLInputElement>(`input[name=input-${index + 1}]`);
                nextSibling?.focus();
            }
        }
    };

    const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            const newValues = [...otpValues];
            newValues[index] = '';
            setOtpValues(newValues);

            if (index > 0) {
                const prevSibling = document.querySelector<HTMLInputElement>(`input[name=input-${index - 1}]`);
                prevSibling?.focus();
            }
        }
    };

    const handleVerifyAndLogin = () => {
        console.log("Verifying OTP:", otpValues.join(''));
    };

    const renderForm = () => {
        switch (step) {
            case 'signup':
                return (
                    <SignUp
                        onEmailSignup={handleEmailSignup}
                        onGoogleSignup={handleGoogleSignup}
                    />
                );
            case 'email-signup':
                return (
                    <EmailSignUp
                        email={email}
                        onEmailChange={handleEmailChange}
                        onContinue={handleContinueToOTP}
                    />
                );
            case 'otp':
                return (
                    <OTP
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
        <div className="min-h-screen w-full bg-no-repeat bg-center bg-cover content-center bg-auth-background">
            <div className="text-center max-w-md bg-primary mx-4 sm:mx-auto rounded-3xl">
                <div className="px-8 space-y-6 py-8">
                    <div className="flex text-2xl font-bold text-white justify-center">
                        <h2>{siteConfig.name}</h2>
                        <h2 className="text-2xl text-secondary">.</h2>
                    </div>
                    {renderForm()}
                    <div>
                        <p className="text-sm text-gray-500">
                            By continuing, you agree to the <Link className="text-gray-400 underline" to={"/terms-and-conditions"}>Terms of Service</Link>
                        </p>
                        <p className="text-sm text-gray-500">
                            and acknowledge you’ve read our <Link className="text-gray-400 underline" to={"/privacy-policy"}>Privacy Policy.</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
