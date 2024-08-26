import { useState } from "react";
import { siteConfig } from "@/config/site";
import { DotIcon, WalletIcon, HamburgerButton, CrossIcon, LeftArrowIcon } from "./icons";
import { NavLink, useLocation } from "react-router-dom";

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
    //   <Route element={<MyRipples/>} path={"/my-ripples"}/>
    //   <Route element={<MyContent/>} path={"/my-content"}/>
    //   <Route element={<MyRewards/>} path={"/my-rewards"}/>
    //   <Route element={<FAQUserPortal/>} path={"/faq"}/>
    //   <Route element={<Support/>} path={"/support"}/>
    //   <Route element={<MyAccount/>} path={"/my-account"}/>
    //   <Route element={<Transactions/>} path={"/transactions"}/>

    const routeMapping: RouteMapping = {
        "/my-ripples": {
            href: siteConfig.path.home + "my-ripples",
            title: "Welcome to your Dashboard, Syeda",
        },
        "/my-content": {
            href: siteConfig.path.home + "my-content",
            title: "Welcome to your Dashboard, Syeda",
        },
        "/my-rewards": {
            href: siteConfig.path.home + "my-rewards",
            title: "Reward Wallet",
        },
        "/faq": {
            href: siteConfig.path.home + "faq",
            title: "FAQs",
        },
        "/support": {
            href: siteConfig.path.home + "support",
            title: "Contact Support",
        },
        "/my-account": {
            href: siteConfig.path.home + "my-account",
            title: "Account Settings",
        },
        "/transactions": {
            href: siteConfig.path.home + "my-rewards",
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
            <nav className="fixed top-0 left-0 right-0 bg-primary w-full px-8 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <a href={siteConfig.path.home} className="text-white font-bold text-3xl flex items-center">
                        {siteConfig.name}
                        <span className="ml-1"><DotIcon /></span>
                    </a>
                    <div className="hidden sm:flex sm:items-center sm:ml-6 pl-36">
                        <a href={href} className="flex space-x-2 items-center text-color text-lg font-poppins font-semibold">
                            {(title =="Transactions")&&<LeftArrowIcon/>}
                            <h1>{title}</h1>
                        </a>
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
                    <div className="text-color text-lg font-poppins font-semibold ml-2">
                        ₹{"0.00"}
                    </div>
                </div>
            </nav>
            <aside
                className={`fixed top-16 left-0 z-40 w-72 h-screen pt-10 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } bg-primary border-r border-gray-700 sm:translate-x-0`}
                aria-label="Sidebar"
                id="logo-sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-primary">
                    <ul className="sm:font-medium text-lg">
                        {siteConfig.userNavItems.map((item, index) => (
                            <li key={index} className="">
                                <NavLink to={item.href}
                                    className={({ isActive }) =>
                                        `${isActive ? "text-white bg-[#282D45] border border-gray-600" : "text-color"} flex items-center p-2 py-4 rounded-lg group px-6 rounded-sm`
                                    }>
                                    <item.icon />
                                    <span className="flex-1 ms-3 whitespace-nowrap font-poppins">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}
