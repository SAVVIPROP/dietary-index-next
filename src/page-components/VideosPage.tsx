"use client";
// VideosPage — Dietary Index Video Channel
// Layout mirrors vitaei.com/videos exactly, adapted for dietary science

import { useState, useMemo, useRef, useEffect } from "react";
import { Play, ChevronDown, ChevronUp, Clock, Calendar, Search, ArrowLeft } from "lucide-react";
import { Link, useSearch } from "@/lib/wouter-shim";
import {
  dietaryVideos,
  SPEAKER_FILTERS,
  TOPIC_FILTERS,
  type DietaryVideo,
} from "@/lib/videos";

// ── Speaker badge colours (one per speaker last-name key) ──────────────────
const SPEAKER_COLORS: Record<string, { bg: string; text: string }> = {
  Willett:  { bg: "#E8F4EC", text: "#2D6A4F" },
  Gardner:  { bg: "#EAF0FB", text: "#1A4E8C" },
  Spector:  { bg: "#F3EAF8", text: "#6B21A8" },
  Hyman:    { bg: "#FEF3C7", text: "#92400E" },
  Attia:    { bg: "#FEE2E2", text: "#991B1B" },
  Norton:   { bg: "#E0F2FE", text: "#075985" },
  Lyon:     { bg: "#FCE7F3", text: "#9D174D" },
  Patrick:  { bg: "#ECFDF5", text: "#065F46" },
  Katz:     { bg: "#FFF7ED", text: "#9A3412" },
  Lustig:   { bg: "#F0FDF4", text: "#166534" },
  Huberman: { bg: "#EFF6FF", text: "#1D4ED8" },
  Longo:    { bg: "#FDF4FF", text: "#7E22CE" },
};

// ── YouTube thumbnail helper ───────────────────────────────────────────────
function YoutubeThumbnail({ videoId, title }: { videoId: string; title: string }) {
  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
      alt={title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
}

// ── Play button overlay ────────────────────────────────────────────────────
function PlayOverlay({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center group"
      aria-label="Play video"
    >
      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-white/30 transition-all">
        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
      </div>
    </button>
  );
}

// ── Video modal (YouTube embed) ────────────────────────────────────────────
function VideoModal({ video, onClose }: { video: DietaryVideo; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-black rounded-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="p-4 bg-background">
          <p className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
            {video.channel} · {video.duration} · {video.year}
          </p>
          <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg font-normal text-foreground">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

// ── Video card ─────────────────────────────────────────────────────────────
function VideoCard({ video }: { video: DietaryVideo }) {
  const [showTakeaways, setShowTakeaways] = useState(false);
  const [playing, setPlaying] = useState(false);
  const speakerColor = SPEAKER_COLORS[video.speakerShort] ?? { bg: "#F3F4F6", text: "#374151" };

  return (
    <>
      {playing && <VideoModal video={video} onClose={() => setPlaying(false)} />}
      <article className="border border-border bg-background flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => setPlaying(true)}>
          <YoutubeThumbnail videoId={video.youtubeId} title={video.title} />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Speaker badge */}
          <span
            className="absolute top-2 right-2 text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm"
            style={{ background: speakerColor.bg, color: speakerColor.text }}
          >
            {video.speaker}
          </span>
          <PlayOverlay onClick={() => setPlaying(true)} />
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          {/* Meta */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <span>{video.channel}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{video.duration}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" />{video.year}</span>
          </div>

          {/* Title */}
          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className="text-[15px] font-normal text-foreground leading-snug cursor-pointer hover:text-primary transition-colors"
            onClick={() => setPlaying(true)}
          >
            {video.title}
          </h3>

          {/* Description */}
          <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3">
            {video.description}
          </p>

          {/* Topic tags */}
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {video.topics.map(t => (
              <span
                key={t}
                className="text-[9px] font-mono tracking-wider uppercase border border-border px-1.5 py-0.5 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Key takeaways toggle */}
          <button
            className="flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors mt-1 w-fit"
            onClick={() => setShowTakeaways(v => !v)}
          >
            {showTakeaways ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showTakeaways ? "Hide key takeaways" : "Show key takeaways"}
          </button>

          {showTakeaways && (
            <ul className="border-l-2 border-primary/30 pl-3 space-y-1.5 mt-1">
              {video.takeaways.map((t, i) => (
                <li key={i} className="text-[11px] text-muted-foreground leading-relaxed">
                  {t}
                </li>
              ))}
            </ul>
          )}

          {/* Related diets */}
          {video.relatedDiets.length > 0 && (
            <div className="mt-1">
              <p className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
                Related diets
              </p>
              <div className="flex flex-wrap gap-1">
                {video.relatedDiets.map(d => (
                  <Link
                    key={d}
                    href="/diets"
                    className="text-[9px] font-mono tracking-wider uppercase border border-primary/30 px-1.5 py-0.5 text-primary hover:bg-primary/5 transition-colors"
                  >
                    {d}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function VideosPage() {
  const searchString = useSearch();

  // Parse URL params for pre-filtering from nav sub-links
  const urlParams = useMemo(() => new URLSearchParams(searchString), [searchString]);
  const urlTopic = urlParams.get("topic") ?? "";
  const urlSpeaker = urlParams.get("speaker") ?? "";

  const [search, setSearch] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState(() =>
    urlSpeaker && SPEAKER_FILTERS.includes(urlSpeaker) ? urlSpeaker : "All"
  );
  const [activeTopic, setActiveTopic] = useState(() =>
    urlTopic && TOPIC_FILTERS.includes(urlTopic) ? urlTopic : "All topics"
  );
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync state when URL params change (e.g. nav sub-link clicked while already on /videos)
  useEffect(() => {
    if (urlTopic && TOPIC_FILTERS.includes(urlTopic)) setActiveTopic(urlTopic);
    if (urlSpeaker && SPEAKER_FILTERS.includes(urlSpeaker)) setActiveSpeaker(urlSpeaker);
  }, [urlTopic, urlSpeaker]);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    let list = [...dietaryVideos];

    if (activeSpeaker !== "All") {
      list = list.filter(v => v.speakerShort === activeSpeaker);
    }
    if (activeTopic !== "All topics") {
      list = list.filter(v => v.topics.includes(activeTopic));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        v =>
          v.title.toLowerCase().includes(q) ||
          v.speaker.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.topics.some(t => t.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) =>
      sort === "newest" ? b.year - a.year : a.year - b.year
    );
    return list;
  }, [activeSpeaker, activeTopic, search, sort]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 sm:py-12">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-3 h-3" />
          Back to home
        </Link>

        {/* Page header */}
        <div className="mb-8 border-b border-border pb-8">
          <h1
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="text-4xl sm:text-5xl font-normal text-foreground mb-3"
          >
            Video Channel
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground max-w-2xl leading-relaxed mb-2">
            <strong className="text-foreground">{dietaryVideos.length} curated interviews</strong> from the world's leading dietary scientists and clinicians — with key takeaways and related dietary patterns.
          </p>
          <p className="text-[12px] text-muted-foreground font-mono">
            Featuring: Walter Willett · Christopher Gardner · Tim Spector · Peter Attia · Rhonda Patrick · Layne Norton · Gabrielle Lyon · Valter Longo · Mark Hyman
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search videos… (/)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border bg-background text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors font-mono"
          />
        </div>

        {/* Filter by speaker */}
        <div className="mb-4">
          <p className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground mb-2">
            Filter by speaker
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SPEAKER_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setActiveSpeaker(s)}
                className={[
                  "text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 border transition-colors",
                  activeSpeaker === s
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                ].join(" ")}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by topic */}
        <div className="mb-6">
          <p className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground mb-2">
            Filter by topic
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TOPIC_FILTERS.map(t => (
              <button
                key={t}
                onClick={() => setActiveTopic(t)}
                className={[
                  "text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 border transition-colors",
                  activeTopic === t
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Count + sort */}
        <div className="flex items-center justify-between mb-6 border-t border-b border-border py-2.5">
          <span className="text-[11px] font-mono text-muted-foreground">
            Showing {filtered.length} video{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mr-1">Sort:</span>
            {(["newest", "oldest"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={[
                  "text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 transition-colors",
                  sort === s
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-border">
            <p className="text-[13px] font-mono text-muted-foreground">No videos match your filters.</p>
            <button
              onClick={() => { setSearch(""); setActiveSpeaker("All"); setActiveTopic("All topics"); }}
              className="mt-3 text-[10px] font-mono tracking-wider uppercase border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
