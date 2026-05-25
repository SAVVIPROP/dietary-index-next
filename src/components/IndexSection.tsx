"use client";
// Design: vitaei.com light editorial — JetBrains Mono labels, Playfair Display
import { useState } from "react";
import { diets, type Diet, type EvidenceTier } from "@/lib/data";
import ShareBookmark from "@/components/ShareBookmark";
import DietComparePanel from "@/components/DietComparePanel";
import { AnimatePresence } from "framer-motion";

type Filter = "all" | EvidenceTier | string;

const FILTER_TABS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Tier I", value: "I" },
  { label: "Tier II", value: "II" },
  { label: "Tier III", value: "III" },
  { label: "Plant-Forward", value: "Plant-Forward" },
  { label: "Low-Carb", value: "Low-Carbohydrate" },
  { label: "Time-Restricted", value: "Time-Restricted" },
  { label: "Longevity", value: "Longevity-Targeted" },
];

function TierPill({ tier }: { tier: EvidenceTier }) {
  return <span className={`tier-pill tier-${tier.toLowerCase()}`}>TIER {tier}</span>;
}

function AHABar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${score}%`,
            background: score >= 80 ? "var(--tier-i)" : score >= 60 ? "var(--tier-ii)" : "var(--tier-iii)",
          }}
        />
      </div>
      <span className="text-[11px] font-mono text-muted-foreground w-7 text-right shrink-0">{score}</span>
    </div>
  );
}

function DietRow({ diet, index }: { diet: Diet; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <div className="px-3 sm:px-5 py-3 sm:py-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-start gap-2 sm:gap-4">
          {/* Number — hidden on very small */}
          <span className="text-[11px] font-mono text-muted-foreground/40 w-6 shrink-0 text-right mt-0.5 hidden sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Name + tagline */}
          <button className="flex-1 min-w-0 text-left" onClick={() => setOpen(!open)}>
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px] sm:text-[15px] font-normal text-foreground">
                {diet.name}
              </span>
              <TierPill tier={diet.tier} />
              <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider hidden lg:inline">
                {diet.category}
              </span>
            </div>
            <p className="text-[11px] sm:text-[12px] text-muted-foreground break-words line-clamp-2 sm:line-clamp-1">{diet.tagline}</p>
          </button>

          {/* AHA score — desktop only */}
          <div className="hidden xl:block w-28 shrink-0 mt-1">
            {diet.ahaScore !== null ? <AHABar score={diet.ahaScore} /> : <span className="text-[10px] font-mono text-muted-foreground/30">—</span>}
          </div>

          {/* Trial count — tablet+ */}
          <div className="hidden md:flex flex-col items-end shrink-0 w-16">
            <span className="text-[12px] sm:text-[13px] font-mono text-foreground">{diet.trialCount.toLocaleString()}</span>
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">trials</span>
          </div>

          {/* Share + bookmark + expand */}
          <div className="flex items-center gap-0.5 shrink-0">
            <ShareBookmark
              id={`diet-${diet.id}`}
              title={`${diet.name} — Dietary Index`}
              size="sm"
            />
            <button
              className="w-6 h-6 flex items-center justify-center text-muted-foreground/30 hover:text-muted-foreground transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? "−" : "+"}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="px-3 sm:px-5 pb-4 sm:pb-5 border-t border-border bg-muted/10">
          <div className="grid md:grid-cols-[1fr_auto] gap-4 sm:gap-6 pt-4">
            <div>
              <p className="text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed mb-4 break-words">{diet.description}</p>

              {/* Key features */}
              <div className="mb-4">
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">Key features</div>
                <div className="space-y-1">
                  {diet.keyFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] sm:text-[12px] text-muted-foreground">
                      <span className="text-muted-foreground/30 mt-0.5 shrink-0">·</span>
                      <span className="break-words">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome strength */}
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">Evidence by outcome</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(diet.outcomes).map(([code, strength]) => (
                    <div
                      key={code}
                      className="flex items-center gap-1 border border-border px-2 py-1"
                      title={`${code}: ${["None","Weak","Moderate","Strong"][strength]}`}
                    >
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{code}</span>
                      <div className="flex gap-0.5">
                        {[1,2,3].map(level => (
                          <div
                            key={level}
                            className="w-1.5 h-1.5 rounded-sm"
                            style={{
                              background: strength >= level
                                ? (strength === 3 ? "var(--tier-i)" : strength === 2 ? "var(--tier-ii)" : "var(--tier-iii)")
                                : "var(--border)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AHA bar on mobile */}
              {diet.ahaScore !== null && (
                <div className="mt-4 xl:hidden">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">AHA Score</div>
                  <AHABar score={diet.ahaScore} />
                </div>
              )}
            </div>

            {/* Reference */}
            <div className="md:w-56 lg:w-64 shrink-0">
              <div className="border border-border p-3 sm:p-4 bg-background">
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">Key reference</div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 break-words">{diet.keyRef}</p>
                <a
                  href={`https://doi.org/${diet.keyRefDoi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 break-all"
                >
                  DOI: {diet.keyRefDoi} →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function IndexSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [compareOpen, setCompareOpen] = useState(false);

  const filtered = diets.filter(d => {
    if (activeFilter === "all") return true;
    if (activeFilter === "I" || activeFilter === "II" || activeFilter === "III") return d.tier === activeFilter;
    return d.category === activeFilter || d.tags.includes(activeFilter as string);
  });

  return (
    <section id="index" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">
        {/* Compare panel */}
        <AnimatePresence>
          {compareOpen && <DietComparePanel onClose={() => setCompareOpen(false)} />}
        </AnimatePresence>

        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 04</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">The Diet Index</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCompareOpen(true)}
              className="text-[10px] font-mono tracking-wider uppercase border border-foreground bg-foreground text-background px-2.5 py-1.5 hover:bg-foreground/90 transition-colors"
            >
              Compare Diets
            </button>
            <ShareBookmark id="diet-index" title="§ 04 The Diet Index — Dietary Index" size="sm" />
          </div>
        </div>

        <div className="mb-5 sm:mb-6">
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-3 leading-tight"
          >
            Every tracked dietary pattern, scored.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed max-w-2xl break-words">
            Each diet is assigned an evidence tier, mapped to the eight outcome domains it addresses, and scored against the AHA cardiovascular alignment standard where applicable.
          </p>
        </div>

        {/* Filter tabs — scrollable on mobile */}
        <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`text-[10px] font-mono tracking-wider uppercase px-2.5 sm:px-3 py-1.5 border transition-colors shrink-0 ${
                activeFilter === tab.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Column headers — desktop only */}
        <div className="hidden sm:flex items-center gap-4 px-5 py-2 border-b border-border mt-4">
          <span className="w-6 shrink-0" />
          <span className="flex-1 text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Diet / Tagline</span>
          <span className="hidden xl:block w-28 shrink-0 text-[10px] font-mono tracking-wider uppercase text-muted-foreground">AHA Score</span>
          <span className="hidden md:block w-16 shrink-0 text-right text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Trials</span>
          <span className="w-16 shrink-0" />
        </div>

        {/* Count */}
        <div className="text-[10px] font-mono text-muted-foreground px-3 sm:px-5 py-2 border-b border-border mt-0 sm:mt-0">
          Showing {filtered.length} of {diets.length} · sorted by evidence score
        </div>

        {/* Diet rows */}
        <div className="border border-border border-t-0">
          {filtered.map((diet, i) => (
            <DietRow key={diet.id} diet={diet} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
