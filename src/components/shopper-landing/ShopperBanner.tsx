

export default function ShoppersBanner() {
    return (
        <div className="py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
                <div className="flex -space-x-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-24%20233814-R4SCVr7zIel197jr4bvggtdshk9IpZ.png"
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
