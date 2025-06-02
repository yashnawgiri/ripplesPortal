import { Link } from "react-router-dom";

import { ToolCard } from "@/components/freeTools/ToolCard";
import {
  HomePageStructuredData,
  OrganizationStructuredData,
} from "@/components/freeTools/StructuredData";
import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";

const tools = [
  {
    title: "Instagram Engagement Calculator",
    description:
      "Calculate the engagement rate of any Instagram profile to benchmark performance",
    image:
      "https://ripples1static.blob.core.windows.net/images/instagramEngagementTool.webp",
    href: siteConfig.path.instagramCalculator,
    featured: true,
  },
  {
    title: "CRO Checklist & Funnel Audit",
    description:
      "Get a comprehensive 300-point conversion rate optimization checklist plus a free 1-on-1 funnel audit to identify and fix revenue leaks in your marketing funnel.",
    image:
      "https://ripples1static.blob.core.windows.net/images/CRO Checklist & Funnel Audit Tools.webp",
    href: siteConfig.path.leadMagnet,
    featured: true,
  },
  {
    title: "Referral Calculator",
    description:
      "Calculate the optimal referral reward rate for your referral program based on your business metrics and referral reward offerings.",
    image:
      "https://ripples1static.blob.core.windows.net/images/Referral Calculator Tool.webp",
    href: siteConfig.path.referralCalculator,
    featured: true,
  },
  {
    title: "Hashtag Analyzer",
    description:
      "Find the best hashtags for your content to maximize reach and engagement",
    image:
      "https://ripples1static.blob.core.windows.net/images/HashtagAnalyzerTool.jpg",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Influencer Discovery",
    description:
      "Find the perfect influencers for your brand campaigns and partnerships",
    image:
      "https://ripples1static.blob.core.windows.net/images/InfluencerDiscoveryTool.png",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Shopify Store Analyser",
    description:
      "Analyze and optimize your Shopify store performance for better conversions",
    image:
      "https://ripples1static.blob.core.windows.net/images/ShopifyStoreAnalyserTool.webp",
    href: "#",
    comingSoon: true,
  },
];

export default function FreeTools() {
  return (
    <DefaultLayout>
      <HomePageStructuredData />
      <OrganizationStructuredData />

      {/* Tools Section */}
      <div className="container mx-auto py-16 px-4 text-white" id="tools">
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-secondary to-secondary-dark" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 relative bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">
            Our Free Marketing Tools
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto mb-8" />
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Powerful tools to analyze, optimize, and grow your online presence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              comingSoon={tool.comingSoon}
              description={tool.description}
              featured={tool.featured}
              href={tool.href}
              image={tool.image}
              title={tool.title}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="bg-gradient-to-br from-primary/95 to-primary/90 rounded-2xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">
              Ready to boost your social media presence?
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Try our Instagram Engagement Calculator today and see the
              difference
            </p>
            <Link
              className="inline-block px-10 py-5 bg-secondary rounded-lg hover:scale-105 transition-all duration-300"
              to={siteConfig.path.instagramCalculator}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
