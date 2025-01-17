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
  const textareaId = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      <label htmlFor={textareaId} className="inputTitle heading-color text-md">{title}</label>
      <textarea
        id={textareaId}
        className={`${className} h-32 p-4 inputClass text-color text-md`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={title}
      />
    </div>
  );
};

export default CustomTextArea;
