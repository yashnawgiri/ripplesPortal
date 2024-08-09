import dashboardData from '@/data/landing.json';
import {title} from "./primitives";

export default function GradiantCards() {
    return (
        <div className="max-w-7xl w-full space-y-6 mt-14">
            <div className="text-center">
                <h1 className={`${title({size: 'lg', color: 'foreground', weight: 'bold'})} h-20`}>Great Outcomes</h1>
            </div>
            <div className="space-y-4 lg:space-x-4 lg:flex lg:justify-center lg:space-y-0">
                <div
                    className="lg:mx-4 mx-auto h-60 px-7 py-8 max-w-sm lg:max-w-md flex flex-col border border-[#0e1536] rounded-xl bg-gradient-to-tr from-[#0e194e] to-[#081d2d]">
                    <h1 className="pb-4 text-xl xl:text-3xl font-bold text-white">{dashboardData.GradiantCardsData[0].title}</h1>
                    <p className="pb-2 text-md xl:text-base max-w-md text-gray-500">{dashboardData.GradiantCardsData[0].description}</p>
                </div>
                <div
                    className="lg:mx-4 mx-auto h-60 px-7 py-8 max-w-sm lg:max-w-md flex flex-col border border-[#0e1536] rounded-xl bg-gradient-to-tr from-[#0e194e] to-[#081d2d]">
                    <h1 className="pb-4 text-xl xl:text-3xl font-bold text-white">{dashboardData.GradiantCardsData[1].title}</h1>
                    <p className="pb-2 text-md xl:text-base max-w-md text-gray-500">{dashboardData.GradiantCardsData[1].description}</p>
                </div>
                <div
                    className="lg:mx-4 mx-auto h-60 px-7 py-8 max-w-sm lg:max-w-md flex flex-col border border-[#0e1536] rounded-xl bg-gradient-to-tr from-[#0e194e] to-[#081d2d]">
                    <h1 className="pb-4 text-xl xl:text-3xl font-bold text-white">{dashboardData.GradiantCardsData[2].title}</h1>
                    <p className="pb-2 text-md xl:text-base max-w-md text-gray-500">{dashboardData.GradiantCardsData[2].description}</p>
                </div>
            </div>
        </div>
    );
}
