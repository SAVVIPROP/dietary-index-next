// ResearchSection — mobile-first with per-paper share + bookmark
import { useState } from "react";
import { researchPapers } from "@/lib/data";
import { journalArticles } from "@/lib/journals";
import ShareBookmark from "@/components/ShareBookmark";

// Source alias map — must stay in sync with JournalsSection.tsx
const SOURCE_ALIASES: Record<string, string[]> = {
  NEJM: ["NEJM", "New England Journal of Medicine", "N Engl J Med"],
  Cell: ["Cell", "Cell Metabolism", "Cell Reports", "Cell Host & Microbe"],
  JAMA: ["JAMA", "JAMA Internal Medicine", "JAMA Intern Med", "JAMA Oncology", "JAMA Pediatrics", "JAMA Network Open"],
  Lancet: ["Lancet", "The Lancet", "Lancet Diabetes Endocrinol", "The Lancet Diabetes & Endocrinology", "Lancet Oncology", "The Lancet Oncology", "Lancet Psychiatry"],
  Nature: ["Nature", "Nature Medicine", "Nature Metabolism", "Nature Reviews", "Nature Communications", "Nature Aging"],
  BMJ: ["BMJ", "British Medical Journal", "BMJ Nutrition", "BMJ Open"],
};

function countArticlesForSource(source: string): number {
  const aliases = SOURCE_ALIASES[source];
  if (!aliases) return 0;
  return journalArticles.filter(article =>
    article.refs.some(ref =>
      aliases.some(alias => ref.journal.toLowerCase().includes(alias.toLowerCase()))
    )
  ).length;
}

const JOURNALS = [
  { name: "NEJM", label: "N ENGL J MED", source: "NEJM", count: countArticlesForSource("NEJM") },
  { name: "Cell", label: "CELL · CELL METABOLISM", source: "Cell", count: countArticlesForSource("Cell") },
  { name: "JAMA", label: "JAMA · JAMA INTERN MED", source: "JAMA", count: countArticlesForSource("JAMA") },
  { name: "Lancet", label: "LANCET · LANCET DIET", source: "Lancet", count: countArticlesForSource("Lancet") },
  { name: "Nature", label: "NATURE · NAT MEDICINE", source: "Nature", count: countArticlesForSource("Nature") },
  { name: "BMJ", label: "BMJ · BMJ NUTRITION", source: "BMJ", count: countArticlesForSource("BMJ") },
];

export default function ResearchSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="research" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">
        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 03</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">The Research Desk</span>
          </div>
          <ShareBookmark id="research" title="§ 03 The Research Desk — Dietary Index" size="sm" />
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-16">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-3 leading-tight"
            >
              The week's nutrition literature, condensed.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-6 sm:mb-8 break-words">
              We read every nutrition-relevant paper published in the major medical and scientific journals, then condense each into two paragraphs: <em>what the paper did</em>, and <em>what it means</em>. Every card links to the source. You decide how deep to go.
            </p>

            {/* Paper cards */}
            <div className="border border-border">
              {researchPapers.map((paper, idx) => (
                <div key={paper.id} className={idx < researchPapers.length - 1 ? "border-b border-border" : ""}>
                  {/* Card header */}
                  <div className="p-4 sm:p-5 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <button
                        className="flex-1 text-left min-w-0"
                        onClick={() => setExpanded(expanded === idx ? null : idx)}
                      >
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-foreground/70">
                            {paper.journal}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">{paper.date}</span>
                          <span className={`tier-pill tier-${paper.tier.toLowerCase()}`}>
                            Tier {paper.tier}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">{paper.readTime} read</span>
                        </div>
                        <h3
                          style={{ fontFamily: "var(--font-display)" }}
                          className="text-[15px] sm:text-[16px] font-normal text-foreground leading-snug break-words"
                        >
                          {paper.title}
                        </h3>
                        <p className="text-[11px] sm:text-[12px] text-muted-foreground mt-1 break-words">{paper.authors}</p>
                      </button>
                      {/* Share + bookmark + expand */}
                      <div className="flex items-center gap-1 shrink-0 mt-0.5">
                        <ShareBookmark
                          id={`paper-${paper.id}`}
                          title={paper.title}
                          url={`https://doi.org/${paper.doi}`}
                          size="sm"
                        />
                        <button
                          className="w-6 h-6 flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground transition-colors text-lg"
                          onClick={() => setExpanded(expanded === idx ? null : idx)}
                        >
                          {expanded === idx ? "−" : "+"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {expanded === idx && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border bg-muted/20">
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
                        <div>
                          <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">
                            What the paper did
                          </div>
                          <p className="text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed break-words">{paper.whatDid}</p>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">
                            What it means
                          </div>
                          <p className="text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed break-words">{paper.whatMeans}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
                        <div className="flex gap-1.5 flex-wrap">
                          {paper.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono tracking-wider uppercase border border-border px-2 py-0.5 text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm:ml-auto text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 whitespace-nowrap"
                        >
                          Read in {paper.journal} →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <a href="/research" className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-colors pb-0.5">
                Open full archive →
              </a>
            </div>
          </div>

          {/* Right: journal sources — stacks below on mobile */}
          <div className="mt-4 lg:mt-0">
            <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
              Browse by source
            </div>
            <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg sm:text-xl font-normal text-foreground mb-4">
              Every major journal, in one feed.
            </h3>
            <div className="border border-border mb-6">
              {JOURNALS.map((j, i) => (
                <a
                  key={j.name}
                  href={`/journals?source=${j.source}`}
                  className={`flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors ${i < JOURNALS.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="min-w-0 mr-2">
                    <div className="text-[12px] font-medium text-foreground">{j.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-wider truncate">{j.label}</div>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground shrink-0">{j.count} papers</span>
                </a>
              ))}
            </div>
            <a href="/journals" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground border-b border-border hover:text-foreground transition-colors pb-0.5">
              All indexed sources →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
