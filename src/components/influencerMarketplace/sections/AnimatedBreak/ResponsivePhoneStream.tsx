import { useEffect, useState } from "react";
import ContinuousPhoneStream from "./ContinuousPhoneStream";

interface ResponsivePhoneStreamProps {
  isActive: boolean;
}

export default function ResponsivePhoneStream({
  isActive,
}: ResponsivePhoneStreamProps) {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configure settings based on screen size
  const getConfig = () => {
    switch (screenSize) {
      case "mobile":
        return {
          maxPhones: 4,
          positionRanges: {
            x: { min: 15, max: 85 },
            y: { min: 25, max: 75 },
          },
          animationDurations: [6, 8, 10],
          spawnInterval: { min: 1500, max: 3000 },
        };
      case "tablet":
        return {
          maxPhones: 6,
          positionRanges: {
            x: { min: 10, max: 90 },
            y: { min: 20, max: 80 },
          },
          animationDurations: [8, 10, 12],
          spawnInterval: { min: 1200, max: 2500 },
        };
      case "desktop":
        return {
          maxPhones: 8,
          positionRanges: {
            x: { min: 5, max: 95 },
            y: { min: 15, max: 85 },
          },
          animationDurations: [10, 12, 14],
          spawnInterval: { min: 1000, max: 2000 },
        };
    }
  };

  const config = getConfig();

  return (
    <div className="relative w-full h-full">
      <ContinuousPhoneStream
        isActive={isActive}
        maxPhones={config.maxPhones}
        positionRanges={config.positionRanges}
        animationDurations={config.animationDurations}
        spawnInterval={config.spawnInterval}
      />
    </div>
  );
}
