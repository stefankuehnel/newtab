import { OctagonAlertIcon } from "lucide-react";
import { type ErrorInfo, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import { App } from "@/App.tsx";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { STORAGE_KEYS } from "@/constants/storage";
import { BookmarksContextProvider } from "@/contexts/bookmarks-context";
import { ServicesContextProvider } from "@/contexts/services-context";
import { ThemeContextProvider } from "@/contexts/theme-context";
import { defaultBookmarks } from "@/defaults/bookmarks";
import { defaultServices } from "@/defaults/services";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <Empty>
          <EmptyHeader>
            <EmptyMedia className="text-red-600" variant="default">
              <OctagonAlertIcon />
            </EmptyMedia>
            <EmptyTitle> An Error Occurred </EmptyTitle>
            <EmptyDescription>
              Sorry, something went wrong while loading the application.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild size="sm" variant="outline">
              <a href="/">Go Back Home</a>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    }
    onError={(error: unknown, info: ErrorInfo) => {
      console.error("ErrorBoundary caught an error", error, info);
    }}
  >
    <StrictMode>
      <ThemeContextProvider defaultTheme="dark" storageKey={STORAGE_KEYS.THEME}>
        <BookmarksContextProvider
          defaultBookmarks={defaultBookmarks}
          storageKey={STORAGE_KEYS.BOOKMARKS}
        >
          <ServicesContextProvider
            defaultServices={defaultServices}
            storageKey={STORAGE_KEYS.SERVICES}
          >
            <App />
          </ServicesContextProvider>
        </BookmarksContextProvider>
      </ThemeContextProvider>
    </StrictMode>
  </ErrorBoundary>,
);
