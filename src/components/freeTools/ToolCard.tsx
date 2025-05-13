import type React from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ugc-landing/ui/card";
import { Button } from "../ugc-landing/ui/button";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  comingSoon?: boolean;
  featured?: boolean;
}

export function ToolCard({
  title,
  description,
  icon,
  href,
  comingSoon = false,
  featured = false,
}: ToolCardProps) {
  return (
    <Card
      className={`group flex flex-col h-full transition-all text-center md:text-left duration-500  overflow-hidden backdrop-blur-sm
        ${featured ? "border-primary/30 shadow-xl" : "border-primary/30"}
        hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50
         bg-primary`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-secondary to-secondary-600 text-white text-xs font-medium py-1.5 px-4 text-center tracking-wider uppercase">
          Popular
        </div>
      )}
      <CardHeader className="pb-4 relative">
        <div
          className={`w-full flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 
           
            group-hover:scale-110 group-hover:rotate-3`}
        >
          <div
            className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 
              ${
                featured
                  ? "bg-gradient-to-br from-secondary/20 to-secondary/30"
                  : "bg-gradient-to-br from-zinc-900 to-zinc-800"
              }`}
          >
            {icon}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
        <CardTitle className="text-2xl font-bold mb-3 bg-clip-text">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-white">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-0" />
      <CardFooter className="pt-6 pb-6">
        {comingSoon ? (
          <Button
            disabled
            className="w-full opacity-70 h-12 bg-gradient-to-r from-primary to-primary-600 text-white cursor-not-allowed"
          >
            Coming Soon <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Button>
        ) : (
          <Button
            asChild
            className={`w-full h-12 transition-all duration-300 
              ${
                featured
                  ? "bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-dark hover:to-secondary"
                  : "bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
              }
              hover:scale-[1.02] hover:shadow-lg`}
          >
            <Link className="flex items-center justify-center" to={href}>
              Try Now
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
