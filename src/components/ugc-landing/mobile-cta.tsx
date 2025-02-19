import { useState } from "react"
import { Button } from "@/components/ugc-landing/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ugc-landing/ui/sheet"
import { Input } from "@/components/ugc-landing/ui/input"
import { Label } from "@/components/ugc-landing/ui/label"
import { Spinner } from "@/components/ugc-landing/ui/spinner"
import { ArrowRight, X } from "lucide-react"

export function MobileCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent md:hidden z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="w-full bg-white text-black hover:bg-white/90" size="lg">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh]">
            <SheetHeader>
              <SheetTitle>Start Your Journey</SheetTitle>
              <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter your company name" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner className="mr-2" /> : null}
                {isLoading ? "Processing..." : "Book Demo"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

