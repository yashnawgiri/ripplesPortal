import { useNavigate } from "react-router-dom";

import HeroSection from "@/components/caseStudy/HeroSection";
import CaseStudyCard from "@/components/caseStudy/CaseStudyCard";
import CTASection from "@/components/caseStudy/CTASection";
import caseStudiesData from "@/data/caseStudy.json";
import DefaultLayout from "@/layouts/default";

interface CaseStudy {
  id: string;
  name: string;
  industry: string;
  logo: string;
  image: string;
  website: string;
  region: string;
  description: string;
  challenge: string[];
  solution: string[];
  results: {
    roi: string;
    sales: string;
    referrals: string;
    timeline: string;
  };
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  keyTakeaways: string[];
}

export default function CaseStudiesPage() {
  const navigate = useNavigate();

  const openCaseStudy = (caseStudy: CaseStudy) => {
    navigate(`/case-study/${caseStudy.id}`);
  };

  // Extract the caseStudies array from the imported data
  const caseStudies = caseStudiesData.caseStudies.map((study: any) => ({
    ...study,
    results: {
      ...study.results,
      roi: study.results.roi.value,
      sales: study.results.sales.value,
      referrals: study.results.referrals.value,
      timeline: study.results.timeline,
    },
  })) as CaseStudy[];

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Case Studies */}
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mb-8 sm:mb-12 md:mb-16 lg:mb-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <CaseStudyCard
            badge="👚 Fashion & Apparel"
            colorScheme="purple"
            id={caseStudies[0].id}
            imageSrc={caseStudies[0].image}
            industry={caseStudies[0].industry}
            logo={caseStudies[0].logo}
            name={caseStudies[0].name}
            results={caseStudies[0].results}
            website={caseStudies[0].website}
            onReadMore={() => openCaseStudy(caseStudies[0])}
          />
          <CaseStudyCard
            badge="🌿 Health & Wellness"
            colorScheme="green"
            id={caseStudies[1].id}
            imageSrc={caseStudies[1].image}
            industry={caseStudies[1].industry}
            logo={caseStudies[1].logo}
            name={caseStudies[1].name}
            results={caseStudies[1].results}
            website={caseStudies[1].website}
            onReadMore={() => openCaseStudy(caseStudies[1])}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-3 sm:px-4 md:px-6 pb-8 sm:pb-12 md:pb-16 lg:pb-24">
        <CTASection />
      </section>
    </DefaultLayout>
  );
}
