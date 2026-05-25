// FrameworksSection — mobile-first with share + bookmark
import ShareBookmark from "@/components/ShareBookmark";

export default function FrameworksSection() {
  return (
    <section id="frameworks" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">
        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 02</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">The Evidence Framework</span>
          </div>
          <ShareBookmark id="frameworks" title="§ 02 The Evidence Framework — Dietary Index" size="sm" />
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-4 leading-tight"
            >
              Every diet is scored by the weight of human evidence, not by popularity.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-4">
              The evidence tier system classifies each dietary pattern's support for each health outcome domain based on the quality and quantity of published research. A diet may hold Tier I evidence for cardiovascular outcomes while remaining Tier III for cognitive outcomes — the index captures this granularity.
            </p>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed">
              Tier assignment follows a pre-specified hierarchy: multiple well-controlled RCTs with consistent results qualify for Tier I; single large RCTs or early human trials qualify for Tier II; mechanistic data, animal studies, or observational evidence only qualify for Tier III.
            </p>
          </div>

          {/* Tier cards */}
          <div className="border border-border mt-4 lg:mt-0">
            {[
              {
                tier: "I",
                label: "Tier I — Multiple RCTs",
                colorVar: "var(--tier-i)",
                bg: "oklch(0.35 0.09 148 / 0.06)",
                borderColor: "oklch(0.35 0.09 148 / 0.20)",
                description: "Two or more well-controlled randomised controlled trials with consistent, statistically significant results in human subjects. The highest standard of dietary evidence.",
                example: "Mediterranean Diet → CVD: PREDIMED (n=7,447), PREDIMED-Plus (n=6,874)",
              },
              {
                tier: "II",
                label: "Tier II — Human Trials",
                colorVar: "var(--tier-ii)",
                bg: "oklch(0.52 0.13 72 / 0.06)",
                borderColor: "oklch(0.52 0.13 72 / 0.20)",
                description: "A single large RCT, multiple smaller RCTs with mixed results, or well-designed prospective cohort studies with robust confounder adjustment.",
                example: "MIND Diet → Cognitive: Morris et al. 2015 (n=923, prospective cohort)",
              },
              {
                tier: "III",
                label: "Tier III — Mechanism / Animal",
                colorVar: "var(--tier-iii)",
                bg: "oklch(0.48 0.008 60 / 0.06)",
                borderColor: "oklch(0.48 0.008 60 / 0.20)",
                description: "Mechanistic data from cell studies or animal models, case reports, cross-sectional surveys, or expert opinion without controlled human trial support.",
                example: "Carnivore Diet → all outcomes: survey data and mechanistic speculation only",
              },
            ].map((t, i) => (
              <div
                key={t.tier}
                className={`p-4 sm:p-5 ${i < 2 ? "border-b border-border" : ""}`}
                style={{ background: t.bg }}
              >
                <div className="flex items-start gap-3 mb-2 flex-wrap">
                  <span
                    className="tier-pill shrink-0 mt-0.5"
                    style={{ color: t.colorVar, background: t.bg, border: `1px solid ${t.borderColor}` }}
                  >
                    TIER {t.tier}
                  </span>
                  <span className="text-[13px] font-medium text-foreground break-words" style={{ fontFamily: "var(--font-display)" }}>
                    {t.label}
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed mb-2 break-words">{t.description}</p>
                <p className="text-[11px] font-mono text-muted-foreground/60 break-words">{t.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AHA score explainer */}
        <div className="mt-8 sm:mt-12 border border-border p-4 sm:p-6 bg-muted/20">
          <div className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start">
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">AHA Alignment Score</div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-4xl sm:text-5xl font-normal text-foreground">0–100</div>
            </div>
            <div>
              <p className="text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed mb-2 break-words">
                Where available, each diet is assigned an AHA Dietary Alignment Score — a 0–100 measure of how closely the pattern aligns with the American Heart Association's cardiovascular health guidance. Criteria include sodium, added sugar, alcohol, processed food content, and the quality of protein and fat sources.
              </p>
              <p className="text-[11px] sm:text-[12px] text-muted-foreground/70 break-words">
                Source: Gardner CD et al. Food and Beverage Intake and Cardiovascular Health. <em>Circulation</em> (2023). DOI: 10.1161/CIR.0000000000001031
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
