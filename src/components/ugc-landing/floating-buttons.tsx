import { useState, useEffect } from "react"
import { Button } from "@/components/ugc-landing/ui/button"
import { MessageCircle, ArrowUp } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ugc-landing/ui/sheet"
import { Input } from "@/components/ugc-landing/ui/input"
import { Textarea } from "@/components/ugc-landing/ui/textarea"
import { Label } from "@/components/ugc-landing/ui/label"

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Contact Us"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Contact Us</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help?" />
            </div>
            <Button>Send Message</Button>
          </div>
        </SheetContent>
      </Sheet>

      {showBackToTop && (
        <Button
          size="icon"
          className="rounded-full w-12 h-12 bg-black/50 backdrop-blur-sm text-white shadow-lg hover:shadow-xl transition-all hover:bg-black/70"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

