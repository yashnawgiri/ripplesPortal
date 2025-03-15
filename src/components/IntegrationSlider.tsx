import { useState } from "react";
import '@/styles/home/integrationSlider.css';

interface IntegrationCategory {
  title: string;
  brands: {
    name: string;
    logo: string;
  }[];
}

export default function IntegrationSlider() {
  const [isHovered, setIsHovered] = useState(false);

  const categories: IntegrationCategory[] = [
    {
      title: "Payment Solutions",
      brands: [
        { name: "Razorpay", logo: "https://ripples1static.blob.core.windows.net/images/razorpay_logo.png" },
        { name: "Gokwik Checkout", logo: "https://ripples1static.blob.core.windows.net/images/gokwik_logo.png" },
        { name: "Razorpay Magic Checkout", logo: "https://ripples1static.blob.core.windows.net/images/razorpay_checkout_magic_logo.png" },
        { name: "Shopflo Checkout", logo: "https://ripples1static.blob.core.windows.net/images/shopflo_logo.svg" },
        { name: "Klaviyo", logo: "https://ripples1static.blob.core.windows.net/images/klaviyo_logo.svg" },
        { name: "Razorpay", logo: "https://ripples1static.blob.core.windows.net/images/razorpay_logo.png" },
        { name: "Shopflo Checkout", logo: "https://ripples1static.blob.core.windows.net/images/shopflo_logo.svg" },
    ],
    },
    {
      title: "Messaging Platforms",
      brands: [
        { name: "QuickReply", logo: "https://ripples1static.blob.core.windows.net/images/quick_reply_logo.png" },
        { name: "Interakt", logo: "https://ripples1static.blob.core.windows.net/images/Interakt-Logo.svg" },
        { name: "BusinessonBot", logo: "https://ripples1static.blob.core.windows.net/images/BusinessOnBot_logo.png" },
        { name: "Wati", logo: "https://ripples1static.blob.core.windows.net/images/wati_logo.svg" },
        { name: "BusinessonBot", logo: "https://ripples1static.blob.core.windows.net/images/BusinessOnBot_logo.png" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden relative">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="md:text-6xl text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent whitespace-pre-wrap pb-4">
          Connect Ripples with the apps you know and love
        </h2>
        <p className="text-lg text-white max-w-3xl mx-auto">
          Send various WhatsApp messages based on actions on Ripples, customers can redeem cashbacks directly on checkout, automate WhatsApp & email nudges.
        </p>
      </div>

      {/* Integration Categories */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            <div
              className={`flex gap-8 py-4 px-4 overflow-hidden whitespace-nowrap ${isHovered ? 'paused' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="scrolling-wrapper">
                {[...category.brands, ...category.brands].map((brand, brandIndex) => (
                  <div
                    key={`${category.title}-${brandIndex}`}
                    className="flex-shrink-0 w-[120px] sm:w-[140px] md:w-[180px] h-[50px] sm:h-[50px] md:h-[100px] flex flex-col items-center justify-center p-1.5 sm:p-2 md:p-4 rounded-lg 
                              bg-white shadow-md hover:shadow-xl border transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 mx-2 sm:mx-4"
                  >
                    <div className="w-full h-12 flex items-center justify-center mb-2">
                      <img src={brand.logo} alt={`${brand.name} logo`} className="max-h-full object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}