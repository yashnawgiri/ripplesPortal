import type React from "react";

const BrandLogos: React.FC = () => {
  const brands = [
    {
      name: "Kaftanize",
      logo: "https://ripples1static.blob.core.windows.net/images/kaftanize.png",
    },
    {
      name: "Smartveda",
      logo: "https://ripples1static.blob.core.windows.net/images/Smartveda_Official_1.avif",
    },
    {
      name: "Sleek & Peek",
      logo: "https://ripples1static.blob.core.windows.net/images/sleekandpeek.png",
    },
    {
      name: "YoDragon",
      logo: "https://ripples1static.blob.core.windows.net/images/Yo-Dragon-logo.avif",
    },
    {
      name: "Maayin",
      logo: "https://ripples1static.blob.core.windows.net/images/mayin.png",
    },
    {
      name: "ShopSoWhat",
      logo: "https://ripples1static.blob.core.windows.net/images/SO_WHAT_LOGO.avif",
    },
  ];

  // Triple the brands array for seamless animation
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative bg-transparent">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-4">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white">
            Trusted by the most exciting brands on Shopify
          </h3>
        </div>

        {/* Container for the marquee with proper overflow handling */}
        <div className="relative w-full overflow-hidden">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-4 md:w-8  z-10 pointer-events-none bg-gradient-to-r from-[#999999] via-[#e4e4e4] to-transparent" />

          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-4 md:w-8 z-10 pointer-events-none bg-gradient-to-l from-[#a7a7a7] via-[#d8d8d8] to-transparent" />

          {/* Marquee container */}
          <div
            className="flex hover:pause-marquee"
            style={{
              width: "calc(300% + 48px)", // Extra width for mobile padding
              animation: "marqueeScroll 25s linear infinite",
            }}
          >
            {marqueeBrands.map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 mx-1 sm:mx-2 md:mx-3 lg:mx-4 group relative"
              >
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center p-1.5 sm:p-2 md:p-3 lg:p-4 relative">
                  <img
                    alt={brand.name}
                    className="h-16 w-24 sm:h-8 sm:w-20 md:h-10 md:w-32 lg:w-40 lg:h-24 lg:w-32 object-contain"
                    loading="lazy"
                    src={brand.logo}
                  />
                  <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes marqueeScroll {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-33.333%);
              }
            }
            
            .pause-marquee {
              animation-play-state: paused !important;
            }
            
            @media (max-width: 640px) {
              [style*="marqueeScroll"] {
                animation-duration: 18s !important;
                width: calc(300% + 24px) !important;
              }
            }
            
            @media (max-width: 480px) {
              [style*="marqueeScroll"] {
                animation-duration: 15s !important;
                width: calc(300% + 16px) !important;
              }
            }
          `,
          }}
        />
      </section>
    </div>
  );
};

export default BrandLogos;
