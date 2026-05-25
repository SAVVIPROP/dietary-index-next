/**
 * ReadingListContext — global bookmark/reading list state
 * Persists to localStorage under "di_bookmarks"
 * Provides add/remove/toggle and a live count for the NavBar badge
 */
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface BookmarkEntry {
  type: "article" | "diet" | "glossary" | "collection" | "section";
  id: string;
  title: string;
  url: string;
  subtitle?: string;
  category?: string;
  savedAt: string;
}

interface ReadingListContextValue {
  bookmarks: BookmarkEntry[];
  count: number;
  isBookmarked: (id: string) => boolean;
  addBookmark: (entry: Omit<BookmarkEntry, "savedAt">) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: (entry: Omit<BookmarkEntry, "savedAt">) => boolean; // returns true if added
  clearAll: () => void;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const STORAGE_KEY = "di_bookmarks";

const ReadingListContext = createContext<ReadingListContextValue | null>(null);

export function ReadingListProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);

  // Hydrate from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch { /* noop */ }
  }, []);
  const [panelOpen, setPanelOpen] = useState(false);

  // Sync to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = useCallback((id: string) => bookmarks.some(b => b.id === id), [bookmarks]);

  const addBookmark = useCallback((entry: Omit<BookmarkEntry, "savedAt">) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === entry.id)) return prev;
      return [...prev, { ...entry, savedAt: new Date().toISOString() }];
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const toggleBookmark = useCallback((entry: Omit<BookmarkEntry, "savedAt">) => {
    let added = false;
    setBookmarks(prev => {
      if (prev.some(b => b.id === entry.id)) {
        added = false;
        return prev.filter(b => b.id !== entry.id);
      }
      added = true;
      return [...prev, { ...entry, savedAt: new Date().toISOString() }];
    });
    return added;
  }, []);

  const clearAll = useCallback(() => setBookmarks([]), []);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  return (
    <ReadingListContext.Provider value={{
      bookmarks,
      count: bookmarks.length,
      isBookmarked,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      clearAll,
      panelOpen,
      openPanel,
      closePanel,
    }}>
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  const ctx = useContext(ReadingListContext);
  if (!ctx) throw new Error("useReadingList must be used within ReadingListProvider");
  return ctx;
}
