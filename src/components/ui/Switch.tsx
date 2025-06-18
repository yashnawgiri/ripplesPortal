import React from "react";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    container: "w-10 h-5",
    knob: "h-4 w-4",
    knobTranslate: "peer-checked:translate-x-5",
    offset: "left-0.5 top-0.5",
  },
  md: {
    container: "w-12 h-6",
    knob: "h-5 w-5",
    knobTranslate: "peer-checked:translate-x-6",
    offset: "left-0.5 top-0.5",
  },
  lg: {
    container: "w-16 h-8",
    knob: "h-7 w-7",
    knobTranslate: "peer-checked:translate-x-8",
    offset: "left-0.5 top-0.5",
  },
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  size = "sm",
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
  };

  const { container, knob, knobTranslate, offset } = sizeClasses[size];

  return (
    <label className={`relative inline-block ${container}`}>
      <input
        checked={checked}
        className="peer sr-only"
        role="switch"
        type="checkbox"
        onChange={handleChange}
        {...props}
      />
      <div className="w-full h-full bg-gray-400 rounded-full transition-colors peer-checked:bg-secondary" />
      <span
        className={`absolute ${offset} ${knob} rounded-full bg-white transition-transform ${knobTranslate}`}
      />
    </label>
  );
};
