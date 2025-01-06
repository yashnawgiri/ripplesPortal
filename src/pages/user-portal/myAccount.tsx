import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaPencilAlt, FaSave } from "react-icons/fa";

import CustomButton from "@/components/CustomElements/CustomButton";
import CustomInput from "@/components/CustomElements/CustomInput";
import Fallback from "@/components/Fallback";
import { siteConfig } from "@/config/site";
import UserDefaultLayout from "@/layouts/userDefault";
import { authTokenState } from "@/recoil/authTokenState";
import { loadingState } from "@/recoil/loadingState";
import { fetchProfile, profileState } from "@/recoil/profileState";
import { userIdState } from "@/recoil/userIdState";
import { updateProfileService } from "@/services/apiService";

interface ProfileData {
  first_name: string;
  last_name: string;
  contact_number: string;
  instagram_id: string;
  email: string;
}

export default function MyAccount() {
  const navigate = useNavigate();
  const token = useRecoilValue(authTokenState);
  const userId = useRecoilValue(userIdState);
  const fetchProfileData = useRecoilValue(fetchProfile);
  const setLoading = useSetRecoilState(loadingState);
  const setProfile = useSetRecoilState(profileState);
  const profile = useRecoilValue(profileState);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    contact_number: "",
    instagram_id: "",
    email: ""
  });

  useEffect(() => {
    if (profile) {
      setEditedProfile({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        contact_number: profile.contact_number || "",
        instagram_id: "",
        email: profile.email || ""
      });
    }
  }, [profile]);

  useEffect(() => {
    if (fetchProfileData) {
      setProfile(fetchProfileData);
    } else if (fetchProfileData === null) {
      toast.error("Invalid Token");
      navigate(siteConfig.path.signIn);
    }
  }, [fetchProfileData, setProfile, navigate]);

  const handleInputChange = (field: keyof ProfileData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleUpdateProfile = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setLoading(true);
    try {
      const updatePayload = {
        firstName: editedProfile.first_name,
        lastName: editedProfile.last_name,
        contactNumber: editedProfile.contact_number,
        instagramId: editedProfile.instagram_id
      };

      const response = await updateProfileService(updatePayload, token!, userId);
      setProfile(prevProfile => ({
        ...prevProfile!,
        ...response.data
      }));
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <Fallback />;
  }

  return (
    <UserDefaultLayout>
      <div className="flex justify-center items-center">
        <div className="w-full sm:w-2/3 mb-4">
          <h1 className="text-2xl lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
            My Account
          </h1>
          
          <div className="md:flex justify-stretch w-full space-y-2 md:space-y-0 md:space-x-4">
            <CustomInput
              title="First Name"
              type="text"
              placeholder="First Name"
              value={isEditing ? editedProfile.first_name : profile.first_name}
              onChange={handleInputChange("first_name")}
              readonly={!isEditing}
            />
            <CustomInput
              title="Last Name"
              type="text"
              placeholder="Last Name"
              value={isEditing ? editedProfile.last_name : profile.last_name}
              onChange={handleInputChange("last_name")}
              readonly={!isEditing}
            />
          </div>
          
          <p className="text-color my-2 mb-8 text-md font-poppins">
            Friends will be able to see this when you share links.
          </p>
          
          <div className="my-2">
            <CustomInput
              title="Contact Number"
              type="tel"
              placeholder="Enter your Contact Number"
              value={isEditing ? editedProfile.contact_number : profile.contact_number || ""}
              onChange={handleInputChange("contact_number")}
              readonly={!isEditing}
            />
          </div>
          
          <CustomInput
            title="Email"
            type="email"
            placeholder="example@gmail.com"
            value={profile.email || ""}
            readonly={true}
            onChange={handleInputChange("email")}
          />
          
          <div className="mt-4">
            <CustomInput
              title="Instagram Id"
              type="text"
              placeholder="Coming Soon"
              value={isEditing ? editedProfile.instagram_id : ""}
              onChange={handleInputChange("instagram_id")}
              readonly={true}
            />
          </div>
          
          <p className="text-color my-2 mb-8 text-md font-poppins">
            <Link className="text-secondary" to={siteConfig.userNavItems[4].href}>
              Contact Us
            </Link>
            <span> to update your email preferences.</span>
          </p>
          
          <CustomButton
            onClick={handleUpdateProfile}
            className="bg-secondary mx-auto w-full mt-4 flex justify-center items-center font-bold text-lg space-x-2"
          >
            {isEditing ? (
              <>
                <FaSave className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <FaPencilAlt className="w-5 h-5" />
                <span>Edit Profile</span>
              </>
            )}
          </CustomButton>
        </div>
      </div>
    </UserDefaultLayout>
  );
}