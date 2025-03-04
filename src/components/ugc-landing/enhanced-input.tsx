import { useState } from "react";

import { Input } from "@/components/ugc-landing/ui/input";
import { Label } from "@/components/ugc-landing/ui/label";
import { cn } from "@/utils/utils";

interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  containerClassName?: string;
}

export default function EnhancedInput({
  label,
  className,
  containerClassName,
  ...props
}: EnhancedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "space-y-2 transition-all duration-200",
        isFocused && "transform scale-[1.02]",
        containerClassName,
      )}
    >
      <Label
        className={cn(
          "text-white transition-colors duration-200",
          isFocused && "text-blue-400",
        )}
        htmlFor={props.id}
      >
        {label === "Cashback Percentage (%)" ? "Avg Cashback %" : label}
      </Label>
      <div className="relative">
        <Input
          {...props}
          className={cn(
            "bg-white/5 border-white/10 text-white transition-all duration-200",
            isFocused && "border-blue-400 bg-white/10 ring-1 ring-blue-400/20",
            className,
          )}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
        />
        <div
          className={cn(
            "absolute inset-0 pointer-events-none rounded-md opacity-0 transition-opacity duration-200",
            isFocused && "opacity-100",
            "bg-gradient-to-r from-blue-400/10 to-purple-600/10",
          )}
        />
      </div>
    </div>
  );
}
