/* eslint-disable max-len */

import pic1 from "@/assets/images/profilePics/profilepic1.jpg";
import pic2 from "@/assets/images/profilePics/profilepic2.jpg";
import pic3 from "@/assets/images/profilePics/profilepic3.jpg";

export default function ShoppersBanner() {
    const pics = [pic1, pic2, pic3];

    return (
        <div className="py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
                <div className="flex -space-x-4">
                    {pics.map((pic, i) => (
                        <div key={i} className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                            <img
                                src={pic}
                                alt={`Shopper ${i + 1}`}
                                className="w-full h-full object-cover"
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