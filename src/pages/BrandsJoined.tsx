import { Avatar, Image, Tooltip } from "@nextui-org/react";

import shopifyExpert from "@/assets/images/shopify.png";
import shopifyPlus from "@/assets/images/shopify plus.png";

export default function BrandsJoined() {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-300 text-large lg:justify-start md:justify-center justify-center flex-wrap">
        <div className="flex items-center space-x-[-8px]">
          <Tooltip content="Foramour">
            <Avatar size="sm" src="/src/assets/images/brands/foramour.png" />
          </Tooltip>
          <Tooltip content="Mayin Clothing">
            <Avatar size="sm" src="/src/assets/images/brands/mayin.png" />
          </Tooltip>
          <Tooltip content="Gokwik">
            <Avatar size="sm" src="/src/assets/images/brands/Gokwik.jpg" />
          </Tooltip>
        </div>
        <span className="text-sm font-medium text-white">
          +20 brands joined
        </span>
      </div>
      {/* Text */}
      <div className="flex items-center gap-2 text-gray-300 text-large lg:justify-start md:justify-center justify-center flex-wrap py-2">
        Exclusively built for
        <Image
          alt="Shopify Expert"
          className="rounded-xl"
          src={shopifyExpert}
          width={100}
        />
        &
        <Image
          alt="Shopify Plus"
          className="rounded-xl"
          src={shopifyPlus}
          width={120}
        />
      </div>
    </div>
  );
}
