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
            <p className="heading-color font-semibold text-md mb-1 font-poppins">{title}</p>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                readOnly={readonly}
                onChange={onChange}
                className={`${className} w-full h-12 px-4 bg-primary text-color text-md font-poppins rounded-md border border-gray-700 focus:outline-none`}
            />
        </div>
    );
};

export default CustomInput;