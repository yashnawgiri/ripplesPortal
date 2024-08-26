import backgroundImage from "@/assets/images/backgroundImage.png";
import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function EmailSignUp() {
    const [email, setEmail] = useState<string>('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
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
                            Earn cash rewards from your favorite brands
                        </h2>
                        <p className="text-color font-poppins text-sm pt-2">Sign in to see more</p>
                    </div>
                    <div>
                        <div className="w-full">
                            <p className="text-color text-start text-md mb-1 font-poppins">Email Address</p>
                            <input
                                type="email"
                                placeholder="eg. example@gmail.com"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full py-4 px-6 bg-primary text-color text-md font-poppins rounded-full border border-gray-700 focus:outline-none"
                            />
                        </div>

                        <CustomButton
                            onClick={() => { }}
                            className="bg-secondary mx-auto w-full mt-4 py-4"
                        >
                            <p className="flex justify-center font-poppins w-full text-md space-x-2">
                                Continue with Email
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