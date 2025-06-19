/* eslint-disable max-len */
import {
  ArrowRight,
  Gift,
  Sparkles,
  Puzzle,
  LayoutDashboard,
  Trophy,
  LineChart,
  ShoppingBag,
  Video,
  ShieldCheck,
  Wallet,
  Percent,
  CreditCard,
} from "lucide-react";
import { Suspense } from "react";

import { Card, CardContent } from "@/components/ui/Card";
import { HolographicGradient } from "@/components/ugc-landing/holographic-gradient";
import { ROICalculator } from "@/components/ugc-landing/roi-calculator";
import { ParticleBackground } from "@/components/ugc-landing/particle-background";
import { Typewriter } from "@/components/ugc-landing/typewriter";
import { ScrollProgress } from "@/components/ugc-landing/scroll-progress";
import EnhancedButton from "@/components/ugc-landing/enhanced-button";
import { RewardsSimulator } from "@/components/ugc-landing/rewards-simulator"; // Import the RewardsSimulator component
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { MobileCTA } from "@/components/ugc-landing/mobile-cta";
import { Spinner } from "@/components/ui/Spinner";
import { ScrollReveal } from "@/components/ugc-landing/scroll-reveal";
import { StaggerReveal } from "@/components/ugc-landing/stagger-reveal";
// import flyer from "@/assets/images/flayer2.png";
// import promoImg from "@/assets/images/promoImg.png";
// import rupeeImg from "@/assets/images/rupees.webp";
// import goldCoinImg from "@/assets/images/benefitsSectionImage.png";
// import coinImg from "@/assets/images/coins.webp";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/navbar";
import { imageUrls } from "@/utils/imageUrl";

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "High":
      return "bg-green-500 text-white";
    case "Medium":
      return "bg-yellow-500 text-white";
    case "Low":
      return "bg-red-500 text-white";
    case "V. High":
      return "bg-blue-500 text-white";
    default:
      return "";
  }
};

// Add this loading component
function LoadingSection({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-12 ${className}`}>
      <Spinner className="h-8 w-8" />
    </div>
  );
}

export default function UGCLanding() {
  const openCalendly = () => {
    window.location.href = siteConfig.links.calendly;
  };

  return (
    <div className="min-h-screen mt-5 bg-black text-white">
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <MobileCTA />
      <Suspense fallback={<LoadingSection className="min-h-screen" />}>
        {/* Hero Section */}
        <ScrollReveal>
          <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <HolographicGradient className="w-full h-full transform -skew-y-6" />
            </div>
            <div className="container px-4 md:px-6 relative z-10">
              <div className="grid gap-4 lg:grid-cols-2 lg:gap-16 items-center justify-center">
                <div className="flex flex-col justify-start space-y-4 items-start">
                  <div className="space-y-2 pt-24">
                    <h1 className="text-4xl font-bold sm:text-6xl xl:text-7xl/none">
                      <Typewriter
                        className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 min-h-[100px]"
                        words={[
                          "The New Marketing & Sales Channel for Ambitious Brands",
                          "Give Cash in Bank to Shoppers for UGC",
                          "Give Cashback to Shoppers for UGC",
                          "Give Credit in Your E-commerce Store for UGC",
                        ]}
                      />
                    </h1>
                    <p className="max-w-[600px] text-white/90 md:text-xl leading-relaxed drop-shadow-sm">
                      Give{" "}
                      <span className="font-semibold">
                        Cashback in Store Wallet
                      </span>{" "}
                      or <span className="font-semibold">Cash in Bank</span> to
                      Your Shoppers for Creating{" "}
                      <span className="font-semibold">Authentic Content</span>{" "}
                      on Social Media
                    </p>
                  </div>
                  <EnhancedButton
                    className="w-fit bg-white text-black"
                    glowColor="rgba(255, 255, 255, 0.3)"
                    size="lg"
                    onClick={openCalendly}
                  >
                    Book Demo Today
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </EnhancedButton>
                  <p className="text-white/80 text-lg mt-4 max-w-[600px] self-start">
                    The Ripples Tech Stack & Influencer Network expands your
                    customer base and drives attributable sales.
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-square flex justify-center">
                    <img
                      alt="GoRipples dashboard interface showcasing analytics and features - mobile view"
                      className="transition-transform duration-300 ease-in-out transform rounded-2xl scale-110 object-contain"
                      loading="eager"
                      src={imageUrls.flayer2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        {/* How It Works Section */}
        <section
          className="py-24 md:py-32 relative overflow-hidden flex justify-center"
          id="how-it-works"
        >
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <span className="px-3 py-1 text-sm font-medium text-white/60 border border-white/10 rounded-full">
                  Simple Process
                </span>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  How It Works
                </h2>
                <p className="max-w-[600px] text-white/60 text-lg">
                  Get started with Ripples in minutes and transform your UGC
                  strategy
                </p>
              </div>
            </ScrollReveal>
            <StaggerReveal
              className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-5 justify-center"
              stagger={100}
            >
              {[
                {
                  title: "Shopper Purchases",
                  description: "Customers shop your brand, online or offline.",
                  icon: ShoppingBag,
                  gradient: "from-pink-400 to-rose-500",
                },
                {
                  title: "Activation Prompts",
                  description:
                    "Shoppers are encouraged to create content during and after purchase.",
                  icon: Sparkles,
                  gradient: "from-purple-400 to-indigo-500",
                },
                {
                  title: "Content Creation",
                  description:
                    "Customers make reels, tag your brand, and share on social media.",
                  icon: Video,
                  gradient: "from-blue-400 to-cyan-500",
                },
                {
                  title: "Seamless Verification",
                  description:
                    "Reels are automatically pulled into the admin portal for AI or manual review.",
                  icon: ShieldCheck,
                  gradient: "from-green-400 to-emerald-500",
                },
                {
                  title: "Rewards Credited",
                  description:
                    "Based on custom metrics, rewards like cashback, store credit, or free products are issued.",
                  icon: Wallet,
                  gradient: "from-amber-400 to-orange-500",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="relative overflow-hidden bg-black/50 border-white/10 backdrop-blur-sm group hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white/70">
                    {i + 1}
                  </div>
                  <HolographicGradient className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" />
                  <CardContent className="p-8 relative text-center">
                    <div
                      className={`
                inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient}
                shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300
              `}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/60 group-hover:text-white/70 transition-colors duration-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        {/* ROI Calculator Section */}
        <ScrollReveal>
          <section
            className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center min-h-screen"
            id="calculator"
          >
            <HolographicGradient className="absolute inset-0 opacity-20" />

            {/* Fixed Image */}
            <img
              alt="Icon"
              className="w-24 h-24 md:w-40 md:h-40 fixed left-10 top- -translate-y-1/2"
              src={imageUrls.rupees}
            />
            {/* Fixed Image (Bottom Right) */}
            <img
              alt="ROI Growth"
              className="w-24 h-24 md:w-40 md:h-40 absolute bottom-10 right-10 hidden md:block"
              src={imageUrls.coins}
            />
            <div className="container px-4 md:px-6 relative flex flex-col items-center text-center">
              {/* Title & Subtitle */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Calculate Your ROI
                </h2>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  See how Ripples can transform your UGC strategy and boost your
                  sales
                </p>
              </div>

              <ROICalculator />
            </div>
          </section>
        </ScrollReveal>
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        {/* Rewards Simulator Section */}
        <ScrollReveal>
          <section
            className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center min-h-screen"
            id="reward-strategy"
          >
            <HolographicGradient className="absolute inset-0 opacity-20" />

            <div className="px-0 md:px-6 relative flex items-center justify-center w-full max-w-7xl">
              {/* Left Side - Text and Simulator */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-4xl bg-black/50 p-6 rounded-lg backdrop-blur-lg">
                <h2 className="text-3xl p-2 font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Simulate Your Rewards Strategy
                </h2>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Find the ideal reward mix tailored to your UGC campaign goals
                </p>
                <ol className="text-white/80 md:text-xl list-decimal list-inside text-start text-[12px] md:text-[16px] mt-4">
                  <li>
                    Use this interactive calculator to plan your reward
                    strategy.
                  </li>
                  <li>
                    Start by selecting the type of creators you want to engage.
                  </li>
                  <li>
                    Click on the “Rewards Strategy” button to see your
                    recommended payout mix based on content quality and follower
                    count.
                  </li>
                </ol>
                <div className="mt-6 w-full">
                  <RewardsSimulator />
                </div>
              </div>

              {/* Fixed Image (Right Side, Hidden on Mobile) */}
              <div className="absolute right-[-150px] top-1/2 transform -translate-y-1/2 hidden md:block">
                <img
                  alt="Rewards Simulation"
                  className="w-[600px] h-auto object-cover"
                  src={imageUrls.benefitsSectionImage}
                />
              </div>
            </div>
          </section>
        </ScrollReveal>
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        {/* Features Section */}
        <section className="py-24 md:py-32 relative" id="features">
          <div className="container relative max-w-7xl mx-auto px-4 md:px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl" />
            <div className="relative">
              <ScrollReveal>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                  <span className="px-3 py-1 text-sm font-medium text-white/60 border border-white/10 rounded-full">
                    Platform Features
                  </span>
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Convert customers into high performing UGC creators
                  </h2>
                  <p className="max-w-[600px] text-white/60 text-lg">
                    Designed in a way to get you real, authentic, ad-worthy
                    content.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <StaggerReveal
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              stagger={100}
            >
              {[
                {
                  title: "Flexible Rewards System",
                  description:
                    "Designed in a way to get you real, authentic, ad-worthy content. Set and forget.",
                  icon: Gift,
                  gradient: "from-green-400 to-emerald-500",
                },
                {
                  title: "AI-Powered Verification",
                  description:
                    "Automate or manually review UGC for quality and authenticity.",
                  icon: Sparkles,
                  gradient: "from-blue-400 to-indigo-500",
                },
                {
                  title: "Seamless Integration",
                  description:
                    "All your influencer content is in one place – ready for reporting and repurposing.",
                  icon: Puzzle,
                  gradient: "from-purple-400 to-pink-500",
                },
                {
                  title: "Customizable Dashboard",
                  description:
                    "Gain actionable insights and tailor solutions to your brand's unique needs.",
                  icon: LayoutDashboard,
                  gradient: "from-orange-400 to-red-500",
                },
                {
                  title: "Gamified Experience",
                  description:
                    "Make post-purchase journeys engaging and rewarding with free products, milestone rewards & store credit.",
                  icon: Trophy,
                  gradient: "from-yellow-400 to-orange-500",
                },
                {
                  title: "Analytics & Reporting",
                  description:
                    "Track performance metrics and ROI with detailed analytics and custom reports.",
                  icon: LineChart,
                  gradient: "from-cyan-400 to-blue-500",
                },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="relative overflow-hidden bg-black/50 border-white/10 backdrop-blur-sm group hover:border-white/20 transition-all duration-300"
                >
                  <HolographicGradient className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <CardContent className="p-8 relative flex flex-col items-center">
                    <div
                      className={`
              inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient}
              shadow-lg mb-6
            `}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 group-hover:text-white/70 transition-colors duration-300 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        {/* Rewards Strategy Comparison Section */}
        <ScrollReveal>
          <section className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center min-h-screen">
            <HolographicGradient className="absolute inset-0 opacity-20" />
            <div className="container px-4 md:px-6 relative flex flex-col items-center text-center">
              <div className="flex flex-col items-center justify-center space-y-4 mb-12">
                <span className="px-3 py-1 text-sm font-medium text-white/60 border border-white/10 rounded-full">
                  Reward Types
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Compare Reward Options
                </h2>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Choose the perfect mix of rewards to maximize engagement and
                  ROI
                </p>
              </div>
              <Card className="bg-black/50 border-white/10 backdrop-blur-sm w-full max-w-6xl">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-white">Features</TableHead>
                          <TableHead className="text-white text-center">
                            Cashback
                          </TableHead>
                          <TableHead className="text-white text-center">
                            Cash Rewards
                          </TableHead>
                          <TableHead className="text-white text-center">
                            Store Credit
                          </TableHead>
                          <TableHead className="text-white text-center">
                            Product Rewards
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            feature: "Instant Gratification",
                            cashback: "High",
                            cash: "High",
                            credit: "Medium",
                            product: "Low",
                          },
                          {
                            feature: "Customer Retention",
                            cashback: "Medium",
                            cash: "Low",
                            credit: "High",
                            product: "High",
                          },
                          {
                            feature: "Brand Advocacy",
                            cashback: "Medium",
                            cash: "Low",
                            credit: "High",
                            product: "V. High",
                          },
                          {
                            feature: "Cost Effectiveness",
                            cashback: "High",
                            cash: "Medium",
                            credit: "High",
                            product: "Medium",
                          },
                          {
                            feature: "Content Quality Impact",
                            cashback: "Medium",
                            cash: "Medium",
                            credit: "High",
                            product: "V. High",
                          },
                          {
                            feature: "Repeat Purchase Rate",
                            cashback: "High",
                            cash: "Low",
                            credit: "V. High",
                            product: "High",
                          },
                        ].map((row, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium text-white">
                              {row.feature}
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getImpactColor(row.cashback)}`}
                              >
                                {row.cashback}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getImpactColor(row.cash)}`}
                              >
                                {row.cash}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getImpactColor(row.credit)}`}
                              >
                                {row.credit}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getImpactColor(row.product)}`}
                              >
                                {row.product}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-4">
                    {[
                      {
                        title: "Cashback",
                        description:
                          "Percentage-based rewards that scale with purchase value",
                        icon: Percent,
                        gradient: "from-green-400 to-emerald-500",
                      },
                      {
                        title: "Cash Rewards",
                        description:
                          "Direct monetary compensation for content creation",
                        icon: Wallet,
                        gradient: "from-blue-400 to-indigo-500",
                      },
                      {
                        title: "Store Credit",
                        description:
                          "Higher value rewards that drive repeat purchases",
                        icon: CreditCard,
                        gradient: "from-purple-400 to-pink-500",
                      },
                      {
                        title: "Product Rewards",
                        description:
                          "Physical products that create authentic brand advocates",
                        icon: Gift,
                        gradient: "from-orange-400 to-red-500",
                      },
                    ].map((item, i) => (
                      <Card
                        key={i}
                        className="bg-white/5 border-white/10 transition-colors hover:bg-white/10"
                      >
                        <CardContent className="p-6">
                          <div
                            className={`
                                    inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient}
                                    shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300
                                `}
                          >
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-white/60">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </ScrollReveal>
      </Suspense>

      <section className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center text-center">
        <HolographicGradient className="absolute inset-0 opacity-20" />

        <div className="container px-4 md:px-6 relative flex items-center justify-between w-full max-w-7xl">
          {/* Centered Content */}
          <div className="flex flex-col items-center gap-4 justify-center text-center max-w-lg">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Revolutionize Your UGC Strategy Today!
            </h2>
            <p className="max-w-[600px] text-white/80 md:text-xl">
              Book a Demo Now and discover how Ripples transforms your UGC &
              social media marketing efforts into a seamless, authentic growth
              engine.
            </p>
            <EnhancedButton
              className="mt-8 bg-white text-black hover:bg-white/90"
              glowColor="rgba(255, 255, 255, 0.3)"
              size="lg"
              onClick={openCalendly}
            >
              Book Demo Now
            </EnhancedButton>
          </div>

          {/* Right Image - Hidden on Mobile */}
          <img
            alt="Promotional illustration showcasing UGC strategy benefits"
            className="hidden lg:block max-w-xl object-contain"
            src={imageUrls.promoImg}
          />
        </div>
      </section>
    </div>
  );
}
