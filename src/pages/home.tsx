import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/image";
import flyer from "@/assets/images/flayer.png";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomButton";
import GradiantCards from "@/components/GradiantCards";
import FAQ from "@/components/FAQ";
import DashboardCard from "@/components/dashboardCard";
import Testimonials from "@/components/Testimonials";
import { siteConfig } from "@/config/site";

export default function HomePage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 md:py-10">
                <div className="lg:flex max-w-7xl lg:w-full pt-4">
                    <div className="md:w-4/6 text-left justify-center space-y-7 mx-auto">
                        <h1 className="lg:max-w-[44rem] text-center lg:text-start font-bold text-3xl leading-tight lg:text-6xl lg:leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                            Turn customers into influencers, advocates, and UGC creators - your RIPPLERS!
                        </h1>
                        <h2 className="lg:max-w-[44rem] text-center lg:text-start lg:font-bold leading-tight lg:text-3xl lg:leading-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-400">
                            Increase Your Customer Referrals by 3X. 
                        </h2>
                        <p className="text-gray-500 text-center lg:text-start max-w-2xl text-xl hidden lg:block">
                            Ripples is an OS that helps you automate and scale rewarding of influencer style rewards to your customers to unlock virality.
                        </p>
                        <div className="flex lg:justify-start justify-center gap-2 lg:gap-4">
                            <CustomButton onClick={() => { }} className="bg-[#7214FF]"><a target="_blank" rel="noopener noreferrer" href={siteConfig.links.getdemo}>Get a Demo</a></CustomButton>
                            <CustomButton onClick={() => { }} className="bg-[#070c25] border border-gray-700 mx-4">View Pricing</CustomButton>
                        </div>
                    </div>
                    <div className="lg:hidden flex justify-center"><Image className="my-4" width={300} height={350} src={flyer}/></div>
                    <div className="hidden lg:block w-3/6"><Image className="my-4" isZoomed={true} width={540} height={504} src={flyer}/></div>
                </div>
                <div className="text-center max-w-3xl pt-8 md:pt-20 md:mb-10">
                    <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] to-[#4B4B4B] h-24 md:h-36">Your Customer is Your Next Ripple for Sale</h1>
                    <p className="md:hidden text-sm md:text-base max-w-xl py-1 md:my-4 text-gray-500 mx-auto"> Ripples is an OS that helps you automate and scale rewarding of influencer style rewards to your customers to unlock virality</p>
                </div>
                <DashboardCard />
                <HowDoesItWork />
                <GradiantCards />
                <CustomButton onClick={() => { }} className="bg-[#7214FF] my-14"><a target="_blank" rel="noopener noreferrer" href={siteConfig.links.signupform}>Sign Up</a></CustomButton>
                <FAQ />
                <CustomButton onClick={() => { }} className="bg-[#7214FF] my-14"><a target="_blank" rel="noopener noreferrer" href={siteConfig.links.signupform}>Sign Up</a></CustomButton>
                {/* <Testimonials /> */}
            </section>
        </DefaultLayout>
    );
}
