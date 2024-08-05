import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/image";
import flyer from "@/assets/images/flayer.png";
import DashboardCard from "@/components/dashboardCard";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomButton";

export default function IndexPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 md:py-10 bg-custom-radial w-screen">
                <div className="flex justify-between pt-16">
                    <div className="inline-block max-w-[52rem] text-left justify-center space-y-6 px-16">
                        <h1 className="font-bold text-2xl leading-tight lg:text-6xl lg:leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 max-w-[44rem]">Turn customers into influencers, advocates, and UGC creators - your
                            RIPPLERS!</h1>
                        <p className="text-gray-500 text-xl">Rorem ipsum dolor sit amet consectetur. Gravida convallis orci ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet vitae orci ac penatibus consectetur.</p>
                        <div className="flex justify-start gap-4">
                            <CustomButton onClick={() => {}} className="bg-[#7214FF] ">Get a Demo</CustomButton>
                            <CustomButton onClick={() => {}} className="bg-[#070c25] border border-gray-700 mx-4">View Pricing</CustomButton>
                        </div>
                    </div>
                    <div>
                        <Image
                            className="my-4"
                            isZoomed={true}
                            width={504}
                            height={438}
                            alt="NextUI hero Image"
                            src={flyer}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-9 pl-40 pr-28 pt-24 pb-12">
                    <h1 className="col-span-6 font-bold max-w-[46rem] text-2xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">Powerful features to help you manage all your leads</h1>
                    <p className="col-span-3 text-gray-500 py-12 pl-9">Apsum dolor sit amet consectetur. Aliquam elementum elementum in ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet vel.</p>
                </div>
                <DashboardCard/>
                <div className="my-28">
                    <HowDoesItWork/>     
                </div>
                <div className="text-center">
                    <h1 className={`${title({ size: 'lg', color: 'foreground', weight: 'extrabold'})}`}>Great Features</h1>
                    <p className="text-base max-w-2xl mt-4 text-gray-500">Torem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet amet eu interdum.</p>
                </div>
            </section>
        </DefaultLayout>
    );
}