import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DotIcon } from "./icons";
import CustomButton from "./CustomButton";
import { siteConfig } from "@/config/site";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="bg-[#0e1330] w-full p-4 py-6">
            <div className="container max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-4xl flex items-center">
                    Ripples<span className="mt-6 ml-1"><DotIcon /></span>
                </div>
                <div className="hidden md:flex space-x-10">
                    {siteConfig.navItems.map((item) => (
                        <NavLink to={item.href} className={({ isActive }) => isActive ? "text-white" : "text-gray-400"}>
                            {item.label}
                        </NavLink>
                    ))}
                </div>
                <div className="hidden md:block">
                    <CustomButton onClick={() => { }} className="bg-[#7214FF]"><a target="_blank" rel="noopener noreferrer" href="https://calendly.com/hello-ripples">Get a Demo</a></CustomButton>
                </div>
                <div className="md:hidden">
                    <button onClick={() => { setIsOpen(!isOpen); }} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden space-y-2">
                    <div className="flex flex-col text-center space-y-2 mt-6">
                        {siteConfig.navItems.map((item) => (
                            <NavLink to={item.href} className={({ isActive }) => isActive ? "text-white" : "text-gray-400"} onClick={() => {setIsOpen(!isOpen);}}>
                                {item.label}
                            </NavLink>
                        ))}
                        <CustomButton onClick={() => { }} className="bg-[#7214FF] mx-auto max-w-36"><a target="_blank" rel="noopener noreferrer" href="https://calendly.com/hello-ripples">Get a Demo</a></CustomButton>
                    </div>
                </div>
            )}
        </nav>
    );
}