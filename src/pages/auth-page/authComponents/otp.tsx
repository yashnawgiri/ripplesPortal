import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { OTPInput } from "@/components/ui/OTPInput";
import { useState, useEffect } from "react";

interface OTPProps {
  onVerify: (num: string) => void;
  email: string;
  loading: boolean | null;
  handleEmailSignup: () => void;
  sendOtp: () => void;
}

export default function OTP({
  handleEmailSignup,
  loading,
  email,
  onVerify,
  sendOtp,
}: OTPProps) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResendOtp = () => {
    sendOtp();
    setTimer(60);
    setIsResendDisabled(true);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md space-y-8 backdrop-blur-sm rounded-md p-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">OTP Verification</h2>
          <p className="text-xl text-white/90 truncate font-medium">{email}</p>
          <p className="text-white/80">Enter the code sent to your email</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col justify-center items-center gap-4">
            <OTPInput
              className="text-black text-lg"
              length={4}
              textAlign="center"
              value={otp}
              onChange={setOtp}
              onComplete={onVerify}
            />
          </div>

          <div className="space-y-1">
            <Button
              className="w-full font-semibold bg-secondary text-white hover:bg-secondary/90 transition-colors"
              disabled={loading ?? false}
              size="lg"
              onClick={() => onVerify(otp)}
            >
              {loading ? (
                <Spinner color="current" size="sm" />
              ) : (
                "Verify & Login"
              )}
            </Button>
            <Button
              className="w-full text-secondary !important z-100 border-none bg-transparent text-wrap"
              disabled={isResendDisabled}
              onClick={handleResendOtp}
            >
              {isResendDisabled
                ? `Resend OTP in ${timer} seconds`
                : "Resend OTP"}
            </Button>
            <Button
              className="w-full text-white/80 border-none bg-transparent text-wrap"
              onClick={handleEmailSignup}
            >
              Incorrect email? Click here to sign in and update it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
