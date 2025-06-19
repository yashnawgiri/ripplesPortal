/* eslint-disable max-len */

// import pic1 from "@/assets/images/profilePics/profilepic1.jpg";
// import pic2 from "@/assets/images/profilePics/profilepic2.jpg";
// import pic3 from "@/assets/images/profilePics/profilepic3.jpg";
import { imageUrls } from "@/utils/imageUrl";

export default function ShoppersBanner() {
  const pics = [
    imageUrls.profilePicture.profile1,
    imageUrls.profilePicture.profile2,
    imageUrls.profilePicture.profile3,
  ];

  return (
    <div className="py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex -space-x-4">
          {pics.map((pic, i) => (
            <div
              key={i}
              className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden"
            >
              <img
                alt={`Shopper ${i + 1}`}
                aria-label={`Profile picture of Shopper ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                src={pic}
              />
            </div>
          ))}
        </div>
        <h2 className="text-sm md:text-md lg:text-lg text-white font-semibold tracking-wide">
          Join 10K + Shoppers Earning Rewards
        </h2>
      </div>
    </div>
  );
}
