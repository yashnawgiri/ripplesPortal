import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { IoArrowForward } from "react-icons/io5"
import { Link } from "react-router-dom"
import { siteConfig } from "@/config/site"
import astronautSvg from "@/assets/images/astronaut.svg"
import ghostSvg from "@/assets/images/ghost.svg"
import axios from "axios"
import endpoints from "@/services/endpoints"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubscribe = async () => {
    if (!email) {
      setError("Please provide an email address")
      return
    }

    if (!validateEmail(email)) {
      setError("Please provide a valid email address")
      return
    }
    
    setError("")
    setIsLoading(true)
    try {
      await axios.post(endpoints.CAPTURE_EMAIL_SEND_NEWSLETTER, { email })
      setIsSuccess(true)
      setEmail("")
    } catch (error) {
      console.error("Error subscribing:", error)
      setError("Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-transparent p-4 sm:p-6 md:p-8 border-b-2 border-t-2 border-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-secondary uppercase bg-white rounded-full px-4 py-2">
                  Newsletter
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Sign up for our newsletter
              </h1>
            </div>

            {/* Arrow and description */}
            <div className="flex items-start gap-3 sm:gap-4">
              <IoArrowForward className="w-5 h-5 sm:w-6 sm:h-6 mt-1 text-gray-400 flex-shrink-0" />
              <p className="text-white text-base sm:text-lg leading-relaxed">
                Get insider access to our company by subscribing to our newsletter and stay informed about our products,
                services, and initiatives.
              </p>
            </div>

            {/* Email form */}
            <div className="space-y-3 sm:space-y-4">
              {isSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Success! </strong>
                  <span className="block sm:inline">Thank you for subscribing to our newsletter!</span>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="pat@saturn.dev"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError("")
                      }}
                      classNames={{
                        base: "flex-1",
                        input: "text-base",
                        inputWrapper: "h-11 sm:h-12 border-gray-300 data-[hover=true]:border-purple-500 group-data-[focus=true]:border-purple-500",
                      }}
                      radius="md"
                      size="lg"
                      isInvalid={!!error}
                      errorMessage={error}
                    />
                    <Button
                      className="h-11 sm:h-12 px-4 sm:px-6 text-white font-medium w-full sm:w-auto bg-secondary hover:bg-secondary/80 transition-colors"
                      radius="md"
                      size="lg"
                      isLoading={isLoading}
                      onClick={handleSubscribe}
                      endContent={!isLoading && <IoArrowForward className="w-4 h-4" />}
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </>
              )}

              <p className="text-xs sm:text-sm text-white">
                We care about your data in our{" "}
                <Link to={siteConfig.path.privacyPolicy} className="text-secondary hover:underline transition-colors">
                  privacy policy
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Illustrations */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative scale-75 sm:scale-90 lg:scale-100">
              {/* Astronaut Character */}
              <div className="relative z-10 bg-gray-200 rounded-2xl p-6 sm:p-8 w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center shadow-lg">
                <img src={astronautSvg} alt="Astronaut character" className="w-20 h-25 sm:w-24 sm:h-30" />
              </div>

              {/* Ghost Character */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-orange-300 rounded-2xl p-4 sm:p-8 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center shadow-lg">
                <img src={ghostSvg} alt="Ghost character" className="w-15 h-20 sm:w-18 sm:h-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
