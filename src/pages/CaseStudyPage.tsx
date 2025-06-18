import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  TrendingUp,
  Users,
  IndianRupee,
  Target,
  Award,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import caseStudyData from "@/data/caseStudy.json";

const CaseStudyPage = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = caseStudyData.caseStudies.find((study) => study.id === id);

  if (!caseStudy) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center p-6 sm:p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 mx-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Case Study Not Found
            </h1>
            <Link
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 justify-center transition-colors group"
              to="/"
            >
              <ArrowLeft
                className="group-hover:-translate-x-1 transition-transform"
                size={20}
              />
              Back to Home
            </Link>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const statsData = [
    {
      icon: TrendingUp,
      label: "ROI",
      value: caseStudy.results.roi.value,
      description: caseStudy.results.roi.description,
      color: "text-white",
      bgColor: "bg-secondary/20",
      borderColor: "border-secondary/30",
    },
    {
      icon: IndianRupee,
      label: "Sales Contribution",
      value: caseStudy.results.sales.value,
      description: caseStudy.results.sales.description,
      color: "text-white",
      bgColor: "bg-secondary/20",
      borderColor: "border-secondary/30",
    },
    {
      icon: Users,
      label: "Referral Increase",
      value: caseStudy.results.referrals.value,
      description: caseStudy.results.referrals.description,
      color: "text-white",
      bgColor: "bg-secondary/20",
      borderColor: "border-secondary/30",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`${caseStudy.name} Case Study - How They Achieved ${caseStudy.results.roi} with Ripples`}</title>
        <meta
          content={`Discover how ${caseStudy.name} used Ripples to achieve ${caseStudy.results.roi} and ${caseStudy.results.sales} sales contribution. Read the complete case study.`}
          name="description"
        />
        <meta
          content={`${caseStudy.name}, case study, referral program, ${caseStudy.industry}, customer advocacy, ROI`}
          name="keywords"
        />
        <link
          href={`https://goripples.com/case-study/${caseStudy.id}`}
          rel="canonical"
        />

        {/* Open Graph */}
        <meta
          content={`${caseStudy.name} Case Study - ${caseStudy.results.roi} ROI with Ripples`}
          property="og:title"
        />
        <meta
          content={`See how ${caseStudy.name} achieved ${caseStudy.results.roi} and ${caseStudy.results.sales} sales contribution using Ripples referral program.`}
          property="og:description"
        />
        <meta content={caseStudy.image} property="og:image" />
        <meta
          content={`https://goripples.com/case-study/${caseStudy.id}`}
          property="og:url"
        />
        <meta content="article" property="og:type" />

        {/* Twitter */}
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          content={`${caseStudy.name} Case Study - ${caseStudy.results.roi} ROI`}
          name="twitter:title"
        />
        <meta
          content={`See how ${caseStudy.name} achieved ${caseStudy.results.roi} with Ripples referral program.`}
          name="twitter:description"
        />
        <meta content={caseStudy.image} name="twitter:image" />
      </Helmet>

      <DefaultLayout>
        <motion.div
          animate="visible"
          className="min-h-screen bg-transparent relative"
          initial="hidden"
          variants={containerVariants}
        >
          {/* Background Image with Overlay */}
          <div className="fixed inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${caseStudy.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/60" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Hero Section */}
            <motion.div
              className="relative overflow-hidden bg-transparent"
              variants={itemVariants}
            >
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
                <motion.div className="max-w-4xl" variants={itemVariants}>
                  {/* Company Info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div className="relative flex-shrink-0">
                      <img
                        alt={`${caseStudy.name} logo`}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl object-cover border-2 border-white/30 shadow-2xl"
                        src={caseStudy.logo}
                      />
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-tight break-words">
                        {caseStudy.name}
                      </h1>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-white">
                        <span className="bg-secondary/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium border border-secondary/30 text-white">
                          {caseStudy.industry}
                        </span>
                        <span className="text-white/80 text-base sm:text-lg">
                          {caseStudy.region}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-white mb-4 sm:mb-6 leading-relaxed font-medium">
                      How {caseStudy.name} Boosts Review Generation and Builds
                      Customer Trust with One Centralized Platform for Reviews
                      and Surveys
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-3xl">
                      {caseStudy.description}
                    </p>
                  </div>

                  {/* Website Link */}
                  <div className="mb-12 sm:mb-16">
                    <a
                      className="inline-flex items-center gap-2 sm:gap-3 bg-secondary/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-secondary/30 transition-all duration-300 border border-secondary/40 group text-base sm:text-lg"
                      href={`https://${caseStudy.website}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="break-all">{caseStudy.website}</span>
                      <ExternalLink
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0"
                        size={18}
                      />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Results Stats - Prominent Display */}
            <motion.section
              className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent relative"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-primary/60" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  className="text-center mb-12 sm:mb-16 md:mb-20"
                  variants={itemVariants}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
                    Incredible Results
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                    See how {caseStudy.name} transformed their growth with
                    Ripples
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
                  {statsData.map((stat) => (
                    <motion.div
                      key={stat.label}
                      className={`text-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-lg border ${stat.borderColor} shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-300 group`}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ${stat.bgColor} mb-6 sm:mb-8 group-hover:scale-110 transition-transform backdrop-blur-sm border ${stat.borderColor}`}
                      >
                        <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 break-words">
                        {stat.value}
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed">
                        {stat.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Key Takeaways in Results Section */}
                <motion.div
                  className="text-center mb-12 sm:mb-16"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 tracking-tight">
                    Key Takeaways
                  </h3>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
                  {caseStudy.keyTakeaways.map((takeaway, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 sm:gap-6 p-6 sm:p-8 bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-secondary/20 hover:bg-white/15 transition-all duration-300 group"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="bg-secondary/30 p-2 sm:p-3 rounded-full mt-1 border border-secondary/40 group-hover:scale-110 transition-transform backdrop-blur-sm flex-shrink-0">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <p className="text-white leading-relaxed text-base sm:text-lg font-medium">
                        {takeaway}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Challenge & Solution */}
            <motion.section
              className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent relative"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  className="text-center mb-12 sm:mb-16 md:mb-20"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
                    Challenge & Solution
                  </h2>
                  <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                    Understanding the problems and how Ripples provided the
                    perfect solution
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                  {/* Challenge */}
                  <motion.div variants={itemVariants}>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-red-500/30 h-full hover:bg-white/15 transition-all duration-300">
                      <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
                        <div className="bg-red-500/30 p-3 sm:p-4 md:p-5 rounded-full border border-red-500/40 backdrop-blur-sm flex-shrink-0">
                          <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-300" />
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                          The Challenge
                        </h3>
                      </div>
                      <ul className="space-y-4 sm:space-y-6">
                        {caseStudy.challenge.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 sm:gap-4"
                          >
                            <div className="bg-red-500/30 p-1.5 sm:p-2 rounded-full mt-1.5 sm:mt-2 border border-red-500/40 backdrop-blur-sm flex-shrink-0">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-300 rounded-full" />
                            </div>
                            <p className="text-white leading-relaxed text-base sm:text-lg">
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Solution */}
                  <motion.div variants={itemVariants}>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-secondary/30 h-full hover:bg-white/15 transition-all duration-300">
                      <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
                        <div className="bg-secondary/30 p-3 sm:p-4 md:p-5 rounded-full border border-secondary/40 backdrop-blur-sm flex-shrink-0">
                          <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                          The Solution
                        </h3>
                      </div>
                      <ul className="space-y-4 sm:space-y-6">
                        {caseStudy.solution.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 sm:gap-4"
                          >
                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-0.5 sm:mt-1 flex-shrink-0" />
                            <p className="text-white leading-relaxed text-base sm:text-lg">
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Testimonial */}
            <motion.section
              className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/70" />

              <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div variants={itemVariants}>
                  <div className="bg-white/15 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 border border-secondary/30 shadow-2xl">
                    <Award className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white/80 mx-auto mb-6 sm:mb-8 md:mb-10" />
                    <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-medium mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                      "{caseStudy.testimonial.quote}"
                    </blockquote>
                    <div className="text-white">
                      <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                        {caseStudy.testimonial.author}
                      </p>
                      <p className="text-white/80 text-base sm:text-lg md:text-xl">
                        {caseStudy.testimonial.position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/15 to-secondary/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

              <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 md:mb-10 tracking-tight">
                    Ready to Achieve Similar Results?
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 sm:mb-14 md:mb-16 leading-relaxed max-w-3xl mx-auto px-4">
                    Join {caseStudy.name} and hundreds of other brands growing
                    with Ripples
                  </p>
                  <Link
                    className="inline-flex items-center gap-3 sm:gap-4 bg-secondary/20 backdrop-blur-sm text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-semibold text-lg sm:text-xl hover:bg-secondary/30 transition-all duration-300 shadow-2xl border border-secondary/40 group"
                    to={siteConfig.path.getDemo}
                  >
                    Get Your Demo
                    <ArrowLeft
                      className="rotate-180 group-hover:translate-x-1 transition-transform"
                      size={20}
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </DefaultLayout>
    </>
  );
};

export default CaseStudyPage;
