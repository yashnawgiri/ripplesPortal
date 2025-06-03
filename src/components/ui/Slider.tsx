import * as React from "react";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
  valueFormatter?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      className = "",
      disabled = false,
      label,
      valueFormatter,
      prefix = "",
      suffix = "",
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState<number>(
      value ?? defaultValue ?? min
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(value);
      }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      setCurrentValue(newValue);
      onChange?.(newValue);
    };

    const percentage = ((currentValue - min) / (max - min)) * 100;

    const displayValue = valueFormatter 
      ? valueFormatter(currentValue)
      : `${prefix}${currentValue}${suffix}`;

    return (
      <div className={`flex flex-col w-full gap-2 ${className}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">
            {label}
          </span>
          <span className="text-sm font-medium text-white">
            {displayValue}
          </span>
        </div>
        <div className="relative flex-1">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={`
              w-full h-2 appearance-none rounded-lg
              bg-gray-200 dark:bg-gray-700
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-blue-600
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-colors
              [&::-webkit-slider-thumb]:hover:bg-blue-700
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-blue-600
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:transition-colors
              [&::-moz-range-thumb]:hover:bg-blue-700
              disabled:opacity-50
              disabled:cursor-not-allowed
            `}
            style={{
              background: `linear-gradient(to right, #2563eb ${percentage}%, #e5e7eb ${percentage}%)`,
            }}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
