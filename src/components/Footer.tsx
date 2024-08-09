import { InstagramIcon, LinkedInIcon } from "./icons";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-custom-radial2 w-full">
      <div className="max-w-7xl pt-24 pb-12 mx-auto ">
        <div className="text-center md:text-start md:flex md:justify-between">
          <div className="mb-6">
            <a className="md:flex items-center" href="#">
              <h1 className="self-center text-4xl font-bold whitespace-nowrap text-white ml-6">
                Ripples<span className="text-lg"> </span>
                <span className="text-4xl text-[#7214FF]">.</span>
              </h1>
            </a>
          </div>
          <div className="md:flex md:justify-around md:space-x-16 space-y-8 md:space-y-0">
            <div className="max-w-xs mx-auto md:mx-0">
              <h2 className="mb-4 md:mb-8 text-xl text-gray-400 font-poppins">
                Pages
              </h2>
              <ul className="text-gray-400 font-medium space-y-2 md:space-y-4">
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
              <h2 className="mb-4 md:mb-8 text-xl text-gray-400 font-poppins">
                Legal
              </h2>
              <ul className="text-gray-400 font-medium space-y-2 md:space-y-4">
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
              <h2 className="mb-4 md:mb-8 text-xl text-gray-400 font-poppins">
                Contact
              </h2>
              <ul className="text-gray-400 font-medium space-y-4">
                {siteConfig.footerContact.map((item, _) => (
                  <li key={_}>
                    <a className="hover:underline " href={item.href}>
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
          <span className="px-2 md:px-0 text-sm md:text-lg text-gray-400">
            Copyright © 2024{" "}
            <a className="hover:underline" href="#">
              Ripples
            </a>
          </span>
          <div className="flex px-2 md:px-0 space-x-2 md:space-x-4 mt-1 md:mt-4 ">
            <a
              className="text-gray-400 border p-1 rounded-xl border-gray-800 bg-[#070c25] hover:text-gray-900"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              <InstagramIcon />
              <span className="sr-only">GitHub account</span>
            </a>
            <a
              className="text-gray-400 border p-1 rounded-xl border-gray-800 bg-[#070c25] hover:text-gray-900"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
