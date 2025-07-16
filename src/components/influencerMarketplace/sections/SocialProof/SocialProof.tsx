import StatCard from "@/components/influencerMarketplace/ui/StatCard";
// import TestimonialCard from "@/components/influencerMarketplace/ui/TestimonialCard";
import {
  SOCIAL_PROOF_STATS,
  // TESTIMONIALS,
} from "@/lib/influencerMarketplace/constants";

export default function SocialProof() {
  return (
    <section className="py-8 lg:py-24 bg-custom-radial">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="mb-8 lg:mb-16">
          <div className="text-center mb-8 lg:mb-12 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
              Trusted by Growing Brands
            </h2>
            <p className="text-lg text-[#CFCFCF] max-w-2xl mx-auto">
              Join thousands of D2C brands already scaling their UGC campaigns
              with Ripples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 text-white">
            {SOCIAL_PROOF_STATS.map((stat, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <StatCard
                  number={stat.number}
                  label={stat.label}
                  description={stat.description}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        {/* <div>
          <div className="text-center mb-12 animate-fadeIn">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
              What Our Customers Say
            </h3>
            <p className="text-lg text-[#CFCFCF]">
              Real results from real brands
            </p>
          </div> */}

          {/* Responsive Grid Layout */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <TestimonialCard
                  quote={testimonial.quote}
                  name={testimonial.name}
                  role={testimonial.role}
                  avatar={testimonial.avatar}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div> */}
        </div>
       
    </section>
  );
}
