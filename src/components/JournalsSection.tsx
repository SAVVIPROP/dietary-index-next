"use client";
// JournalsSection — live search + filter + sort across 120+ articles
// Design: vitaei.com light editorial — JetBrains Mono labels, Playfair Display headings
// Search enhancements: sticky controls, "/" keyboard shortcut, result feedback, tag-click search
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link } from "@/lib/wouter-shim";
import { Search, X, ArrowUpDown, ChevronDown } from "lucide-react";
import { journalArticles, journalCategories, verdictColors } from "@/lib/journals";
import { getArticleViewCounts } from "@/hooks/useArticleViews";
import ShareBookmark from "@/components/ShareBookmark";

// Ordered filter list — most-populated categories first
const ORDERED_CATEGORIES = [
  "Diet Science",
  "Myths Debunked",
  "Cultural Longevity",
  "Nutrients & Supplements",
  "Gut Health",
  "Longevity Science",
  "Brain Health",
  "Cancer & Diet",
  "Cardiovascular",
  "Food Intolerances",
  "Eating Patterns",
  "Nutrition Science",
];
const ALL_FILTERS = ["All", "New", "Quick reads", ...ORDERED_CATEGORIES.filter(c => journalCategories.includes(c))];

type SortKey = "latest" | "tier" | "readTime" | "mostRead";
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "latest", label: "Latest" },
  { key: "tier", label: "Tier I First" },
  { key: "readTime", label: "Quickest Read" },
  { key: "mostRead", label: "Most Read" },
];

const NEWEST_DATE = journalArticles.reduce((max, a) => a.publishDate > max ? a.publishDate : max, "");
function isNew(publishDate: string): boolean {
  const newest = new Date(NEWEST_DATE);
  const pub = new Date(publishDate);
  const diffDays = (newest.getTime() - pub.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 90;
}
const NEW_COUNT = journalArticles.filter(a => isNew(a.publishDate)).length;

// Quick reads = articles with a read time of 5 minutes or under
function parseReadMinutes(readTime: string): number {
  const match = readTime.match(/(\d+)/);
  return match ? parseInt(match[1]) : 99;
}
const QUICK_READ_MAX_MINUTES = 8; // ≤8 min = quick read (captures 7 min + 6 min articles)
const QUICK_READ_COUNT = journalArticles.filter(a => parseReadMinutes(a.readTime) <= QUICK_READ_MAX_MINUTES).length;

// Verdict filter — ordered from most positive to most negative
const VERDICT_OPTIONS = [
  { key: "True",        label: "True",         count: journalArticles.filter(a => a.verdictShort === "True").length },
  { key: "Mostly True", label: "Mostly True",  count: journalArticles.filter(a => a.verdictShort === "Mostly True").length },
  { key: "Nuanced",     label: "Nuanced",      count: journalArticles.filter(a => a.verdictShort === "Nuanced").length },
  { key: "Partly True", label: "Partly True",  count: journalArticles.filter(a => a.verdictShort === "Partly True").length },
  { key: "Mostly Myth", label: "Mostly Myth",  count: journalArticles.filter(a => a.verdictShort === "Mostly Myth").length },
  { key: "Myth",        label: "Myth",         count: journalArticles.filter(a => a.verdictShort === "Myth").length },
].filter(v => v.count > 0);

function sortArticles(
  articles: typeof journalArticles,
  sortKey: SortKey,
  viewCounts: Record<string, number> = {}
) {
  const sorted = [...articles];
  if (sortKey === "latest") return sorted.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  if (sortKey === "tier") {
    const tierOrder: Record<string, number> = { "I": 0, "II": 1, "III": 2 };
    return sorted.sort((a, b) => (tierOrder[a.tier] ?? 3) - (tierOrder[b.tier] ?? 3));
  }
  if (sortKey === "readTime") {
    return sorted.sort((a, b) => (parseInt(a.readTime) || 99) - (parseInt(b.readTime) || 99));
  }
  if (sortKey === "mostRead") {
    return sorted.sort((a, b) => (viewCounts[b.slug] ?? 0) - (viewCounts[a.slug] ?? 0));
  }
  return sorted;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-foreground/10 text-foreground not-italic rounded-[2px]">{part}</mark>
    ) : part
  );
}

// ── Article card ──────────────────────────────────────────────────────────────
// Detect which major journal family an article primarily cites
const SOURCE_KEYS = ["NEJM", "Cell", "JAMA", "Lancet", "Nature", "BMJ"] as const;
type SourceKey = typeof SOURCE_KEYS[number];

function detectPrimarySource(article: (typeof journalArticles)[0]): SourceKey | null {
  for (const key of SOURCE_KEYS) {
    const aliases = SOURCE_ALIASES[key];
    if (article.refs.some(ref =>
      aliases.some(alias => ref.journal.toLowerCase().includes(alias.toLowerCase()))
    )) return key;
  }
  return null;
}

function ArticleCard({
  article,
  searchQuery,
  onTagClick,
  onSourceClick,
  viewCount,
}: {
  article: (typeof journalArticles)[0];
  searchQuery: string;
  onTagClick: (tag: string) => void;
  onSourceClick: (source: string) => void;
  viewCount?: number;
}) {
  const verdictColor = verdictColors[article.verdictShort] ?? "var(--muted-foreground)";
  const primarySource = detectPrimarySource(article);

  return (
    <div className="bg-background p-4 sm:p-5 flex flex-col gap-3 hover:bg-muted/20 transition-colors group">
      {/* Top meta */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-2 py-0.5">
            {article.category}
          </span>
          <span className={`tier-pill tier-${article.tier.toLowerCase()}`}>Tier {article.tier}</span>
          {primarySource && (
            <button
              onClick={() => onSourceClick(primarySource)}
              className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 border border-border/60 text-muted-foreground/70 hover:border-foreground/40 hover:text-foreground transition-colors"
              title={`Filter by ${primarySource}`}
            >
              {primarySource}
            </button>
          )}
          {isNew(article.publishDate) && (
            <span
              className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5"
              style={{ background: "var(--tier-i)", color: "oklch(0.98 0.01 148)", letterSpacing: "0.1em" }}
            >
              New
            </span>
          )}
        </div>
        <ShareBookmark
          id={`journal-${article.id}`}
          title={article.title}
          url={`/journals/${article.slug}`}
          size="sm"
        />
      </div>

      {/* Title */}
      <Link href={`/journals/${article.slug}`}>
        <h3
          style={{ fontFamily: "var(--font-display)" }}
          className="text-[16px] sm:text-[17px] font-normal text-foreground leading-snug group-hover:text-foreground/80 transition-colors cursor-pointer break-words"
        >
          {highlightMatch(article.title, searchQuery)}
        </h3>
      </Link>

      {/* Subtitle */}
      <p className="text-[12px] text-muted-foreground leading-relaxed break-words line-clamp-2">
        {highlightMatch(article.subtitle, searchQuery)}
      </p>

      {/* Tags — clickable to search */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 4).map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 border transition-colors ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? "border-foreground/40 bg-foreground/8 text-foreground"
                  : "border-border/50 text-muted-foreground/60 hover:border-foreground/30 hover:text-muted-foreground"
              }`}
              title={`Search for "${tag}"`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Verdict badge */}
      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
        <div
          className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 border shrink-0"
          style={{ color: verdictColor, borderColor: verdictColor + "40", background: verdictColor + "0d" }}
        >
          {article.verdictShort}
        </div>
        <span className="text-[11px] text-muted-foreground/60 break-words line-clamp-1 flex-1 min-w-0">
          {article.verdict.slice(0, 60)}…
        </span>
      </div>

      {/* Bottom meta */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[10px] font-mono text-muted-foreground">{article.readTime} read</span>
        <span className="text-[10px] font-mono text-muted-foreground/40">·</span>
        <span className="text-[10px] font-mono text-muted-foreground">{article.searchVolume}</span>
        {viewCount !== undefined && viewCount > 0 && (
          <>
            <span className="text-[10px] font-mono text-muted-foreground/40">·</span>
            <span className="text-[10px] font-mono text-muted-foreground/60">{viewCount.toLocaleString()} view{viewCount !== 1 ? "s" : ""}</span>
          </>
        )}
        <Link
          href={`/journals/${article.slug}`}
          className="ml-auto text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 whitespace-nowrap"
        >
          Read →
        </Link>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
// Source-to-journal-name normalization map
const SOURCE_ALIASES: Record<string, string[]> = {
  NEJM: ["NEJM", "New England Journal of Medicine", "N Engl J Med"],
  Cell: ["Cell", "Cell Metabolism", "Cell Reports", "Cell Host & Microbe"],
  JAMA: ["JAMA", "JAMA Internal Medicine", "JAMA Intern Med", "JAMA Oncology", "JAMA Pediatrics", "JAMA Network Open"],
  Lancet: ["Lancet", "The Lancet", "Lancet Diabetes Endocrinol", "The Lancet Diabetes & Endocrinology", "Lancet Oncology", "The Lancet Oncology", "Lancet Psychiatry"],
  Nature: ["Nature", "Nature Medicine", "Nature Metabolism", "Nature Reviews", "Nature Communications", "Nature Aging"],
  BMJ: ["BMJ", "British Medical Journal", "BMJ Nutrition", "BMJ Open"],
};

function articleCitesSource(article: { refs: { journal: string }[] }, source: string): boolean {
  const aliases = SOURCE_ALIASES[source];
  if (!aliases) return false;
  return article.refs.some(ref =>
    aliases.some(alias => ref.journal.toLowerCase().includes(alias.toLowerCase()))
  );
}

export default function JournalsSection({ initialVerdictFilter = "", initialSourceFilter = "" }: { initialVerdictFilter?: string; initialSourceFilter?: string }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>(() => getArticleViewCounts());
  const [verdictFilter, setVerdictFilter] = useState(initialVerdictFilter);
  const [sourceFilter, setSourceFilter] = useState(initialSourceFilter);
  const [verdictOpen, setVerdictOpen] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [tierIOnly, setTierIOnly] = useState(false);
  const [isStuck, setIsStuck] = useState(false);

  const verdictRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const TIER_I_COUNT = useMemo(() => journalArticles.filter(a => a.tier === "I").length, []);

  // "/" keyboard shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // IntersectionObserver to detect when controls are sticky
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-57px 0px 0px 0px" } // 56px = nav height
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setSearchQuery(tag);
    setActiveFilter("All");
    searchRef.current?.focus();
  }, []);

  const clearAll = useCallback(() => {
    setSearchQuery("");
    setActiveFilter("All");
    setTierIOnly(false);
    setVerdictFilter("");
    setSourceFilter("");
  }, []);

  // Sync view counts when any article page increments them
  useEffect(() => {
    const handler = () => setViewCounts(getArticleViewCounts());
    window.addEventListener("di:viewcounts:updated", handler);
    return () => window.removeEventListener("di:viewcounts:updated", handler);
  }, []);

  // Close verdict + source dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (verdictRef.current && !verdictRef.current.contains(e.target as Node)) {
        setVerdictOpen(false);
      }
      if (sourceRef.current && !sourceRef.current.contains(e.target as Node)) {
        setSourceOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    let results = activeFilter === "All"
      ? journalArticles
      : activeFilter === "New"
      ? journalArticles.filter(a => isNew(a.publishDate))
      : activeFilter === "Quick reads"
      ? journalArticles.filter(a => parseReadMinutes(a.readTime) <= QUICK_READ_MAX_MINUTES)
      : journalArticles.filter(a => a.category === activeFilter);

    if (tierIOnly) results = results.filter(a => a.tier === "I");
    if (verdictFilter === "Myths") {
      results = results.filter(a => a.verdictShort === "Myth" || a.verdictShort === "Mostly Myth");
    } else if (verdictFilter) {
      results = results.filter(a => a.verdictShort === verdictFilter);
    }
    if (sourceFilter) {
      results = results.filter(a => articleCitesSource(a, sourceFilter));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.verdict.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.verdictShort.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }

    return sortArticles(results, sortKey, viewCounts);
  }, [activeFilter, searchQuery, sortKey, tierIOnly, verdictFilter, sourceFilter, viewCounts]);

  const activeSortLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? "Latest";
  const isFiltered = searchQuery.trim() || activeFilter !== "All" || tierIOnly || verdictFilter || sourceFilter;
  const activeVerdictLabel = verdictFilter === "Myths"
    ? "Myths"
    : VERDICT_OPTIONS.find(v => v.key === verdictFilter)?.label ?? "Verdict";

  const SOURCE_OPTIONS = useMemo(() =>
    SOURCE_KEYS.map(key => ({
      key,
      count: journalArticles.filter(a =>
        a.refs.some(ref =>
          SOURCE_ALIASES[key].some(alias => ref.journal.toLowerCase().includes(alias.toLowerCase()))
        )
      ).length,
    }))
  , []);

  return (
    <section id="journals" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">

        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 08</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Journals & Guides</span>
          </div>
          <ShareBookmark id="journals" title="§ 08 Journals & Guides — Dietary Index" size="sm" />
        </div>

        <div className="mb-6 sm:mb-8">
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-3 leading-tight"
          >
            The questions everyone asks. Answered by the evidence.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed max-w-2xl break-words">
            Over 120 evidence-based guides covering dietary myths, nutrients, cultural longevity patterns, and gut health. Every claim is traceable to a primary source.
          </p>
        </div>

        {/* Sentinel for sticky detection */}
        <div ref={sentinelRef} className="h-px -mt-px" aria-hidden />

        {/* Sticky search + sort controls */}
        <div
          ref={stickyRef}
          className={`sticky top-14 z-20 bg-background transition-shadow duration-200 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ${
            isStuck ? "shadow-[0_1px_0_0_hsl(var(--border)),0_4px_12px_-4px_rgba(0,0,0,0.06)]" : ""
          }`}
        >
          <div className="py-3 flex items-center gap-2 sm:gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, verdicts…"
                className="w-full pl-9 pr-16 py-2 text-[12px] font-mono bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors"
                aria-label="Search journal articles"
              />
              {/* Keyboard shortcut hint (hidden when focused/typing) */}
              {!searchQuery && (
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[9px] font-mono text-muted-foreground/40 border border-border/50 px-1.5 py-0.5 rounded-[3px] pointer-events-none">
                  /
                </kbd>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Tier I toggle */}
            <button
              onClick={() => setTierIOnly(t => !t)}
              className={`shrink-0 flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase px-3 py-2 border transition-colors ${
                tierIOnly
                  ? "border-[var(--tier-i)] bg-[var(--tier-i)]/10 text-[var(--tier-i)]"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
              aria-pressed={tierIOnly}
              title={`Show only Tier I (RCT-backed) articles — ${TIER_I_COUNT} available`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: tierIOnly ? "var(--tier-i)" : "currentColor", opacity: tierIOnly ? 1 : 0.4 }}
              />
              <span className="hidden sm:inline">Tier I Only</span>
              <span className="sm:hidden">T-I</span>
              <span className={`text-[9px] tabular-nums ${tierIOnly ? "opacity-70" : "opacity-40"}`}>{TIER_I_COUNT}</span>
            </button>

            {/* Source filter dropdown */}
            <div ref={sourceRef} className="relative shrink-0">
              <button
                onClick={() => setSourceOpen(o => !o)}
                className={`flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase px-3 py-2 border transition-colors ${
                  sourceFilter
                    ? "border-foreground/40 bg-foreground/5 text-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
                aria-label="Filter by journal source"
                aria-expanded={sourceOpen}
              >
                <span className="hidden sm:inline">{sourceFilter || "Source"}</span>
                <span className="sm:hidden">{sourceFilter || "Src"}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${sourceOpen ? "rotate-180" : ""}`} />
              </button>
              {sourceOpen && (
                <div className="absolute right-0 top-full mt-1 z-30 border border-border bg-background shadow-md min-w-[150px]">
                  <button
                    onClick={() => { setSourceFilter(""); setSourceOpen(false); }}
                    className={`w-full text-left text-[10px] font-mono tracking-wider uppercase px-3 py-2 transition-colors border-b border-border ${
                      !sourceFilter
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    }`}
                  >
                    All sources
                  </button>
                  {SOURCE_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => { setSourceFilter(opt.key); setSourceOpen(false); }}
                      className={`w-full text-left text-[10px] font-mono tracking-wider uppercase px-3 py-2 transition-colors flex items-center justify-between gap-3 ${
                        sourceFilter === opt.key
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                      }`}
                    >
                      <span>{opt.key}</span>
                      <span className="text-[9px] tabular-nums opacity-50">{opt.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Verdict filter dropdown */}
            <div ref={verdictRef} className="relative shrink-0">
              <button
                onClick={() => setVerdictOpen(o => !o)}
                className={`flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase px-3 py-2 border transition-colors ${
                  verdictFilter
                    ? "border-foreground/40 bg-foreground/5 text-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
                aria-label="Filter by verdict"
                aria-expanded={verdictOpen}
              >
                {verdictFilter && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: verdictColors[verdictFilter] ?? "currentColor" }}
                  />
                )}
                <span className="hidden sm:inline">{activeVerdictLabel}</span>
                <span className="sm:hidden">{verdictFilter ? activeVerdictLabel.split(" ")[0] : "V"}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${verdictOpen ? "rotate-180" : ""}`} />
              </button>
              {verdictOpen && (
                <div className="absolute right-0 top-full mt-1 z-30 border border-border bg-background shadow-md min-w-[150px]">
                  {/* All verdicts option */}
                  <button
                    onClick={() => { setVerdictFilter(""); setVerdictOpen(false); }}
                    className={`w-full text-left text-[10px] font-mono tracking-wider uppercase px-3 py-2 transition-colors border-b border-border ${
                      !verdictFilter
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    }`}
                  >
                    All verdicts
                  </button>
                  {VERDICT_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => { setVerdictFilter(opt.key); setVerdictOpen(false); }}
                      className={`w-full text-left text-[10px] font-mono tracking-wider uppercase px-3 py-2 transition-colors flex items-center justify-between gap-3 ${
                        verdictFilter === opt.key
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: verdictFilter === opt.key ? "currentColor" : (verdictColors[opt.key] ?? "currentColor") }}
                        />
                        {opt.label}
                      </span>
                      <span className="text-[9px] tabular-nums opacity-50">{opt.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase px-3 py-2 border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors"
                aria-label="Sort articles"
              >
                <ArrowUpDown className="w-3 h-3" />
                <span className="hidden sm:inline">{activeSortLabel}</span>
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 z-30 border border-border bg-background shadow-md min-w-[140px]">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => { setSortKey(opt.key); setSortOpen(false); }}
                      className={`w-full text-left text-[10px] font-mono tracking-wider uppercase px-3 py-2 transition-colors ${
                        sortKey === opt.key
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 pb-3">
            {ALL_FILTERS.map(f => {
            const count = f === "All"
              ? journalArticles.length
              : f === "New"
              ? NEW_COUNT
              : f === "Quick reads"
              ? QUICK_READ_COUNT
              : journalArticles.filter(a => a.category === f).length;
              const isNewTab = f === "New";
              const isQuickTab = f === "Quick reads";
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[10px] font-mono tracking-wider uppercase px-2.5 sm:px-3 py-1.5 border transition-colors flex items-center gap-1.5 ${
                    activeFilter === f
                      ? isNewTab
                        ? "border-[var(--tier-i)] bg-[var(--tier-i)] text-white"
                        : isQuickTab
                        ? "border-[oklch(0.60_0.10_72)] bg-amber-600 text-white"
                        : "border-foreground bg-foreground text-background"
                      : isNewTab
                      ? "border-[var(--tier-i)]/40 text-[var(--tier-i)] hover:border-[var(--tier-i)] hover:bg-[var(--tier-i)]/5"
                      : isQuickTab
                      ? "border-[oklch(0.60_0.10_72)]/30 text-amber-700 dark:text-[oklch(0.65_0.10_72)] hover:border-[oklch(0.60_0.10_72)]/60 hover:bg-[oklch(0.76_0.09_72)]/5"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {f}
                  <span className={`text-[9px] tabular-nums ${activeFilter === f ? "opacity-60" : "opacity-40"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search result feedback bar */}
        {isFiltered && (
          <div className="flex items-center justify-between gap-3 py-2.5 mb-4 border-b border-border">
            <p className="text-[11px] font-mono text-muted-foreground">
              {searchQuery.trim() ? (
                <>
                  <span className="text-foreground font-medium">{filtered.length}</span>
                  {" "}result{filtered.length !== 1 ? "s" : ""} for{" "}
                  <span className="text-foreground">"{searchQuery}"</span>
                  {activeFilter !== "All" && <span className="text-muted-foreground/60"> in {activeFilter}</span>}
                  {sourceFilter && verdictFilter ? (
                    <span className="text-muted-foreground/60"> · <span className="text-foreground">{sourceFilter}</span> · <span className="text-foreground">{verdictFilter}</span></span>
                  ) : sourceFilter ? (
                    <span className="text-muted-foreground/60"> · source: <span className="text-foreground">{sourceFilter}</span></span>
                  ) : verdictFilter ? (
                    <span className="text-muted-foreground/60"> · {verdictFilter}</span>
                  ) : null}
                  {tierIOnly && <span className="text-muted-foreground/60"> · Tier I only</span>}
                </>
              ) : (
                <>
                  <span className="text-foreground font-medium">{filtered.length}</span>
                  {" "}article{filtered.length !== 1 ? "s" : ""}
                  {activeFilter !== "All" && <span> in <span className="text-foreground">{activeFilter}</span></span>}
                  {sourceFilter && verdictFilter ? (
                    <span> · <span className="text-foreground">{sourceFilter}</span> · <span className="text-foreground">{verdictFilter}</span></span>
                  ) : sourceFilter ? (
                    <span> · source: <span className="text-foreground">{sourceFilter}</span></span>
                  ) : verdictFilter ? (
                    <span> · verdict: <span className="text-foreground">{verdictFilter}</span></span>
                  ) : null}
                  {tierIOnly && <span className="text-muted-foreground/60"> · Tier I only</span>}
                </>
              )}
            </p>
            <button
              onClick={clearAll}
              className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/30 pb-0.5 whitespace-nowrap"
            >
              Clear all ×
            </button>
          </div>
        )}

        {/* Blue Zones featured collection banner — only when unfiltered */}
        {activeFilter === "All" && !searchQuery && !tierIOnly && !sourceFilter && (
          <Link href="/journals/blue-zones">
            <div className="mb-6 border border-border bg-background hover:border-foreground/30 hover:shadow-sm transition-all cursor-pointer p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 group">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-xs font-mono font-bold">BZ</div>
                <div>
                  <div className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground mb-0.5">FEATURED COLLECTION</div>
                  <div style={{ fontFamily: "var(--font-display)" }} className="text-[15px] sm:text-[17px] text-foreground group-hover:text-foreground/80 transition-colors">The Blue Zones Diet Collection</div>
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed flex-1 break-words">
                Five regions where people live past 100 — Okinawa, Sardinia, Ikaria, Nicoya, and Loma Linda. A complete evidence-based guide to the dietary patterns that explain extraordinary longevity.
              </p>
              <span className="text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 whitespace-nowrap shrink-0">
                Explore Collection →
              </span>
            </div>
          </Link>
        )}

        {/* Article grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filtered.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                searchQuery={searchQuery}
                onTagClick={handleTagClick}
                onSourceClick={setSourceFilter}
                viewCount={sortKey === "mostRead" ? (viewCounts[article.slug] ?? 0) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="border border-border py-16 text-center">
            <p className="text-[13px] font-mono text-muted-foreground mb-1">
              No articles match{searchQuery ? ` "${searchQuery}"` : " your filters"}.
            </p>
            <p className="text-[11px] text-muted-foreground/60 mb-4">
              Try a different keyword, or browse all categories.
            </p>
            <button
              onClick={clearAll}
              className="text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5"
            >
              Clear all filters →
            </button>
          </div>
        )}

        {/* Footer count */}
        <p className="text-[11px] font-mono text-muted-foreground mt-4">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {isFiltered ? ` matched` : ` · all claims linked to primary sources`}
        </p>
      </div>
    </section>
  );
}
