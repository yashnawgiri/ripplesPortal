import type React from "react"

const BrandLogos: React.FC = () => {
  const brands = [
    {
      name: "Kaftanize",
      logo: "https://ripples1static.blob.core.windows.net/images/kaftanize_logo_full.jpg",
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
  ]

  // Triple the brands array for seamless animation
  const marqueeBrands = [...brands, ...brands, ...brands]

  return (
    <div className="w-screen md:w-full overflow-hidden bg-transparent">
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.05),transparent_50%)] pointer-events-none" />

        {/* Header Section - Mobile First */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4 relative z-10">
         

          <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
            Powering the most exciting
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Shopify brands
            </span>
          </h3>

          <p className="text-white/70 text-lg sm:text-base md:text-lg mt-2 sm:mt-4 max-w-lg mx-auto">
            Successful businesses that trust our platform
          </p>
        </div>

        {/* Marquee Container - Strict Mobile Constraints */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient fades - Very narrow on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-6 md:w-8 z-20 pointer-events-none bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-6 md:w-8 z-20 pointer-events-none bg-gradient-to-l from-black/40 via-black/20 to-transparent" />

          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {marqueeBrands.map((brand, idx) => (
              <div key={idx} className="flex-none mx-1 sm:mx-2 group relative">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center p-2 sm:p-3 md:p-4 border border-white/20 hover:border-blue-200/30 hover:scale-105">
                  <img
                    alt={brand.name}
                    className="h-12 w-24 sm:h-12 sm:w-24 md:h-16 md:w-28 lg:h-16 lg:w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    src={brand.logo || "/placeholder.svg"}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=40&width=80&text=" + encodeURIComponent(brand.name)
                    }}
                  />
                </div>
                
                {/* Mobile-friendly tooltip */}
                <div className="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-30 shadow-lg border border-slate-700/50">
                  {brand.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-12 px-4">
          <div className="flex items-center gap-2 text-white/60">
            <div className="flex gap-0.5 sm:gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="text-base sm:text-sm font-medium">And many more amazing brands</span>
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .animate-scroll {
            animation: scroll 12s linear infinite;
            width: fit-content;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
          
          @media (max-width: 640px) {
            .animate-scroll {
              animation-duration: 10s;
            }
          }
          
          @media (max-width: 480px) {
            .animate-scroll {
              animation-duration: 8s;
            }
          }
          
          @media (max-width: 360px) {
            .animate-scroll {
              animation-duration: 6s;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-scroll {
              animation-duration: 30s;
            }
          }
        `}</style>
      </section>
    </div>
  )
}

export default BrandLogos
