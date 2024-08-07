import { title } from "./primitives";
import { BackwardArrowIcon, DoubleQuotesIcon, ForwardArrowIcon } from './icons';
import { Image } from "@nextui-org/image";
import dashboardData from '@/data/landing.json';
import avatar1 from "@/assets/images/avatar1.png";
import avatar2 from "@/assets/images/avatar2.png";
import avatar3 from "@/assets/images/avatar3.png";

interface TestimonialCardProps {
    id: number;
}

function TestimonialCard({ id }: TestimonialCardProps) {
    const testimonial = dashboardData.testimonialsData[id];
    const Avatars = [avatar1, avatar2, avatar3];
    return (
        <div className="relative flex justify-center w-[392px]">
            <div className="absolute align-bottom mt-32 w-full h-32 border border-gray-800 bg-gradient-to-tr from-[#281e5b] to-[#074a45] rounded-xl"></div>
            <div className="relative mb-8 z-20 p-6 space-y-2 w-5/6 h-56 border border-gray-800 bg-[#0E1330] rounded-xl">
                <div className="flex justify-between">
                    <div className="flex justify-around space-x-2">
                        <Image width={40} height={40} src={Avatars[id]} />
                        <div className="items-center space-y-1">
                            <h3 className="text-md text-white">
                                {testimonial.name}
                            </h3>
                            <h4 className="text-xs text-gray-400">
                                {testimonial.title}
                            </h4>
                        </div>
                    </div>
                    <DoubleQuotesIcon />
                </div>
                <p className="text-white w-full">
                    {testimonial.testimonial}
                </p>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <div className="max-w-7xl w-full space-y-8">
            <div className="text-center">
                <h1 className={`${title({ size: 'lg', color: 'foreground', weight: 'bold' })} h-20`}>What our clients say</h1>
                <p className="text-base max-w-2xl py-4 text-gray-500 mx-auto">Ripples leverages the power of word-of-mouth marketing, helping you acquire new users you were previously unable to convert. By turning your customers into advocates, influencers, and UGC creators, Ripples significantly boosts your marketing efforts and sales.</p>
            </div>
            <div className="flex justify-between space-x-4">
                {dashboardData.testimonialsData.map((_, index) => (
                    <TestimonialCard key={index} id={index} />
                ))}
            </div>
            <div className=" content-center">
                <div className="flex justify-center space-x-2">
                    <button onClick={() => { }} className="bg-[#0E1330] p-2 rounded-xl">
                        <BackwardArrowIcon />
                    </button>
                    <button onClick={() => { }} className="bg-[#0E1330] p-2 rounded-xl">
                        <ForwardArrowIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
