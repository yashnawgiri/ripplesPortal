import { Image } from "@nextui-org/image";

import DefaultLayout from "@/layouts/default";
import flyer from "@/assets/images/flayer.png";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomButton";
import GradiantCards from "@/components/GradiantCards";
import FAQ from "@/components/FAQ";
import DashboardCard from "@/components/dashboardCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 md:py-10">
        <div className="md:flex max-w-7xl lg:w-full pt-4 gap-3 lg:gap-4 gap-y-3">
          <div className="md:w-3/6 text-left justify-center space-y-7">
            <h1 className="lg:max-w-[44rem] text-center lg:text-start font-bold text-3xl leading-tight md:text-5xl xl:text-6xl lg:leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Turn customers into influencers, advocates, and UGC creators -
              your RIPPLERS!
            </h1>
            <h2 className="lg:max-w-[44rem] text-center lg:text-start lg:font-bold leading-tight lg:text-2xl xl:text-3xl xl:leading-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-400">
              Increase Your Customer Referrals by 3X.
            </h2>
            <p className="text-gray-400 text-center lg:text-start max-w-2xl text-lg xl:text-xl hidden lg:block">
              Ripples is an OS that helps you automate and scale rewarding of
              influencer style rewards to your customers to unlock virality.
            </p>
            <div className="flex lg:justify-start justify-center gap-2 lg:gap-4">
              <CustomButton className="bg-[#7214FF]" onClick={() => { }}>
                <Link
                  to={"/get-demo"}
                >
                  Get a Demo
                </Link>
              </CustomButton>
              {/* <CustomButton onClick={() => { }} className="bg-[#070c25] border border-gray-700 mx-4">View Pricing</CustomButton> */}
            </div>
          </div>
          <div className="lg:hidden flex justify-center sm:mt-4 md:mt-0">
            <Image className="my-4" height="350px" src={flyer} />
          </div>
          <div className="hidden lg:flex w-3/6 justify-end">
            <Image
              className="my-4"
              height="550px"
              isZoomed={true}
              src={flyer}
            />
          </div>
        </div>
        <div className="text-center max-w-3xl pt-8 md:pt-20 md:mb-10" id="about">
          <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] to-[#4B4B4B] h-24 md:h-36">
            Your Customer is Your Next Ripple for Sales
          </h1>
          <p className="md:hidden text-sm md:text-base max-w-xl py-1 md:my-4 text-gray-400 mx-auto">
            {" "}
            Ripples is an OS that helps you automate and scale rewarding of
            influencer style rewards to your customers to unlock virality
          </p>
        </div>
        <DashboardCard />
        <HowDoesItWork />
        <GradiantCards />
        <CustomButton className="bg-[#7214FF] my-14" onClick={() => { }}>
          <Link
            to={"/get-demo"}
          >
            Get a Demo
          </Link>
        </CustomButton>
        <FAQ />
        <CustomButton className="bg-[#7214FF] my-14" onClick={() => { }}>
          <Link
            to={"/get-demo"}
          >
            Get a Demo
          </Link>
        </CustomButton>
        {/* <Testimonials /> */}
      </section>
    </DefaultLayout>
  );
}
