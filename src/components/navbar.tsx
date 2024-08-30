import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CrossIcon, DotIcon, HamburgerButton } from "./icons";
import CustomButton from "./CustomElements/CustomButton";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <nav className={`bg-primary w-full p-4 md:py-6 py-8 ${isOpen ? "fixed top-0 left-0 z-50" : "relative"}`}
      id="home"
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-white font-bold text-4xl flex items-center">
          {siteConfig.name}
          <span className="mt-6 ml-1">
            <DotIcon />
          </span>
        </Link>
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
          <CustomButton onClick={() => navigate(siteConfig.path.getDemo)} className="bg-secondary">
            Book Demo
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
      <div
        className={`fixed top-20 left-0 h-full w-3/4 bg-primary p-6 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="text-white mb-6"
        >
          {/* <CrossIcon /> */}
        </button>
        <div className="flex flex-col space-y-8 text-center">
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
                className={({ isActive }) =>
                  isActive ? "text-white text-lg" : "text-color text-lg"
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            )
          )}
          <CustomButton
            onClick={() => navigate(siteConfig.path.getDemo)}
            className="bg-secondary mx-auto max-w-36"
          >
            Book Demo
          </CustomButton>
        </div>
      </div>
    </nav>
  );
}
