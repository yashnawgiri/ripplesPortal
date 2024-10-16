import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "./authComponents/signUp";
import EmailSignUp from "./authComponents/emailSignUp";
import OTP from "./authComponents/otp";
import "@/styles/auth/auth.css";
import { useRecoilState } from "recoil";
import { loadingState } from "@/recoil/loadingState";
import { authTokenState } from "@/recoil/authTokenState";
import { userIdState } from "@/recoil/userIdState";
import { emailLogin, otpVerify } from "../../services/authService.ts";

const AuthPage: React.FC = () => {
    const [step, setStep] = useState<'signup' | 'email-signup' | 'otp'>('signup');
    const [, setAuthToken] = useRecoilState(authTokenState);
    const [, setUserId] = useRecoilState(userIdState);
    const [email, setEmail] = useState<string>('');
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const [, setLoading] = useRecoilState(loadingState);
    const navigate = useNavigate();

    const handleEmailSignup = () => {
        setStep('email-signup');
    };

    const handleGoogleSignup = () => {
        console.log("Google Signup Clicked");
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleContinueToOTP = async () => {
        setLoading(true);
        try {
            const res = await emailLogin({ email });
            console.log(res);
            setEmail(email);
            setStep('otp');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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

    const handleVerifyAndLogin = async () => {
        const otp : string = (otpValues.join(''));
        setLoading(true);
        try {
            const res = await otpVerify({ email, otp });
            console.log(res); 
            if (res.data) {
                setAuthToken(res.data.token);
                setUserId(res.data.userId);
                localStorage.setItem('authToken',res.data.token);
                localStorage.setItem('userId',res.data.userId);
                setTimeout(() => navigate('/my-ripples/home'), 100);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => {
        switch (step) {
          // TODO: add email validation
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
                            By continuing, you agree to the <Link className="authFormLink" to={"/terms-and-conditions"}>Terms of Service</Link>
                        </p>
                        <p className="authFormSubtext">
                            and acknowledge you’ve read our <Link className="authFormLink" to={"/privacy-policy"}>Privacy Policy.</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
