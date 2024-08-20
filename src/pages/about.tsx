import AboutUsCard from "@/components/AboutUsCard";
import DefaultLayout from "@/layouts/default";
import aboutUsData from "@/data/about.json";
import { title } from "@/components/primitives";
import "@/styles/about/aboutUs.css";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="main-section">
        <div className="about-div">
          <h1 className="about-h1">
            {aboutUsData.title}
          </h1>
          <p className="about-p py-8">
            {aboutUsData.description1}
          </p>
          <div className="about-div2">
            <AboutUsCard key={0} id={0}/>
            <AboutUsCard key={1} id={1}/>
          </div>
          <p className="about-p py-8">
            {aboutUsData.description2}
          </p>
          <h2 className={`${title({ size: "sm", color: "foreground", weight: "bold" })} h-12`}> 
            {aboutUsData.subHeading1.title}
          </h2>
          <p className="about-p pb-12">
            {aboutUsData.subHeading1.description}
          </p>
          <h2 className={`${title({ size: "sm", color: "foreground", weight: "bold" })} h-12`}>
            {aboutUsData.subHeading2.title}
          </h2>
          <p className="about-p pb-8">
            {aboutUsData.subHeading2.description}
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
