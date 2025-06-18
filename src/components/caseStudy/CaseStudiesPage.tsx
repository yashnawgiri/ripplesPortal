import { useState } from "react";
import HeroSection from "@/components/caseStudy/HeroSection";
import CaseStudyCard from "@/components/caseStudy/CaseStudyCard";
import TestimonialsCarousel from "@/components/caseStudy/TestimonialsCarousel";
import BrandLogos from "@/components/caseStudy/BrandLogos";
import CTASection from "@/components/caseStudy/CTASection";
import CaseStudyModal from "@/components/caseStudy/CaseStudyModal";
import caseStudiesData from "@/data/caseStudy.json";
import testimonialsData from "@/data/testimonials.json";

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

interface Testimonial {
  id: number;
  company: string;
  quote: string;
  description: string;
  conclusion: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
}

export default function CaseStudiesPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null
  );

  const openCaseStudy = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };

  const closeCaseStudy = () => {
    setSelectedCaseStudy(null);
  };

  // Extract the caseStudies array from the imported data
  const caseStudies = caseStudiesData.caseStudies as CaseStudy[];
  const testimonials = testimonialsData.testimonials as Testimonial[];

  return (
    <div className="">

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Case Studies */}
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mb-8 sm:mb-12 md:mb-16 lg:mb-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <CaseStudyCard
            id={caseStudies[0].id}
            website={caseStudies[0].website}
            name={caseStudies[0].name}
            industry={caseStudies[0].industry}
            badge="👚 Fashion & Apparel"
            logo={caseStudies[0].logo}
            imageSrc={caseStudies[0].image}
            results={caseStudies[0].results}
            onReadMore={() => openCaseStudy(caseStudies[0])}
            colorScheme="purple"
          />
          <CaseStudyCard
            id={caseStudies[1].id}
            name={caseStudies[1].name}
            website={caseStudies[1].website}
            industry={caseStudies[1].industry}
            badge="🌿 Health & Wellness"
            logo={caseStudies[1].logo}
            imageSrc={caseStudies[1].image}
            results={caseStudies[1].results}
            onReadMore={() => openCaseStudy(caseStudies[1])}
            colorScheme="green"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 mb-8 sm:mb-12 md:mb-16 lg:mb-24">
        <TestimonialsCarousel testimonials={testimonials} />
      </section>

      {/* Brand Logos Section */}
      <section className="relative z-10 w-full mb-8 sm:mb-12 md:mb-16 lg:mb-24">
        <BrandLogos />
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-3 sm:px-4 md:px-6 pb-8 sm:pb-12 md:pb-16 lg:pb-24">
        <CTASection />
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal caseStudy={selectedCaseStudy} onClose={closeCaseStudy} />
    </div>
  );
}
