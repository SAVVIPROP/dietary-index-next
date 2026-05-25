"use client";
// MethodologySection — mobile-first with share + bookmark
import ShareBookmark from "@/components/ShareBookmark";
import { journalArticles } from "@/lib/journals";
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

const SOURCE_ALIASES: Record<string, string[]> = {
  NEJM: ["NEJM", "New England Journal of Medicine", "N Engl J Med"],
  Cell: ["Cell", "Cell Metabolism", "Cell Reports", "Cell Host & Microbe"],
  JAMA: ["JAMA", "JAMA Internal Medicine", "JAMA Intern Med", "JAMA Oncology", "JAMA Pediatrics", "JAMA Network Open"],
  Lancet: ["Lancet", "The Lancet", "Lancet Diabetes Endocrinol", "The Lancet Diabetes & Endocrinology", "Lancet Oncology", "The Lancet Oncology", "Lancet Psychiatry"],
  Nature: ["Nature", "Nature Medicine", "Nature Metabolism", "Nature Reviews", "Nature Communications", "Nature Aging"],
  BMJ: ["BMJ", "British Medical Journal", "BMJ Nutrition", "BMJ Open"],
};

export default function MethodologySection() {
  const sourceData = useMemo(() =>
    Object.entries(SOURCE_ALIASES).map(([key, aliases]) => ({
      name: key,
      articles: journalArticles.filter(a =>
        a.refs.some(ref =>
          aliases.some(alias => ref.journal.toLowerCase().includes(alias.toLowerCase()))
        )
      ).length,
      refs: journalArticles.reduce((sum, a) =>
        sum + a.refs.filter(ref =>
          aliases.some(alias => ref.journal.toLowerCase().includes(alias.toLowerCase()))
        ).length
      , 0),
    })).sort((a, b) => b.articles - a.articles)
  , []);
  return (
    <section id="methodology" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">
        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 07</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Methodology</span>
          </div>
          <ShareBookmark id="methodology" title="§ 07 Methodology — Dietary Index" size="sm" />
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-4 leading-tight"
            >
              How we score. What we include. What we exclude.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-4 break-words">
              The Dietary Index applies a pre-specified scoring methodology to every dietary pattern. Evidence tier assignment follows a strict hierarchy based on study design quality, sample size, and consistency of results across independent research groups.
            </p>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-4 break-words">
              We do not include commercial dietary programmes, patterns followed for fewer than 12 weeks in trials, or diets used exclusively to manage non-chronic health conditions. We do not accept sponsored content or affiliate relationships that could influence tier assignment.
            </p>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed break-words">
              If a claim cannot be traced to a peer-reviewed source indexed in PubMed, it does not appear on this site. Every score is traceable to its source data.
            </p>
          </div>

          <div className="mt-4 lg:mt-0">
            {[
              {
                step: "01",
                title: "Literature search",
                desc: "Systematic search of PubMed, Cochrane, and EMBASE for RCTs, meta-analyses, and prospective cohort studies published in peer-reviewed journals. Search terms are pre-registered.",
              },
              {
                step: "02",
                title: "Study quality assessment",
                desc: "Each study is assessed for risk of bias using the Cochrane RoB 2 tool (RCTs) or the Newcastle-Ottawa Scale (observational studies). Studies with high risk of bias are excluded from tier assignment.",
              },
              {
                step: "03",
                title: "Tier assignment",
                desc: "Tier I requires ≥2 independent RCTs with consistent results and n>500 total. Tier II requires ≥1 RCT or ≥2 large prospective cohorts. Tier III covers mechanistic, animal, or cross-sectional evidence only.",
              },
              {
                step: "04",
                title: "Outcome domain mapping",
                desc: "Each diet is mapped to the eight outcome domains it has been studied in. Evidence strength (0–3) within each domain is assigned based on the tier of the strongest available evidence for that specific diet-outcome pair.",
              },
              {
                step: "05",
                title: "AHA score assignment",
                desc: "Where the American Heart Association's 2023 Circulation statement provides a score for a dietary pattern, that score is used directly. Patterns not evaluated by the AHA statement are marked as not applicable.",
              },
            ].map((s, i, arr) => (
              <div
                key={s.step}
                className={`flex gap-4 sm:gap-5 py-4 sm:py-5 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="text-[11px] font-mono text-muted-foreground/40 w-6 shrink-0 mt-0.5">{s.step}</span>
                <div className="min-w-0">
                  <h4
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-[14px] sm:text-[15px] font-normal text-foreground mb-1"
                  >
                    {s.title}
                  </h4>
                  <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-relaxed break-words">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source distribution chart */}
        <div className="mt-12 sm:mt-16 border-t border-border pt-10 sm:pt-12">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">Source Distribution</div>
              <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed">
                Articles citing each major peer-reviewed journal family across the full index.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Bar chart */}
            <div className="w-full" style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sourceData}
                  layout="vertical"
                  margin={{ top: 0, right: 24, bottom: 0, left: 8 }}
                  barCategoryGap="28%"
                >
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fontFamily: "var(--font-mono)", fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    tickCount={5}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10, fontFamily: "var(--font-mono)", fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    width={44}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--muted)/0.1" }}
                    contentStyle={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: 0,
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                      color: "var(--foreground)",
                    }}
                    formatter={(value: number, name: string) => [
                      value,
                      name === "articles" ? "articles citing" : "total refs",
                    ]}
                  />
                  <Bar dataKey="articles" radius={0}>
                    {sourceData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={index === 0 ? "var(--tier-i)" : `oklch(${0.45 + index * 0.04} 0.06 148)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Table */}
            <div className="border border-border divide-y divide-border">
              <div className="grid grid-cols-3 px-3 py-2 text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60">
                <span>Journal</span>
                <span className="text-right">Articles</span>
                <span className="text-right">Total refs</span>
              </div>
              {sourceData.map((row, i) => (
                <div key={row.name} className={`grid grid-cols-3 px-3 py-2.5 text-[11px] font-mono ${
                  i === 0 ? "bg-muted/10" : ""
                }`}>
                  <span className="text-foreground font-medium">{row.name}</span>
                  <span className="text-right text-foreground tabular-nums">{row.articles}</span>
                  <span className="text-right text-muted-foreground tabular-nums">{row.refs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
