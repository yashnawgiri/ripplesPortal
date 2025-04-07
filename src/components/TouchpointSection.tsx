"use client";

import { useState } from "react";
import {
  MessageSquare,
  Mail,
  MessageCircle,
  FileText,
  Info,
  ClipboardList,
  ChevronRight,
  Users,
  QrCode,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { FaWhatsapp } from "react-icons/fa";

export default function TouchpointSection() {
  const [activeTab, setActiveTab] = useState("whatsapp");

  type ChannelId =
    | "whatsapp"
    | "email"
    | "sms"
    | "retail"
    | "order"
    | "status"
    | "referral";

  type Channel = {
    id: ChannelId;
    name: string;
    icon: React.ReactNode;
    color: string;
  };

  const channels: Channel[] = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      id: "sms",
      name: "SMS",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-yellow-500",
    },
    {
      id: "retail",
      name: "Retail",
      icon: <QrCode className="w-5 h-5" />,
      color: "bg-teal-500",
    },
    {
      id: "order",
      name: "Thank You Page",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-purple-500",
    },
    {
      id: "status",
      name: "Order Status",
      icon: <Info className="w-5 h-5" />,
      color: "bg-pink-500",
    },
    {
      id: "referral",
      name: "Referral Dashboard",
      icon: <ClipboardList className="w-5 h-5" />,
      color: "bg-red-500",
    },
  ];

  const channelContent: Record<
    ChannelId,
    {
      title: string;
      description: string;
      features: string[];
      cta: string;
      preview: string;
    }
  > = {
    whatsapp: {
      title: "Direct Messaging with WhatsApp",
      description:
        "Engage customers right where they communicate daily with friends and family. Our WhatsApp integration sends personalized referral invitations after purchase.",
      features: [
        "Automated post-purchase messages",
        "One-click sharing of referral links",
        "Real-time referral tracking",
        "Custom branded messages",
      ],
      cta: "Enable WhatsApp Channel",
      preview:
        "https://ripples1static.blob.core.windows.net/images/whatsapp_image.png",
    },
    email: {
      title: "Strategic Email Campaigns",
      description:
        "Leverage the power of email to nurture customers into advocates with beautifully designed templates and strategic timing.",
      features: [
        "Personalized referral invitations",
        "A/B testing capabilities",
        "Scheduled follow-ups",
        "Rich media support",
      ],
      cta: "Set Up Email Sequences",
      preview:
        "https://ripples1static.blob.core.windows.net/images/email_template.png",
    },
    sms: {
      title: "Instant SMS Notifications",
      description:
        "Reach customers instantly with SMS messages that have high open rates and drive immediate action.",
      features: [
        "Short, compelling messages",
        "Trackable short links",
        "Scheduled reminders",
      ],
      cta: "Configure SMS Channel",
      preview:
        "https://ripples1static.blob.core.windows.net/images/sms_template.png",
    },
    retail: {
      title: "In-Store QR Experience",
      description:
        "Bridge the gap between physical and digital with QR codes that turn in-store customers into online advocates and content creators.",
      features: [
        "Dynamic QR codes on display in the store, receipts, and packaging",
        "Instant referral program enrollment",
        "In-store exclusive bonuses for creating content online",
        "Seamless mobile experience",
      ],
      cta: "Set Up Retail Integration",
      preview:
        "https://ripples1static.blob.core.windows.net/images/retail_image.png",
    },
    order: {
      title: "Thank You Page Integration",
      description:
        "Embed referral opportunities directly in the purchase flow to capture customers at their peak satisfaction.",
      features: [
        "Post-purchase referral prompts",
        "Social sharing options",
        "Incentive highlights",
        "Frictionless experience",
      ],
      cta: "Customize Thank You Pages",
      preview:
        "https://ripples1static.blob.core.windows.net/images/shopify_thank_you_page.png",
    },
    status: {
      title: "Order Status Updates",
      description:
        "Turn routine order updates into referral opportunities by including personalized invitations with each status change.",
      features: [
        "Contextual referral prompts",
        "Progress-based incentives",
      ],
      cta: "Enhance Status Updates",
      preview:
        "https://ripples1static.blob.core.windows.net/images/shopiry_orders_page.png",
    },
    referral: {
      title: "Customer Referral Hub on Your Website",
      description:
        "Give customers a dedicated dashboard to track their referrals, rewards, and access sharing tools on your ecommerce store.",
      features: [
        "Real-time referral tracking",
        "Reward status visualization",
        "Multiple sharing options",
        "Gamification elements",
      ],
      cta: "Launch Referral Hub",
      preview:
        "https://ripples1static.blob.core.windows.net/images/referral_tracking.png",
    },
  };

  return (
    <section className="w-full flex flex-col justify-center items-center py-16 md:py-24 text-white bg-primary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-secondary text-sm font-medium mb-2">
              <Users className="mr-2 h-4 w-4" />
              <span>Customer Activation</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Activate Users Across Every Touchpoint
            </h2>
            <p className="text-lg text-muted-foreground">
              Create a seamless rewards journey engaging customers at key
              moments throughout their journey.
            </p>
          </div>

          {/* Interactive Channel Selector */}
          <div className="w-full bg-muted rounded-xl p-6 md:p-8">
            <h3 className="text-lg font-medium mb-4">Communication Channels</h3>

            {/* Mobile View - Stacked layout with content below each tab */}
            <div className="md:hidden space-y-6">
              {channels.map((channel: Channel) => (
                <div key={channel.id} className="space-y-4">
                  {/* Tab Trigger */}
                  <button
                    className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                      activeTab === channel.id
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                    onClick={() => setActiveTab(channel.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${channel.color} flex items-center justify-center text-white mr-3`}
                      >
                        {channel.icon}
                      </div>
                      <span
                        className={`${activeTab === channel.id ? "text-secondary font-medium" : ""}`}
                      >
                        {channel.name}
                      </span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${activeTab === channel.id ? "rotate-90" : ""}`}
                    />
                  </button>

                  {/* Content directly below the tab */}
                  {activeTab === channel.id && (
                    <div className="bg-background rounded-lg p-4 shadow-sm text-black">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary">
                            {channelContent[channel.id].title}
                          </h3>
                          <p className="text-muted-foreground mt-2 text-sm">
                            {channelContent[channel.id].description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-primary">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {channelContent[channel.id].features.map(
                              (feature: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start text-sm"
                                >
                                  <div
                                    className={`mt-1 w-3 h-3 rounded-full ${channel.color} mr-2 flex-shrink-0`}
                                  />
                                  <span>{feature}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        <div className="bg-muted/30 rounded-lg overflow-hidden border">
                          <div className="">
                            <div className="">
                              <img
                                alt={channelContent[channel.id].title}
                                className=""
                                src={channelContent[channel.id].preview}
                              />
                            </div>
                          </div>
                        </div>

                        {/* <Button className="w-full" color="primary">
                          {channelContent[channel.id].cta}
                        </Button> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop View - Side by side layout */}
            <Tabs
              className="hidden md:block w-full"
              defaultValue="whatsapp"
              onValueChange={setActiveTab}
            >
              <div className="flex flex-row gap-8">
                <div className="md:w-1/3">
                  <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                    {channels.map((channel) => (
                      <TabsTrigger
                        key={channel.id}
                        className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                          activeTab === channel.id
                            ? "bg-background shadow-sm"
                            : "hover:bg-background/50"
                        }`}
                        value={channel.id}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full ${channel.color} flex items-center justify-center text-white mr-3`}
                          >
                            {channel.icon}
                          </div>
                          <span
                            className={`${activeTab === channel.id ? "text-secondary" : ""}`}
                          >
                            {channel.name}
                          </span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${activeTab === channel.id ? "rotate-90" : ""}`}
                        />
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="md:w-2/3">
                  {Object.entries(channelContent).map(([id, content]) => (
                    <TabsContent key={id} className="mt-0" value={id}>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold">
                            {content.title}
                          </h3>
                          <p className="text-muted-foreground mt-2">
                            {content.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-medium mb-3">Key Features</h4>
                            <ul className="space-y-2">
                              {content.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <div
                                    className={`mt-1 w-4 h-4 rounded-full ${channels.find((c) => c.id === id)?.color} mr-2 flex-shrink-0`}
                                  />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            {/* <Button className="mt-6" color="primary">
                              {content.cta}
                            </Button> */}
                          </div>
                          <div className="bg-white rounded-lg overflow-hidden  shadow-sm max-h-[300px]">
                            <img
                              alt={content.title}
                              className="w-full h-full object-contain border border-dashed border-muted-foreground/20 rounded-lg"
                              src={content.preview}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </div>
            </Tabs>
          </div>

          {/* Stats */}
          <div className="w-full flex flex-row flex-wrap md:flex-nowrap gap-6 mt-12 text-center justify-center items-stretch">
            <div className="bg-primary rounded-xl p-6 border shadow-sm">
              <div className="text-4xl font-bold text-secondary mb-2">
                65%
              </div>
              <p className="text-muted-foreground">
              Lower customer acquisition cost through referrals & UGC driven sales
              </p>
            </div>
            <div className="bg-primary rounded-xl p-6 border shadow-sm">
              <div className="text-4xl font-bold text-secondary mb-2">10X</div>
              <p className="text-muted-foreground">
              Increase in referral & UGC activation with multi-channel approach
              </p>
            </div>
            <div className="bg-primary rounded-xl p-6 border shadow-sm">
              <div className="text-4xl font-bold text-secondary mb-2">5X</div>
              <p className="text-muted-foreground">
              Higher engagement compared to single-channel campaigns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
