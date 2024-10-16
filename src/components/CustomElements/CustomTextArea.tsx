import "@/styles/customComponents/input.css";

type InputProps = {
    title: string;
    placeholder: string;
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const CustomTextArea: React.FC<InputProps> = ({ title, placeholder = "Text Field", value, className, onChange }) => {
    return (
        <div className="w-full">
            <p className="inputTitle heading-color text-md">{title}</p>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${className} h-32 p-4 inputClass text-color text-md`}
            />
        </div>
    );
};

export default CustomTextArea;