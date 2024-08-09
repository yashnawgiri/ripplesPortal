import React from "react";

interface CustomButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <button
      className={`rounded-[36px] text-white px-7 py-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
