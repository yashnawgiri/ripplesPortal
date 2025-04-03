import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { BackwardArrowIcon, DoubleQuotesIcon, ForwardArrowIcon } from "./icons";
import "./../styles/home/testimonial.css";

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
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative flex justify-center w-full max-w-[392px] p-4"
      exit={{ opacity: 0, y: -50 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="singleTestimonialContainer" />
      <div className="singleTestimonialInnerContainer">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Image
              alt={`${testimonial.name}'s profile picture`}
              height={40}
              src={Avatars[id]}
              width={40}
            />
            <div className="items-center space-y-1">
              <h3 className="text-md text-white">{testimonial.name}</h3>
              <p className="text-xs text-color">{testimonial.title}</p>
            </div>
          </div>
          <DoubleQuotesIcon />
        </div>
        <p className="text-white w-full mt-4">{testimonial.testimonial}</p>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsLength = dashboardData.testimonialsData.length;

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsLength);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsLength - 1 : prevIndex - 1,
    );
  };

  const visibleTestimonials = () => {
    if (window.innerWidth >= 1024) {
      return [
        dashboardData.testimonialsData[currentIndex],
        dashboardData.testimonialsData[(currentIndex + 1) % testimonialsLength],
        dashboardData.testimonialsData[(currentIndex + 2) % testimonialsLength],
      ];
    }

    return [dashboardData.testimonialsData[currentIndex]];
  };

  return (
    <div className="max-w-7xl w-full px-4 space-y-8 py-16">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 py-4 text-center text-3xl md:text-5xl font-bold">
          {dashboardData.ComponentsData.Testimonials.title}
        </h2>
        <p className="text-base max-w-2xl py-4 text-color mx-auto">
          {dashboardData.ComponentsData.Testimonials.description}
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center">
        {visibleTestimonials().map((_, index) => (
          <TestimonialCard
            key={index}
            id={(currentIndex + index) % testimonialsLength}
          />
        ))}
      </div>
      <div className="content-center">
        <div className="flex justify-center space-x-2">
          <motion.button
            aria-label="Previous testimonial"
            className="bg-primary p-2 rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
          >
            <BackwardArrowIcon />
          </motion.button>
          <motion.button
            aria-label="Next testimonial"
            className="bg-primary p-2 rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
          >
            <ForwardArrowIcon />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
