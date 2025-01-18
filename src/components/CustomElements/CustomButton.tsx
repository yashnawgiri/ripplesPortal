import React from "react";

interface CustomButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  className,
  children,
  disabled,
  ariaLabel,
}) => {
  return (
    <button
      className={`rounded-[36px] text-white px-7 py-3 ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
    >
      {children}
    </button>
  );
};

export default CustomButton;
