import CustomButton from "./CustomButton";
import dashboardData from '@/data/landing.json';
import { title } from "./primitives";

export default function GradiantCards() {
    return (
        <div className="max-w-7xl w-full space-y-6">
            <div className="text-center">
                <h1 className={`${title({ size: 'lg', color: 'foreground', weight: 'bold' })} h-20`}>Great Outcomes</h1>
                {/* <p className="text-base max-w-xl py-4 text-gray-500 mx-auto">Torem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet amet eu interdum.</p> */}
            </div>
            <div className="w-full space-y-8">
                <div className="w-full py-36 px-20 space-y-4 border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345]">
                    <h1 className="text-3xl font-bold text-white">{dashboardData.GradiantCardsData[0].title}</h1>
                    <p className=" max-w-md text-gray-400 pb-4">{dashboardData.GradiantCardsData[0].description}</p>
                    <CustomButton onClick={() => { }} className="bg-[#170c49] border border-gray-700">Learn More</CustomButton>
                </div>
                <div className="flex space-x-8">
                    <div className="px-12 w-5/12 flex flex-col border border-[#282D45] rounded-xl bg-gradient-to-tr from-[#0e194e] to-[#0c3345] py-10">
                        <h1 className="pt-80 pb-4 text-3xl font-bold text-white">{dashboardData.GradiantCardsData[1].title}</h1>
                        <p className="pb-2 text-base max-w-md text-gray-400">{dashboardData.GradiantCardsData[1].description}</p>
                    </div>
                    <div className="w-7/12 flex flex-col p-10 border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345]">
                        <h1 className="pb-4 px-4 text-3xl max-w-md font-bold text-white">{dashboardData.GradiantCardsData[2].title}</h1>
                        <p className="pb-2 px-4 text-base max-w-md text-gray-400">{dashboardData.GradiantCardsData[2].description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}