"use client";
// AtlasSection — mobile-friendly scrollable heatmap with share + bookmark
import { useState } from "react";
import { diets, healthOutcomes } from "@/lib/data";
import ShareBookmark from "@/components/ShareBookmark";

const STRENGTH_LABELS = ["None", "Weak", "Moderate", "Strong"];

function strengthColor(s: number): string {
  if (s === 0) return "transparent";
  if (s === 1) return "oklch(0.35 0.09 148 / 0.12)";
  if (s === 2) return "oklch(0.35 0.09 148 / 0.40)";
  return "oklch(0.35 0.09 148 / 0.80)";
}

function strengthTextColor(s: number): string {
  if (s === 0) return "var(--border)";
  if (s <= 2) return "var(--tier-i)";
  return "#fff";
}

export default function AtlasSection() {
  const [hovered, setHovered] = useState<{ diet: string; outcome: string; strength: number } | null>(null);

  return (
    <section id="atlas" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">
        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 05</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">The Atlas</span>
          </div>
          <ShareBookmark id="atlas" title="§ 05 The Atlas — Dietary Index" size="sm" />
        </div>

        <div className="mb-6 sm:mb-8">
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-3 leading-tight"
          >
            Dietary patterns mapped to health outcomes.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed max-w-2xl break-words">
            Each cell encodes the weight of human evidence that a given dietary pattern addresses a given health outcome domain. Darker cells denote stronger evidence from well-controlled trials.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Evidence:</span>
          {STRENGTH_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 border border-border" style={{ background: strengthColor(i) }} />
              <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hovered && (
          <div className="mb-4 border border-border px-3 sm:px-4 py-2 bg-muted/30 inline-flex flex-wrap items-center gap-2 sm:gap-3">
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[13px] text-foreground">{hovered.diet}</span>
            <span className="text-muted-foreground/40">×</span>
            <span className="text-[12px] text-muted-foreground">{hovered.outcome}</span>
            <span className="text-[10px] font-mono tracking-wider uppercase border border-border px-2 py-0.5 text-muted-foreground">
              {STRENGTH_LABELS[hovered.strength]}
            </span>
          </div>
        )}

        {/* Mobile scroll hint */}
        <p className="text-[10px] font-mono text-muted-foreground/50 mb-2 sm:hidden">← Scroll horizontally to view full atlas →</p>

        {/* Atlas table — horizontally scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="min-w-[640px]">
            <table className="w-full border-collapse border border-border text-[11px]">
              <thead>
                <tr>
                  <th className="border border-border px-3 sm:px-4 py-2 text-left font-mono tracking-wider uppercase text-muted-foreground text-[10px] bg-muted/20 min-w-[130px]">
                    Diet
                  </th>
                  <th className="border border-border px-2 py-2 text-center font-mono tracking-wider uppercase text-muted-foreground text-[10px] bg-muted/20 w-8">
                    Tier
                  </th>
                  {healthOutcomes.map(o => (
                    <th
                      key={o.code}
                      className="border border-border px-1 sm:px-2 py-2 text-center font-mono tracking-wider uppercase text-muted-foreground text-[9px] bg-muted/20 min-w-[48px]"
                      title={o.description}
                    >
                      <div>{o.code}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diets.map((diet, di) => (
                  <tr key={diet.id} className={di % 2 === 0 ? "" : "bg-muted/10"}>
                    <td className="border border-border px-3 sm:px-4 py-2">
                      <span style={{ fontFamily: "var(--font-display)" }} className="text-[12px] sm:text-[13px] text-foreground whitespace-nowrap">
                        {diet.shortName}
                      </span>
                    </td>
                    <td className="border border-border px-2 py-2 text-center">
                      <span className={`tier-pill tier-${diet.tier.toLowerCase()}`}>{diet.tier}</span>
                    </td>
                    {healthOutcomes.map(outcome => {
                      const strength = diet.outcomes[outcome.code] ?? 0;
                      return (
                        <td
                          key={outcome.code}
                          className="border border-border p-0 text-center cursor-default"
                          style={{ background: strengthColor(strength) }}
                          onMouseEnter={() => setHovered({ diet: diet.name, outcome: outcome.label, strength })}
                          onMouseLeave={() => setHovered(null)}
                          title={`${diet.name} → ${outcome.label}: ${STRENGTH_LABELS[strength]}`}
                        >
                          <div
                            className="w-full h-7 sm:h-8 flex items-center justify-center text-[9px] font-mono"
                            style={{ color: strengthTextColor(strength) }}
                          >
                            {strength > 0 ? strength : "·"}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-3 break-words">
          Tap or hover any cell to read the evidence classification. Scale: 1 = Weak, 2 = Moderate, 3 = Strong. Empty cells indicate no published evidence linking this pattern to this outcome domain.
        </p>
      </div>
    </section>
  );
}
