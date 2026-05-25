"use client";
// ArticlePage — full individual journal article view with world-class SEO
import { useParams, Link } from "@/lib/wouter-shim";
import { journalArticles, verdictColors } from "@/lib/journals";
import { diets } from "@/lib/data";
import ShareBookmark from "@/components/ShareBookmark";
import Seo from "@/components/Seo";
import {
  articleSchema,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { useEffect, useRef, useState, useMemo } from "react";
import { incrementArticleView } from "@/hooks/useArticleViews";
import AffiliateSupplements from "@/components/AffiliateSupplements";

// Map article slugs → relevant diet IDs (numeric) for the related diets sidebar
// Diet IDs: 1=Mediterranean, 2=DASH, 3=MIND, 4=WFPB, 5=Vegan, 6=Vegetarian,
// 7=Pescatarian, 8=Keto, 9=Low-Carb, 10=Paleo, 11=Carnivore, 12=IF 16:8,
// 13=Portfolio, 14=Nordic, 15=Longevity
const ARTICLE_DIET_MAP: Record<string, number[]> = {
  "does-eating-fat-make-you-fat": [1, 13, 14],
  "is-breakfast-the-most-important-meal": [12, 1, 3],
  "does-red-meat-cause-cancer": [5, 1, 13],
  "how-much-protein-do-you-need": [1, 10, 11],
  "is-sugar-toxic": [2, 1, 4],
  "does-gluten-harm-everyone": [1, 10, 5],
  "do-detox-diets-work": [1, 5, 14],
  "are-eggs-bad-for-your-heart": [1, 2, 13],
  "does-intermittent-fasting-work": [12, 1, 3],
  "is-the-gut-microbiome-the-key-to-everything": [1, 5, 14],
  // Cultural longevity guides
  "the-okinawa-diet": [15, 1, 3],
  "the-sardinian-diet": [1, 13, 14],
  "the-ikarian-diet": [1, 3, 13],
  "the-nicoya-diet": [4, 5, 1],
  "the-traditional-japanese-diet": [7, 1, 14],
  "the-french-paradox": [1, 13, 6],
  // High-traffic practical guides
  "is-the-ketogenic-diet-safe-long-term": [8, 9, 1],
  "does-the-mediterranean-diet-actually-work": [1, 3, 13],
  "what-is-the-dash-diet-and-does-it-lower-blood-pressure": [2, 1, 13],
  "is-plant-based-eating-healthier-than-eating-meat": [4, 5, 6],
  // Batch11 guides
  "the-anti-inflammatory-diet-what-the-evidence-says": [1, 3, 14],
  "does-fasting-reverse-type-2-diabetes": [12, 9, 2],
  "creatine-supplementation-the-complete-evidence-review": [10, 11, 1],
  "the-best-diet-for-pcos": [1, 2, 4],
  "does-organic-food-have-more-nutrients": [4, 5, 1],
  "the-gut-microbiome-and-weight-loss": [1, 5, 14],
  "vitamin-k2-the-forgotten-vitamin": [1, 6, 14],
  "the-science-of-food-cravings": [1, 12, 2],
  "the-portfolio-diet-the-most-underrated-diet-for-cholesterol": [13, 1, 2],
  "the-best-diet-for-longevity-what-centenarians-eat-in-2025": [15, 1, 3],
};

function NotFoundArticle() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo title="Article Not Found" description="This article could not be found." noIndex />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[11px] font-mono text-muted-foreground mb-4">ARTICLE NOT FOUND</p>
          <Link href="/#journals" className="text-[12px] font-mono uppercase tracking-wider border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5">
            ← Back to Journals
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = journalArticles.find(a => a.slug === slug);
  const [readProgress, setReadProgress] = useState(0);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setReadProgress(0);
    setWidgetVisible(false);
    // Track view — increment once per slug visit
    if (slug) incrementArticleView(slug);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const articleTop = el.offsetTop;
      const articleHeight = el.offsetHeight;
      const scrolled = window.scrollY - articleTop + window.innerHeight * 0.1;
      const progress = Math.min(Math.max(scrolled / articleHeight, 0), 1);
      setReadProgress(progress);
      setWidgetVisible(progress > 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  if (!article) return <NotFoundArticle />;

  const verdictColor = verdictColors[article.verdictShort] ?? "var(--muted-foreground)";
  // Scored related articles — tag overlap + same category, deduplicated, top 5
  const relatedArticles = useMemo(() => {
    return journalArticles
      .filter(a => a.id !== article.id)
      .map(a => {
        const tagOverlap = a.tags.filter(t => article.tags.includes(t)).length;
        const sameCategory = a.category === article.category ? 2 : 0;
        const sameTier = a.tier === article.tier ? 1 : 0;
        return { article: a, score: tagOverlap * 2 + sameCategory + sameTier };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ article: a }) => a);
  }, [article]);
  const relatedDietIds = ARTICLE_DIET_MAP[article.slug] ?? [];
  const relatedDiets = relatedDietIds
    .map(id => diets.find(d => d.id === id))
    .filter((d): d is (typeof diets)[0] => d !== undefined);

  // Build SEO schemas
  const canonicalUrl = `${SITE_URL}/journals/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      articleSchema({
        title: article.title,
        description: article.subtitle,
        slug: article.slug,
        publishedTime: article.publishDate,
        tags: article.tags,
        refs: article.refs,
      }),
      breadcrumbSchema([
        { name: "Dietary Index", url: SITE_URL },
        { name: "Journals & Guides", url: `${SITE_URL}/#journals` },
        { name: article.category, url: `${SITE_URL}/#journals` },
        { name: article.title, url: canonicalUrl },
      ]),
      faqSchema([
        {
          question: article.title,
          answer: article.verdict,
        },
        ...article.sections
          .filter(s => s.callout)
          .map(s => ({
            question: s.heading,
            answer: s.callout!.text,
          })),
      ]),
    ],
  };

  return (
    <>
      <Seo
        title={article.title}
        description={`${article.subtitle} Verdict: ${article.verdict}`}
        canonical={canonicalUrl}
        ogType="article"
        publishedTime={article.publishDate}
        modifiedTime={article.publishDate}
        tags={[
          ...article.tags,
          article.category,
          "dietary index",
          "evidence-based nutrition",
          "nutrition science",
          "diet research",
        ]}
        jsonLd={jsonLd}
      />

      {/* Reading progress bar — fixed at top, fills as user scrolls through the article */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div
          className="h-full transition-[width] duration-75"
          style={{
            width: `${readProgress * 100}%`,
            background: "var(--tier-i)",
          }}
        />
      </div>

      {/* Reading progress widget — fades in after 15% scroll, shows % read, time left, back-to-top */}
      <div
        className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2 transition-all duration-500"
        style={{
          opacity: widgetVisible ? 1 : 0,
          transform: widgetVisible ? "translateY(0)" : "translateY(12px)",
          pointerEvents: widgetVisible ? "auto" : "none",
        }}
        aria-label="Reading progress"
      >
        {/* Progress badge: percentage + time remaining */}
        <div
          className="text-[10px] font-mono px-2.5 py-1.5 rounded border select-none flex items-center gap-2"
          style={{
            background: "var(--bg-primary)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <span>{Math.round(readProgress * 100)}% read</span>
          {readProgress < 0.99 && (() => {
            const totalMinutes = parseInt(article.readTime) || 8;
            const remaining = Math.ceil(totalMinutes * (1 - readProgress));
            return (
              <>
                <span style={{ opacity: 0.3 }}>·</span>
                <span>~{remaining} min left</span>
              </>
            );
          })()}
        </div>
        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 text-[10px] font-mono px-3 py-2 rounded border transition-colors hover:border-[var(--tier-i)] hover:text-[var(--tier-i)]"
          style={{
            background: "var(--bg-primary)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
          aria-label="Back to top"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Top
        </button>
      </div>

      {/* Article header */}
      <header className="border-b border-border pt-14">
        <div className="container py-8 sm:py-12 lg:py-16">
          {/* Breadcrumb — also rendered as visible nav for UX + SEO */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 flex-wrap">
            <Link href="/" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
              Dietary Index
            </Link>
            <span className="text-muted-foreground/30 text-[10px]" aria-hidden>/</span>
            <Link href="/#journals" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
              Journals
            </Link>
            <span className="text-muted-foreground/30 text-[10px]" aria-hidden>/</span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground truncate max-w-[200px]">
              {article.category}
            </span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-16 items-start">
            <div>
              {/* Tags */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-2 py-0.5">
                  {article.category}
                </span>
                <span className={`tier-pill tier-${article.tier.toLowerCase()}`}>Tier {article.tier}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{article.readTime} read</span>
                <span className="text-[10px] font-mono text-muted-foreground/40">·</span>
                <span className="text-[10px] font-mono text-muted-foreground">{article.searchVolume}</span>
              </div>

              {/* H1 — exact match to primary search query */}
              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-4 leading-tight"
              >
                {article.title}
              </h1>

              {/* Subtitle — meta description visible on page */}
              <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed mb-6 break-words max-w-2xl">
                {article.subtitle}
              </p>

              {/* Share + bookmark + date */}
              <div className="flex items-center gap-4 flex-wrap">
                <ShareBookmark
                  id={`article-${article.id}`}
                  title={article.title}
                  url={canonicalUrl}
                  size="md"
                  type="article"
                  subtitle={article.subtitle}
                  category={article.category}
                />
                <time
                  dateTime={article.publishDate}
                  className="text-[10px] font-mono text-muted-foreground"
                >
                  Published{" "}
                  {new Date(article.publishDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>

            {/* Verdict card */}
            <div className="border border-border p-4 sm:p-5 mt-4 lg:mt-0">
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">
                Evidence Verdict
              </div>
              <div
                className="text-[13px] font-mono tracking-wider uppercase px-3 py-1.5 border inline-block mb-3"
                style={{
                  color: verdictColor,
                  borderColor: verdictColor + "40",
                  background: verdictColor + "0d",
                }}
              >
                {article.verdictShort}
              </div>
              <p className="text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed break-words">
                {article.verdict}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Article body */}
      <main className="flex-1" ref={articleRef}>
        <div className="container py-8 sm:py-12">
          <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-16 items-start">

            {/* Main content */}
            <article className="min-w-0" itemScope itemType="https://schema.org/Article">
              <meta itemProp="headline" content={article.title} />
              <meta itemProp="description" content={article.subtitle} />
              <meta itemProp="datePublished" content={article.publishDate} />
              <meta itemProp="author" content="Dietary Index" />

              {/* Intro — styled as lead paragraph */}
              <p
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[16px] sm:text-[18px] text-foreground leading-relaxed mb-8 sm:mb-10 break-words"
                itemProp="abstract"
              >
                {article.intro}
              </p>

              {/* Sections */}
              {article.sections.map((section, idx) => (
                <section key={idx} className="mb-8 sm:mb-10">
                  <h2
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-[20px] sm:text-[22px] font-normal text-foreground mb-3 leading-snug break-words"
                  >
                    {section.heading}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-foreground/80 leading-relaxed mb-4 break-words">
                    {section.body}
                  </p>
                  {section.callout && (
                    <CalloutBox type={section.callout.type} text={section.callout.text} />
                  )}
                </section>
              ))}

              {/* Key takeaways — FAQ-structured for featured snippets */}
              <div className="border border-border p-4 sm:p-6 mb-8 sm:mb-10 bg-muted/10">
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4">
                  Key Takeaways
                </div>
                <ul className="space-y-2" itemScope itemType="https://schema.org/ItemList">
                  {article.keyTakeaways.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/ListItem"
                    >
                      <meta itemProp="position" content={String(i + 1)} />
                      <span className="text-[11px] font-mono text-muted-foreground/40 mt-0.5 shrink-0 w-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[12px] sm:text-[13px] text-foreground/80 break-words" itemProp="name">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* References */}
              <div className="border-t border-border pt-6 sm:pt-8">
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4">
                  References
                </div>
                <ol className="space-y-3">
                  {article.refs.map((ref, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-[11px] font-mono text-muted-foreground/40 shrink-0 w-5 mt-0.5">
                        [{i + 1}]
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12px] text-muted-foreground break-words">
                          <span className="text-foreground/70">{ref.authors}</span>{" "}
                          <em>{ref.title}</em>{" "}
                          <span className="font-mono text-muted-foreground/60">
                            {ref.journal} ({ref.year}).
                          </span>
                        </p>
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-muted-foreground/50 hover:text-foreground transition-colors border-b border-border hover:border-foreground/40 pb-0.5 break-all"
                        >
                          DOI: {ref.doi}
                        </a>
                      </div>
                    </li>
                  ))}
                 </ol>
              </div>

              {/* ── Cited by ── */}
              {(() => {
                const SOURCE_ALIASES_LOCAL: Record<string, string[]> = {
                  NEJM: ["NEJM", "New England Journal of Medicine", "N Engl J Med"],
                  Cell: ["Cell", "Cell Metabolism", "Cell Reports", "Cell Host & Microbe"],
                  JAMA: ["JAMA", "JAMA Internal Medicine", "JAMA Intern Med", "JAMA Oncology", "JAMA Pediatrics", "JAMA Network Open"],
                  Lancet: ["Lancet", "The Lancet", "Lancet Diabetes Endocrinol", "The Lancet Diabetes & Endocrinology", "Lancet Oncology", "The Lancet Oncology", "Lancet Psychiatry"],
                  Nature: ["Nature", "Nature Medicine", "Nature Metabolism", "Nature Reviews", "Nature Communications", "Nature Aging"],
                  BMJ: ["BMJ", "British Medical Journal", "BMJ Nutrition", "BMJ Open"],
                };
                const citedSources = Object.entries(SOURCE_ALIASES_LOCAL).flatMap(([key, aliases]) => {
                  const matchedRefs = article.refs.filter(ref =>
                    aliases.some(alias => ref.journal.toLowerCase().includes(alias.toLowerCase()))
                  );
                  if (matchedRefs.length === 0) return [];
                  return [{ key, refs: matchedRefs }];
                });
                if (citedSources.length === 0) return null;
                return (
                  <div className="border-t border-border pt-6 sm:pt-8">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4">
                      Cited Sources
                    </div>
                    <div className="space-y-3">
                      {citedSources.map(({ key, refs: matchedRefs }) => (
                        <div key={key} className="border border-border p-3 sm:p-4">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-foreground font-medium">{key}</span>
                            <Link
                              href={`/journals?source=${key}`}
                              className="text-[9px] font-mono tracking-wider uppercase text-muted-foreground/60 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/30 pb-0.5"
                            >
                              Browse all {key} articles →
                            </Link>
                          </div>
                          <ul className="space-y-1.5">
                            {matchedRefs.map((ref, i) => (
                              <li key={i} className="text-[11px] text-muted-foreground leading-relaxed">
                                <span className="text-foreground/70">{ref.authors}</span>{" "}
                                <em>{ref.title}</em>{" "}
                                <span className="font-mono text-muted-foreground/50">{ref.journal} ({ref.year})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* ── Affiliate supplements ── */}
              <AffiliateSupplements slug={article.slug} />

              {/* ── You might also like ── */}
              {(() => {
                const related = journalArticles
                  .filter(a => a.id !== article.id)
                  .filter(a =>
                    a.tags.some(t => article.tags.includes(t)) ||
                    a.category === article.category
                  )
                  .slice(0, 3);
                if (related.length === 0) return null;
                return (
                  <div className="mt-10 pt-8 border-t border-border">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-5">
                      You Might Also Like
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {related.map(a => (
                        <Link
                          key={a.id}
                          href={`/journals/${a.slug}`}
                          className="block border border-border p-4 hover:border-foreground/30 hover:shadow-sm transition-all group"
                        >
                          <div
                            className="text-[9px] font-mono tracking-wider uppercase mb-2"
                            style={{ color: verdictColors[a.verdictShort] ?? 'var(--muted-foreground)' }}
                          >
                            {a.verdictShort}
                          </div>
                          <p
                            style={{ fontFamily: 'var(--font-display)' }}
                            className="text-[13px] text-foreground leading-snug mb-2 line-clamp-3 group-hover:text-foreground/80 transition-colors break-words"
                          >
                            {a.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                            <span>{a.readTime} read</span>
                            <span>·</span>
                            <span>{a.category}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </article>
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-8 space-y-6 mt-4 lg:mt-0">

              {/* Related diets */}
              {relatedDiets.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
                    Related Diets
                  </div>
                  <div className="border border-border">
                    {relatedDiets.map((diet, i) => (
                      <a
                        key={diet.id}
                        href="/#index"
                        className={`block px-4 py-3 hover:bg-muted/30 transition-colors ${i < relatedDiets.length - 1 ? "border-b border-border" : ""}`}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            style={{ fontFamily: "var(--font-display)" }}
                            className="text-[13px] text-foreground"
                          >
                            {diet.name}
                          </span>
                          <span className={`tier-pill tier-${diet.tier.toLowerCase()} shrink-0`}>
                            {diet.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground break-words line-clamp-2">
                          {diet.tagline}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Topics */}
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
                  Topics
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider uppercase border border-border px-2 py-1 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related articles — scored by tag overlap + category */}
              {relatedArticles.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
                    Related Articles
                  </div>
                  <div className="border border-border divide-y divide-border">
                    {relatedArticles.map((a) => (
                      <Link
                        key={a.id}
                        href={`/journals/${a.slug}`}
                        className="block px-4 py-3 hover:bg-muted/30 transition-colors group"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <div
                            className="text-[9px] font-mono tracking-wider uppercase"
                            style={{ color: verdictColors[a.verdictShort] ?? "var(--muted-foreground)" }}
                          >
                            {a.verdictShort}
                          </div>
                          <span className={`tier-pill tier-${a.tier.toLowerCase()} shrink-0`}>
                            {a.tier}
                          </span>
                        </div>
                        <p
                          style={{ fontFamily: "var(--font-display)" }}
                          className="text-[13px] text-foreground leading-snug break-words group-hover:text-foreground/80 transition-colors line-clamp-2"
                        >
                          {a.title}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-1">
                          {a.readTime} · {a.category}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to journals */}
              <Link
                href="/#journals"
                className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground/40 transition-colors pb-0.5 inline-block"
              >
                ← All Journals
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

function CalloutBox({
  type,
  text,
}: {
  type: "verdict" | "myth" | "fact" | "warning";
  text: string;
}) {
  const styles = {
    verdict: {
      border: "var(--tier-i)",
      bg: "oklch(0.35 0.09 148 / 0.06)",
      label: "Verdict",
      color: "var(--tier-i)",
    },
    myth: {
      border: "var(--destructive)",
      bg: "oklch(0.577 0.245 27.325 / 0.06)",
      label: "Common Myth",
      color: "var(--destructive)",
    },
    fact: {
      border: "oklch(0.52 0.13 72)",
      bg: "oklch(0.52 0.13 72 / 0.06)",
      label: "Evidence",
      color: "oklch(0.52 0.13 72)",
    },
    warning: {
      border: "oklch(0.52 0.13 72)",
      bg: "oklch(0.52 0.13 72 / 0.06)",
      label: "Note",
      color: "oklch(0.52 0.13 72)",
    },
  };
  const s = styles[type];
  return (
    <div
      className="border-l-2 px-4 py-3 my-4"
      style={{ borderColor: s.border, background: s.bg }}
    >
      <div
        className="text-[10px] font-mono tracking-widest uppercase mb-1"
        style={{ color: s.color }}
      >
        {s.label}
      </div>
      <p className="text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed break-words italic">
        {text}
      </p>
    </div>
  );
}
