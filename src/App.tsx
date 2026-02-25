import { AppWindowIcon } from "lucide-react";
import React from "react";

import { BookmarkList } from "@/components/bookmark-list";
import { Clock } from "@/components/clock";
import { Search } from "@/components/search";
import { Settings } from "@/components/settings";
import { Shortcuts } from "@/components/shortcuts";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Toaster } from "@/components/ui/sonner";
import { useJSONConfigFromURLOnMount } from "@/hooks/use-config";

export const App: React.FC = () => {
  useJSONConfigFromURLOnMount();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between p-4">
        <Item className="w-fit">
          <ItemMedia variant="icon">
            <AppWindowIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>New Tab</ItemTitle>
          </ItemContent>
        </Item>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Shortcuts />
          <Settings />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-12 p-4">
        <Clock />
        <Search />
        <BookmarkList />
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground">
        <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <Button
            asChild
            className="text-muted-foreground font-normal p-0"
            size="sm"
            variant="link"
          >
            <a href="https://stefankuehnel.com">Stefan Kühnel</a>
          </Button>
          , All rights reserved.
        </p>
        <div className="flex justify-center gap-2">
          <Button
            asChild
            className="text-muted-foreground font-normal p-0"
            size="sm"
            variant="link"
          >
            <a href="https://stefanco.de/impressum">Imprint</a>
          </Button>
          <Button
            asChild
            className="text-muted-foreground font-normal p-0"
            size="sm"
            variant="link"
          >
            <a href="https://stefanco.de/datenschutz">Privacy</a>
          </Button>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default App;
