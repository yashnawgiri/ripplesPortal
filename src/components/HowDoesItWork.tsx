import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./../styles/home/howDoesItWork.css";
// import dashboardData from "@/data/landing.json";

interface HowDoesItWorkData {
  title: string;
  description: string;
  data: {
    number: number;
    title: string;
    description: string;
  }[];
}

interface HowDoesItWorkProps {
  howDoesItWorkData: HowDoesItWorkData;
}

const HowDoesItWork: React.FC<HowDoesItWorkProps> = ({ howDoesItWorkData }) => {
  return (
    <>
      <div className="outerContainer" id="features">
        <div className="p-4 text-center">
          <h2 className="title">{howDoesItWorkData.title}</h2>
          <p className="description">{howDoesItWorkData.description}</p>
        </div>
        <div className="relative">
          <div className="innerContainer">
            {howDoesItWorkData.data.map((step) => (
              <div key={step.number} className="secondContainer w-30p md:w-50p">
                <div className="cardNumber">
                  <span className="text-4xl font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold max-w-72 mb-2 text-white">
                  {step.title}
                </h3>
                <p className="cardDescription">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sm:hidden w-full mt-8" id="features2">
        <div className="p-4 text-center w-full">
          <h2 className="title">{howDoesItWorkData.title}</h2>
          <p className="description">{howDoesItWorkData.description}</p>
        </div>
        <Swiper
          className="how-does-it-work"
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          slidesPerView={"auto"}
          spaceBetween={0}
        >
          <div className="">
            {howDoesItWorkData.data.map((step) => (
              <SwiperSlide key={step.number}>
                <div key={step.number} className="swiperContainer">
                  <div className="cardNumber">
                    <span className="text-4xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold max-w-72 mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="cardDescription">{step.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default HowDoesItWork;
