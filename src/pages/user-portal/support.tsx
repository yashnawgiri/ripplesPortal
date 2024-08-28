import CustomButton from "@/components/CustomElements/CustomButton";
import CustomFileInput from "@/components/CustomElements/CustomFileInput";
import CustomInput from "@/components/CustomElements/CustomInput";
import CustomSelect from "@/components/CustomElements/CustomSelect";
import CustomTextArea from "@/components/CustomElements/CustomTextArea";
import UserDefaultLayout from "@/layouts/userDefault";
import { useState } from "react";

export default function Support() {
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [requestCategory, setRequestCategory] = useState<string>('Link Not Working');
    const [brandName, setBrandName] = useState<string>('');
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

    const handleBrandNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrandName(event.target.value);
    }

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
                            readonly={true}
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

                        <CustomInput
                            title="Brand Name"
                            type="text"
                            placeholder="Brand Name"
                            value={brandName}
                            onChange={handleBrandNameChange}
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
                            className="bg-secondary flex justify-center w-full font-bold text-lg space-x-2 mx-auto w-full mt-4"
                        >
                            Submit
                        </CustomButton>
                    </div>

                </div>
            </div>
        </UserDefaultLayout>
    );
}
