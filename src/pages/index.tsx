import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/image";
import flyer from "@/assets/images/flayer.png";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomButton";
import GradiantCards from "@/components/GradiantCards";
import FAQ from "@/components/FAQ";
import DashboardCard from "@/components/dashboardCard";
import Testimonials from "@/components/Testimonials";
import { title } from "@/components/primitives";

export default function IndexPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 md:py-10">
                <div className="flex max-w-7xl w-full pt-4">
                    <div className="w-4/6 text-left justify-center space-y-7">
                        <h1 className="max-w-[44rem] font-bold text-2xl leading-tight lg:text-6xl lg:leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                            Turn customers into influencers, advocates, and UGC creators - your RIPPLERS!
                        </h1>
                        <h2 className="max-w-[44rem] font-bold text-xl leading-tight lg:text-3xl lg:leading-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-400">
                            Increase Your Customer Referrals by 3X. 
                        </h2>
                        <p className="text-gray-500 max-w-2xl text-xl">
                            Ripples is an OS that helps you automate and scale rewarding of influencer style rewards to your customers to unlock virality.
                        </p>
                        <div className="flex justify-start gap-4">
                            <CustomButton onClick={() => { }} className="bg-[#7214FF]"><a href="https://calendly.com/hello-ripples">Get a Demo</a></CustomButton>
                            <CustomButton onClick={() => { }} className="bg-[#070c25] border border-gray-700 mx-4">View Pricing</CustomButton>
                        </div>
                    </div>
                    <div className="w-3/6"><Image className="my-4" isZoomed={true} width={540} height={504} src={flyer}/></div>
                </div>
                <div className="flex justify-center text-center max-w-3xl w-full pt-16 mb-10">
                    <h1 className={`${title({ size: 'lg', color: 'foreground', weight: 'bold' })} h-32`}>Your Customer is Your Next Ripple for Sale</h1>
                </div>
                <DashboardCard />
                <HowDoesItWork />
                <GradiantCards />
                <CustomButton onClick={() => { }} className="bg-[#7214FF] my-14"><a href="https://forms.gle/ERTfM3wyQ5agqtTb8">Sign Up</a></CustomButton>
                <FAQ />
                <CustomButton onClick={() => { }} className="bg-[#7214FF] my-14"><a href="https://forms.gle/ERTfM3wyQ5agqtTb8">Sign Up</a></CustomButton>
                <Testimonials />
            </section>
        </DefaultLayout>
    );
}
