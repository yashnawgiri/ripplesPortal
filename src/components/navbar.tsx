import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import { CrossIcon, DotIcon, HamburgerButton } from "./icons";
import CustomButton from "./CustomElements/CustomButton";

import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`bg-primary w-full p-4 md:py-6 py-8 fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
      id="home"
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link
          className="text-white font-bold text-4xl flex items-center hover:opacity-80 transition-opacity"
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
                className="cursor-pointer text-color hover:text-white transition-colors"
                href="#features"
              >
                {item.label}
              </a>
            ) : item.label === "Products" ? (
              <div key={item.href} className="relative group">
                <button className="text-color cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
                  {item.label}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-primary rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {item.resources?.map((resource) => (
                    <NavLink
                      key={resource.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-md hover:bg-secondary/20 transition-colors"
                      to={resource.href}
                    >
                      <img
                        alt={resource.label}
                        className="w-5 h-5"
                        src={resource.icon}
                      />
                      {resource.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : `${
                        item.href === "/shopper"
                          ? "bg-secondary px-6 py-3 rounded-3xl text-white hover:bg-secondary/80 transition-colors"
                          : "text-color hover:text-white transition-colors"
                      }`
                }
                to={item.href || ""}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </div>
        <div className="hidden md:block space-x-4">
          {location.pathname === "/shopper" && (
            <CustomButton
              ariaLabel="For Brands"
              className="bg-gradient-to-r from-pink-700 via-purple-500 to-indigo-500 hover:opacity-90 transition-opacity"
              onClick={() => navigate(siteConfig.path.home)}
            >
              For Brands
            </CustomButton>
          )}
          <CustomButton
            ariaLabel={btn.label}
            className="bg-secondary hover:bg-secondary/80 transition-colors"
            onClick={() => navigate(btn.href)}
          >
            {btn.label}
          </CustomButton>
        </div>
        <div className="md:hidden">
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="text-white focus:outline-none hover:opacity-80 transition-opacity"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CrossIcon /> : <HamburgerButton />}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-20 left-0 h-[calc(100vh-5rem)] w-3/4 bg-primary p-6 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden overflow-y-auto`}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navItems.map((item) =>
            item.label === "Features" ? (
              <a
                key={item.href}
                className="cursor-pointer text-color text-lg hover:text-white transition-colors"
                href="#features2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ) : item.label === "Products" ? (
              <div key={item.href} className="relative">
                <button
                  className="flex items-center justify-center gap-4 w-full px-4 py-3 text-white text-base md:text-lg hover:bg-secondary/20 rounded-lg transition-colors duration-200"
                  onClick={() =>
                    setActiveItem(activeItem === item.label ? null : item.label)
                  }
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${activeItem === item.label ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
                {activeItem === item.label && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.resources?.map((resource) => (
                      <NavLink
                        key={resource.href}
                        className="flex items-center gap-2 px-4 py-3 text-white text-base md:text-lg hover:bg-secondary/20 rounded-lg transition-colors duration-200"
                        to={resource.href}
                        onClick={() => {
                          setActiveItem(null);
                          setIsOpen(false);
                        }}
                      >
                        <img
                          alt={resource.label}
                          className="w-5 h-5 flex-shrink-0"
                          src={resource.icon}
                        />
                        <span>{resource.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-lg"
                    : "text-color text-lg hover:text-white transition-colors"
                }
                to={item.href || ""}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ),
          )}
          {location.pathname === "/shopper" && (
            <CustomButton
              ariaLabel="For Brands"
              className="bg-gradient-to-r from-pink-700 via-purple-500 to-indigo-500 mx-auto max-w-36 hover:opacity-90 transition-opacity"
              onClick={() => navigate(siteConfig.path.home)}
            >
              For Brands
            </CustomButton>
          )}
          <CustomButton
            ariaLabel={btn.label}
            className="bg-secondary mx-auto max-w-36 hover:bg-secondary/80 transition-colors"
            onClick={() => navigate(btn.href)}
          >
            {btn.label}
          </CustomButton>
        </div>
      </div>
    </nav>
  );
}
