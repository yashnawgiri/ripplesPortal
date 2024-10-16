import { Image } from "@nextui-org/image";

import DefaultLayout from "@/layouts/default";
import flyer from "@/assets/images/flayer.png";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomElements/CustomButton";
import GradiantCards from "@/components/GradiantCards";
import FAQ from "@/components/FAQ";
import DashboardCard from "@/components/dashboardCard";
import { useNavigate } from "react-router-dom";
import "@/styles/home/home.css";
import { siteConfig } from "@/config/site";
import dashboardData from '@/data/landing.json';

function DemoButton() {
  const navigate = useNavigate();
  return (
    <CustomButton className="bg-secondary my-14" onClick={() => navigate(siteConfig.path.getDemo)}>
      {dashboardData.home.demoButton}
    </CustomButton>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <section className="main-section">
        <div className="homeContainer">
          <div className="home-div">
            <h1 className="home-h1 home-heading">
              {dashboardData.home.heading1}
            </h1>
            <h2 className="home-h2 home-heading">
              {dashboardData.home.subHeading}
            </h2>
            <p className="home-p">
              {dashboardData.home.description}
            </p>
            <div className="home-demo-div">
              <CustomButton className="bg-secondary text-2xl" onClick={() => navigate(siteConfig.path.getDemo)}>
                  {dashboardData.home.demoButton}
              </CustomButton>
              {/* <CustomButton onClick={() => { }} 
                className="bg-[#070c25] border border-gray-700 mx-4">
                  View Pricing
              </CustomButton> */}
            </div>
          </div>
          <div className="home-img-mob">
            <Image 
              className="my-4" 
              alt= "home-image" 
              height="350px" 
              src={flyer} />
          </div>
          <div className="home-img">
            <Image
              className="my-4"
              height="550px"
              alt= "home-image" 
              isZoomed={true}
              src={flyer}
            />
          </div>
        </div>
        <div className="home-div2" id="about">
          <h1 className="home-div2-h1">
            {dashboardData.home.heading2}
          </h1>
          <p className="home-div2-p">
            {" "}
            {dashboardData.home.description2}
          </p>
        </div>
        <DashboardCard />
        <DemoButton />
        <HowDoesItWork />
        <GradiantCards />
        <DemoButton />
        <FAQ />
        <DemoButton />
        {/* <Testimonials /> */}
      </section>
    </DefaultLayout>
  );
}
