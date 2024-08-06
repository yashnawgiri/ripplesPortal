import { DashboardCardIcon } from "./icons";
import dashboardData from '@/data/landing.json';

export default function DashboardCard() {
    return (
        <div className="flex space-x-8 px-10">
            {dashboardData.dashboardCardData.map(item => (
                <div key={item.icon} className="w-[380px] rounded-md bg-opacity-35 border border-gray-700 overflow-hidden shadow-lg p-8 bg-[#0e1330]">
                    <DashboardCardIcon icon={item.icon}/>
                    <h1 className="mb-2 mt-4 text-2xl font-bold text-start text-white">{item.title}</h1>
                    <p className="text-gray-500 text-base">{item.description}</p>
                </div>
            ))}
        </div>
    );
}
