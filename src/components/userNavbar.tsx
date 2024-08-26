import { useState } from "react";
import { siteConfig } from "@/config/site";
import { DotIcon, WalletIcon, HamburgerButton, CrossIcon } from "./icons";
import { NavLink } from "react-router-dom";

export default function UserNavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-primary w-full px-8 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <a href="#" className="text-white font-bold text-3xl flex items-center">
                        {siteConfig.name}
                        <span className="ml-1"><DotIcon /></span>
                    </a>
                    <div className="hidden sm:flex sm:items-center sm:ml-6 pl-36">
                        <div className="text-color text-lg font-poppins font-semibold">
                            Welcome to Ripples, {"Syeda"}
                        </div>
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
