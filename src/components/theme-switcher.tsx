import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Theme, useTheme } from "@/contexts/theme-context";

export const ThemeSwitcher: React.FC = () => {
  const { setTheme, theme } = useTheme();

  const getNextTheme = () => {
    const themes: Array<Theme> = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);

    return themes[(currentIndex + 1) % themes.length];
  };

  useHotkeys("shift+t", () => {
    setTheme(getNextTheme());
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => setTheme(getNextTheme())}
          size="icon"
          variant="outline"
        >
          {theme === "light" && <SunIcon />}
          {theme === "dark" && <MoonIcon />}
          {theme === "system" && <MonitorIcon />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {theme.charAt(0).toUpperCase() + theme.slice(1)} theme
      </TooltipContent>
    </Tooltip>
  );
};
