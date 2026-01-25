import React from "react";

import { STORAGE_KEYS } from "@/constants/storage";
import { type Theme } from "@/types";

export type ThemeContextProviderProps = React.PropsWithChildren<{
  defaultTheme: Theme;
  storageKey?: string;
}>;

export type ThemeContextState = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const defaultThemeContextState: ThemeContextState = {
  setTheme: () => {},
  theme: "system",
};

const ThemeContext = React.createContext<ThemeContextState>(
  defaultThemeContextState,
);

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
  defaultTheme,
  storageKey = STORAGE_KEYS.THEME,
  ...props
}) => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;

    if (!storedTheme) {
      return defaultTheme;
    }

    return storedTheme;
  });

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    theme,
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const themeContext = React.useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "'useTheme()' must be used within a '<ThemeContextProvider />'",
    );
  }

  return themeContext;
};

export type { Theme };
