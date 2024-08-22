import { DashboardCardIcon } from "./icons";
import "./../styles/home/dashboardCard.css";

import dashboardData from "@/data/landing.json";

export default function DashboardCard() {
  return (
    <div className="dashboardCardContainer">
      {dashboardData.dashboardCardData.map((item) => (
        <div
          key={item.icon}
          className="w-100p md:w-30p sm:w-50p card"
        >
          <div className="flex md:block justify-start items-center">
            <DashboardCardIcon icon={item.icon} />
            <h1 className="cardTitle text-md md:text-2xl ">
              {item.title}
            </h1>
          </div>
          <p className="cardDescription">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
