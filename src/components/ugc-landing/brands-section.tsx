export function BrandsSection() {
  const brands = [
    { name: "Brand 1", logo: "/placeholder.svg" },
    { name: "Brand 2", logo: "/placeholder.svg" },
    { name: "Brand 3", logo: "/placeholder.svg" },
    { name: "Brand 4", logo: "/placeholder.svg" },
    { name: "Brand 5", logo: "/placeholder.svg" },
    { name: "Brand 6", logo: "/placeholder.svg" },
  ];

  return (
    <div className="grid gap-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Trusted by Leading Brands
        </h2>
        <p className="text-white/60 max-w-[600px] mx-auto">
          Join the community of innovative brands transforming their UGC
          strategy
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {brands.map((brand, i) => (
          <div
            key={i}
            className="aspect-square relative group overflow-hidden rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                alt={brand.name}
                className="w-full h-full object-contain filter brightness-0 invert opacity-50 group-hover:opacity-80 transition-opacity"
                src={brand.logo || "/placeholder.svg"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
