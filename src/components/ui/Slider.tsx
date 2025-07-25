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
  "aria-label"?: string;
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
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [currentValue, setCurrentValue] = React.useState<number>(
      value ?? defaultValue ?? min,
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
      <div className={`flex flex-col w-full gap-2 min-w-0 ${className}`}>
        {(label || displayValue) && (
          <div className="flex justify-between items-center min-w-0">
            {label && (
              <span className="text-sm font-medium text-white truncate mr-2">
                {label}
              </span>
            )}
            {displayValue && (
              <span className="text-sm font-medium text-white flex-shrink-0">
                {displayValue}
              </span>
            )}
          </div>
        )}
        <div className="relative w-full min-w-0">
          <input
            ref={ref}
            aria-label={ariaLabel || label || "Slider"}
            className={`
              w-full h-2 appearance-none rounded-lg
              bg-gray-200 dark:bg-gray-700
              cursor-pointer
              touch-manipulation
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-blue-600
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-colors
              [&::-webkit-slider-thumb]:hover:bg-blue-700
              [&::-webkit-slider-thumb]:active:bg-blue-800
              [&::-webkit-slider-thumb]:touch-manipulation
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-blue-600
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:transition-colors
              [&::-moz-range-thumb]:hover:bg-blue-700
              [&::-moz-range-thumb]:active:bg-blue-800
              [&::-moz-range-thumb]:touch-manipulation
              disabled:opacity-50
              disabled:cursor-not-allowed
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              focus:ring-offset-transparent
            `}
            disabled={disabled}
            max={max}
            min={min}
            step={step}
            style={{
              background: `linear-gradient(to right, #2563eb ${percentage}%, #e5e7eb ${percentage}%)`,
            }}
            type="range"
            value={currentValue}
            onChange={handleChange}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
