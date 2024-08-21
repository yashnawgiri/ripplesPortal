import { CategoryIcon, ChatIcon, InfoCircleIcon, LogoutIcon, SettingsIcon, VideoIcon, WalletIcon } from "@/components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ripples ",
  description:
    "Turn customers into influencers, advocates, and UGC creators - your RIPPLERS!",
  path: {
    home: "/",
    getDemo: "/get-demo",
    about: "/about",
    features: "/features",
    privacyPolicy: "/privacy-policy",
    terms: "/terms-and-conditions",
    docs: "/docs",
    pricing: "/pricing",
    blog: "/blog",
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
      label: "Features",
      href: "/features",
    },
    {
      label: "Early Bird",
      href: "/get-demo",
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
      href: "#",
      icon: CategoryIcon,
    },
    {
      label: "My Content",
      href: "#",
      icon: VideoIcon,
    },
    {
      label: "Rewards Wallet",
      href: "#",
      icon: WalletIcon,
    },
    {
      label: "FAQ",
      href: "#",
      icon: InfoCircleIcon,
    },
    {
      label: "Contact Support",
      href: "#",
      icon: ChatIcon,
    },
    {
      label: "My account",
      href: "#",
      icon: SettingsIcon,
    },
    {
      label: "Logout",
      href: "#",
      icon: LogoutIcon,
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
    calendly: "https://calendly.com/hello-ripples/30min",
  },
  footerItems: [
    {
      label: "Home",
      href: "#",
    },
    {
      label: "About",
      href: "#",
    },
    {
      label: "How it works",
      href: "#",
    },
    {
      label: "Contact",
      href: "#",
    },
    {
      label: "Blog",
      href: "#",
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
    {
      label: "Return Policy",
      href: "#",
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
