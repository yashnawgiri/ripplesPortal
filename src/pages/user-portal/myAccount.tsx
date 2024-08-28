import CustomButton from "@/components/CustomElements/CustomButton";
import CustomInput from "@/components/CustomElements/CustomInput";
import UserDefaultLayout from "@/layouts/userDefault";

import React, { useState } from 'react';


export default function MyAccount() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
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
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <CustomInput
                            title="Last Name"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
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
                        onClick={() => { }}
                        className="bg-secondary mx-auto w-full mt-4 flex justify-center w-full font-bold text-lg space-x-2"
                    >
                        Save
                    </CustomButton>
                </div>
            </div>
        </UserDefaultLayout>
    );
}