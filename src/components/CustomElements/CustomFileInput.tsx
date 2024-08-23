import { useState } from "react";

type FileInputProps = {
    title: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomFileInput: React.FC<FileInputProps> = ({ title, onChange }) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
            onChange(event);
        }
    };

    return (
        <div className="w-full">
            <p className="heading-color font-semibold text-md mb-1 font-poppins">{title}</p>
            <label className="flex justify-center underline items-center w-full h-12 px-4 py-2 bg-primary text-color text-center text-md font-poppins rounded-md border border-gray-700 focus:outline-none cursor-pointer hover:bg-gray-800">
                {fileName ? fileName : "Add file or drop files here."}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
        </div>
    );
};

export default CustomFileInput;
