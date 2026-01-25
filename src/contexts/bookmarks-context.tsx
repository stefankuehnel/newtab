import React from "react";
import SuperJSON from "superjson";

import { type Bookmark, type Bookmarks, type UUID } from "@/types";

export type BookmarksContextProviderProps = React.PropsWithChildren<{
  defaultBookmarks: Bookmarks;
  storageKey?: string;
}>;

export type BookmarksContextState = {
  bookmarks: Bookmarks;
  createBookmark: (bookmark: Bookmark) => Bookmark;
  deleteBookmark: (id: UUID) => boolean;
  readBookmark: (id: UUID) => Bookmark | undefined;
  setBookmarks: (bookmarks: Bookmarks) => void;
  updateBookmark: (id: UUID, bookmark: Bookmark) => Bookmark;
};

const defaultBookmarks: Bookmarks = new Map();
const defaultBookmarksContextState: BookmarksContextState = {
  bookmarks: defaultBookmarks,
  createBookmark: () => ({}) as Bookmark,
  deleteBookmark: () => false,
  readBookmark: () => undefined,
  setBookmarks: () => {},
  updateBookmark: () => ({}) as Bookmark,
};

const BookmarksContext = React.createContext<BookmarksContextState>(
  defaultBookmarksContextState,
);

export const BookmarksContextProvider: React.FC<
  BookmarksContextProviderProps
> = ({
  children,
  defaultBookmarks,
  storageKey = "vite-ui-bookmarks",
  ...props
}) => {
  const [bookmarks, setBookmarks] = React.useState<Bookmarks>(() => {
    const storedBookmarksJSON = localStorage.getItem(storageKey);
    if (!storedBookmarksJSON) {
      return defaultBookmarks;
    }

    try {
      const bookmarks = SuperJSON.parse<Bookmarks>(storedBookmarksJSON);

      return new Map(Object.entries(bookmarks) as Array<[UUID, Bookmark]>);
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage:", error);

      return defaultBookmarks;
    }
  });

  React.useEffect(() => {
    localStorage.setItem(
      storageKey,
      SuperJSON.stringify(Object.fromEntries(bookmarks)),
    );
  }, [bookmarks, storageKey]);

  const value: BookmarksContextState = {
    bookmarks,
    createBookmark: (bookmark: Bookmark) => {
      setBookmarks((previous) => {
        const next = new Map<UUID, Bookmark>(previous);

        next.set(bookmark.id, bookmark);

        return next;
      });

      return bookmark;
    },
    deleteBookmark: (id: UUID) => {
      let isDeleted = false;

      setBookmarks((previous) => {
        const next = new Map<UUID, Bookmark>(previous);

        isDeleted = next.delete(id);

        return next;
      });

      return isDeleted;
    },
    readBookmark: (id: UUID) => {
      return bookmarks.get(id);
    },
    setBookmarks,
    updateBookmark: (id: UUID, bookmark: Bookmark) => {
      setBookmarks((previous) => {
        const next = new Map<UUID, Bookmark>(previous);

        next.set(id, bookmark);

        return next;
      });

      return bookmark;
    },
  };

  return (
    <BookmarksContext.Provider value={value} {...props}>
      {children}
    </BookmarksContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarks = () => {
  const bookmarksContext = React.useContext(BookmarksContext);

  if (!bookmarksContext) {
    throw new Error(
      "'useBookmarks()' must be used within a '<BookmarksContextProvider />'",
    );
  }

  return bookmarksContext;
};
