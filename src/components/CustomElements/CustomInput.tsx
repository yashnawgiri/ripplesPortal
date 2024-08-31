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

const CustomInput: React.FC<InputProps> = ({ title, type, placeholder = "Enter Text", value, readonly = false, className, onChange }) => {
    return (
        <div className="w-full">
            <p className="inputTitle heading-color text-md">{title}</p>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                readOnly={readonly}
                onChange={onChange}
                className={`${className} h-12 px-4 inputClass text-color text-md`}
            />
        </div>
    );
};

export default CustomInput;