import backgroundImage from "@/assets/images/backgroundImage.png";
import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function OTP() {
    const [values, setValues] = useState(['', '', '', '']);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^[0-9]$/.test(value)) {  // Restrict input to numbers only
            const newValues = [...values];
            newValues[index] = value;
            setValues(newValues);

            // Automatically focus the next input if the current input is not empty
            if (value && index < 3) {
                const nextSibling = document.querySelector<HTMLInputElement>(`input[name=input-${index + 1}]`);
                nextSibling?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            const newValues = [...values];
            newValues[index] = '';
            setValues(newValues);

            // Automatically focus the previous input on backspace if the current input is empty
            if (index > 0) {
                const prevSibling = document.querySelector<HTMLInputElement>(`input[name=input-${index - 1}]`);
                prevSibling?.focus();
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-no-repeat bg-center bg-cover content-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="text-center max-w-md bg-primary mx-4 sm:mx-auto rounded-3xl">
                <div className="px-8 space-y-6 py-8">
                    <div className="flex text-2xl font-bold text-white justify-center">
                        <h2>{siteConfig.name}</h2>
                        <h2 className="text-2xl text-secondary">.</h2>
                    </div>
                    <div>
                        <h2 className="text-xl lg:text-2xl font-extrabold font-poppins text-center leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                            OTP Verification
                        </h2>
                        <p className="text-color font-poppins text-sm pt-2">Enter the code sent to your email</p>
                    </div>
                    <div>
                        <div className="flex space-x-4 justify-center my-6">
                            {values.map((value, index) => (
                                <input
                                    key={index}
                                    name={`input-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={value}
                                    onChange={(event) => handleChange(index, event)}
                                    onKeyDown={(event) => handleKeyDown(index, event)}
                                    className="w-14 h-14 border border-gray-500 rounded-full text-center text-white bg-gray-900 text-lg focus:outline-none"
                                />
                            ))}
                        </div>
                        <CustomButton
                            onClick={() => { }}
                            className="bg-secondary mx-auto w-full mt-4 py-4"
                        >
                            <p className="flex justify-center font-poppins w-full text-md space-x-2">
                                Verify & login
                            </p>
                        </CustomButton>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            By continuing, you agree to the <Link className="text-gray-400 underline" to={"/terms-and-conditions"}>Terms of Service</Link></p>
                        <p className="text-sm text-gray-500">
                            and acknowledge you’ve read our <Link className="text-gray-400 underline" to={"/privacy-policy"}>Privacy Policy.</Link></p>
                    </div>
                </div>

            </div>
        </div>
    );
}
