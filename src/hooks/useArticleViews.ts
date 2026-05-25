// useArticleViews — localStorage-backed article view count tracking
// Storage key: "di_article_views" → Record<slug, number>
// Usage:
//   const { incrementView } = useArticleViews();          // in ArticlePage
//   const { getViewCount, viewCounts } = useArticleViews(); // in JournalsSection

const STORAGE_KEY = "di_article_views";

function loadCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

function saveCounts(counts: Record<string, number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch {
    // localStorage unavailable (private browsing, quota exceeded) — fail silently
  }
}

export function incrementArticleView(slug: string): void {
  const counts = loadCounts();
  counts[slug] = (counts[slug] ?? 0) + 1;
  saveCounts(counts);
  // Dispatch a custom event so any mounted JournalsSection can react
  window.dispatchEvent(new CustomEvent("di:viewcounts:updated"));
}

export function getArticleViewCounts(): Record<string, number> {
  return loadCounts();
}
