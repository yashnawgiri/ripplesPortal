import "./../styles/home/gradiantCards.css";

import dashboardData from "@/data/landing.json";

export default function GradiantCards() {
  return (
    <div className="max-w-7xl w-full space-y-6 mt-14">
      <div className="text-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 py-4 text-center text-3xl md:text-5xl font-bold">
          Great Outcomes
        </h1>
      </div>
      <div className="gradiantCardContainer">
        {dashboardData.GradiantCardsData.map((card, index) => (
          <div key={index} className="gradiantCard w-100p md:w-30p sm:w-50p">
            <h1 className="pb-4 text-xl xl:text-3xl font-bold text-white">
              {card.title}
            </h1>
            <p className="pb-2 text-md xl:text-base text-color">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
