import { Image } from "@nextui-org/image";

import { title } from "./primitives";
import { BackwardArrowIcon, DoubleQuotesIcon, ForwardArrowIcon } from "./icons";
import "./../styles/home/testimonial.css"

import dashboardData from "@/data/landing.json";
import avatar1 from "@/assets/images/avatars/avatar1.png";
import avatar2 from "@/assets/images/avatars/avatar2.png";
import avatar3 from "@/assets/images/avatars/avatar3.png";

interface TestimonialCardProps {
  id: number;
}

function TestimonialCard({ id }: TestimonialCardProps) {
  const testimonial = dashboardData.testimonialsData[id];
  const Avatars = [avatar1, avatar2, avatar3];

  return (
    <div className="relative flex justify-center w-[392px]">
      <div
        className="singleTestimonialContainer" />
      <div className="singleTestimonialInnerContainer">
        <div className="flex justify-between">
          <div className="flex justify-around space-x-2">
            <Image height={40} src={Avatars[id]} width={40} />
            <div className="items-center space-y-1">
              <h3 className="text-md text-white">{testimonial.name}</h3>
              <h4 className="text-xs text-color">{testimonial.title}</h4>
            </div>
          </div>
          <DoubleQuotesIcon />
        </div>
        <p className="text-white w-full">{testimonial.testimonial}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="max-w-7xl w-full space-y-8">
      <div className="text-center">
        <h1 className={`${title({ size: "lg", color: "foreground", weight: "bold" })} h-20`}>
          {dashboardData.ComponentsData.Testimonials.title}
        </h1>
        <p className="text-base max-w-2xl py-4 text-color mx-auto">
          {dashboardData.ComponentsData.Testimonials.description}
        </p>
      </div>
      <div className="flex justify-between space-x-4">
        {dashboardData.testimonialsData.map((_, index) => (
          <TestimonialCard key={index} id={index} />
        ))}
      </div>
      <div className=" content-center">
        <div className="flex justify-center space-x-2">
          <button className="bg-primary p-2 rounded-xl" onClick={() => {
          }}>
            <BackwardArrowIcon />
          </button>
          <button className="bg-primary p-2 rounded-xl" onClick={() => {
          }}>
            <ForwardArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
