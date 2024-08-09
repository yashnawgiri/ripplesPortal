import { title } from "./primitives";

import dashboardData from "@/data/landing.json";

export default function GradiantCards() {
  return (
    <div className="max-w-7xl w-full space-y-6 mt-14">
      <div className="text-center">
        <h1
          className={`${title({ size: "lg", color: "foreground", weight: "bold" })} h-20`}
        >
          Great Outcomes
        </h1>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 gap-y-4 lg:justify-center lg:space-y-0">
        {dashboardData.GradiantCardsData.map((card) => (
          <div
            className="lg:mx-4 mx-auto h-68  px-7 py-8 w-100p  md:w-30p  sm:w-50p flex flex-col border border-[#0e1536] rounded-xl bg-gradient-to-tr from-[#0e194e] to-[#081d2d]">
            <h1 className="pb-4 text-xl xl:text-3xl font-bold text-white">
              {card.title}
            </h1>
            <p className="pb-2 text-md xl:text-base text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
