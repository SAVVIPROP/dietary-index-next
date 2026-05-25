// VideoChannelStrip — "From the Video Channel" homepage section
// Shows 3 featured video cards with real YouTube thumbnails

import { useState } from "react";
import { Play, Clock, ArrowRight } from "lucide-react";
import { Link } from "@/lib/wouter-shim";
import { dietaryVideos } from "@/lib/videos";

// Pick 3 featured videos: Willett Mediterranean (v01), Kevin Hall UPF RCT (v25), Satchin Panda TRE (v27)
const FEATURED_IDS = ["v01", "v25", "v27"];

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function PlayOverlay({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Play video"
      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
        <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
      </span>
    </button>
  );
}

function VideoModal({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title="Video"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full"
        />
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 text-white/80 hover:text-white text-sm font-mono"
        >
          ESC / CLOSE ×
        </button>
      </div>
    </div>
  );
}

export default function VideoChannelStrip() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const featured = FEATURED_IDS.map((id) => dietaryVideos.find((v) => v.id === id)!).filter(Boolean);

  return (
    <section className="py-20 border-t border-border bg-background">
      {playingId && (
        <VideoModal youtubeId={playingId} onClose={() => setPlayingId(null)} />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Video Channel
            </p>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-4xl font-normal text-foreground"
            >
              From the scientists themselves.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed">
              20 curated lectures and interviews from the researchers behind the evidence — no commentary, no interpretation.
            </p>
          </div>
          <Link
            href="/videos"
            className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
          >
            All 20 videos <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {featured.map((video) => (
            <article
              key={video.id}
              className="border border-border bg-card flex flex-col overflow-hidden hover:border-foreground/30 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden group cursor-pointer bg-muted">
                <img
                  src={ytThumb(video.youtubeId)}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Speaker badge */}
                <span className="absolute top-2 left-2 text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 bg-black/70 text-white">
                  {video.speaker}
                </span>
                <PlayOverlay onClick={() => setPlayingId(video.youtubeId)} />
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                {/* Meta */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                  <span>{video.channel}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {video.duration}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[15px] font-normal text-foreground leading-snug cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setPlayingId(video.youtubeId)}
                >
                  {video.title}
                </h3>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mt-auto pt-2">
                  {video.topics.slice(0, 2).map((t) => (
                    <Link
                      key={t}
                      href={`/videos?topic=${encodeURIComponent(t)}`}
                      className="text-[9px] font-mono tracking-wider uppercase border border-border px-1.5 py-0.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "all videos" link */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
          >
            Browse all 20 videos <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
