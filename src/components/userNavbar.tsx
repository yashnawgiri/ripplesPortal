import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  DotIcon,
  WalletIcon,
  HamburgerButton,
  CrossIcon,
  LeftArrowIcon,
  LogoutIcon,
} from "./icons";

import { siteConfig } from "@/config/site";
import "@/styles/userNavbar.css";
import { profileState } from "@/recoil/profileState";

import { useRecoilState } from "recoil";

export default function UserNavBar() {
  const [profile] = useRecoilState(profileState);
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

  const firstName = profile?.first_name || "Rippler";

  const routeMapping: RouteMapping = {
    "/my-ripples/home": {
      href: siteConfig.path.myRipples,
      title: `Welcome to your Dashboard, ${firstName}`,
    },
    "/my-ripples/content": {
      href: siteConfig.path.userContent,
      title: `Welcome to your Dashboard, ${firstName}`,
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
    "/my-ripples/transactions": {
      href: siteConfig.path.userRewards,
      title: "Transactions",
    },
  };

  const getPageDetails = () => {
    const currentPath = location.pathname;

    console.log(currentPath, routeMapping[currentPath]);

    return (
      routeMapping[currentPath] || {
        href: siteConfig.path.home,
        title: `Welcome to Ripples, ${firstName}`,
      }
    );
  };

  const { title } = getPageDetails();

  return (
    <>
      <nav className="userNavContainer z-50">
        <div className="flex items-center">
          <Link className="userNavIcon" to={siteConfig.path.home}>
            {siteConfig.name}
            <span className="ml-1">
              <DotIcon />
            </span>
          </Link>
          <div className="userNavHeading">
            <div className="text-color userNavHeadingText cursor-default">
              {title == "Transactions" && <LeftArrowIcon />}
              <h1>{title}</h1>
            </div>
          </div>
        </div>
        <div className="flex sm:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <CrossIcon /> : <HamburgerButton />}
          </button>
        </div>
        <div className="hidden sm:flex sm:items-center">
          <WalletIcon />
          <div className="text-color userNaveWallet">₹{"0.00"}</div>
        </div>
      </nav>
      <aside
        aria-label="Sidebar"
        className={`userNavAside ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-primary border-r border-gray-700 sm:translate-x-0`}
        id="logo-sidebar"
      >
        <div className="userNavSideBar">
          <ul className="sm:font-medium text-lg">
            {siteConfig.userNavItems.map((item, index) => (
              <li key={index} className="">
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "text-white bg-[#282D45] border border-gray-600" : "text-color"} flex items-center p-2 py-4 group px-6 rounded-sm`
                  }
                  to={item.href}
                >
                  <item.icon />
                  <span className="userNavItem">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-white bg-[#282D45] border border-gray-600" : "text-color"} flex items-center p-2 py-4 group px-6 rounded-sm`
            }
            to={"/logout"}
          >
            <LogoutIcon />
            <span className="userNavItem">Logout</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
