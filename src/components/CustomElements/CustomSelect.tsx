import "@/styles/customComponents/input.css";

type SelectProps = {
    title: string;
    options: string[];
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CustomSelect: React.FC<SelectProps> = ({ title, options, value, className, onChange }) => {
    return (
        <div className="w-full">
            <p className="inputTitle heading-color text-md">{title}</p>
            <select
                value={value}
                onChange={onChange}
                className={`${className} h-12 px-4 inputClass text-color text-md`}
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
