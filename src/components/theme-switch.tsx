import { FC, useEffect, useState } from "react";
import clsx from "clsx";

import { Switch } from "@/components/ui/Switch";
import { useTheme } from "@/hooks/use-theme";
import { MoonFilledIcon, SunFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Switch
        checked={theme === "dark"}
        size="md"
        onCheckedChange={toggleTheme}
      />
      {theme === "dark" ? (
        <MoonFilledIcon className="text-white" size={22} />
      ) : (
        <SunFilledIcon className="text-black" size={22} />
      )}
    </div>
  );
};
