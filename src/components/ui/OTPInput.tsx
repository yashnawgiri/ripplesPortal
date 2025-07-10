import React, { useRef, useState, KeyboardEvent, ChangeEvent } from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  textAlign?: "left" | "center" | "right";
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  value,
  onChange,
  onComplete,
  className = "",
  textAlign = "center",
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(newValue)) return;

    // Update the value
    const newOtp = value.split("");

    newOtp[index] = newValue.slice(-1);
    const updatedValue = newOtp.join("");

    onChange(updatedValue);

    // Move to next input if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    // Check if OTP is complete
    if (updatedValue.length === length && onComplete) {
      onComplete(updatedValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);

    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData);
      if (pastedData.length === length && onComplete) {
        onComplete(pastedData);
      }
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          className={`w-12 h-12 rounded-md border-2 text-lg font-semibold
            ${focusedIndex === index ? "border-blue-500" : "border-gray-300"}
            focus:outline-none focus:border-blue-500
            text-${textAlign}
            transition-colors duration-200`}
          inputMode="numeric"
          maxLength={1}
          pattern="[0-9]*"
          type="text"
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};
