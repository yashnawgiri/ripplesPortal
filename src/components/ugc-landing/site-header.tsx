import { useState, useEffect } from "react";

// import Link from "next/link"
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-black/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link className="text-white font-bold text-xl" to="/">
            Ripples<span className="text-purple-500 text-2xl">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              className="text-white/80 hover:text-white transition-colors"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a
              className="text-white/80 hover:text-white transition-colors"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-white/80 hover:text-white transition-colors"
              href="#calculator"
            >
              ROI Calculator
            </a>
            {/* <a
              className="text-white/80 hover:text-white transition-colors"
              href="#testimonials"
            >
              Testimonials
            </a> */}
            <a
              className="text-white/80 hover:text-white transition-colors"
              href="#reward-strategy"
            >
              Simulate Strategy
            </a>
            <Button
              className="bg-white text-black hover:bg-white/90"
              onClick={() => (window.location.href = siteConfig.links.calendly)}
            >
              Book Demo
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <a
              className="block text-white/80 hover:text-white transition-colors"
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              className="block text-white/80 hover:text-white transition-colors"
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              className="block text-white/80 hover:text-white transition-colors"
              href="#calculator"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ROI Calculator
            </a>
            {/* <a
              className="block text-white/80 hover:text-white transition-colors"
              href="#testimonials"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a> */}
            <a
              className="block text-white/80 hover:text-white transition-colors"
              href="#reward-strategy"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reward Strategy
            </a>

            <Button
              className="w-full bg-white text-black hover:bg-white/90"
              onClick={() => (window.location.href = siteConfig.links.calendly)}
            >
              Book Demo
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
