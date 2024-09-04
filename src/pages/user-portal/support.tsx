import CustomButton from "@/components/CustomElements/CustomButton";
import CustomFileInput from "@/components/CustomElements/CustomFileInput";
import CustomInput from "@/components/CustomElements/CustomInput";
import CustomSelect from "@/components/CustomElements/CustomSelect";
import CustomTextArea from "@/components/CustomElements/CustomTextArea";
import UserDefaultLayout from "@/layouts/userDefault";
import { authTokenState } from "@/recoil/authTokenState";
import { supportFormState } from "@/recoil/supportFormState";
import { SubmitSupportService } from "@/services/apiService";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Support() {
    const authToken = useRecoilValue(authTokenState);
    const [supportForm, setSupportForm] = useRecoilState(supportFormState);
    const [file, setFile] = useState<File | null>(null);
    file;

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupportForm({
            ...supportForm,
            email: event.target.value
        })
    };

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupportForm({
            ...supportForm,
            subject: event.target.value
        })
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSupportForm({
            ...supportForm,
            description: event.target.value
        })
    };

    const handleBrandNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupportForm({
            ...supportForm,
            brand_name: event.target.value
        })
    }

    const handleRequestCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSupportForm({
            ...supportForm,
            category: event.target.value
        })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (authToken) {
            await SubmitSupportService(supportForm,authToken);
        } 
    }

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
                            value={supportForm.email}
                            readonly={true}
                            onChange={handleEmailChange}
                        />

                        <CustomInput
                            title="Subject"
                            type="text"
                            placeholder="Subject"
                            value={supportForm.subject}
                            onChange={handleSubjectChange}
                        />

                        <CustomSelect
                            title="Request Category"
                            options={["Link Not Working", "Bug Report", "Feature Request", "Other"]}
                            value={supportForm.category}
                            onChange={handleRequestCategoryChange}
                        />

                        <CustomInput
                            title="Brand Name"
                            type="text"
                            placeholder="Brand Name"
                            value={supportForm.brand_name}
                            onChange={handleBrandNameChange}
                        />

                        <CustomTextArea
                            title="Description"
                            placeholder="Description..."
                            value={supportForm.description}
                            onChange={handleDescriptionChange}
                        />

                        <CustomFileInput
                            title="Attachments"
                            onChange={handleFileChange}
                        />

                        <CustomButton
                            onClick={handleSubmit}
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
