"use client";
// JournalsPage — dedicated route for /journals
// Supports ?verdict=Myths URL param to pre-filter the section (used by the Myths banner)
import { useEffect, useRef } from "react";
import { useLocation } from "@/lib/wouter-shim";
import JournalsSection from "@/components/JournalsSection";
import Seo from "@/components/Seo";

const MYTH_COUNT = 14; // Myth (4) + Mostly Myth (10)

export default function JournalsPage() {
  const [location] = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parse verdict + source params from URL query string
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const initialVerdict = params.get("verdict") ?? "";
  const initialSource = params.get("source") ?? "";

  // Auto-scroll to the section when a filter param is present
  useEffect(() => {
    if ((initialVerdict || initialSource) && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [initialVerdict, initialSource]);

  return (
    <>
      <Seo
        title="Journals — Evidence-Based Nutrition Articles"
        description="120+ evidence-ranked articles on diet, nutrition science, supplements, and metabolic health. Filtered by category, evidence tier, and reading time."
        canonical="/journals"
      />

      <main className="pt-14">
        {/* Hero */}
        <div className="container py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 08</span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-3 mb-4 leading-tight"
          >
            Journals
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl mb-8">
            Over 120 evidence-ranked articles covering diet science, nutrition myths, supplements, metabolic health, and longevity. Every article is assigned an evidence tier and cross-referenced with primary sources.
          </p>

          {/* ── Myths shortcut banner ── */}
          <a
            href="/journals?verdict=Myths"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border border-border hover:border-foreground/30 bg-background hover:bg-muted/20 transition-all p-5 sm:p-6 max-w-2xl"
          >
            {/* Icon block */}
            <div
              className="shrink-0 w-10 h-10 flex items-center justify-center border border-border group-hover:border-foreground/30 transition-colors"
              style={{ background: "oklch(0.577 0.245 27.325 / 0.06)" }}
            >
              {/* Crossed-out checkmark SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="7.5" stroke="var(--destructive)" strokeWidth="1.2" />
                <path
                  d="M5.5 9l2.5 2.5 5-5"
                  stroke="var(--destructive)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 2"
                  opacity="0.5"
                />
                <line
                  x1="3"
                  y1="3"
                  x2="15"
                  y2="15"
                  stroke="var(--destructive)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-mono tracking-widest uppercase text-destructive/70 mb-1">
                Myth Debunking
              </div>
              <p
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[15px] sm:text-[16px] text-foreground leading-snug mb-1 group-hover:text-foreground/80 transition-colors"
              >
                What popular nutrition advice is actually wrong?
              </p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                {MYTH_COUNT} articles where the evidence contradicts the consensus — from detox diets to alkaline water.
              </p>
            </div>

            {/* CTA */}
            <span className="shrink-0 text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 group-hover:border-foreground transition-colors pb-0.5 whitespace-nowrap">
              See myths →
            </span>
          </a>
        </div>

        {/* Journals section — optionally pre-filtered */}
        <div ref={sectionRef}>
          <JournalsSection initialVerdictFilter={initialVerdict} initialSourceFilter={initialSource} />
        </div>
      </main>
    </>
  );
}
