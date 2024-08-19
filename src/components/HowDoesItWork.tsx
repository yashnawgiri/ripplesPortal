import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./../styles/home/howDoesItWork.css";
import dashboardData from "@/data/landing.json";

export default function HowDoesItWork() {
  return (
    <>
      <div id="features"
        className="outerContainer">
        <div className="p-4 text-center">
          <h2 className="title">
            {dashboardData.ComponentsData.HowDoesItWorks.title}
          </h2>
          <p className="description">
            {dashboardData.ComponentsData.HowDoesItWorks.description}
          </p>
        </div>
        <div className="relative">
          <div className="innerContainer">
            {dashboardData.HowDoesItWorkData.map((step) => (
              <div
                key={step.number}
                className="secondContainer w-30p md:w-50p"
              >
                <div className="cardNumber">
                  <span className="text-4xl font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold max-w-72 mb-2 text-white">
                  {step.title}
                </h3>
                <p className="cardDescription">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sm:hidden w-full mt-8">
        <div className="p-4 text-center w-full">
          <h2 className="title">
            {dashboardData.ComponentsData.HowDoesItWorks.title}
          </h2>
          <p className="description">
            {dashboardData.ComponentsData.HowDoesItWorks.description}
          </p>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          className="how-does-it-work"
        >
          <div className="">
            {dashboardData.HowDoesItWorkData.map((step) => (
              <SwiperSlide>
                <div
                  key={step.number}
                  className="swiperContainer"
                >
                  <div className="cardNumber">
                    <span className="text-4xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold max-w-72 mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="cardDescription">
                    {step.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
}