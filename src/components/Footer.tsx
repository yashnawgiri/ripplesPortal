import { InstagramIcon, LinkedInIcon } from "./icons";
import Newsletter from "./Newsletter";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-custom-radial2 w-full">
      <div className="max-w-7xl pt-24 pb-12 mx-auto ">
        <div className="text-center md:text-start md:flex md:justify-between">
          <div className="mb-6">
            <a className="md:flex items-center" href="#home">
              <h1 className="self-center text-4xl font-bold whitespace-nowrap text-white ml-6">
                {siteConfig.name}
                <span className="text-lg"> </span>
                <span className="text-4xl text-secondary">.</span>
              </h1>
            </a>
            <Newsletter />
          </div>
          <div className="md:flex md:justify-around md:space-x-16 space-y-8 md:space-y-0">
            <div className="max-w-xs mx-auto md:mx-0">
              <h2 className="mb-4 md:mb-8 text-xl text-color font-poppins">
                Pages
              </h2>
              <ul className="text-color font-medium space-y-2 md:space-y-4">
                {siteConfig.footerItems.map((item, _) => (
                  <li key={_}>
                    <a className="hover:underline " href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-xs mx-auto md:mx-0">
              <h2 className="mb-4 md:mb-8 text-xl text-color font-poppins">
                Legal
              </h2>
              <ul className="text-color font-medium space-y-2 md:space-y-4">
                {siteConfig.footerLegal.map((item, _) => (
                  <li key={_}>
                    <a className="hover:underline " href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-xs mx-auto md:mx-0">
              <h2 className="mb-4 md:mb-8 text-xl text-color font-poppins">
                Contact
              </h2>
              <ul className="text-color font-medium space-y-4">
                {siteConfig.footerContact.map((item, _) => (
                  <li key={_}>
                    <a
                      className="hover:underline "
                      href={item.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="mb-10 mt-20 border-spacing-0 border-gray-700 sm:mx-auto" />
        <div className="flex items-center justify-between">
          <span className="px-2 md:px-0 text-sm md:text-lg text-color">
            Copyright © 2024{" "}
            <a className="hover:underline" href="#home">
              {siteConfig.name}
            </a>
          </span>
          <div className="flex px-2 md:px-0 space-x-2 md:space-x-4 mt-1 md:mt-4 ">
            <a
              className="text-color border p-1 rounded-xl border-gray-800 bg-primary hover:text-gray-900"
              href="#home"
              rel="noopener noreferrer"
              target="_blank"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram account</span>
            </a>
            <a
              className="text-color border p-1 rounded-xl border-gray-800 bg-primary hover:text-gray-900"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
              <span className="sr-only">LinkedIn account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
