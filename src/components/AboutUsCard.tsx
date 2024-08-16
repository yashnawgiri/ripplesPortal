import pravan from "@/assets/images/aboutUs/photo0.png";
import tazril from "@/assets/images/aboutUs/photo1.jpeg";
import aboutUsData from "@/data/about.json";

interface AboutUsProps {
    id: number
}

const AboutUsCard: React.FC<AboutUsProps> = ({id}) => {
    const AboutUsImage = [pravan, tazril];
    return (
        <div className="max-w-sm space-y-2 mx-auto">
            <img
                src={AboutUsImage[id]}
                className="rounded-full w-72 mx-auto"
            />
            <h3 className="text-gray-300 text-lg font-bold">
                {aboutUsData.RipplesTeam[id].title}
            </h3>
            <h4 className="text-gray-300 text-base font-semibold">
                {aboutUsData.RipplesTeam[id].subTitle}
            </h4>
            <p className="text-gray-400 text-sm">
                {aboutUsData.RipplesTeam[id].description}
            </p>
        </div>
    );
}

export default AboutUsCard;