import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  className?: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  rating,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`bg-[#18082A] rounded-2xl p-8 border border-[#2E1A47] hover:border-[#CA00E8] hover:glow-custom transition-all duration-300 hover:-translate-y-1 relative shadow-3xl ${className}`}
    >
      <Quote className="absolute top-6 right-6 h-8 w-8 text-secondary/30" />

      <div className="flex items-center mb-6">
        <img
          src={avatar || "/placeholder.svg"}
          alt={`${name} avatar`}
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-[#2E1A47]"
        />
        <div>
          <div className="font-semibold text-white font-poppins">{name}</div>
          <div className="text-sm text-[#CFCFCF]">{role}</div>
        </div>
      </div>

      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
        ))}
      </div>

      <blockquote className="text-[#CFCFCF] leading-relaxed">
        "{quote}"
      </blockquote>
    </div>
  );
}
