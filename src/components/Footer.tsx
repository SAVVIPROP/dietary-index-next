// Footer — mobile-first with reading list bookmark count
import { useState, useEffect } from "react";

export default function Footer() {
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("dietary-index-bookmarks") || "[]");
      setBookmarkCount(saved.length);
    } catch { /* noop */ }
  }, []);

  const refs = [
    { num: 1, text: "Gardner CD et al. Food and Beverage Intake and Cardiovascular Health. Circulation (2023).", doi: "10.1161/CIR.0000000000001031" },
    { num: 2, text: "Estruch R et al. Primary Prevention of CVD with a Mediterranean Diet. NEJM (2018).", doi: "10.1056/NEJMoa1800389" },
    { num: 3, text: "Morris MC et al. MIND diet and Alzheimer's disease. Alzheimer's & Dementia (2015).", doi: "10.1016/j.jalz.2014.11.009" },
    { num: 4, text: "Longo VD & Anderson RM. Nutrition, longevity and disease. Cell (2022).", doi: "10.1016/j.cell.2022.04.002" },
  ];

  return (
    <footer className="border-t border-border">
      {/* Reading list notice */}
      {bookmarkCount > 0 && (
        <div className="border-b border-border bg-muted/20">
          <div className="container py-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-foreground/60">
                <path d="M3 2h10v13l-5-3-5 3V2z" />
              </svg>
              <span className="text-[11px] font-mono text-muted-foreground">
                {bookmarkCount} item{bookmarkCount !== 1 ? "s" : ""} in your reading list
              </span>
            </div>
            <button
              className="text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5"
              onClick={() => {
                localStorage.removeItem("dietary-index-bookmarks");
                setBookmarkCount(0);
              }}
            >
              Clear reading list
            </button>
          </div>
        </div>
      )}

      {/* References */}
      <div className="container py-8 sm:py-10 border-b border-border">
        <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4">References</div>
        <div className="space-y-2">
          {refs.map(r => (
            <div key={r.num} className="flex gap-3">
              <span className="text-[11px] font-mono text-muted-foreground/40 shrink-0">[{r.num}]</span>
              <span className="text-[11px] text-muted-foreground break-words">
                {r.text}{" "}
                <a
                  href={`https://doi.org/${r.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-muted-foreground/60 hover:text-foreground transition-colors border-b border-border hover:border-foreground/40"
                >
                  Open source
                </a>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border border-foreground/50 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 bg-foreground/50" />
            </div>
            <span style={{ fontFamily: "var(--font-display)" }} className="text-sm text-foreground/70">
              Dietary Index
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/40 hidden sm:inline">
              Part of the Scientific Index Collection
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#methodology" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">Methodology</a>
            <a href="#" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">Conflicts of Interest</a>
            <a href="/affiliate-disclosure" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">Affiliate Disclosure</a>
            <span className="text-[10px] font-mono text-muted-foreground/30">© 2025 Dietary Index</span>
          </div>
        </div>
        {/* Affiliate disclosure — one line, footer only */}
        <p className="text-[10px] font-mono text-muted-foreground/40 mt-4">
          Affiliate links — we may earn a commission at no extra cost to you.{" "}
          <a href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">Disclosure</a>.
        </p>
      </div>
    </footer>
  );
}
