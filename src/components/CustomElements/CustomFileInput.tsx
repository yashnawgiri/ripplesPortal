import { useState } from "react";
import "@/styles/customComponents/input.css";

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
      <p className="inputTitle heading-color text-md">{title}</p>
      <label className="inputFileLabel text-md text-color">
        {fileName ? fileName : "Add file or drop files here."}
        <input className="hidden" type="file" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default CustomFileInput;
