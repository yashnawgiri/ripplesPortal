import { Accordion, AccordionItem } from "@nextui-org/react";
import { CheckCircle, TrendingUp, BarChart2, Users } from "lucide-react";
import { motion } from "framer-motion";

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

      {/* Enhanced Header Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-10 relative"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Free Instagram Engagement
            <br />
            Rate Calculator
          </span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mt-8">
          Try our free Engagement Rate Calculator to find out the engagement of
          any Instagram account
        </p>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto">
        <InstagramEngagementCalculator />

        {/* Enhanced Features section */}
        <div className="mt-20 mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Why Use Our Engagement Calculator?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Free & Easy",
                description: "No sign-up required. Just enter a username and get instant results.",
                gradient: "from-green-500/20 to-emerald-500/20"
              },
              {
                icon: TrendingUp,
                title: "Accurate Metrics",
                description: "Get precise engagement rates based on likes, comments, and followers.",
                gradient: "from-blue-500/20 to-indigo-500/20"
              },
              {
                icon: BarChart2,
                title: "Detailed Reports",
                description: "Request comprehensive reports with actionable insights.",
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: Users,
                title: "Compare Profiles",
                description: "Analyze multiple accounts to benchmark performance.",
                gradient: "from-orange-500/20 to-red-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${feature.gradient} p-6 rounded-xl backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-200">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced FAQ section */}
        <div className="max-w-3xl mx-auto my-20">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Frequently Asked Questions
          </h2>

          <Accordion className="space-y-6">
            <AccordionItem
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden px-8"
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden px-8"
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden px-8"
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
