// import shopifyExpert from "@/assets/images/shopify.png";
// import shopifyPlus from "@/assets/images/shopify plus.png";
import { imageUrls } from "@/utils/imageUrl";
import { brandsJoinedLogos } from "@/utils/utils";
import { Tooltip } from "@/components/ui/Tooltip";

export default function BrandsJoined() {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-300 text-large lg:justify-start md:justify-center justify-center flex-wrap">
        <div className="flex items-center space-x-[-8px]">
          {brandsJoinedLogos.map((brand) => (
            <Tooltip key={brand.name} content={brand.name}>
              <img className="rounded-full w-8 h-8" src={brand.image} />
            </Tooltip>
          ))}
        </div>
        <span className="text-sm font-medium text-white">
          +20 brands joined
        </span>
      </div>
      {/* Text */}
      <div className="flex items-center gap-2 text-gray-300 text-large lg:justify-start md:justify-center justify-center flex-wrap py-2">
        Exclusively built for
        <img
          alt="Shopify Expert"
          className="rounded-xl"
          src={imageUrls.shopify}
          width={100}
        />
        &
        <img
          alt="Shopify Plus"
          className="rounded-xl"
          src={imageUrls.shopify_plus}
          width={120}
        />
      </div>
    </div>
  );
}
