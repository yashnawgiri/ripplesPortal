import type React from "react";
import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

interface Testimonial {
  id: number;
  company: string;
  quote: string;
  description: string;
  conclusion: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Simplified profile image handling - only use provided image or fallback to initials
  const getProfileImage = (authorImage: string) => {
    if (authorImage && authorImage !== "/placeholder.svg" && authorImage.startsWith('http')) {
      return authorImage;
    }
    return null; // Will fallback to AvatarFallback with initials
  };

  useEffect(() => {
    
    // Check if mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Get the three testimonials to display
  const getVisibleTestimonials = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;

    return {
      prev: testimonials[prevIndex],
      current: testimonials[currentIndex],
      next: testimonials[nextIndex],
      prevIndex,
      nextIndex,
    };
  };

  const { prev, current, next, prevIndex, nextIndex } =
    getVisibleTestimonials();

  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
            <Quote className="w-3 md:w-4 h-3 md:h-4 text-purple-400" size={16} />
            <span className="text-purple-300 text-xs md:text-sm font-medium">
              Founder Stories
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 px-2">
            "Growth experience{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              your customers will love
            </span>
            "
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Real stories from real founders who transformed their growth with
            Ripples
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px] md:min-h-[600px]">
            {/* Navigation - Left */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 md:left-4 z-20 h-10 w-10 md:h-14 md:w-14 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-600/50 transition-all duration-300 hover:scale-110 flex items-center justify-center backdrop-blur-sm shadow-xl"
            >
              <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" size={28} />
            </button>

            {/* Mobile: Single Testimonial View */}
            {isMobile ? (
              <div className="w-full px-12">
                <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/60 shadow-2xl">
                  {/* Company Header */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">
                          {current.company.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {current.company}
                      </h3>
                    </div>
                    <div className="flex justify-center text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-current"
                          size={12}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main Quote */}
                  <blockquote className="text-sm text-white font-medium leading-relaxed mb-4 text-center">
                    "{current.quote}"
                  </blockquote>

                  {/* Description */}
                  <p className="text-slate-300 text-xs leading-relaxed mb-4 text-center">
                    {current.description}
                  </p>

                  {/* Conclusion */}
                  <p className="text-white font-semibold text-xs mb-4 text-center italic">
                    {current.conclusion}
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-2">
                    <Avatar className="w-8 h-8 ring-1 ring-purple-500/30">
                      {getProfileImage(current.author.image) && (
                        <AvatarImage
                          src={getProfileImage(current.author.image)!}
                        />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold text-xs">
                        {current.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <div className="text-white font-semibold text-sm">
                        {current.author.name}
                      </div>
                      <div className="text-purple-300 font-medium text-xs">
                        {current.author.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop: Three-Card Carousel
              <div className="flex items-center justify-center gap-8 w-full px-20 overflow-hidden">
                {/* Previous Testimonial - Left */}
                <div
                  className="opacity-70 scale-95 hover:opacity-100 hover:scale-100 transition-all duration-300 cursor-pointer"
                  onClick={() => goToTestimonial(prevIndex)}
                >
                  <div className="w-80 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Company Header */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {prev.company.charAt(0)}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-300">
                          {prev.company}
                        </h4>
                      </div>
                      <div className="flex justify-center text-yellow-400/70 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-current"
                            size={12}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote Preview */}
                    <blockquote className="text-sm text-slate-400 text-center line-clamp-3 mb-4">
                      "{prev.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-2">
                      <Avatar className="w-8 h-8">
                        {getProfileImage(prev.author.image) && (
                          <AvatarImage
                            src={getProfileImage(prev.author.image)!}
                          />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                          {prev.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <div className="text-slate-300 font-medium text-xs">
                          {prev.author.name}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {prev.author.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Testimonial - Center (Active) */}
                <div className="z-10">
                  <div className="w-96 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/60 shadow-2xl">
                    {/* Company Header */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {current.company.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">
                          {current.company}
                        </h3>
                      </div>
                      <div className="flex justify-center text-yellow-400 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current"
                            size={16}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Main Quote */}
                    <blockquote className="text-lg text-white font-medium leading-relaxed mb-5 text-center">
                      "{current.quote}"
                    </blockquote>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-5 text-center">
                      {current.description}
                    </p>

                    {/* Conclusion */}
                    <p className="text-white font-semibold text-sm mb-6 text-center italic">
                      {current.conclusion}
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-3">
                      <Avatar className="w-12 h-12 ring-2 ring-purple-500/30">
                        {getProfileImage(current.author.image) && (
                          <AvatarImage
                            src={getProfileImage(current.author.image)!}
                          />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                          {current.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <div className="text-white font-semibold">
                          {current.author.name}
                        </div>
                        <div className="text-purple-300 font-medium text-sm">
                          {current.author.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Testimonial - Right */}
                <div
                  className="opacity-70 scale-95 hover:opacity-100 hover:scale-100 transition-all duration-300 cursor-pointer"
                  onClick={() => goToTestimonial(nextIndex)}
                >
                  <div className="w-80 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Company Header */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {next.company.charAt(0)}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-300">
                          {next.company}
                        </h4>
                      </div>
                      <div className="flex justify-center text-yellow-400/70 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-current"
                            size={12}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote Preview */}
                    <blockquote className="text-sm text-slate-400 text-center line-clamp-3 mb-4">
                      "{next.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-2">
                      <Avatar className="w-8 h-8">
                        {getProfileImage(next.author.image) && (
                          <AvatarImage
                            src={getProfileImage(next.author.image)!}
                          />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                          {next.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <div className="text-slate-300 font-medium text-xs">
                          {next.author.name}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {next.author.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation - Right */}
            <button
              onClick={nextTestimonial}
              className="absolute right-2 md:right-4 z-20 h-10 w-10 md:h-14 md:w-14 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-600/50 transition-all duration-300 hover:scale-110 flex items-center justify-center backdrop-blur-sm shadow-xl"
            >
              <ChevronRight className="h-5 w-5 md:h-7 md:w-7" size={28} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 md:mt-12 space-x-2 md:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 h-2 md:w-8 md:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-400/50"
                    : "w-2 h-2 md:w-3 md:h-3 bg-slate-600 hover:bg-slate-500 rounded-full hover:scale-125"
                }`}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="text-center mt-4 md:mt-6">
            <span className="text-slate-400 text-xs md:text-sm">
              {currentIndex + 1} of {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
