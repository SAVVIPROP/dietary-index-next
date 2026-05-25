/**
 * ReadingListPanel — slide-out drawer showing all bookmarked items
 * Design: vitaei.com light editorial style
 * Opens from the right, shows bookmarks grouped by type
 */
import { useEffect } from "react";
import { Link } from "@/lib/wouter-shim";
import { X, Trash2, BookOpen, Dna, BookMarked, Layers, FileText } from "lucide-react";
import { useReadingList, BookmarkEntry } from "@/contexts/ReadingListContext";
import { toast } from "sonner";

const TYPE_ICONS: Record<BookmarkEntry["type"], React.ReactNode> = {
  article:    <FileText className="w-3.5 h-3.5" />,
  diet:       <Dna className="w-3.5 h-3.5" />,
  glossary:   <BookOpen className="w-3.5 h-3.5" />,
  collection: <Layers className="w-3.5 h-3.5" />,
  section:    <BookMarked className="w-3.5 h-3.5" />,
};

const TYPE_LABELS: Record<BookmarkEntry["type"], string> = {
  article:    "Article",
  diet:       "Diet",
  glossary:   "Term",
  collection: "Collection",
  section:    "Section",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  } catch {
    return "";
  }
}

export default function ReadingListPanel() {
  const { bookmarks, count, removeBookmark, clearAll, panelOpen, closePanel } = useReadingList();

  // Close on Escape
  useEffect(() => {
    if (!panelOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closePanel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [panelOpen, closePanel]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = panelOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panelOpen]);

  const handleRemove = (id: string, title: string) => {
    removeBookmark(id);
    toast(`Removed "${title}" from reading list`);
  };

  const handleClearAll = () => {
    clearAll();
    toast("Reading list cleared");
    closePanel();
  };

  return (
    <>
      {/* Backdrop */}
      {panelOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-[2px] z-[60] transition-opacity"
          onClick={closePanel}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Reading list"
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background border-l border-border z-[70] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <BookMarked className="w-4 h-4 text-foreground" />
            <span style={{ fontFamily: "var(--font-display)" }} className="text-base font-normal text-foreground">
              Reading List
            </span>
            {count > 0 && (
              <span className="text-[10px] font-mono bg-foreground text-background px-1.5 py-0.5 rounded-sm">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closePanel}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close reading list"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {count === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <BookMarked className="w-8 h-8 text-muted-foreground/30" />
              <div>
                <p className="text-[13px] text-muted-foreground mb-1">Your reading list is empty.</p>
                <p className="text-[11px] font-mono text-muted-foreground/60">
                  Click the bookmark icon on any article, diet, or glossary term to save it here.
                </p>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {bookmarks.map((entry) => (
                <li key={entry.id} className="flex items-start gap-3 px-5 py-4 hover:bg-muted/30 transition-colors group">
                  {/* Type icon */}
                  <div className="mt-0.5 text-muted-foreground shrink-0">
                    {TYPE_ICONS[entry.type]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60">
                        {TYPE_LABELS[entry.type]}
                      </span>
                      {entry.category && (
                        <>
                          <span className="text-muted-foreground/30 text-[9px]">·</span>
                          <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60">
                            {entry.category}
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      href={entry.url}
                      onClick={closePanel}
                      className="text-[13px] text-foreground leading-snug hover:text-foreground/70 transition-colors line-clamp-2 break-words block"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {entry.title}
                    </Link>
                    {entry.subtitle && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 break-words">
                        {entry.subtitle}
                      </p>
                    )}
                    <p className="text-[10px] font-mono text-muted-foreground/50 mt-1">
                      Saved {formatDate(entry.savedAt)}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(entry.id, entry.title)}
                    className="mt-0.5 p-1 text-muted-foreground/40 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                    aria-label={`Remove ${entry.title} from reading list`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {count > 0 && (
          <div className="px-5 py-4 border-t border-border shrink-0 flex items-center justify-between gap-3">
            <p className="text-[11px] font-mono text-muted-foreground">
              {count} item{count !== 1 ? "s" : ""} saved
            </p>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Clear all
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
