import {
  ArrowRight,
  Check,
  Clock,
  FileCheck,
  Mail,
  Star,
  Rocket,
  Target,
  BarChart3,
  Zap,
  Sparkles,
  Gift,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Card, CardContent } from "../ugc-landing/ui/card";

import LeadForm from "./LeadForm";
import Testimonial from "./Testimonial";

import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function CROChecklistPage() {
  return (
    <DefaultLayout>
      <section className="py-16 md:py-24 lg:py-32 text-white bg-transparent">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            animate="animate"
            className="flex flex-col lg:flex-row gap-8 items-center"
            initial="initial"
            variants={fadeIn}
          >
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  <Rocket className="h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 text-secondary mr-3 inline" />
                  Fix Your Funnel. Unlock More Revenue.
                </h1>
                <p className="max-w-[700px] mx-auto lg:mx-0 text-white text-xl md:text-2xl font-medium">
                  <strong className="text-white">
                    Download our 300-point CRO checklist
                  </strong>
                  <span className="mx-2 text-white">+</span>
                  <strong className="text-white">
                    Get a 1-on-1 funnel audit
                  </strong>{" "}
                  — absolutely free.
                </p>
                <p className="max-w-[700px] mx-auto lg:mx-0 text-white text-lg md:text-xl">
                  Plus: Get 30 days of Ripples free — the platform that
                  supercharges your customer acquisition & UGC content.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  className="bg-secondary text-white text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  to={siteConfig.links.calendly}
                >
                  Get My Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 w-full max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10 text-white">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    <Target className="mr-2 h-6 w-6 text-secondary inline" />
                    Get Your CRO Checklist + Funnel Audit
                  </h2>
                  <p className="text-xl font-semibold text-white">
                    (Worth ₹30,000 — Yours Free)
                  </p>
                </div>
                <div className="space-y-2 mt-4">
                  <p className="text-white text-lg">
                    Download our proven 300-point optimization checklist
                    instantly
                  </p>
                </div>
                <LeadForm buttonText="Download CRO Checklist" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                <Sparkles className="h-6 w-6 text-secondary mr-2 flex-shrink-0 inline" />
                <span>Only 10 Free Audits Available</span>
              </h2>
              <p className="text-xl text-white">⏳ First come, first served.</p>
            </div>
            <Link
              className="bg-secondary text-white text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              to={siteConfig.links.calendly}
            >
              Claim My Free Audit
            </Link>
            <p className="text-white font-bold">
              No credit card required. No spam. Ever.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-transparent text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
              <BarChart3 className="h-8 w-8 md:h-12 md:w-12 text-secondary mr-2 inline" />
              <span>Inside Your 300-Point CRO Checklist</span>
            </h2>
          </motion.div>
          <div className="mx-auto grid max-w-5xl gap-8 py-16 lg:grid-cols-2">
            {[
              {
                icon: <FileCheck className="h-7 w-7 text-secondary" />,
                title: "Landing Page Optimization",
                description:
                  "75 proven tactics to create high-converting landing pages",
              },
              {
                icon: <Check className="h-7 w-7 text-secondary" />,
                title: "Checkout & Conversion Flows",
                description: "100 ways to optimize your checkout process",
              },
              {
                icon: <Mail className="h-7 w-7 text-secondary" />,
                title: "Email Marketing & Retargeting",
                description: "50 strategies for effective email sequences",
              },
              {
                icon: <Star className="h-7 w-7 text-secondary" />,
                title: "Analytics & Tracking",
                description: "75 metrics to track for data-driven decisions",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-200 border-1 border-white/10 shadow-lg bg-white/5 backdrop-blur-md">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="rounded-2xl bg-secondary/20 text-center md:text-left p-3 group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="text-white mt-2 text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full p-12 md:pt-24 lg:pt-32 bg-primary text-white">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
            <div className="flex flex-col justify-center space-y-4 flex-1">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center md:text-left ">
                  <Zap className="h-8 w-8 text-secondary mr-2 inline" />
                  Your Free Funnel Audit Report
                </h2>
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center md:text-left">
                  Work 1-on-1 with a CRO expert from Ripples to:
                </p>
              </div>
              <ul className="grid gap-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-secondary" />
                  <span className="text-white">
                    Analyze your marketing funnel performance
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-secondary" />
                  <span className="text-white">
                    Identify key drop-off points
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-secondary" />
                  <span className="text-white">
                    Get a prioritized action plan to improve conversions
                  </span>
                </li>
              </ul>
              <p className="text-white text-center md:text-left">
                This isn&apos;t a generic audit. It&apos;s{" "}
                <strong>custom-built for your brand</strong>.
              </p>
              <div className="flex flex-col gap-2 md:flex-row">
                <Link
                  className="bg-secondary block text-white text-center py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200"
                  to={siteConfig.links.calendly}
                >
                  Book My Free Audit Call
                </Link>
                <p className="text-sm text-center md:text-left text-white mt-2">
                  No credit card required. No spam.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1">
              <img
                alt="Funnel audit illustration"
                className="rounded-lg object-contain w-full"
                loading="lazy"
                src="https://ripples1static.blob.core.windows.net/images/marketing%20funnel.png"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-transparent text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <Sparkles className="h-8 w-8 text-secondary mr-2 inline" />
              <span>Real Brands, Real Results</span>
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
            <Testimonial
              author="Aarav, Growth Head at D2C Skincare Brand"
              quote="Ripples' CRO audit helped us identify 3 critical friction points. Fixing them increased conversions by 28% in 3 weeks."
              rating={5}
            />
            <Testimonial
              author="Shreya, Founder, Wellness Startup"
              quote="The checklist alone is worth paying for. Super actionable!"
              rating={5}
            />
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-primary text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center md:text-left ">
                  <Gift className="h-8 w-8 text-secondary mr-2 inline" />
                  Why Are We Giving This Away Free?
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center md:text-left">
                  At Ripples, we&apos;re confident in the results our platform
                  delivers. This checklist and audit are your{" "}
                  <strong>free introduction to how we think and work</strong>.
                </p>
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center md:text-left">
                  If you love the insights — you&apos;ll love Ripples.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tighter md:text-3xl text-center md:text-left">
                  <Zap className="h-6 w-6 text-secondary mr-2 inline" />
                  Bonus: 30-Day Free Trial of Ripples
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-white text-center md:text-left">
                  When you claim your free checklist and audit, you&apos;ll also
                  get:
                </p>
                <ul className="grid gap-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary" />
                    <span className="text-white">Full access to Ripples</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary" />
                    <span className="text-white">
                      Set up referral, UGC, and gamified rewards for shoppers
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary" />
                    <span className="text-white">
                      Start boosting revenue without changing your ad spend
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-transparent text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <Target className="h-8 w-8 text-secondary mr-2 inline" />
              Get Your Free CRO Checklist
            </h2>
            <p className="text-xl text-white">
              Just drop your email and we&apos;ll send it over right away.
            </p>
          </div>
          <div className="mx-auto max-w-md space-y-6 py-12">
            <LeadForm buttonText="Send Me the CRO Checklist" />
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <p className="text-sm text-white">
                <strong>Limited time offer:</strong> Only 10 free audits
                available this month
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <Link
                className="bg-secondary text-white text-center py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200"
                to={siteConfig.links.calendly}
              >
                Book My Free Audit Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
