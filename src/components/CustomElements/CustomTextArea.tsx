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
            <p className="heading-color font-semibold text-md mb-1 font-poppins">{title}</p>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${className} w-full h-32 p-4 bg-primary text-color text-md font-poppins rounded-md border border-gray-700 focus:outline-none`}
            />
        </div>
    );
};

export default CustomTextArea;