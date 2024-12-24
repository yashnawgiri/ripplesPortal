import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { InputOtp } from "@nextui-org/input-otp";
import { useState } from "react";

interface OTPProps {
  onVerify: (num: string) => void;
  email: string;
  loading: boolean | null;
  handleEmailSignup: () => void;
}

export default function OTP({
  handleEmailSignup,
  loading,
  email,
  onVerify,
}: OTPProps) {
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md space-y-8 backdrop-blur-sm rounded-md p-8  ">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">OTP Verification</h2>
          <p className="text-xl text-white/90 truncate font-medium">{email}</p>
          <p className="text-white/80">Enter the code sent to your email</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col justify-center items-center gap-4">
            <InputOtp
              className="text-black text-lg"
              length={4}
              textAlign="center"
              value={otp}
              variant="flat"
              onComplete={() => onVerify(otp)}
              onValueChange={setOtp}
            />
          </div>

          <div className="space-y-4">
            <Button
              className="w-full font-semibold bg-secondary text-white hover:bg-secondary/90 transition-colors"
              isDisabled={loading ?? false}
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
