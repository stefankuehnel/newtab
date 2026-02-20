import { EllipsisIcon } from "lucide-react";
import { CopyIcon, EditIcon, ExternalLinkIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import type { Bookmark as BookmarkProps } from "@/types";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, ItemActions, ItemMedia, ItemTitle } from "@/components/ui/item";
import { useBookmarks } from "@/contexts/bookmarks-context";

import { BookmarkDialog } from "./bookmark-dialog";

export const Bookmark: React.FC<
  BookmarkProps & React.ComponentProps<"div">
> = ({ icon, id, ref, title, url }) => {
  const { deleteBookmark } = useBookmarks();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Success", { description: "URL copied to clipboard." });
    } catch (err) {
      toast.error("Error", { description: "Failed to copy URL to clipboard." });
      console.error("Failed to copy URL:", err);
    }
  };

  const handleOpen = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDelete = () => {
    if (deleteBookmark(id)) {
      toast.success("Success", {
        description: "Bookmark deleted successfully.",
      });
    } else {
      toast.error("Error", {
        description: "Failed to delete bookmark.",
      });
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Item
          asChild
          className="group relative w-full flex-col items-center justify-center"
          ref={ref}
          role="listitem"
          variant="outline"
        >
          <a href={url} rel="noopener noreferrer" target="_blank">
            <ItemMedia className="size-10 bg-white">
              {icon.type === "letters" && icon.letters && (
                <span className="flex items-center justify-center text-xs font-medium text-black">
                  {icon.letters}
                </span>
              )}

              {icon.type === "favicon" && (
                <img
                  alt={title}
                  className="size-5 object-contain"
                  src={`https://external-content.duckduckgo.com/ip3/${new URL(url).hostname}.ico`}
                />
              )}

              {icon.type === "custom" && icon.url && (
                <img
                  alt={title}
                  className="size-5 object-contain"
                  src={icon.url}
                />
              )}
            </ItemMedia>
            <ItemTitle className="text-center text-xs font-normal">
              {title}
            </ItemTitle>
            <ItemActions className="absolute right-0 top-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 aria-expanded:opacity-100"
                    size="icon"
                    variant="ghost"
                  >
                    <EllipsisIcon className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleOpen}>
                    <ExternalLinkIcon />
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopy}>
                    <CopyIcon />
                    Copy URL
                  </DropdownMenuItem>
                  <BookmarkDialog
                    bookmark={{ icon, id, title, url }}
                    type="update"
                  >
                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                    >
                      <EditIcon />
                      Edit
                    </DropdownMenuItem>
                  </BookmarkDialog>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    variant="destructive"
                  >
                    <Trash2Icon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </a>
        </Item>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={handleOpen}>
          <ExternalLinkIcon />
          Open
        </ContextMenuItem>
        <ContextMenuItem onClick={handleCopy}>
          <CopyIcon />
          Copy URL
        </ContextMenuItem>
        <BookmarkDialog bookmark={{ icon, id, title, url }} type="update">
          <ContextMenuItem onSelect={(event) => event.preventDefault()}>
            <EditIcon />
            Edit
          </ContextMenuItem>
        </BookmarkDialog>
        <ContextMenuItem onClick={handleDelete} variant="destructive">
          <Trash2Icon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
