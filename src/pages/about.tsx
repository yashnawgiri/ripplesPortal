import AboutUsCard from "@/components/AboutUsCard";
import DefaultLayout from "@/layouts/default";
import aboutUsData from "@/data/about.json";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-4xl text-center justify-center">
          <h1 className="text-white max-w-2xl font-poppins text-4xl md:text-6xl font-bold mx-auto">
            Meet the Team Behind Ripples
          </h1>
          <p className="text-gray-400 py-8 max-w-lg mx-auto">
            {aboutUsData.TopText}
          </p>
          <div className="md:flex md:justify-center md:space-x-4 space-y-8 md:space-y-0 py-6">
            <AboutUsCard key={0} id={0}/>
            <AboutUsCard key={1} id={1}/>
          </div>
          <p className="text-gray-400 py-8 max-w-lg mx-auto">
            {aboutUsData.MiddleText}
          </p>
          <h2 className={`${title({ size: "sm", color: "foreground", weight: "bold" })} h-12`}> 
            Our Mission 
          </h2>
          <p className="text-gray-400 pb-12 max-w-lg mx-auto">
            {aboutUsData.OurMission}
          </p>
          <h2 className={`${title({ size: "sm", color: "foreground", weight: "bold" })} h-12`}>
            Our Vision 
          </h2>
          <p className="text-gray-400 pb-8 max-w-lg mx-auto">
            {aboutUsData.OurVision}
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
