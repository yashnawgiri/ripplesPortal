import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem,} from "@nextui-org/navbar";
import {link as linkStyles} from "@nextui-org/theme";
import clsx from "clsx";

import {siteConfig} from "@/config/site";

export const Navbar = () => {

    return (
        <NextUINavbar position="sticky">
            <NavbarContent className="basis-1/5 basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link
                        className="flex justify-start items-center gap-1"
                        color="foreground"
                        href="/"
                    >
                        <p className="font-bold text-inherit">Ripple</p>
                        <p>.</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent>
                <div className="flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <Link
                                className={clsx(
                                    linkStyles({color: "foreground"}),
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
                    <Button
                        isExternal
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        href={siteConfig.links.sponsor}
                        variant="flat"
                    >
                        Get a demo
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};
