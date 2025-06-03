import React from "react";

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
  image: string;
  fallbackImage?: string;
  href: string;
  comingSoon?: boolean;
  featured?: boolean;
}

export function ToolCard({
  title,
  description,
  image,
  fallbackImage = "/images/tool-placeholder.png",
  href,
  comingSoon = false,
  featured = false,
}: ToolCardProps) {
  const [imgSrc, setImgSrc] = React.useState(image || fallbackImage);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <Card
      className={`group relative flex flex-col h-full transition-all duration-500 overflow-hidden
        ${featured ? "border-secondary/50 shadow-xl" : "border-secondary/30"}
        hover:shadow-2xl hover:scale-[1.02] hover:border-secondary/50
        bg-gradient-to-br from-primary/95 to-primary/90`}
    >
      {/* Image Section */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent z-10" />
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-md"
          onError={handleImageError}
        />
      </div>

      {/* Content Section */}
      <CardHeader className="relative z-20 -mt-6 sm:-mt-8 pb-2 text-center md:text-left">
        <CardTitle className="text-xl sm:text-2xl font-bold mb-2 text-white drop-shadow-lg">
          {title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base leading-relaxed text-gray-200">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pb-0" />

      {/* Footer Section */}
      <CardFooter className="pt-2 sm:pt-4 pb-4 sm:pb-6">
        {comingSoon ? (
          <Button
            disabled
            className="w-full h-10 sm:h-12 bg-secondary/60 text-white cursor-not-allowed rounded-lg transition-all duration-300 text-sm sm:text-base"
          >
            Coming Soon <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link
              to={href}
              className="flex items-center justify-center w-full h-10 sm:h-12 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base"
            >
              Try Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
