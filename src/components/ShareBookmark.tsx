// ShareBookmark — reusable share + bookmark buttons for all content cards
// Wired to ReadingListContext so bookmarks appear in the NavBar reading list panel
import { toast } from "sonner";
import { useReadingList, BookmarkEntry } from "@/contexts/ReadingListContext";

interface ShareBookmarkProps {
  id: string;
  title: string;
  url?: string;
  size?: "sm" | "md";
  type?: BookmarkEntry["type"];
  subtitle?: string;
  category?: string;
}

export default function ShareBookmark({
  id,
  title,
  url,
  size = "md",
  type = "section",
  subtitle,
  category,
}: ShareBookmarkProps) {
  const { isBookmarked, toggleBookmark } = useReadingList();
  const bookmarked = isBookmarked(id);

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleBookmark({
      id,
      title,
      url: url || window.location.href,
      type,
      subtitle,
      category,
    });
    toast(added ? "Added to reading list" : "Removed from reading list", {
      description: title,
      duration: 2000,
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = url || window.location.href;
    const shareData = { title: `Dietary Index — ${title}`, url: shareUrl };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData); } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast("Link copied to clipboard", { description: title, duration: 2000 });
    }
  };

  const btnClass =
    size === "sm"
      ? "w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-muted"
      : "w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-muted";

  return (
    <div className="flex items-center gap-0.5 shrink-0" onClick={e => e.stopPropagation()}>
      <button className={btnClass} onClick={handleShare} title="Share" aria-label="Share">
        <ShareIcon size={size === "sm" ? 12 : 14} />
      </button>
      <button
        className={`${btnClass} ${bookmarked ? "text-foreground" : ""}`}
        onClick={handleToggleBookmark}
        title={bookmarked ? "Remove from reading list" : "Save to reading list"}
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <BookmarkIcon size={size === "sm" ? 12 : 14} filled={bookmarked} />
      </button>
    </div>
  );
}

function ShareIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="3" r="1.5" />
      <circle cx="4" cy="8" r="1.5" />
      <circle cx="12" cy="13" r="1.5" />
      <line x1="5.5" y1="7.1" x2="10.5" y2="4.4" />
      <line x1="5.5" y1="8.9" x2="10.5" y2="11.6" />
    </svg>
  );
}

function BookmarkIcon({ size, filled }: { size: number; filled: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2h10v13l-5-3-5 3V2z" />
    </svg>
  );
}
