import type * as React from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
      className={`group flex flex-col h-full transition-all text-center md:text-left duration-500 overflow-hidden backdrop-blur-sm
        ${featured ? "border-secondary/50 shadow-xl" : "border-primary/30"}
        hover:shadow-2xl hover:scale-[1.02] hover:border-secondary/50
        bg-gradient-to-br from-primary/95 to-primary/90`}
    >
      <CardHeader className="pb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div
          className={`w-full flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 
            group-hover:scale-110 group-hover:rotate-3`}
        >
          <div
            className={`w-20 h-20 flex items-center justify-center rounded-2xl transition-all duration-300 
              ${
                featured
                  ? "bg-gradient-to-br from-secondary/20 to-secondary/30 shadow-lg shadow-secondary/20"
                  : "bg-gradient-to-br from-primary/20 to-primary/30 shadow-lg shadow-primary/20"
              }`}
          >
            {icon}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold mb-3 text-white">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-gray-200">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-0" />
      <CardFooter className="pt-6 pb-6">
        {comingSoon ? (
          <Button
            disabled
            className="w-full opacity-70 h-12 bg-gradient-to-r from-gray-600 to-gray-700 text-white cursor-not-allowed"
          >
            Coming Soon <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Button>
        ) : (
          <Button
            asChild
            className={`!w-full h-12 transition-all duration-300 
              ${
                featured
                  ? "bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-dark hover:to-secondary text-white font-semibold"
                  : "bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold"
              }
              hover:scale-[1.02] hover:shadow-lg`}
          >
            <Link className="" to={href}>
              Try Now
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
