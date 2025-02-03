import { Card, CardContent } from "@/components/ugc-landing/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Ripples has transformed how we generate UGC. Our engagement rates have increased by 300% since implementing their platform.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Fashion Brand Co.",
  },
  {
    quote:
      "The ROI we've seen from Ripples is incredible. Our customers love creating content and getting rewarded for it.",
    author: "Michael Chen",
    role: "E-commerce Manager",
    company: "Lifestyle Store",
  },
  {
    quote:
      "The automated verification system saves us hours of work while ensuring authentic content from our community.",
    author: "Emma Williams",
    role: "Social Media Lead",
    company: "Beauty Brand Inc.",
  },
]

export function Testimonials() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          What Our Clients Say
        </h2>
        <p className="text-white/60 max-w-[600px] mx-auto">
          Join hundreds of brands transforming their UGC strategy with Ripples
        </p>
      </div>
      <div className="grid w-full max-w-[1600px] gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card
            key={i}
            className="relative overflow-hidden border border-gray-800 rounded-xl bg-black/50 shadow-lg/10 transition-all duration-300 ease-in-out
                      hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:backdrop-blur-md w-full"
          >
            <CardContent className="p-6 relative h-full flex flex-col">
              <Quote className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4 text-blue-400 opacity-70" />
              <p className="text-sm sm:text-base text-white/80 mb-3 sm:mb-4 leading-relaxed">{testimonial.quote}</p>
              <div className="mt-auto border-t border-gray-700 pt-4">
                <p className="font-semibold text-sm sm:text-base text-white">{testimonial.author}</p>
                <p className="text-xs sm:text-sm text-white/60">{testimonial.role}</p>
                <p className="text-xs sm:text-sm text-white/60">{testimonial.company}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
