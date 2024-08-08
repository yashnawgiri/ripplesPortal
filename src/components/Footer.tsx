import { siteConfig } from "@/config/site";
import { DotIcon, DribbbleIcon, GithubIcon, MetaIcon, TwitterIcon } from "./icons";

export default function Footer() {
    return (
        <footer className="bg-custom-radial2 w-full">
            <div className="max-w-7xl pt-24 pb-12 mx-auto">
                <div className="flex justify-between">
                    <div className="mb-6">
                        <a href="#" className="flex items-center">
                            <h1 className="self-center text-4xl font-bold whitespace-nowrap text-white">Ripples</h1>
                            <div className="mt-7 mx-1">
                                <DotIcon/>     
                            </div>
                        </a>
                    </div>
                    <div className="flex justify-around space-x-16">
                        <div className="max-w-xs">
                            <h2 className="mb-8 text-xl text-gray-400 font-poppins">Pages</h2>
                            <ul className="text-gray-500 font-medium space-y-4">
                                {siteConfig.footerItems.map((item,_) => (
                                    <li key={_}><a href={item.href} className="hover:underline ">{item.label}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="max-w-xs">
                            <h2 className="mb-8 text-xl text-gray-400 font-poppins">Legal</h2>
                            <ul className="text-gray-500 font-medium space-y-4">
                                {siteConfig.footerLegal.map((item,_) => (
                                    <li key={_}><a href={item.href} className="hover:underline ">{item.label}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="max-w-xs">
                            <h2 className="mb-8 text-xl text-gray-400 font-poppins">Contact</h2>
                            <ul className="text-gray-500 font-medium space-y-4">
                                {siteConfig.footerContact.map((item,_) => (
                                    <li key={_}><a href={item.href} className="hover:underline ">{item.label}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="mb-10 mt-20 border-spacing-0 border-gray-700 sm:mx-auto" />
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-500">Copyright © 2024 <a href="#" className="hover:underline">Ripples</a></span>
                    <div className="flex space-x-4 mt-4 ">
                        <a href="#" className="text-gray-500 border p-1 rounded-xl border-gray-800 bg-[#070c25] hover:text-gray-900">
                            <MetaIcon/>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-gray-500 border p-1 rounded-xl border-gray-800 bg-[#070c25] hover:text-gray-900">
                            <TwitterIcon />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-500 border p-1 rounded-xl border-gray-800 bg-[#070c25] hover:text-gray-900">
                            <GithubIcon/>
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="#" className="text-gray-500 border p-1 rounded-xl border-gray-800 bg-[#070c25] hover:text-gray-900">
                            <DribbbleIcon />
                            <span className="sr-only">Dribbble account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}