import { DashboardCardIcon } from "./icons";

import dashboardData from "@/data/landing.json";

export default function DashboardCard() {
  return (
    <div className="dashboard-card gap-4 max-w-7xl mt-4 md:w-full md:flex md:justify-between space-y-4 md:space-y-0">
      {dashboardData.dashboardCardData.map((item) => (
        <div
          key={item.icon}
          className="w-100p  md:w-30p  sm:w-50p rounded-md bg-opacity-35 border border-gray-700 overflow-hidden shadow-lg p-8 bg-[#0e1330]"
        >
          <div className="flex md:block justify-start">
            <DashboardCardIcon icon={item.icon} />
            <h1 className="mb-2 mt-4 ml-2 md:ml-0 text-md md:text-2xl font-bold text-start text-white">
              {item.title}
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base mt-2 md:mt-0">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
