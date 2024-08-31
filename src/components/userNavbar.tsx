import { useState } from "react";
import { siteConfig } from "@/config/site";
import { DotIcon, WalletIcon, HamburgerButton, CrossIcon, LeftArrowIcon } from "./icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import "@/styles/userNavbar.css";

export default function UserNavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    type RouteMapping = {
        [key: string]: {
            href: string;
            title: string;
        };
    };

    const routeMapping: RouteMapping = {
        "/my-ripples/home": {
            href: siteConfig.path.myRipples,
            title: "Welcome to your Dashboard, Syeda",
        },
        "/my-ripples/content": {
            href: siteConfig.path.userContent,
            title: "Welcome to your Dashboard, Syeda",
        },
        "/my-ripples/rewards": {
            href: siteConfig.path.userRewards,
            title: "Reward Wallet",
        },
        "/my-ripples/faq": {
            href: siteConfig.path.userFaq,
            title: "FAQs",
        },
        "/my-ripples/support": {
            href: siteConfig.path.userSupport,
            title: "Contact Support",
        },
        "/my-ripples/account": {
            href: siteConfig.path.userAccount,
            title: "Account Settings",
        },
        "my-ripples/transactions": {
            href: siteConfig.path.userRewards,
            title: "Transactions",
        }
    };

    const getPageDetails = () => {
        const currentPath = location.pathname;
        return routeMapping[currentPath] || {
            href: siteConfig.path.home,
            title: `Welcome to Ripples, ${"Syeda"}`,
        };
    };

    const { href, title } = getPageDetails();

    return (
        <>
            <nav className="userNavContainer">
                <div className="flex items-center">
                    <Link to={siteConfig.path.home} className="userNavIcon">
                        {siteConfig.name}
                        <span className="ml-1"><DotIcon /></span>
                    </Link>
                    <div className="userNavHeading">
                        <Link to={href} className="text-color userNavHeadingText">
                            {(title =="Transactions")&&<LeftArrowIcon/>}
                            <h1>{title}</h1>
                        </Link>
                    </div>
                </div>
                <div className="flex sm:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="text-white focus:outline-none"
                    >
                        {isSidebarOpen ? <CrossIcon /> : <HamburgerButton />}
                    </button>
                </div>
                <div className="hidden sm:flex sm:items-center">
                    <WalletIcon />
                    <div className="text-color userNaveWallet">
                        ₹{"0.00"}
                    </div>
                </div>
            </nav>
            <aside
                className={`userNavAside ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } bg-primary border-r border-gray-700 sm:translate-x-0`}
                aria-label="Sidebar"
                id="logo-sidebar"
            >
                <div className="userNavSideBar">
                    <ul className="sm:font-medium text-lg">
                        {siteConfig.userNavItems.map((item, index) => (
                            <li key={index} className="">
                                <NavLink to={item.href}
                                    className={({ isActive }) =>
                                        `${isActive ? "text-white bg-[#282D45] border border-gray-600" : "text-color"} flex items-center p-2 py-4 group px-6 rounded-sm`
                                    }>
                                    <item.icon />
                                    <span className="userNavItem">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}
