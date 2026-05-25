/**
 * GUT HEALTH COLLECTION PAGE
 * Design: vitaei.com editorial light style
 * Serif display headings (Playfair Display), monospace labels (JetBrains Mono)
 * Off-white background, dark text, sage green accents
 */

import { useState } from "react";
import { Link } from "@/lib/wouter-shim";
import { ArrowLeft, ArrowRight, BookOpen, Share2, Bookmark, ExternalLink } from "lucide-react";
import { journalArticles } from "@/lib/journals";
import Seo from "@/components/Seo";
import ShareBookmark from "@/components/ShareBookmark";

const GUT_HEALTH_SLUGS = [
  "best-foods-for-gut-health",
  "the-gut-microbiome-the-key-to-everything",
  "the-gut-brain-axis-how-diet-affects-mental-health",
  "the-gut-immune-connection",
  "the-gut-skin-axis-acne-eczema-and-diet",
  "the-gut-liver-axis-how-diet-affects-your-liver",
  "the-gut-health-diet-what-to-eat-for-a-healthy-microbiome",
  "why-fibre-is-the-most-underrated-nutrient",
  "resistant-starch-the-forgotten-gut-health-tool",
  "are-artificial-sweeteners-safe",
  "ultra-processed-foods-the-most-important-concept-in-modern-nutrition",
];

const KEY_PRINCIPLES = [
  {
    number: "01",
    title: "Diversity Over Quantity",
    body: "Eating 30+ different plant species per week is the single strongest predictor of microbiome diversity — more powerful than eating large amounts of any single plant food.",
  },
  {
    number: "02",
    title: "Fermented Foods Daily",
    body: "Yoghurt, kefir, kimchi, sauerkraut, and kombucha increase microbiome diversity and reduce inflammatory markers more effectively than fibre supplements alone.",
  },
  {
    number: "03",
    title: "Fibre as Fuel",
    body: "Gut bacteria ferment dietary fibre into short-chain fatty acids (SCFAs) — butyrate, propionate, and acetate — which fuel colonocytes, reduce inflammation, and regulate immunity.",
  },
  {
    number: "04",
    title: "Avoid Microbiome Disruptors",
    body: "Ultra-processed foods, emulsifiers, artificial sweeteners, and unnecessary antibiotics reduce microbiome diversity within days. Minimising these is as important as adding beneficial foods.",
  },
];

const STAT_ROW = [
  { value: "38T", label: "Bacteria in the gut" },
  { value: "70%", label: "Of immune cells in the gut" },
  { value: "95%", label: "Of serotonin made in the gut" },
  { value: "30+", label: "Plant species/week for diversity" },
];

export default function GutHealthPage() {
  const gutArticles = journalArticles.filter(a => GUT_HEALTH_SLUGS.includes(a.slug));
  const allGutArticles = journalArticles.filter(a =>
    a.category === "Gut Health" ||
    a.tags.some(t => t.toLowerCase().includes("gut") || t.toLowerCase().includes("microbiome") || t.toLowerCase().includes("fibre") || t.toLowerCase().includes("fiber") || t.toLowerCase().includes("probiotic") || t.toLowerCase().includes("prebiotic"))
  );
  // Merge, deduplicate
  const seen = new Set<string>();
  const displayArticles = [...gutArticles, ...allGutArticles].filter(a => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });

  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <Seo
        title="Gut Health Collection — Dietary Index"
        description="Evidence-based guides on the gut microbiome, fermented foods, fibre, and the gut-brain, gut-immune, and gut-skin axes. The most comprehensive gut health resource on the web."
        canonical="/journals/gut-health"
        tags={["gut health", "microbiome", "fermented foods", "fibre", "gut brain axis"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Gut Health Collection — Dietary Index",
          "description": "Evidence-based guides on the gut microbiome and dietary interventions for gut health.",
          "url": "https://dietaryindex.com/journals/gut-health",
        }}
      />

      <div className="min-h-screen bg-[var(--bg-primary)]">
        {/* Breadcrumb */}
        <div className="border-b border-[var(--border-subtle)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#journals" className="hover:text-[var(--text-primary)] transition-colors">Journals</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">Gut Health</span>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <Link href="/#journals" className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Collections
            </Link>

            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-[var(--tier-i)] text-[var(--tier-i)]">COLLECTION</span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">{displayArticles.length} guides</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
                  Gut Health
                </h1>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                  The gut microbiome — 38 trillion bacteria — influences immunity, metabolism, mental health, and disease risk. These guides cover the evidence on what to eat, what to avoid, and how diet shapes your gut ecosystem.
                </p>
              </div>
              <ShareBookmark
                id="gut-health-collection"
                title="Gut Health Collection — Dietary Index"
                type="collection"
                category="Gut Health"
              />
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-10 border-t border-[var(--border-subtle)]">
              {STAT_ROW.map(s => (
                <div key={s.label}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--tier-i)]">{s.value}</div>
                  <div className="text-xs font-mono text-[var(--text-muted)] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="border-b border-[var(--border-subtle)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-8">
              Four Principles of Gut Health
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {KEY_PRINCIPLES.map(p => (
                <div key={p.number} className="flex gap-4">
                  <span className="font-mono text-xs text-[var(--tier-i)] mt-1 shrink-0">{p.number}</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-[var(--text-primary)] mb-1">{p.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gut-Body Connections */}
        <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              The Gut-Body Axis
            </h2>
            <p className="text-sm text-[var(--text-muted)] font-mono mb-8">How the gut microbiome connects to every major organ system</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { axis: "Gut–Brain", description: "95% of serotonin is produced in the gut. The vagus nerve carries bidirectional signals between gut bacteria and the brain, influencing mood, anxiety, and cognition.", slug: "the-gut-brain-axis-how-diet-affects-mental-health", color: "var(--tier-i)" },
                { axis: "Gut–Immune", description: "70% of immune cells reside in gut-associated lymphoid tissue. The microbiome trains the immune system to distinguish pathogens from harmless antigens.", slug: "the-gut-immune-connection", color: "var(--tier-ii)" },
                { axis: "Gut–Skin", description: "Gut dysbiosis is associated with acne, eczema, psoriasis, and rosacea. The gut-skin axis operates via systemic inflammation and immune modulation.", slug: "the-gut-skin-axis-acne-eczema-and-diet", color: "var(--tier-iii)" },
                { axis: "Gut–Liver", description: "The portal vein carries everything absorbed from the gut directly to the liver. Gut dysbiosis increases intestinal permeability and drives hepatic inflammation.", slug: "the-gut-liver-axis-how-diet-affects-your-liver", color: "var(--tier-i)" },
                { axis: "Gut–Metabolism", description: "Gut bacteria regulate energy extraction from food, insulin sensitivity, and adipose tissue inflammation — all central to metabolic disease.", slug: "the-gut-microbiome-the-key-to-everything", color: "var(--tier-ii)" },
                { axis: "Gut–Hormones", description: "Gut bacteria produce and modulate hormones including GLP-1, PYY, and ghrelin — the key signals controlling hunger, satiety, and blood glucose.", slug: "best-foods-for-gut-health", color: "var(--tier-iii)" },
              ].map(item => (
                <Link key={item.axis} href={`/journals/${item.slug}`}>
                  <div className="border border-[var(--border-subtle)] rounded-lg p-5 hover:border-[var(--tier-i)] transition-colors cursor-pointer group bg-[var(--bg-primary)]">
                    <div className="font-mono text-xs mb-2" style={{ color: item.color }}>{item.axis} Axis</div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">{item.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--tier-i)] transition-colors">
                      Read guide <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              All Gut Health Guides
            </h2>
            <p className="text-sm text-[var(--text-muted)] font-mono mb-8">{displayArticles.length} evidence-based articles</p>
            <div className="divide-y divide-[var(--border-subtle)]">
              {displayArticles.map((article, i) => (
                <div key={article.slug} className="py-5 group">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[var(--text-muted)] mt-1 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${
                          article.tier === "I" ? "border-[var(--tier-i)] text-[var(--tier-i)]" :
                          article.tier === "II" ? "border-[var(--tier-ii)] text-[var(--tier-ii)]" :
                          "border-[var(--tier-iii)] text-[var(--tier-iii)]"
                        }`}>
                          Tier {article.tier}
                        </span>
                        <span className="text-xs font-mono text-[var(--text-muted)]">{article.readTime}</span>
                      </div>
                      <Link href={`/journals/${article.slug}`}>
                        <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--tier-i)] transition-colors cursor-pointer leading-snug mb-1">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{article.subtitle}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                          article.verdictShort === "Myth" || article.verdictShort === "Mostly Myth" ? "bg-red-50 text-red-600" :
                          article.verdictShort === "Mostly True" || article.verdictShort === "True" ? "bg-green-50 text-green-700" :
                          "bg-amber-50 text-amber-700"
                        }`}>
                          {article.verdictShort}
                        </span>
                        <Link href={`/journals/${article.slug}`} className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--tier-i)] transition-colors flex items-center gap-1">
                          Read guide <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                    <ShareBookmark
                      id={`gut-${article.slug}`}
                      title={article.title}
                      type="article"
                      category={article.category}
                      subtitle={article.subtitle}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3">
              Discover Your Optimal Dietary Protocol
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
              Take the evidence-based dietary assessment to receive a personalised protocol based on your health goals, lifestyle, and current diet.
            </p>
            <Link href="/protocol">
              <button className="inline-flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 rounded font-mono text-sm hover:opacity-90 transition-opacity">
                Build Your Protocol <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
