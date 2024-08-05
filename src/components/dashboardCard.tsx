import { DashboardCardIcon } from "./icons";

const data = [
    {
        title: "Lower CAC, Increase ROI",
        icon: 0,
        description: "Borem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere et amet arcu dictum ultricies convallis."
    },
    {
        title: "Incentivize users",
        icon: 1,
        description: "Worem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere et amet arcu dictum ultricies convallis."
    }, 
    {
        title: "Tap into new GTM channel",
        icon: 2,
        description: "Bem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere et amet arcu dictum ultricies convallis."
    },
]

export default function DashboardCard() {
    return (
        <div className="flex space-x-8 px-10">
            {data.map(item => (
                <div key={item.icon} className="w-[380px] rounded-md bg-opacity-35 border border-gray-700 overflow-hidden shadow-lg p-8 bg-[#0e1330]">
                    <DashboardCardIcon icon={item.icon}/>
                    <h1 className="mb-2 mt-4 text-2xl font-bold text-start text-white">{item.title}</h1>
                    <p className="text-gray-500 text-base">{item.description}</p>
                </div>
            ))}
        </div>
    );
}
