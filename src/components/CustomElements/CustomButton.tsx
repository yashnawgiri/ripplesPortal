import React from "react";

interface CustomButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
  disabled?: boolean; // Add this prop to enable/disable the button. Default is false.
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  className,
  children,
  disabled,
}) => {
  return (
    <button
      className={`rounded-[36px] text-white px-7 py-3 ${className}`}
      onClick={onClick}
      disabled={disabled} // Add your condition here to disable the button based on your requirements. For example, if the button should be disabled when a certain condition is met.
    >
      {children}
    </button>
  );
};

export default CustomButton;
