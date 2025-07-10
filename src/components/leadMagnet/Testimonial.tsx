import { Card, CardContent } from "@/components/ui/Card";

interface TestimonialProps {
  quote: string;
  author: string;
  rating: number;
}

export default function Testimonial({
  quote,
  author,
  rating,
}: TestimonialProps) {
  return (
    <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
      <CardContent className="p-6">
        <div className="flex space-x-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-yellow-400">
              ⭐
            </span>
          ))}
        </div>
        <blockquote className="text-lg font-medium italic mb-4">
          "{quote}"
        </blockquote>
        <p className="text-sm text-gray-300">— {author}</p>
      </CardContent>
    </Card>
  );
}
