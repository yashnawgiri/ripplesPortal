import "@/styles/customComponents/input.css";

type SelectProps = {
  title: string;
  options: string[];
  value: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CustomSelect: React.FC<SelectProps> = ({
  title,
  options,
  value,
  className,
  onChange,
}) => {
  const selectId = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      <label htmlFor={selectId} className="inputTitle heading-color text-md">{title}</label>
      <select
        id={selectId}
        className={`${className} h-12 px-4 inputClass text-color text-md`}
        value={value}
        onChange={onChange}
        aria-label={title}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
