import {
  BarChart2,
  Search,
  ShoppingBag,
  NotebookPen,
  MagnetIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ToolCard } from "@/components/freeTools/ToolCard";
import {
  HomePageStructuredData,
  OrganizationStructuredData,
} from "@/components/freeTools/StructuredData";
import DefaultLayout from "@/layouts/default";
import { InstagramIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

const tools = [
  {
    title: "Instagram Engagement Calculator",
    description:
      "Calculate the engagement rate of any Instagram profile to benchmark performance",
    icon: <InstagramIcon />,
    href: siteConfig.path.instagramCalculator,
    featured: true,
  },
  {
    title: "CRO Checklist & Funnel Audit",
    description:
      "Get a comprehensive 300-point conversion rate optimization checklist plus a free 1-on-1 funnel audit to identify and fix revenue leaks in your marketing funnel.",
    icon: <MagnetIcon />,
    href: siteConfig.path.leadMagnet,
    featured: true,
  },
  {
    title: "Referral Calculator",
    description:
      "Calculate the optimal referral reward rate for your referral program based on your business metrics and referral reward offerings.",
    icon: <NotebookPen />,
    href: siteConfig.path.referralCalculator,
    featured: true,
  },
  {
    title: "Hashtag Analyzer",
    description:
      "Find the best hashtags for your content to maximize reach and engagement",
    icon: <BarChart2 className="h-6 w-6 text-secondary-dark" />,
    href: "#",
    comingSoon: true,
  },
  {
    title: "Influencer Discovery",
    description:
      "Find the perfect influencers for your brand campaigns and partnerships",
    icon: <Search className="h-6 w-6 text-success" />,
    href: "#",
    comingSoon: true,
  },
  {
    title: "Shopify Store Analyser",
    description:
      "Analyze and optimize your Shopify store performance for better conversions",
    icon: <ShoppingBag className="h-6 w-6 text-info" />,
    href: "#",
    comingSoon: true,
  },
];

export default function FreeTools() {
  return (
    <DefaultLayout>
      <HomePageStructuredData />
      <OrganizationStructuredData />

      {/* Rest of the component remains the same */}
      {/* Hero Section with Ripples Branding */}
      <div className="bg-ripples-dark text-white pt-10 pb-20 relative z-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">
                Free Marketing &nbsp;
                <span className="text-secondary font-extrabold">Tools</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-lg text-center md:text-left">
                Boost your social media presence with our collection of
                powerful, easy-to-use marketing tools
              </p>
              <div className="flex flex-col md:flex-row justify-center md:justify-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-4">
                <a
                  className="px-6 py-3 bg-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  href="#tools"
                >
                  Explore Tools
                </a>
                <Link
                  className="px-6 py-3 bg-primary border-1 border-gray-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  to={siteConfig.path.instagramCalculator}
                >
                  Try Instagram Tool
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    alt="Marketing Tools Illustration"
                    className="w-10/12 md:w-[100rem] h-auto rounded-lg"
                    src="https://ripples1static.blob.core.windows.net/images/Free Marketing Image.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ripples Advertisement */}
      <div className="bg-primary py-16 relative z-0">
        <div className="container mx-auto px-4">
          <div className="bg-ripples-dark rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="flex flex-col-reverse md:flex-row items-center justify-center">
              <div className="md:w-2/3 mb-8 md:mb-0 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
                  Turn customers into Advocates
                </h2>
                <p className="text-lg opacity-90 mb-6 max-w-xl text-center md:text-left">
                  Ripples is an OS that helps you automate and scale
                  influencer-style rewards for your customers, unlocking
                  virality.
                </p>
                <div className="flex flex-wrap gap-8 mb-6 justify-center md:justify-start">
                  <div>
                    <div className="text-4xl font-bold">10%</div>
                    <div className="text-sm opacity-80">Increase in Sales</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">5X</div>
                    <div className="text-sm opacity-80">Your Referrals</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">65%</div>
                    <div className="text-sm opacity-80">Reduction in CAC</div>
                  </div>
                </div>
                <Link
                  className="inline-block w-full md:w-10/12 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-lg transition-all duration-300  justify-center items-center md:justify-start text-center"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  target="_blank"
                  to={siteConfig.path.getDemo}
                >
                  Start 14 Days free trial
                </Link>
              </div>
              <div className="md:w-1/3 relative z-10">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center">
                    <svg
                      className="text-white"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img
                      alt="Ripples App Screenshot"
                      className="w-full h-auto rounded"
                      src="https://ripples1static.blob.core.windows.net/images/customers into advocates.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mb-20 z-0" />
            <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/10 rounded-full -ml-20 -mt-20 z-0" />
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="container mx-auto py-20 px-4 text-white" id="tools">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-40 h-40 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            Our Free Marketing Tools
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
              icon={tool.icon}
              title={tool.title}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="bg-ripples-dark rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to boost your social media presence?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Try our Instagram Engagement Calculator today and see the difference
          </p>
          <Link
            className="inline-block px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            to={siteConfig.path.instagramCalculator}
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}
