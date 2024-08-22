import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CrossIcon, DotIcon, HamburgerButton } from "./icons";
import CustomButton from "./CustomButton";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav
      className={`bg-primary w-full p-4 md:py-6 py-8 ${isOpen ? "fixed top-0 left-0 z-50" : "relative"}`}
      id="home"
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-4xl flex items-center">
          {siteConfig.name}
          <span className="mt-6 ml-1">
            <DotIcon />
          </span>
        </div>
        <div className="hidden md:flex space-x-10">
          {siteConfig.navItems.map((item) =>
            item.label === "Features" ? (
              <a
                key={item.href}
                href="#features"
                className="cursor-pointer text-color"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-color"
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>
        <div className="hidden md:block">
          <CustomButton onClick={() => { }} className="bg-secondary">
            <Link to={siteConfig.path.getDemo}>Book Demo</Link>
          </CustomButton>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="text-white focus:outline-none"
          >
            {isOpen ? <CrossIcon /> : <HamburgerButton />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden fixed top-24 left-0 w-full pb-10 bg-primary px-4 z-50 border-b border-gray-700">
          <div className="flex flex-col text-center space-y-6 mt-6">
            {siteConfig.navItems.map((item) =>
              item.label === "Features" ? (
                <a
                  key={item.href}
                  href="#features2"
                  className="cursor-pointer text-color text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => isActive ? "text-white text-lg" : "text-color text-lg"}
                >
                  {item.label}
                </NavLink>
              )
            )}
            <CustomButton
              onClick={() => { }}
              className="bg-secondary mx-auto max-w-36"
            >
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
