import { SunFilledIcon } from "./icons";

export default function DashboardCard() {
    return (
        <div className="w-[250px] rounded-sm border border-black overflow-hidden shadow-lg p-4 bg-[#151934]">
            <SunFilledIcon size={32} className="text-white mb-1.5" />
            <h1 className="mb-1 text-sm font-bold text-start text-white">Lower CAC, Increase ROI</h1>
            <p className="text-gray-500 text-xs">
                Borem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere et amet arcu dictum ultricies convallis.
            </p>
        </div>
    );
}
