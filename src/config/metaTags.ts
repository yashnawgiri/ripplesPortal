export const metaTags = {
  home: {
    title: "Referral & UGC Rewards Platform for D2C Brands | Ripples",
    description:
      "Turn your customers into your best marketers. Ripples helps D2C brands scale referrals, influencer UGC, and offer awesome rewards to shoppers—all automated and ROI-focused.",
    path: "/",
  },
  features: {
    title:
      "Referral, UGC & Influencer Marketing Tools for D2C Growth | Ripples Features",
    description:
      "Explore Ripples' full suite of growth tools — automate customer referrals, collect influencer-style UGC from shoppers, and reward loyal shoppers with real incentives.",
    path: "/features",
  },
  referrals: {
    title: "Referral Program Software for D2C Brands | Ripples",
    description:
      "Launch a powerful referral program in minutes. Reward shoppers with instant cashback in store wallet or via UPI and drive word-of-mouth growth at scale.",
    path: "/referrals",
  },
  ugcHome: {
    title: "UGC Rewards Platform for D2C Brands | Ripples",
    description:
      "Incentivize shoppers to create reels, posts & reviews with Ripples. Automate UGC collection and payout rewards based on content success.",
    path: "/ugc-home",
  },
  loyaltyRewards: {
    title: "Customer Loyalty Rewards Software for Ecommerce | Ripples",
    description:
      "Reward repeat purchases and customer loyalty with cashbacks, coupons, or points. Modular loyalty software built for modern D2C brands.",
    path: "/features/loyalty-rewards",
  },
  pricing: {
    title: "Simple, Scale-Friendly Pricing for D2C Referral Software | Ripples",
    description:
      "Pay-as-you-scale. Ripples offers flexible pricing for D2C brands to grow with referrals, UGC, and loyalty — without upfront costs.",
    path: "/pricing",
  },
  caseStudies: {
    title: "Case Studies: How D2C Brands Grow with Ripples",
    description:
      "See how brands like Smartveda and Kaftanize scaled their growth using Ripples' referral and UGC tools. Real stories, real ROI.",
    path: "/case-studies",
  },
  individualCaseStudy: (brand: string, lift: string) => ({
    title: `How ${brand} Achieved ${lift} Sales Lift with Ripples Referrals`,
    description: `Discover how ${brand} used Ripples to boost monthly sales with referral automation and instant cashback rewards for Gen Z buyers.`,
    path: `/case-study/${brand.toLowerCase()}`,
  }),
  blog: {
    title: "Growth Insights for D2C Brands | Ripples Blog",
    description:
      "Actionable tips on referral marketing, UGC strategies, loyalty rewards and influencer growth — straight from the Ripples team.",
    path: "/blog",
  },
  about: {
    title: "About Ripples | Built for D2C Growth by Founders Who've Been There",
    description:
      "We're a team of builders helping brands unlock scalable growth with shopper-led referrals, UGC and loyalty — all in one platform.",
    path: "/about",
  },
  contact: {
    title: "Get in Touch with the Ripples Team | Contact Us",
    description:
      "Got questions about referrals, UGC or loyalty for your brand? Reach out to the Ripples team — we'd love to help you grow.",
    path: "/contact",
  },
  // Case Studies
  caseStudyKaftanize: {
    title: "Kaftanize Case Study - 17x ROI in 60 Days with Ripples",
    description: "See how Kaftanize achieved 17x ROI and 8% sales contribution in just 60 days using Ripples referral program. Fashion brand success story.",
    path: "/case-study/kaftanize",
  },
  caseStudySmartveda: {
    title: "Smartveda Case Study - 22x ROI with Ripples Referral Program",
    description: "Discover how Smartveda achieved 22x ROI and 9.3% sales contribution using Ripples referral and loyalty system. Health & wellness success story.",
    path: "/case-study/smartveda",
  },
  
  // Noindex pages
  myRipples: {
    title: "My Ripples Dashboard",
    description: "Manage your Ripples account, content, and rewards.",
    path: "/my-ripples",
    noindex: true,
  },
  signIn: {
    title: "Sign In to Ripples",
    description: "Access your Ripples account.",
    path: "/sign-in",
    noindex: true,
  },
  affiliateLink: {
    title: "Affiliate Link Generator | Ripples",
    description:
      "Generate your unique affiliate link for Ripples' referral program.",
    path: "/affiliate-link",
    noindex: true,
  },
};
