import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CrossIcon, DotIcon, HamburgerButton } from "./icons";
import CustomButton from "./CustomButton";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-primary w-full p-4 py-6" id="home">
      <div 
      className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-4xl flex items-center">
          {siteConfig.name}<span className="mt-6 ml-1"><DotIcon /></span>
        </div>
        <div className="hidden md:flex space-x-10">
          {siteConfig.navItems.map((item) => (
            <NavLink to={item.href}
              className={
                ({ isActive }) => isActive ? "text-white" : "text-color"
              }>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:block">
          <CustomButton onClick={() => {
          }} className="bg-secondary">
            <Link to={siteConfig.path.getDemo}>
              Book Demo
            </Link>
          </CustomButton>
        </div>
        <div className="md:hidden">
          <button onClick={() => {
            setIsOpen(!isOpen);
          }} className="text-white focus:outline-none">
            {isOpen ? (
              <HamburgerButton/>
            ) : (
              <CrossIcon/>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden space-y-2">
          <div className="flex flex-col text-center space-y-2 mt-6">
            {siteConfig.navItems.map((item) => (
              <NavLink to={item.href}
                className={
                  ({ isActive }) => isActive ? "text-white" : "text-color"
                }
                onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                {item.label}
              </NavLink>
            ))}
            <CustomButton onClick={() => { }}
              className="bg-secondary mx-auto max-w-36">
              <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href={siteConfig.path.getDemo}
              >
                Book Demo
              </a>
            </CustomButton>
          </div>
        </div>
      )}
    </nav>
  );
}
