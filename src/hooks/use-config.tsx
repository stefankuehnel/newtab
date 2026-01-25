import React from "react";
import { toast } from "sonner";
import SuperJSON from "superjson";

import { useBookmarks } from "@/contexts/bookmarks-context";
import { useServices } from "@/contexts/services-context";
import { useTheme } from "@/contexts/theme-context";
import { type Config, ConfigSchema } from "@/types";

export const useConfig = () => {
  const { setTheme, theme } = useTheme();
  const { services, setServices } = useServices();
  const { bookmarks, setBookmarks } = useBookmarks();

  const config = React.useMemo<Config>(
    () => ({
      bookmarks,
      services,
      theme,
    }),
    [theme, services, bookmarks],
  );

  const setConfig = React.useCallback(
    (input: unknown) => {
      const result = ConfigSchema.safeParse(input);

      if (!result.success) {
        console.error("Config validation failed", result.error);

        toast.error("Invalid Configuration", {
          description: (
            <div className="mt-2 flex flex-col gap-1 text-xs">
              <p>The following errors occurred:</p>
              <ul className="list-disc pl-4 space-y-1">
                {result.error.issues.map((issue, idx) => (
                  <li key={idx}>
                    <code className="font-mono font-bold text-primary">
                      {issue.path.join(".") || "root"}
                    </code>
                    : {issue.message}
                  </li>
                ))}
              </ul>
            </div>
          ),
        });
        return false;
      }

      const { bookmarks, services, theme } = result.data;
      setTheme(theme);
      setServices(services);
      setBookmarks(bookmarks);
      return true;
    },
    [setTheme, setServices, setBookmarks],
  );

  return { config, setConfig };
};

export const useJSONConfig = () => {
  const { config, setConfig } = useConfig();

  const jsonConfig = React.useMemo(() => {
    try {
      return SuperJSON.stringify(config);
    } catch (e) {
      console.error("Failed to stringify config", e);
      return "";
    }
  }, [config]);

  const setJSONConfig = React.useCallback(
    (jsonString: string) => {
      try {
        const parsed = SuperJSON.parse(jsonString);
        return setConfig(parsed);
      } catch (error) {
        console.error("Failed to parse JSON config", error);
        toast.error("Import Failed", {
          description: "The input is not a valid JSON string.",
        });
        return false;
      }
    },
    [setConfig],
  );

  return { jsonConfig, setJSONConfig };
};
