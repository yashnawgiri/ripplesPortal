import * as React from "react";
import "./../styles/home/howDoesItWork.css";

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
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === howDoesItWorkData.data.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? howDoesItWorkData.data.length - 1 : prev - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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

      {/* Mobile Carousel */}
      <div className="sm:hidden w-full mt-8" id="features2">
        <div className="p-4 text-center w-full">
          <h2 className="title">{howDoesItWorkData.title}</h2>
          <p className="description">{howDoesItWorkData.description}</p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {howDoesItWorkData.data.map((step) => (
              <div key={step.number} className="w-full flex-shrink-0 px-4">
                <div className="swiperContainer">
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
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={prevSlide}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={nextSlide}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {howDoesItWorkData.data.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-white" : "bg-white/30"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowDoesItWork;
