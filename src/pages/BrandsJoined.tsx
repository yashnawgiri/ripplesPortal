import { Avatar, Tooltip } from "@nextui-org/react";

export default function BrandsJoined() {
  return (
    <div className="flex items-center gap-2 text-[#8F9BB7] text-large lg:justify-start md:justify-center justify-center flex-wrap">
      {/* Brand Icons */}
      <div className="flex items-center space-x-[-8px]">
        <Tooltip content="Accenture">
          <Avatar src="/src/assets/images/brands/accenture.png" size="sm" />
        </Tooltip>
        <Tooltip content="Cred">
          <Avatar src="/src/assets/images/brands/cred.png" size="sm" />
        </Tooltip>
        <Tooltip content="Udaan">
          <Avatar src="/src/assets/images/brands/udaan.png" size="sm" />
          
        </Tooltip>
      </div>

      {/* Text */}
      <span className="text-sm font-medium">+25 brands joined</span>
    </div>
  );
}
