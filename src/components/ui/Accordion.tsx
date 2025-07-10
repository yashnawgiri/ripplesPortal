import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
}) => {
  return <div className={cn("w-full space-y-6", className)}>{children}</div>;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  className,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "border-2 border-white/20 rounded-xl overflow-hidden",
        "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:border-white/30",
        className,
      )}
    >
      <button
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl font-semibold text-white">{title}</span>
        <ChevronDown
          className={cn(
            "w-6 h-6 text-white/80 transition-transform duration-300",
            isOpen ? "transform rotate-180" : "",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px]" : "max-h-0",
        )}
      >
        <div className="px-8 py-6 text-white/90 text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
