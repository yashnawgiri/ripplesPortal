import "@/styles/customComponents/input.css";

type InputProps = {
  title: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const CustomTextArea: React.FC<InputProps> = ({
  title,
  placeholder = "Text Field",
  value,
  className,
  onChange,
}) => {
  const textareaId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <label className="inputTitle heading-color text-md" htmlFor={textareaId}>
        {title}
      </label>
      <textarea
        aria-label={title}
        className={`${className} h-32 p-4 inputClass text-color text-md`}
        id={textareaId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomTextArea;
