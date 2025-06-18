import * as React from "react";

import { cn } from "../../utils/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeClasses: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "currentColor",
  className,
  ...props
}) => {
  return (
    <div
      className={cn("animate-spin", sizeClasses[size], className)}
      {...props}
    >
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill={color}
        />
      </svg>
    </div>
  );
};
