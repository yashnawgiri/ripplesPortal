import CustomButton from "@/components/CustomElements/CustomButton";
import CustomInput from "@/components/CustomElements/CustomInput";
import Fallback from "@/components/Fallback";
import { siteConfig } from "@/config/site";
import UserDefaultLayout from "@/layouts/userDefault";
import { authTokenState } from "@/recoil/authTokenState";
import { loadingState } from "@/recoil/loadingState";
import { profileDataFormState } from "@/recoil/profileDataFormState";
import { fetchProfile, profileState } from "@/recoil/profileState";
import { userIdState } from "@/recoil/userIdState";
import { updateProfileService } from "@/services/apiService";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

export default function MyAccount() {
  const navigate = useNavigate();
  const [profileForm, setProfileForm] = useRecoilState(profileDataFormState);
  const [profileData, setProfileData] = useRecoilState(profileState);
  const token = useRecoilValue(authTokenState);
  const userId = useRecoilValue(userIdState);
  // TODO: get email from profile
  const fetchProfileData = useRecoilValue(fetchProfile);
  const [profile, setProfile] = useRecoilState(profileState);
  const [, setEmail] = useState<string>("");
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
      const response = await updateProfileService(profileForm, token!, userId);
      setProfileData({
        ...profileData,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });
      console.log("Profile updated successfully:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchProfileData) {
      setProfile(fetchProfileData);
    } else if (fetchProfileData == null) {
      toast.error("Invalid Token");
      navigate(siteConfig.path.signIn);
    }
  }, [fetchProfileData, setProfile]);

  if (!profile) {
    return <Fallback />;
  }

  return (
    <UserDefaultLayout>
      <div className="flex justify-center items-center">
        <div className="w-full sm:w-2/3 mb-4">
          <h1 className="text-xl lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
            My Account
          </h1>
          <div className="md:flex justify-stretch w-full space-y-2 md:space-y-0 md:space-x-4">
            {/* <CustomInput
              title="First Name"
              type="text"
              placeholder="First Name"
              value={profile?.first_name ?? ""}
              onChange={handleFirstNameChange}
            /> */}
            {/* <CustomInput
              title="Last Name"
              type="text"
              placeholder="Last Name"
              value={profile?.last_name ?? ""}
              onChange={handleLastNameChange}
              /> */}

            <NameCard
              title={"First Name"}
              value={profile.first_name.length == 0 ? "NA" : profile.first_name}
            />
            <NameCard
              title={"Last Name"}
              value={profile.last_name.length == 0 ? "NA" : profile.last_name}
            />
          </div>
          <p className="text-color my-2 mb-8 text-md font-poppins">
            Friends will be able to see this when you share links.
          </p>
          {/* <CustomInput
            title="Email"
            type="email"
            placeholder="example@gmail.com"
            value={profile?.email ?? ""}
            readonly={true}
            onChange={handleEmailChange}
          /> */}
          <NameCard title="Email" value={profile.email ?? "NA"} />
          <p className="text-color my-2 mb-8 text-md font-poppins">
            <Link
              to={siteConfig.userNavItems[4].href}
              className="text-secondary"
            >
              Contact Us
            </Link>
            to update your email preferences.
          </p>
          {/* <CustomButton
            onClick={handleUpdateProfile}
            className="bg-secondary mx-auto w-full mt-4 flex justify-center w-full font-bold text-lg space-x-2"
          >
            Save
          </CustomButton> */}
        </div>
      </div>
    </UserDefaultLayout>
  );
}

type NameCardProps = {
  title: string;
  value: string;
};
function NameCard({ title, value }: NameCardProps) {
  return (
    <div className="w-full">
      <p className="inputTitle heading-color text-md">{title}</p>
      <p className={`h-12 text-color text-md`}>{value}</p>
    </div>
  );
}
