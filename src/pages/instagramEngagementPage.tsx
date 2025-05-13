import { Accordion, AccordionItem } from "@nextui-org/react";
import { CheckCircle, TrendingUp, BarChart2, Users } from "lucide-react";

import { InstagramEngagementCalculator } from "@/components/freeTools/InstagramEngagementCalculator";
import {
  InstagramCalculatorStructuredData,
  OrganizationStructuredData,
} from "@/components/freeTools/StructuredData";
import DefaultLayout from "@/layouts/default";

export const metadata = {
  title: "Instagram Engagement Rate Calculator | Ripples Free Tools",
  description:
    "Calculate the engagement rate of any Instagram profile for free. Analyze likes, comments, and followers to benchmark performance and improve your strategy.",
  keywords:
    "instagram engagement calculator, engagement rate, instagram analytics, social media metrics, instagram performance, free instagram tools",
  alternates: {
    canonical: "/tools/instagram-engagement",
  },
  openGraph: {
    title: "Instagram Engagement Rate Calculator | Ripples Free Tools",
    description:
      "Calculate the engagement rate of any Instagram profile for free. Analyze likes, comments, and followers to benchmark performance.",
    url: "https://free-tools.goripples.com/tools/instagram-engagement",
    type: "website",
    images: [
      {
        url: "/instagram-calculator-og.png", // This would be your actual OG image
        width: 1200,
        height: 630,
        alt: "Instagram Engagement Rate Calculator",
      },
    ],
  },
};

export default function InstagramEngagementPage() {
  return (
    <DefaultLayout>
      <InstagramCalculatorStructuredData />
      <OrganizationStructuredData />

      {/* Header Section */}
      <div className="text-center mt-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block text-white">
          <span className=" text-white ">
            Free Instagram Engagement
            <br />
            Rate Calculator
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-8">
          Try our free Engagement Rate Calculator to find out the engagement of
          any Instagram account
        </p>
      </div>

      {/* Main content */}
      <div className="container mx-auto">
        <InstagramEngagementCalculator />

        {/* Features section */}
        <div className="mt-20 mb-16 text-white">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            Why Use Our Engagement Calculator?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free & Easy</h3>
              <p className="text-gray-200">
                No sign-up required. Just enter a username and get instant
                results.
              </p>
            </div>

            <div className="bg-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Metrics</h3>
              <p className="text-gray-200">
                Get precise engagement rates based on likes, comments, and
                followers.
              </p>
            </div>

            <div className="bg-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-200">
                Request comprehensive reports with actionable insights.
              </p>
            </div>

            <div className="bg-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare Profiles</h3>
              <p className="text-gray-200">
                Analyze multiple accounts to benchmark performance.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="max-w-3xl mx-auto my-20">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-8 text-white">
            Frequently Asked Questions
          </h2>

          <Accordion className="space-y-6 text-white">
            <AccordionItem
              className="text-gray-200"
              classNames={{
                title: "text-white text-2xl",
                content: "text-gray-200",
              }}
              title="What is engagement rate?"
            >
              Engagement rate measures how actively involved your audience is
              with your content. It's calculated by dividing the average number
              of interactions (likes and comments) by your total followers, then
              multiplying by 100 to get a percentage.
            </AccordionItem>
            <AccordionItem
              className="text-gray-200"
              classNames={{
                title: "text-white text-2xl",
                content: "text-gray-200",
              }}
              title="What's a good engagement rate?"
            >
              For Instagram, an engagement rate between 1-3% is considered
              average, 3-5% is good, and above 5% is excellent. However, rates
              can vary by industry, account size, and content type.
            </AccordionItem>

            <AccordionItem
              className="text-gray-200"
              classNames={{
                title: "text-white text-2xl",
                content: "text-gray-200",
              }}
              title="How can I improve my engagement rate?"
            >
              Improve your engagement rate by posting high-quality content
              consistently, using relevant hashtags, engaging with your audience
              through comments and stories, posting at optimal times, and
              creating content that encourages interaction.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </DefaultLayout>
  );
}
