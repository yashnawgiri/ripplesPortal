import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/utils";

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  glowColor?: string;
}

export default function EnhancedButton({
  className,
  glowColor = "rgba(255, 255, 255, 0.2)",
  children,
  ...props
}: EnhancedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute inset-0 rounded-md transition-all duration-300 filter blur-xl",
          isHovered ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: glowColor,
          transform: isHovered ? "scale(1.1)" : "scale(0.9)",
        }}
      />
      <Button
        className={cn(
          "relative transform transition-all duration-300",
          isHovered && "scale-105",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
