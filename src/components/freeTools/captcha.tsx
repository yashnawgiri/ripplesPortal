import { useEffect, useRef, useState } from "react"

interface CaptchaProps {
  onVerify: (token: string) => void
}

export function Captcha({ onVerify }: CaptchaProps) {
  const [loading, setLoading] = useState(true)
  const [challenge, setChallenge] = useState("")
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate a simple CAPTCHA
  // In production, use a proper CAPTCHA service like reCAPTCHA or hCaptcha
  useEffect(() => {
    const generateCaptcha = () => {
      setLoading(true)
      // Generate a random string of 6 characters
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
      let captchaText = ""
      for (let i = 0; i < 6; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setChallenge(captchaText)

      // Draw the CAPTCHA on canvas
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = "#f3f4f6"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.font = "bold 24px Arial"
          ctx.fillStyle = "#4b5563"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Add noise
          for (let i = 0; i < 100; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
          }

          // Add lines
          for (let i = 0; i < 4; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`
            ctx.beginPath()
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
            ctx.stroke()
          }

          // Draw text with character spacing
          const chars = captchaText.split("")
          const charWidth = canvas.width / (chars.length + 1)
          chars.forEach((char, i) => {
            const x = charWidth * (i + 1)
            const y = canvas.height / 2 + Math.random() * 10 - 5
            const rotation = (Math.random() - 0.5) * 0.4
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(rotation)
            ctx.fillText(char, 0, 0)
            ctx.restore()
          })
        }
      }
      setLoading(false)
    }

    generateCaptcha()
  }, [])

  const handleRefresh = () => {
    setUserInput("")
    setError("")
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
    let captchaText = ""
    for (let i = 0; i < 6; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setChallenge(captchaText)

    // Redraw the CAPTCHA
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = "bold 24px Arial"
        ctx.fillStyle = "#4b5563"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Add noise
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`
          ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
        }

        // Add lines
        for (let i = 0; i < 4; i++) {
          ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`
          ctx.beginPath()
          ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
          ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
          ctx.stroke()
        }

        // Draw text with character spacing
        const chars = captchaText.split("")
        const charWidth = canvas.width / (chars.length + 1)
        chars.forEach((char, i) => {
          const x = charWidth * (i + 1)
          const y = canvas.height / 2 + Math.random() * 10 - 5
          const rotation = (Math.random() - 0.5) * 0.4
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rotation)
          ctx.fillText(char, 0, 0)
          ctx.restore()
        })
      }
    }
  }

  const handleVerify = () => {
    if (userInput.toLowerCase() === challenge.toLowerCase()) {
      // Generate a mock token
      const token = btoa(Date.now().toString() + Math.random().toString())
      onVerify(token)
      setError("")
    } else {
      setError("Incorrect CAPTCHA. Please try again.")
      handleRefresh()
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-3">
        <div className="relative w-full h-16 bg-gray-100 rounded-md overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
            </div>
          ) : (
            <canvas ref={canvasRef} width={200} height={60} className="w-full h-full"></canvas>
          )}
        </div>
        <div className="flex w-full space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter the text above"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={handleRefresh}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            aria-label="Refresh CAPTCHA"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleVerify}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Verify
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  )
}
