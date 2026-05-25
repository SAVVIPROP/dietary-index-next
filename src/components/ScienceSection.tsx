// ScienceSection — mobile-first with share + bookmark
import ShareBookmark from "@/components/ShareBookmark";
import { healthOutcomes } from "@/lib/data";

const OUTCOME_GROUPS = [
  { label: "Primary", sub: "Direct disease endpoints", items: ["CVD", "MET", "CAN", "WGT"] },
  { label: "Systemic", sub: "Whole-body processes", items: ["LON", "INF", "GUT", "COG"] },
];

export default function ScienceSection() {
  return (
    <section id="science" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">
        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 01</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Foundational Science</span>
          </div>
          <ShareBookmark id="science" title="§ 01 Foundational Science — Dietary Index" size="sm" />
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-4 leading-tight"
            >
              Diet is the largest modifiable determinant of chronic disease risk.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-4">
              Before any protocol, the target. The Dietary Index organises nutrition science around eight health outcome domains — from cardiovascular disease to gut microbiome health — that represent the primary pathways through which dietary patterns affect human health and longevity.
            </p>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-6">
              Each domain is supported by a distinct body of mechanistic and clinical evidence. The strength of that evidence — from multiple RCTs (Tier I) to mechanistic data only (Tier III) — determines how each diet is scored within each domain.
            </p>
            <a
              href="#methodology"
              className="text-[11px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5"
            >
              Full methodology →
            </a>
          </div>

          {/* Outcome domains */}
          <div className="space-y-6 mt-4 lg:mt-0">
            {OUTCOME_GROUPS.map(group => (
              <div key={group.label}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground border border-border px-2 py-0.5">
                    {group.label}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground/60">{group.sub}</span>
                </div>
                <div className="border border-border">
                  {group.items.map((code, idx) => {
                    const outcome = healthOutcomes.find(o => o.code === code)!;
                    return (
                      <div
                        key={code}
                        className={`flex items-start gap-3 px-4 py-3 ${idx < group.items.length - 1 ? "border-b border-border" : ""} hover:bg-muted/40 transition-colors`}
                      >
                        <span className="text-[10px] font-mono text-muted-foreground/40 mt-0.5 w-5 shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium text-foreground mb-0.5 break-words" style={{ fontFamily: "var(--font-display)" }}>
                            {outcome.label}
                          </div>
                          <div className="text-[11px] sm:text-[12px] text-muted-foreground break-words">{outcome.description}</div>
                        </div>
                        <span className="ml-auto text-[10px] font-mono tracking-wider uppercase text-muted-foreground/40 shrink-0 mt-0.5">
                          {outcome.code}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
