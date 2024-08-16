import { Image } from "@nextui-org/image";

import DefaultLayout from "@/layouts/default";
import flyer from "@/assets/images/flayer.png";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomButton";
import GradiantCards from "@/components/GradiantCards";
import FAQ from "@/components/FAQ";
import DashboardCard from "@/components/dashboardCard";
import { Link } from "react-router-dom";
import "@/styles/home/home.css";

export default function HomePage() {
  return (
    <DefaultLayout>
      <section className="section">
        <div className="homeContainer">
          <div className="home-div">
            <h1
              className="home-h1">
              Turn customers into influencers, advocates, and UGC creators -
              your RIPPLERS!
            </h1>
            <h2
              className="home-h2">
              Increase Your Customer Referrals by 3X.
            </h2>
            <p className="home-p">
              Ripples is an OS that helps you automate and scale 
              influencer-style rewards for your customers, unlocking virality.
            </p>
            <div className="home-demo-div">
              <CustomButton className="bg-[#7214FF]" onClick={() => {
              }}>
                <Link
                  to={"/get-demo"}
                >
                  Book Demo
                </Link>
              </CustomButton>
              {/* <CustomButton 
                onClick={() => { }} 
                className="bg-[#070c25] border border-gray-700 mx-4"
                >
                  View Pricing
              </CustomButton> */}
            </div>
          </div>
          <div className="home-img-mob">
            <Image className="my-4" height="350px" src={flyer} />
          </div>
          <div className="home-img">
            <Image
              className="my-4"
              height="550px"
              isZoomed={true}
              src={flyer}
            />
          </div>
        </div>
        <div className="home-div2" id="about">
          <h1
            className="home-div2-h1">
            Your Customer is Your Next Ripple for Sales
          </h1>
          <p className="home-div2-p">
            {" "}
            Ripples is an OS that helps you automate and scale rewarding of
            influencer style rewards to your customers to unlock virality
          </p>
        </div>
        <DashboardCard />
        <HowDoesItWork />
        <GradiantCards />
        <CustomButton className="bg-[#7214FF] my-14" onClick={() => {
        }}>
          <Link
            to={"/get-demo"}
          >
            Book Demo
          </Link>
        </CustomButton>
        <FAQ />
        <CustomButton className="bg-[#7214FF] my-14" onClick={() => {
        }}>
          <Link
            to={"/get-demo"}
          >
            Book Demo
          </Link>
        </CustomButton>
        {/* <Testimonials /> */}
      </section>
    </DefaultLayout>
  );
}
