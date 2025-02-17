import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import { CrossIcon, DotIcon, HamburgerButton } from "./icons";
import CustomButton from "./CustomElements/CustomButton";

import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  let navItems = siteConfig.navItems;
  const btn = {
    label: "Book Demo",
    href: siteConfig.path.getDemo,
  };

  if (location.pathname === "/shopper") {
    navItems = [];
    btn.label = "Sign-In";
    btn.href = siteConfig.path.signIn;
  }

  return (
    <nav
      className={`bg-primary w-full p-4 md:py-6 py-8 ${isOpen ? "fixed top-0 left-0 z-50" : "relative"}`}
      id="home"
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link
          className="text-white font-bold text-4xl flex items-center"
          to={"/"}
        >
          {siteConfig.name}
          <span className="mt-6 ml-1">
            <DotIcon />
          </span>
        </Link>
        <div className="hidden md:flex md:items-center space-x-10">
          {navItems.map((item) =>
            item.label === "Features" ? (
              <a
                key={item.href}
                className="cursor-pointer text-color"
                href="#features"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : `${item.href === "/shopper"
                      ? "bg-secondary px-6 py-3 rounded-3xl text-white"
                      : "text-color"
                    }`
                }
                to={item.href}
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>
        <div className="hidden md:block space-x-4">
          {location.pathname === "/shopper" && (
            <CustomButton
              className="bg-pink-700 mx-auto"
              onClick={() => navigate(siteConfig.path.home)}
              ariaLabel="For Brands">
              For Brands
            </CustomButton>
          )}
          <CustomButton
            className="bg-secondary"
            onClick={() => navigate(btn.href)}
            ariaLabel={btn.label}
          >
            {btn.label}
          </CustomButton>
        </div>
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
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
          className="text-white mb-6"
          onClick={() => {
            setIsOpen(false);
          }}
          aria-label="Close mobile menu"
        >
          {/* <CrossIcon /> */}
        </button>
        <div className="flex flex-col space-y-8 text-center">
          {navItems.map((item) =>
            item.label === "Features" ? (
              <a
                key={item.href}
                className="cursor-pointer text-color text-lg"
                href="#features2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                className={({ isActive }) =>
                  isActive ? "text-white text-lg" : "text-color text-lg"
                }
                to={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            )
          )}
          {location.pathname === "/shopper" &&
            <CustomButton
              className="bg-gradient-to-r from-pink-700 via-purple-500 to-indigo-500 mx-auto max-w-36"
              onClick={() => navigate(siteConfig.path.home)}
              ariaLabel="For Brands"
            >
              For Brands
            </CustomButton>
          }
          <CustomButton
            className="bg-secondary mx-auto max-w-36"
            onClick={() => navigate(btn.href)}
            ariaLabel={btn.label}
          >
            {btn.label}
          </CustomButton>
        </div>
      </div>
    </nav>
  );
}
