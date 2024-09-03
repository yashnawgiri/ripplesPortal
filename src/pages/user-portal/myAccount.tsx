import CustomButton from "@/components/CustomElements/CustomButton";
import CustomInput from "@/components/CustomElements/CustomInput";
import UserDefaultLayout from "@/layouts/userDefault";
import { authTokenState } from "@/recoil/authTokenState";
import { loadingState } from "@/recoil/loadingState";
import { profileDataFormState } from "@/recoil/profileDataFormState";
import { profileState } from "@/recoil/profileState";
import { updateProfileService } from "@/services/apiService";

import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";


export default function MyAccount() {
    const [profileForm, setProfileForm] = useRecoilState(profileDataFormState);
    const [profileData, setProfileData] = useRecoilState(profileState);
    const token = useRecoilValue(authTokenState);
    const [email, setEmail] = useState<string>('');
    const [, setLoading] = useRecoilState(loadingState);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileForm({ ...profileForm, first_name: event.target.value });
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileForm({ ...profileForm, last_name: event.target.value });
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleUpdateProfile = async () => {
        setLoading(true);

        try {
            const response = await updateProfileService(profileForm, token!);
            setProfileData({ 
                ...profileData, 
                firstname: response.data.first_name, 
                lastname: response.data.last_name 
            })
            console.log('Profile updated successfully:', response);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserDefaultLayout>
            <div className="flex justify-center items-center">
                <div className="w-full sm:w-2/3 mb-4">
                    <h1 className="text-xl lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
                        My Account
                    </h1>
                    <div className="md:flex justify-stretch w-full space-y-2 md:space-y-0 md:space-x-4">
                        <CustomInput
                            title="First Name"
                            type="text"
                            placeholder="First Name"
                            value={profileForm.first_name}
                            onChange={handleFirstNameChange}
                        />
                        <CustomInput
                            title="Last Name"
                            type="text"
                            placeholder="Last Name"
                            value={profileForm.last_name}
                            onChange={handleLastNameChange}
                        />
                    </div>
                    <p className="text-color my-2 mb-8 text-md font-poppins">
                        Friends will be able to see this when you share links.
                    </p>
                    <CustomInput
                        title="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        readonly={true}
                        onChange={handleEmailChange}
                    />
                    <p className="text-color my-2 mb-8 text-md font-poppins">
                        <a href={""} className="text-secondary">Contact Us</a> to update your email preferences.
                    </p>
                    <CustomButton
                        onClick={handleUpdateProfile}
                        className="bg-secondary mx-auto w-full mt-4 flex justify-center w-full font-bold text-lg space-x-2"
                    >
                        Save
                    </CustomButton>
                </div>
            </div>
        </UserDefaultLayout>
    );
}