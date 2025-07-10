import "@/styles/customComponents/input.css";

type InputProps = {
  title: string;
  type: string;
  placeholder: string;
  value: string;
  readonly?: boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<InputProps> = ({
  title,
  type,
  placeholder = "Enter Text",
  value,
  readonly = false,
  className,
  onChange,
}) => {
  const inputId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <label className="inputTitle heading-color text-md" htmlFor={inputId}>
        {title}
      </label>
      <input
        aria-label={title}
        className={`${className} h-12 px-4 inputClass text-color text-md`}
        id={inputId}
        placeholder={placeholder}
        readOnly={readonly}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
