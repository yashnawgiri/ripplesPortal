import { Image } from "@nextui-org/react";

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
      <Image
        className="max-w-60 rounded-xl md:mx-2"
        src="/src/assets/images/brands/shopify.png"
      />
    </div>
  );
}
