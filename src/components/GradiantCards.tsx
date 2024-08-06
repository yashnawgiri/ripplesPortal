import CustomButton from "./CustomButton";
import dashboardData from '@/data/landing.json';

export default function GradiantCards() {
    return (
        <div className="w-full mt-16 px-40">
            <div className="py-36 px-20 space-y-4 border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345] mx-4">
                <h1 className="text-3xl font-bold text-white">{dashboardData.GradiantCardsData[0].title}</h1>
                <p className=" max-w-md text-gray-400 pb-4">{dashboardData.GradiantCardsData[0].description}</p>
                <CustomButton onClick={() => { }} className="bg-[#170c49] border border-gray-700">Learn More</CustomButton>
            </div>
            <div className="flex mt-8">
                <div className="px-12 w-5/12 flex flex-col border border-[#282D45] rounded-xl bg-gradient-to-tr from-[#0e194e] to-[#0c3345] py-10 mx-4">
                    <h1 className="pt-80 pb-4 text-3xl font-bold text-white">{dashboardData.GradiantCardsData[1].title}</h1>
                    <p className="pb-2 text-base max-w-md text-gray-400">{dashboardData.GradiantCardsData[1].description}</p>
                </div>
                <div className="w-7/12 flex flex-col border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345] p-10 mx-4">
                    <h1 className="pb-4 px-4 text-3xl font-bold text-white">{dashboardData.GradiantCardsData[2].title}</h1>
                    <p className="pb-2 px-4 text-base max-w-md text-gray-400">{dashboardData.GradiantCardsData[2].description}</p>
                </div>
            </div>
        </div>
    );
}