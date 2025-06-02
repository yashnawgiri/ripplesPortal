import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";

import { siteConfig } from "@/config/site";

export function MobileCTA() {

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent md:hidden z-50">
        <Link className="w-full" to={siteConfig.links.calendly}>
          <Button
            className="w-full bg-white text-black hover:bg-white/90"
            size="lg"
          >
            Book Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </>
  );
}
