import type React from "react"
import { X, Globe, MapPin, Calendar, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"

interface CaseStudy {
  id: string
  name: string
  industry: string
  website: string
  region: string
  description: string
  challenge: string[]
  solution: string[]
  results: {
    roi: string
    sales: string
    referrals: string
    timeline: string
  }
  testimonial: {
    quote: string
    author: string
    position: string
  }
  keyTakeaways: string[]
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null
  onClose: () => void
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose }) => {
  if (!caseStudy) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-4 md:p-6 flex items-center justify-between rounded-t-2xl md:rounded-t-3xl">
          <div className="flex items-center gap-3 md:gap-4">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${caseStudy.id === "kaftanize" ? "from-purple-500 to-pink-500" : "from-green-500 to-teal-500"} rounded-lg md:rounded-xl flex items-center justify-center`}
            >
              <span className="text-white font-bold text-sm md:text-base">{caseStudy.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-white">{caseStudy.name}</h2>
              <p className="text-gray-400 text-sm md:text-base">{caseStudy.industry}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg md:rounded-xl flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400" size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 md:p-8">
          {/* Company Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 md:w-4 md:h-4 text-purple-400" size={16} />
              <span className="text-gray-300 text-xs md:text-sm">{caseStudy.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-purple-400" size={16} />
              <span className="text-gray-300 text-xs md:text-sm">{caseStudy.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 md:w-4 md:h-4 text-purple-400" size={16} />
              <span className="text-gray-300 text-xs md:text-sm">{caseStudy.results.timeline}</span>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">About {caseStudy.name}</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{caseStudy.description}</p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">{caseStudy.results.roi.split(" ")[0]}</div>
              <div className="text-xs md:text-sm text-gray-300">{caseStudy.results.roi.split(" ").slice(1).join(" ")}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">{caseStudy.results.sales.split(" ")[0]}</div>
              <div className="text-xs md:text-sm text-gray-300">{caseStudy.results.sales.split(" ").slice(1).join(" ")}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 md:p-6 md:col-span-1 lg:col-span-1">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">{caseStudy.results.referrals.split(" ")[0]}</div>
              <div className="text-xs md:text-sm text-gray-300">{caseStudy.results.referrals.split(" ").slice(1).join(" ")}</div>
            </div>
          </div>

          {/* Challenge Section */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span className="text-red-400 text-xs md:text-sm">⚠️</span>
              </div>
              The Challenge
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {caseStudy.challenge.map((item, index) => (
                <li key={index} className="flex items-start gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Section */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-xs md:text-sm">✅</span>
              </div>
              The Ripples Solution
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {caseStudy.solution.map((item, index) => (
                <li key={index} className="flex items-start gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Takeaways */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-xs md:text-sm">🔑</span>
              </div>
              Key Takeaways
            </h3>
            <div className="space-y-3 md:space-y-4">
              {caseStudy.keyTakeaways.map((takeaway, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 md:p-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 text-xs font-bold">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <span className="text-gray-300 text-sm md:text-base">{takeaway}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/50 rounded-xl p-4 md:p-6">
            <Quote className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mb-3 md:mb-4" size={32} />
            <p className="text-gray-300 italic text-base md:text-lg leading-relaxed mb-3 md:mb-4">"{caseStudy.testimonial.quote}"</p>
            <div className="flex items-center gap-2 md:gap-3">
              <Avatar className="w-10 h-10 md:w-12 md:h-12">
                <AvatarFallback
                  className={`bg-gradient-to-br ${caseStudy.id === "kaftanize" ? "from-purple-500 to-pink-500" : "from-green-500 to-teal-500"} text-white font-semibold text-sm`}
                >
                  {caseStudy.testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-white text-sm md:text-base">{caseStudy.testimonial.author}</div>
                <div className="text-xs md:text-sm text-gray-400">{caseStudy.testimonial.position}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseStudyModal
