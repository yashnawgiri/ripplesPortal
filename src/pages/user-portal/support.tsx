import CustomButton from "@/components/CustomButton";
import CustomFileInput from "@/components/CustomFileInput";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import CustomTextArea from "@/components/CustomTextArea";
import UserDefaultLayout from "@/layouts/userDefault";
import { useState } from "react";

export default function Support() {
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [requestCategory, setRequestCategory] = useState<string>('Link Not Working');
    const [brandName, setBrandName] = useState<string>('Brand Name xyz');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    file;

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <UserDefaultLayout>
            <div className="flex justify-center items-center">
                <div className="w-full sm:w-2/3 mb-4">
                    <h1 className="text-xl lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
                        Submit a request
                    </h1>
                    <div className="space-y-4">
                        <CustomInput
                            title="Email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <CustomInput
                            title="Subject"
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={handleSubjectChange}
                        />

                        <CustomSelect
                            title="Request Category"
                            options={["Link Not Working", "Bug Report", "Feature Request", "Other"]}
                            value={requestCategory}
                            onChange={(e) => setRequestCategory(e.target.value)}
                        />

                        <CustomSelect
                            title="Brand Name"
                            options={["Brand Name xyz", "Brand Name abc", "Brand Name pqr", "Other"]}
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                        />

                        <CustomTextArea
                            title="Description"
                            placeholder="Description..."
                            value={description}
                            onChange={handleDescriptionChange}
                        />

                        <CustomFileInput
                            title="Attachments"
                            onChange={handleFileChange}
                        />

                        <CustomButton
                            onClick={() => { }}
                            className="bg-secondary mx-auto w-full mt-4"
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={""}
                                className="flex justify-center w-full font-bold text-lg space-x-2"
                            >
                                Submit
                            </a>
                        </CustomButton>
                    </div>

                </div>
            </div>
        </UserDefaultLayout>
    );
}
