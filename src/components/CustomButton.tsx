import React from 'react';

interface CustomButtonProps {
    onClick: () => void;
    className: string;
    children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({onClick, className, children}) => {
    return (
        <button
            onClick={onClick}
            className={`rounded-[36px] text-white px-7 py-3 ${className}`}
        >
            {children}
        </button>
    );
}

export default CustomButton;
