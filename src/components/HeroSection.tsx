// HeroSection — interactive evidence network with clickable diet nodes
// Design: vitaei.com light editorial — Playfair Display headings, JetBrains Mono labels
import { useState } from "react";
import ShareBookmark from "@/components/ShareBookmark";
import { keyStats, diets } from "@/lib/data";

const STAT_ITEMS = [
  { value: keyStats.dietsIndexed.toString(), label: "Diets indexed", sub: "Tier I–III" },
  { value: keyStats.trialsAnalysed, label: "Trials analysed", sub: "RCTs + cohorts" },
  { value: keyStats.outcomeDomains.toString(), label: "Outcome domains", sub: "CVD to longevity" },
  { value: keyStats.tierICount.toString(), label: "Tier I diets", sub: "Multiple RCTs" },
];

const TOPIC_TAGS = [
  "Mediterranean Diet", "DASH Protocol", "Gut Microbiome",
  "Metabolic Health", "Cognitive Decline", "Longevity",
];

// Network nodes — each maps to a real diet ID in data.ts
const NETWORK_NODES = [
  { dietId: 1,  x: 200, y: 80,  r: 22 }, // Mediterranean
  { dietId: 2,  x: 320, y: 60,  r: 20 }, // DASH
  { dietId: 3,  x: 100, y: 160, r: 14 }, // MIND
  { dietId: 13, x: 280, y: 170, r: 12 }, // Portfolio
  { dietId: 14, x: 180, y: 240, r: 10 }, // Nordic
  { dietId: 5,  x: 340, y: 220, r: 10 }, // Vegan
  { dietId: 8,  x: 80,  y: 270, r: 8  }, // Keto
  { dietId: 10, x: 250, y: 310, r: 7  }, // Paleo
  { dietId: 11, x: 380, y: 290, r: 6  }, // Carnivore
];

const EDGES = [[0,1],[0,2],[0,3],[1,3],[1,5],[2,4],[3,5],[4,6],[5,7],[6,7],[7,8]];

const TIER_COLORS: Record<string, string> = {
  "I":   "#2D6A4F",
  "II":  "#8B5E1A",
  "III": "#6B6B6B",
};

const OUTCOME_LABELS: Record<string, string> = {
  CVD: "Cardiovascular",
  MET: "Metabolic",
  COG: "Cognitive",
  CAN: "Cancer",
  LON: "Longevity",
  GUT: "Gut Health",
  WGT: "Weight",
  INF: "Inflammation",
};

const STRENGTH_DOTS = (score: number) => {
  const filled = Math.min(score, 3);
  return Array.from({ length: 3 }, (_, i) => i < filled);
};

export default function HeroSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedDiet = selectedId !== null ? diets.find(d => d.id === selectedId) ?? null : null;

  return (
    <section id="hero" className="border-b border-border">
      <div className="container py-10 sm:py-16 lg:py-24">
        {/* Article label + share */}
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-mono tracking-widest uppercase border border-border px-2 py-0.5 text-muted-foreground">
              Article 01
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
              Scientific Index · Vol. I
            </span>
          </div>
          <ShareBookmark
            id="hero"
            title="Dietary Index — A scientific index of what you eat"
            url={typeof window !== "undefined" ? window.location.href : "/"}
            type="section"
          />
        </div>

        {/* Two-column layout: headline left, figure right */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">
          <div>
            <h1
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.05] tracking-tight mb-5 text-foreground"
            >
              A scientific index of{" "}
              <em className="italic" style={{ color: "var(--primary)" }}>what you eat</em>{" "}
              — and what the evidence actually says.
            </h1>

            <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-xl mb-4">
              The Dietary Index catalogues every major dietary pattern implicated in human health — organised by eight outcome domains and scored by evidence tier. Each entry is assigned a tier based on human trial weight, mapped to health outcomes, and cross-referenced with peer-reviewed sources.
            </p>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-xl mb-6">
              We publish the methodology and every source. If a claim cannot be traced to a peer-reviewed study, it does not appear on this site.
            </p>

            {/* Topic tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {TOPIC_TAGS.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-mono tracking-wider uppercase border border-border px-2 py-1 text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="#index"
                className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-mono tracking-wider uppercase bg-foreground text-background px-4 sm:px-5 py-2.5 hover:bg-foreground/80 transition-colors"
              >
                Open the Index →
              </a>
              <a
                href="#science"
                className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-mono tracking-wider uppercase border border-border px-4 sm:px-5 py-2.5 hover:bg-muted transition-colors text-foreground"
              >
                Read the science
              </a>
              <a
                href="#methodology"
                className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-mono tracking-wider uppercase border border-border px-4 sm:px-5 py-2.5 hover:bg-muted transition-colors text-muted-foreground"
              >
                Methodology
              </a>
            </div>
          </div>

          {/* Figure panel — interactive evidence network */}
          <div className="border border-border bg-background mt-4 lg:mt-0">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Figure 1</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Evidence Network</span>
            </div>

            {/* SVG network */}
            <div className="p-3 pb-0">
              <InteractiveNetworkSVG
                selectedId={selectedId}
                onSelect={(id) => setSelectedId(prev => prev === id ? null : id)}
              />
            </div>

            {/* Detail panel — shown when a node is selected */}
            {selectedDiet ? (
              <div className="border-t border-border px-4 py-3 bg-background">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 border"
                        style={{
                          color: TIER_COLORS[selectedDiet.tier],
                          borderColor: TIER_COLORS[selectedDiet.tier] + "50",
                          background: TIER_COLORS[selectedDiet.tier] + "10",
                        }}
                      >
                        Tier {selectedDiet.tier}
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground">
                        {selectedDiet.trialCount.toLocaleString()} trials
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)" }} className="text-[15px] font-normal text-foreground leading-snug">
                      {selectedDiet.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                      {selectedDiet.tagline}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 shrink-0 text-[16px] leading-none"
                    aria-label="Close detail"
                  >
                    ×
                  </button>
                </div>

                {/* Outcome scores grid */}
                <div className="grid grid-cols-4 gap-1 mt-2 mb-2">
                  {Object.entries(selectedDiet.outcomes).map(([key, val]) => (
                    <div key={key} className="flex flex-col items-center gap-0.5 py-1.5 border border-border/50 bg-muted/30">
                      <span className="text-[8px] font-mono tracking-widest uppercase text-muted-foreground">{key}</span>
                      <div className="flex gap-0.5">
                        {STRENGTH_DOTS(val as number).map((filled, i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: filled
                                ? TIER_COLORS[selectedDiet.tier]
                                : "var(--border)",
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground/60 text-center leading-tight">
                        {OUTCOME_LABELS[key]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-[9px] font-mono text-muted-foreground">
                    Top journal: {selectedDiet.topJournal}
                  </span>
                  <a
                    href="#index"
                    className="text-[9px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors"
                  >
                    Full profile →
                  </a>
                </div>
              </div>
            ) : (
              <div className="px-4 py-2.5 border-t border-border">
                <p className="text-[11px] text-muted-foreground leading-snug">
                  <strong className="font-medium text-foreground">Fig. 1.</strong>{" "}
                  Dietary patterns mapped by evidence strength across eight health outcome domains. Node size reflects trial count; colour encodes evidence tier.{" "}
                  <span className="text-muted-foreground/60">Click any node to explore.</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats row — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-border mt-10 sm:mt-14">
          {STAT_ITEMS.map((s, i) => (
            <div
              key={s.label}
              className={[
                "py-5 sm:py-6 px-4 sm:px-6",
                i % 2 === 0 && i < 3 ? "border-r border-border" : "",
                i < 2 ? "border-b md:border-b-0 border-border" : "",
                i === 1 ? "md:border-r md:border-border" : "",
                i === 2 ? "md:border-r md:border-border" : "",
              ].join(" ")}
            >
              <div
                style={{ fontFamily: "var(--font-display)" }}
                className="text-3xl sm:text-4xl font-normal text-foreground mb-1"
              >
                {s.value}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-muted-foreground">{s.label}</div>
              <div className="text-[10px] text-muted-foreground/60 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface NetworkSVGProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function InteractiveNetworkSVG({ selectedId, onSelect }: NetworkSVGProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Build nodes with full diet data
  const nodes = NETWORK_NODES.map(n => {
    const diet = diets.find(d => d.id === n.dietId)!;
    return { ...n, diet, color: TIER_COLORS[diet.tier] };
  });

  return (
    <svg
      viewBox="0 0 460 340"
      className="w-full h-auto cursor-pointer select-none"
      role="img"
      aria-label="Interactive evidence network diagram"
    >
      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        const isHighlighted =
          (selectedId !== null && (na.dietId === selectedId || nb.dietId === selectedId)) ||
          (hoveredIdx !== null && (a === hoveredIdx || b === hoveredIdx));
        return (
          <line
            key={i}
            x1={na.x} y1={na.y}
            x2={nb.x} y2={nb.y}
            stroke={isHighlighted ? "#2D6A4F" : "#E5E2DC"}
            strokeWidth={isHighlighted ? "1.5" : "1"}
            strokeOpacity={isHighlighted ? 0.5 : 1}
            style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isSelected = selectedId === n.dietId;
        const isHovered = hoveredIdx === i;
        const isActive = isSelected || isHovered;
        const scale = isActive ? 1.15 : 1;

        return (
          <g
            key={i}
            onClick={() => onSelect(n.dietId)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label={`${n.diet.name} — Tier ${n.diet.tier}, ${n.diet.trialCount} trials`}
            aria-pressed={isSelected}
          >
            {/* Outer ring — glow when active */}
            <circle
              cx={n.x} cy={n.y}
              r={n.r * scale * 1.4}
              fill={n.color}
              fillOpacity={isActive ? 0.08 : 0}
              style={{ transition: "fill-opacity 0.2s, r 0.2s" }}
            />
            {/* Main circle */}
            <circle
              cx={n.x} cy={n.y}
              r={n.r * scale}
              fill={n.color}
              fillOpacity={isSelected ? 0.25 : 0.12}
              stroke={n.color}
              strokeWidth={isSelected ? 2 : 1.5}
              style={{ transition: "all 0.2s" }}
            />
            {/* Inner dot */}
            <circle
              cx={n.x} cy={n.y}
              r={n.r * scale * 0.35}
              fill={n.color}
              fillOpacity={isActive ? 1 : 0.8}
              style={{ transition: "all 0.2s" }}
            />
            {/* Selected indicator ring */}
            {isSelected && (
              <circle
                cx={n.x} cy={n.y}
                r={n.r * 1.6}
                fill="none"
                stroke={n.color}
                strokeWidth="1"
                strokeDasharray="3 2"
                strokeOpacity="0.6"
              />
            )}
            {/* Label */}
            <text
              x={n.x}
              y={n.y + n.r * scale + 11}
              textAnchor="middle"
              fontSize={isActive ? "8.5" : "8"}
              fill={isActive ? n.color : "#6B6B6B"}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={isActive ? "600" : "400"}
              style={{ transition: "all 0.2s" }}
            >
              {n.diet.shortName}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(10,10)">
        {[
          { color: "#2D6A4F", label: "Tier I — RCT" },
          { color: "#8B5E1A", label: "Tier II — Human" },
          { color: "#6B6B6B", label: "Tier III — Mechanism" },
        ].map((l, i) => (
          <g key={i} transform={`translate(0,${i * 14})`}>
            <circle cx="5" cy="5" r="4" fill={l.color} fillOpacity="0.15" stroke={l.color} strokeWidth="1" />
            <text x="14" y="9" fontSize="7.5" fill="#9B9B9B" fontFamily="JetBrains Mono, monospace">
              {l.label}
            </text>
          </g>
        ))}
      </g>

      {/* Hint text when nothing selected */}
      {selectedId === null && (
        <text
          x="460" y="335"
          textAnchor="end"
          fontSize="7.5"
          fill="#BBBBBB"
          fontFamily="JetBrains Mono, monospace"
        >
          click a node to explore
        </text>
      )}
    </svg>
  );
}
