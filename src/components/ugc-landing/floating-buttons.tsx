import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/label";

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            aria-label="Contact Us"
            className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
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
              <Input id="email" placeholder="Your email" type="email" />
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
          aria-label="Back to top"
          className="rounded-full w-12 h-12 bg-black/50 backdrop-blur-sm text-white shadow-lg hover:shadow-xl transition-all hover:bg-black/70"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
