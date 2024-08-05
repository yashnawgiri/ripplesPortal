import {Link} from "@nextui-org/link";
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem,} from "@nextui-org/navbar";
import {link as linkStyles} from "@nextui-org/theme";
import clsx from "clsx";

import {siteConfig} from "@/config/site";
import CustomButton from "./CustomButton";

export const Navbar = () => {

    return (
        <NextUINavbar position="sticky" className="bg-[#060b27] py-3 border-b-black">
            <NavbarContent className="basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link
                        className="flex justify-start items-center gap-1"
                        color="foreground"
                        href="/"
                    >
                        <div className="flex justify-start">
                            <h1 className="font-bold text-inherit text-white text-4xl">Ripple</h1>
                            <div className="bg-purple-600 w-2 h-2 rounded mx-1 mt-7"></div>
                        </div>
                        
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent>
                <div className="flex gap-8 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <Link
                                className={clsx(
                                    linkStyles({color: "primary"}),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                )}
                                color="foreground"
                                href={item.href}
                            >
                               {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent
                className="flex basis-1/5"
                justify="end"
            >
                {/* <ThemeSwitch /> */}
                <NavbarItem className="flex">
                    {/* <Button
                        isExternal
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        href={siteConfig.links.sponsor}
                        variant="flat"
                    >
                        Get a demo
                    </Button> */}
                    <CustomButton onClick={() => { }} className="bg-[#7214FF]">
                        Get a demo
                    </CustomButton>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};
