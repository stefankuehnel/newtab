import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { BookMarkedIcon, PlusIcon } from "lucide-react";
import React from "react";

import type { Bookmark as BookmarkProps } from "@/types";

import { Bookmark } from "@/components/bookmark";
import { BookmarkDialog } from "@/components/bookmark-dialog";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";
import { useBookmarks } from "@/contexts/bookmarks-context";

type SortableProps = {
  bookmark: BookmarkProps;
  index: number;
};

const Sortable: React.FC<SortableProps> = ({ bookmark, index }) => {
  const { ref } = useSortable({ id: bookmark.id, index });

  return (
    <Bookmark
      icon={bookmark.icon}
      id={bookmark.id}
      ref={ref}
      title={bookmark.title}
      url={bookmark.url}
    />
  );
};

export const BookmarkList: React.FC = () => {
  const { bookmarks, setBookmarks } = useBookmarks();

  if (bookmarks.size === 0) {
    return (
      <Empty className="flex-initial">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookMarkedIcon />
          </EmptyMedia>
          <EmptyTitle>No Bookmarks Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any bookmarks yet. Get started by creating
            your first bookmark.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <BookmarkDialog type="create">
            <Button variant="outline">Create Bookmark</Button>
          </BookmarkDialog>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-medium">
          <BookMarkedIcon className="size-4" />
          Bookmarks
        </h2>
        <BookmarkDialog type="create">
          <Button size="sm" variant="outline">
            <PlusIcon />
            Create Bookmark
          </Button>
        </BookmarkDialog>
      </div>
      <ItemGroup className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] lg:grid-cols-6 gap-4">
        <DragDropProvider
          onDragEnd={(event) => {
            setBookmarks(
              (bookmarks) =>
                new Map(
                  move(bookmarks.values().toArray(), event).map((bookmark) => [
                    bookmark.id,
                    bookmark,
                  ]),
                ),
            );
          }}
        >
          {bookmarks
            .entries()
            .toArray()
            .map(([id, bookmark], index) => (
              <Sortable bookmark={bookmark} index={index} key={id} />
            ))}
        </DragDropProvider>
      </ItemGroup>
    </div>
  );
};
