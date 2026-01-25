import { KeyboardIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Shortcut = {
  description: string;
  keys: string[];
};

export type ShortcutsProps = {
  shortcuts: Array<Shortcut>;
};

const shortcuts: Shortcut[] = [
  {
    description: "Focus search bar",
    keys: ["Ctrl", "K"],
  },
  {
    description: "Switch theme",
    keys: ["Shift", "T"],
  },
  {
    description: "Open settings",
    keys: ["Shift", "S"],
  },
  {
    description: "Create bookmark",
    keys: ["Shift", "B"],
  },
];

export const Shortcuts: React.FC = () => {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <KeyboardIcon />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Shortcuts</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Use the following keyboard shortcuts to navigate and interact with the
          application more efficiently.
        </DialogDescription>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              className="flex items-center justify-between py-2 border-b last:border-0"
              key={index}
            >
              <span className="text-sm">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                <KbdGroup>
                  {shortcut.keys.map((key, keyIndex) => (
                    <Kbd key={keyIndex}>{key}</Kbd>
                  ))}
                </KbdGroup>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
