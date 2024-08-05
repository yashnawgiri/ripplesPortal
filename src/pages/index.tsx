import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/image";
import flyer from "@/assets/images/flayer.png";
import DashboardCard from "@/components/dashboardCard";
import HowDoesItWork from "@/components/HowDoesItWork";
import CustomButton from "@/components/CustomButton";

export default function IndexPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="flex justify-between space-x-10">
                    <div className="inline-block max-w-lg text-left justify-center space-y-6">
                        <h1 className={title({ size: "lg", color: "foreground"})}>Turn customers into influencers, advocates, and UGC creators - your
                            RIPPLERS!</h1>
                        <p className={subtitle({})}>Rorem ipsum dolor sit amet consectetur. Gravida convallis orci ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet vitae orci ac penatibus consectetur.</p>
                        <div className="flex justify-start gap-4">
                            <CustomButton onClick={() => {}} className="bg-[#7214FF] py-2">
                                    Get a Demo
                            </CustomButton>
                            <CustomButton onClick={() => {}} className="bg-[#070c25] ">
                                    View Pricing
                            </CustomButton>
                        </div>
                    </div>
                    <div>
                        <Image
                            className="my-4"
                            width={400}
                            height={400}
                            alt="NextUI hero Image"
                            src={flyer}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-7 mx-8 px-10 my-20">
                    <h1 className={`${title({ size: "md", color: "foreground" })} ml-14 col-span-4`}>Powerful features to help you manage all your leads</h1>
                    <p className="text-xs ml-20 px-12 py-6 col-span-3 align-middle">Apsum dolor sit amet consectetur. Aliquam elementum elementum in ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet vel.</p>
                </div>
                <div className="flex space-x-2">
                    <DashboardCard/>
                    <DashboardCard/>
                    <DashboardCard/>
                </div>
                <div className="my-16">
                    <HowDoesItWork/>     
                </div>
                <div className="text-center">
                    <h1 className={`${title({ size: 'sm', color: 'foreground', weight: 'extrabold'})}`}>Great Features</h1>
                    <p className="text-[12px] max-w-md mt-4 text-gray-500">Torem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet amet eu interdum.</p>
                </div>
            </section>
        </DefaultLayout>
    );
}