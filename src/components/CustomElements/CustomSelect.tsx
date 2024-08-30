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
            <p className="heading-color font-semibold text-md mb-1 font-poppins">{title}</p>
            <select
                value={value}
                onChange={onChange}
                className={`${className} w-full h-12 px-4 bg-primary text-color text-md font-poppins rounded-md border border-gray-700 focus:outline-none`}
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
