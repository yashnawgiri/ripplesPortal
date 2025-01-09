import { Image } from "@nextui-org/react";

import shopifyExpert from "@/assets/images/shopify.png";
import shopifyPlus from "@/assets/images/shopify plus.png";

export default function BrandsJoined() {
  return (
    <div className="flex items-center gap-2 text-gray-300 text-large lg:justify-start md:justify-center justify-center flex-wrap">
      {/* Brand Icons */}
      {/* <div className="flex items-center space-x-[-8px]">
        <Tooltip content="Accenture">
          <Avatar size="sm" src="/src/assets/images/brands/accenture.png" />
        </Tooltip>
        <Tooltip content="Cred">
          <Avatar size="sm" src="/src/assets/images/brands/cred.png" />
        </Tooltip>
        <Tooltip content="Udaan">
          <Avatar size="sm" src="/src/assets/images/brands/udaan.png" />
        </Tooltip>
      </div> */}
      {/* Text */}
      {/* <span className="text-sm font-medium">+25 brands joined</span> */}
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
  );
}
