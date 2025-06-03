import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (e: { target: { value: string } }) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  onChange,
  className = '',
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange({ target: { value: e.target.value } });
    }
  };

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        className={`
          w-full 
          rounded-md 
          border 
          border-white/20 
          bg-white/10 
          px-4 
          py-2.5 
          text-white 
          focus:outline-none 
          focus:ring-2 
          focus:ring-white/30 
          focus:border-white/30
          appearance-none
          cursor-pointer
          hover:bg-white/15
          transition-colors
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-black text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/60">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
