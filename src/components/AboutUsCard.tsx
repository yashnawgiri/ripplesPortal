import aboutUsData from "@/data/about.json";
import { imageUrls } from "@/utils/imageUrl";

interface AboutUsProps {
  id: number;
}

const AboutUsCard: React.FC<AboutUsProps> = ({ id }) => {
  const AboutUsImage = [imageUrls.founders.pranav, imageUrls.founders.tazril];

  return (
    <div className="max-w-sm space-y-2 mx-auto">
      <img
        alt={aboutUsData.RipplesTeam[id].title}
        className="rounded-full w-72 mx-auto"
        src={AboutUsImage[id]}
      />
      <h3 className="heading-color text-lg font-bold">
        {aboutUsData.RipplesTeam[id].title}
      </h3>
      <h4 className="heading-color text-base font-semibold">
        {aboutUsData.RipplesTeam[id].subTitle}
      </h4>
      <div>
        <p className="text-color text-sm">
          {aboutUsData.RipplesTeam[id].description1}
        </p>
        <p className="text-color text-sm">
          {aboutUsData.RipplesTeam[id].description2}
        </p>
      </div>
    </div>
  );
};

export default AboutUsCard;
