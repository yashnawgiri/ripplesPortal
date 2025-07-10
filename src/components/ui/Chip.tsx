import React from "react";

export interface ChipProps {
  children: React.ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "flat";
  className?: string;
  role?: string;
  "aria-label"?: string;
}

const colorStyles = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-blue-100 text-blue-800",
  secondary: "bg-purple-100 text-purple-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const variantStyles = {
  solid: "border-0",
  outline: "bg-transparent border-2",
  flat: "bg-opacity-20 border-0",
};

export const Chip: React.FC<ChipProps> = ({
  children,
  color = "default",
  size = "md",
  variant = "solid",
  className = "",
  role,
  "aria-label": ariaLabel,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors";
  const colorStyle = colorStyles[color];
  const sizeStyle = sizeStyles[size];
  const variantStyle = variantStyles[variant];

  return (
    <span
      aria-label={ariaLabel}
      className={`${baseStyles} ${colorStyle} ${sizeStyle} ${variantStyle} ${className}`}
      role={role}
    >
      {children}
    </span>
  );
};

export default Chip;
