// GlossarySection — mobile-first with per-term share + bookmark
import { glossaryTerms } from "@/lib/data";
import ShareBookmark from "@/components/ShareBookmark";

export default function GlossarySection() {
  return (
    <section id="glossary" className="border-b border-border">
      <div className="container py-12 sm:py-16 lg:py-20">
        {/* Section label + share */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 06</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Key Concepts</span>
          </div>
          <ShareBookmark id="glossary" title="§ 06 Key Concepts — Dietary Index" size="sm" />
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-4 leading-tight"
            >
              The words you need, defined.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-6 break-words">
              Nutrition science is dense with jargon. Each definition below is linked to the primary source from which it derives. Plain language, precise meaning.
            </p>
            <a href="#" className="text-[11px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5">
              Full glossary →
            </a>
          </div>

          <div className="border border-border mt-4 lg:mt-0">
            {glossaryTerms.map((term, i) => (
              <div
                key={term.id}
                className={`px-4 sm:px-5 py-4 ${i < glossaryTerms.length - 1 ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground/40 mt-1 w-5 shrink-0">
                    {String(term.id).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-[14px] sm:text-[15px] font-normal text-foreground break-words"
                      >
                        {term.term}
                      </h4>
                      <ShareBookmark
                        id={`glossary-${term.id}`}
                        title={`${term.term} — Dietary Index Glossary`}
                        url={`https://doi.org/${term.refDoi}`}
                        size="sm"
                      />
                    </div>
                    <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-relaxed mb-2 break-words">
                      {term.definition}
                    </p>
                    <a
                      href={`https://doi.org/${term.refDoi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-muted-foreground/60 hover:text-foreground transition-colors border-b border-border hover:border-foreground/40 pb-0.5 break-words"
                    >
                      {term.ref} Open source →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
