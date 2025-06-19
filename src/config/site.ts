import { HammerIcon, Newspaper } from "lucide-react";

import {
  CategoryIcon,
  ChatIcon,
  InfoCircleIcon,
  SettingsIcon,
  VideoIcon,
  WalletIcon,
} from "@/components/icons";
// import UgcIcon from "@/assets/images/ugc-icon.svg";
// import referralIcon from "@/assets/images/referral-icon.svg";
import { imageUrls } from "@/utils/imageUrl";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ripples",
  description:
    "Turn customers into influencers, advocates, and UGC creators - your RIPPLERS!",
  // SEO Configuration
  seo: {
    defaultTitle: "Ripples - Turn Customers into Influencers & UGC Creators",
    titleTemplate: "%s | Ripples",
    defaultDescription:
      "Transform your customers into brand advocates with Ripples. Launch referral programs, collect UGC content, and reward your loyal customers.",
    defaultKeywords: [
      "referral program",
      "UGC rewards",
      "loyalty software",
      "D2C growth tools",
      "brand advocacy",
      "user generated content",
      "influencer marketing",
      "customer rewards",
      "brand ambassadors",
      "customer engagement",
      "brand community",
      "content marketing",
      "social media marketing",
      "ecommerce growth",
      "community building",
    ],
    paths: {
      home: {
        title: "Ripples - Turn Customers into Influencers & UGC Creators",
        description:
          "Transform your customers into brand advocates with Ripples. Launch referral programs, collect UGC content, and reward your loyal customers.",
        keywords: [
          "referral program",
          "UGC rewards",
          "loyalty software",
          "brand advocacy",
        ],
      },
      referrals: {
        title: "Referral Program - Ripples",
        description:
          "Launch a powerful referral program in minutes with instant cashback rewards. Turn your customers into brand advocates.",
        keywords: [
          "referral program",
          "cashback rewards",
          "brand advocacy",
          "customer rewards",
        ],
      },
      shopperHome: {
        title: "Shopper Rewards - Ripples",
        description:
          "Access your rewards and track your earnings as a Ripples shopper. Get cashback for your referrals and content creation.",
        keywords: [
          "shopper rewards",
          "cashback",
          "referral earnings",
          "content rewards",
        ],
      },
      ugcHome: {
        title: "UGC Content Creation - Ripples",
        description:
          "Create authentic user-generated content and earn rewards. Join our community of content creators.",
        keywords: [
          "UGC content",
          "content creation",
          "creator rewards",
          "brand content",
        ],
      },
      getDemo: {
        title: "Get a Demo - Ripples",
        description:
          "See how Ripples can transform your customer engagement. Book a demo with our team.",
        keywords: [
          "demo",
          "product tour",
          "customer engagement",
          "brand growth",
        ],
      },
      about: {
        title: "About Ripples - Customer Advocacy Platform",
        description:
          "Learn about Ripples and how we help brands turn customers into influencers and advocates.",
        keywords: ["about ripples", "company", "mission", "vision"],
      },
      features: {
        title: "Features - Ripples Platform",
        description:
          "Discover the powerful features of Ripples platform for customer advocacy and content creation.",
        keywords: [
          "features",
          "platform capabilities",
          "tools",
          "functionality",
        ],
      },
      referralCommissionCalculator: {
        title: "Referral Commission Calculator - Ripples",
        description:
          "Calculate potential earnings from your referral program with our commission calculator.",
        keywords: [
          "commission calculator",
          "referral earnings",
          "rewards calculator",
        ],
      },
      privacyPolicy: {
        title: "Privacy Policy - Ripples",
        description:
          "Read our privacy policy to understand how we protect your data and privacy.",
        keywords: ["privacy policy", "data protection", "privacy"],
      },
      terms: {
        title: "Terms and Conditions - Ripples",
        description:
          "Review our terms and conditions for using the Ripples platform.",
        keywords: ["terms", "conditions", "legal", "agreement"],
      },
      docs: {
        title: "Documentation - Ripples",
        description:
          "Access comprehensive documentation for the Ripples platform.",
        keywords: ["documentation", "guides", "help", "support"],
      },
      freeTools: {
        title: "Free Tools - Ripples",
        description:
          "Access our collection of free tools for social media and marketing.",
        keywords: ["free tools", "marketing tools", "social media tools"],
      },
      instagramCalculator: {
        title: "Instagram Engagement Calculator - Ripples",
        description:
          "Calculate your Instagram engagement rate and analyze your social media performance.",
        keywords: [
          "instagram calculator",
          "engagement rate",
          "social media analytics",
        ],
      },
      leadMagnet: {
        title: "Lead Magnet Generator - Ripples",
        description:
          "Create effective lead magnets to grow your audience and generate leads.",
        keywords: ["lead magnet", "lead generation", "audience growth"],
      },
      referralCalculator: {
        title: "Referral Program Calculator - Ripples",
        description:
          "Calculate the potential impact of your referral program on your business growth.",
        keywords: [
          "referral calculator",
          "program impact",
          "growth calculator",
        ],
      },
      pricing: {
        title: "Pricing - Ripples",
        description:
          "View our flexible pricing plans for the Ripples platform.",
        keywords: ["pricing", "plans", "subscription", "cost"],
      },
      blog: {
        title: "Blog - Ripples",
        description:
          "Read the latest insights and updates from the Ripples team.",
        keywords: ["blog", "insights", "updates", "news"],
      },
      caseStudies: {
        title: "Case Studies - Ripples Success Stories",
        description:
          "Discover how brands like Kaftanize and Smartveda achieved incredible growth with Ripples referral and UGC programs.",
        keywords: [
          "case studies",
          "success stories",
          "client results",
          "ROI",
          "growth",
        ],
      },
      caseStudyKaftanize: {
        title: "Kaftanize Case Study - 17x ROI with Ripples Referral Program",
        description:
          "See how Kaftanize achieved 17x ROI and 8% sales contribution in just 60 days using Ripples referral program.",
        keywords: [
          "Kaftanize",
          "case study",
          "17x ROI",
          "fashion",
          "referral program",
        ],
      },
      caseStudySmartveda: {
        title: "Smartveda Case Study - 22x ROI with Ripples Referral Program",
        description:
          "Discover how Smartveda achieved 22x ROI and 9.3% sales contribution using Ripples referral and loyalty system.",
        keywords: [
          "Smartveda",
          "case study",
          "22x ROI",
          "health wellness",
          "referral program",
        ],
      },
      myRipples: {
        title: "My Ripples Dashboard",
        description:
          "Access your personal Ripples dashboard to manage your content and rewards.",
        keywords: ["dashboard", "personal account", "user dashboard"],
      },
      userHome: {
        title: "User Home - Ripples",
        description:
          "Welcome to your Ripples user home. Manage your account and activities.",
        keywords: ["user home", "account management", "user dashboard"],
      },
      userContent: {
        title: "My Content - Ripples",
        description: "Manage and track your content creation and rewards.",
        keywords: ["content management", "user content", "content tracking"],
      },
      userRewards: {
        title: "My Rewards - Ripples",
        description: "View and manage your earned rewards and cashback.",
        keywords: ["rewards", "cashback", "earnings", "rewards management"],
      },
      userFaq: {
        title: "FAQ - Ripples",
        description:
          "Find answers to frequently asked questions about Ripples.",
        keywords: ["FAQ", "help", "support", "questions"],
      },
      userSupport: {
        title: "Support - Ripples",
        description: "Get help and support for your Ripples account.",
        keywords: ["support", "help", "customer service", "assistance"],
      },
      userAccount: {
        title: "Account Settings - Ripples",
        description: "Manage your Ripples account settings and preferences.",
        keywords: ["account settings", "preferences", "profile settings"],
      },
      userTransaction: {
        title: "Transactions - Ripples",
        description: "View your transaction history and earnings.",
        keywords: ["transactions", "history", "earnings", "payments"],
      },
      signIn: {
        title: "Sign In - Ripples",
        description: "Sign in to your Ripples account.",
        keywords: ["sign in", "login", "account access"],
      },
      logout: {
        title: "Logout - Ripples",
        description: "Securely log out of your Ripples account.",
        keywords: ["logout", "sign out", "account security"],
      },
      withdraw: {
        title: "Withdraw Rewards - Ripples",
        description: "Withdraw your earned rewards and cashback.",
        keywords: ["withdraw", "rewards", "cashback", "payout"],
      },
    },
  },
  path: {
    home: "/",
    referrals: "/referrals",
    shopperHome: "/shopper",
    ugcHome: "/ugc-home",
    getDemo: "/get-demo",
    affiliateLink: "/affiliate-link/:brand_id/:referral_program_id",
    about: "/about",
    features: "/features",
    referralCommissionCalculator: "/referral-commission-calculator",
    privacyPolicy: "/privacy-policy",
    terms: "/terms-and-conditions",
    docs: "/docs",
    freeTools: "/tools",
    instagramCalculator: "/tools/instagram-engagement",
    leadMagnet: "/tools/lead-magnet",
    referralCalculator: "/tools/referral-calculator",
    pricing: "/pricing",
    blog: "/blog",
    caseStudy: "/case-study/:id",
    caseStudies: "/case-study",
    caseStudyKaftanize: "/case-study/kaftanize",
    caseStudySmartveda: "/case-study/smartveda",
    myRipples: "my-ripples",
    userHome: "home",
    userContent: "content",
    userRewards: "rewards",
    userFaq: "faq",
    userSupport: "support",
    userAccount: "account",
    userTransaction: "transactions",
    signIn: "https://shopper.goripples.com/",
    logout: "/logout",
    withdraw: "/my-ripples/withdraw",
    default: "*",
  },
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Products",
      resources: [
        {
          label: "Referrals",
          icon: imageUrls.referral_icon,
          href: "/referrals",
          description:
            "Launch a powerful referral program in minutes with instant cashback rewards",
        },
        {
          label: "UGC from Shoppers & influencers",
          icon: imageUrls.ugc_icon,
          href: "/ugc-home",
          description:
            "Collect authentic user-generated content and reward creators with cashback",
        },
      ],
    },
    {
      label: "Resources",
      resources: [
        {
          label: "Case Studies",
          href: "/case-study",
          icon: Newspaper,
          description:
            "Discover how brands like Kaftanize and Smartveda achieved incredible growth with Ripples referral and UGC programs.",
        },
        {
          label: "Tools",
          href: "/tools",
          icon: HammerIcon,
          description:
            "Access our collection of free tools for social media and marketing.",
        },
      ],
    },
    {
      label: "Shopper: Access Rewards",
      href: "/shopper",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  userNavItems: [
    {
      label: "My Ripples",
      href: "/my-ripples/home",
      icon: CategoryIcon,
    },
    {
      label: "My Content",
      href: "/my-ripples/content",
      icon: VideoIcon,
    },
    {
      label: "Rewards Wallet",
      href: "/my-ripples/rewards",
      icon: WalletIcon,
    },
    {
      label: "FAQ",
      href: "/my-ripples/faq",
      icon: InfoCircleIcon,
    },
    {
      label: "Contact Support",
      href: "/my-ripples/support",
      icon: ChatIcon,
    },
    {
      label: "My account",
      href: "/my-ripples/account",
      icon: SettingsIcon,
    },
  ],
  links: {
    github: "",
    twitter: "",
    docs: "",
    discord: "",
    sponsor: "",
    linkedin: "https://www.linkedin.com/company/goripples/",
    signupForm:
      "https://script.google.com/macros/s/AKfycbxZ92NLEumTJMw8wkV5NEwBkFHDegtdtFy63kzlH2xJBOCLcN6XfFi-4J9wpfMDW8pX/exec",
    calendly: "https://calendly.com/helloripples/30min",
  },
  footerItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "mailto:pranav.nahal@goripples.com",
    },
  ],
  footerLegal: [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms-and-conditions",
    },
  ],
  formInput: {
    Name: "",
    Email: "",
    Address: "",
    "Phone number": "",
    "Company Name": "",
    "Company Website Link": "",
  },
  footerContact: [
    {
      label: "pranav.nahal@goripples.com",
      href: "mailto:pranav.nahal@goripples.com",
    },
    {
      label: "+91 7019932367",
      href: "tel:+917019932367",
    },
    {
      label: "176, Dollars Colony, JP Nagar Phase 4, Bengaluru - 560078",
      href: "https://www.google.com/maps/place/176,+Dollars+Colony,+JP+Nagar+Phase+4,+Bengaluru+-+560078",
    },
  ],
};
