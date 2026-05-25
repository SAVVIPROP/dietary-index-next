/**
 * Brain Health Collection Page — /journals/brain-health
 * Design: vitaei.com light editorial style
 * — White background, Playfair Display headings, JetBrains Mono labels
 * — Evidence-tier colour coding: Tier I green, Tier II amber, Tier III slate
 */

import { Link } from "@/lib/wouter-shim";
import { ArrowLeft, Brain, BookOpen, Share2, Bookmark, ExternalLink, ChevronRight } from "lucide-react";
import Seo from "@/components/Seo";
import ShareBookmark from "@/components/ShareBookmark";
import { journalArticles, JournalArticle } from "@/lib/journals";

const BRAIN_SLUGS = [
  "the-mind-diet-can-food-prevent-dementia",
  "the-gut-brain-axis-how-your-diet-affects-mental-health",
  "omega-3-supplements-do-they-work",
  "choline-the-essential-nutrient-most-people-are-deficient-in",
  "does-the-mediterranean-diet-actually-work",
  "magnesium-deficiency-the-invisible-nutrient-gap",
  "vitamin-d-deficiency-what-you-need-to-know",
  "polyphenols-and-gut-health-the-evidence",
  "green-tea-and-longevity-what-the-evidence-shows",
  "the-gut-hormone-connection-how-diet-controls-hunger-and-satiety",
];

const BRAIN_STATS = [
  { value: "10", unit: "articles", label: "Brain health guides" },
  { value: "1", unit: "Tier I", label: "RCT-backed diet (MIND)" },
  { value: "2.4M", unit: "/mo", label: "Monthly searches" },
  { value: "40%", unit: "risk ↓", label: "Dementia risk reduction (MIND diet)" },
];

const KEY_FINDINGS = [
  {
    icon: "🧠",
    title: "The MIND Diet reduces Alzheimer's risk by up to 53%",
    detail: "A hybrid of Mediterranean and DASH, specifically designed for neuroprotection. The MIND trial (2023) showed significant cognitive benefit in at-risk adults.",
    tier: "I",
  },
  {
    icon: "🦠",
    title: "The gut-brain axis is bidirectional",
    detail: "90% of serotonin is produced in the gut. Diet-driven changes in microbiome composition measurably alter mood, anxiety, and cognitive function within weeks.",
    tier: "II",
  },
  {
    icon: "🐟",
    title: "Omega-3 DHA is essential for brain structure",
    detail: "DHA makes up 40% of the polyunsaturated fatty acids in the brain. Low DHA is associated with accelerated cognitive decline and increased depression risk.",
    tier: "I",
  },
  {
    icon: "🥚",
    title: "Choline deficiency impairs memory formation",
    detail: "Choline is the precursor to acetylcholine — the primary neurotransmitter for memory. 90% of adults are deficient. Eggs and liver are the richest dietary sources.",
    tier: "II",
  },
];

const TIER_COLORS: Record<string, string> = {
  I: "text-emerald-700 bg-emerald-50 border-emerald-200",
  II: "text-amber-700 bg-amber-50 border-amber-200",
  III: "text-slate-600 bg-slate-50 border-slate-200",
};

export default function BrainHealthPage() {
  const articles = BRAIN_SLUGS
    .map(slug => journalArticles.find((j: JournalArticle) => j.slug === slug))
    .filter((j): j is JournalArticle => j !== undefined);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Brain Health & Diet — Evidence-Based Guides | Dietary Index"
        description="How diet affects cognitive function, dementia risk, and mental health. Evidence-based guides on the MIND diet, gut-brain axis, omega-3, choline, and more."
        tags={["brain health diet", "MIND diet", "gut brain axis", "foods for brain health", "dementia prevention diet"]}
        canonical="/journals/brain-health"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Brain Health & Diet Collection",
          "description": "Evidence-based guides on diet and cognitive health, dementia prevention, and the gut-brain axis.",
          "url": "https://dietaryindex.com/journals/brain-health",
        }}
      />

      {/* Hero */}
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link href="/journals" className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-stone-800 transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" />
            ALL JOURNALS
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-violet-700" />
                </div>
                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Collection · Brain Health</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
                Diet &amp; the Brain
              </h1>
              <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
                The brain consumes 20% of your calories and is exquisitely sensitive to what you eat. This collection covers the evidence on cognitive function, dementia prevention, mental health, and the gut-brain axis — from RCTs to mechanistic studies.
              </p>
            </div>
            <div className="shrink-0">
              <ShareBookmark
                id="brain-health-collection"
                title="Brain Health & Diet Collection"
                type="collection"
                category="Brain Health"
                subtitle="Evidence-based guides on diet and cognitive health"
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-stone-200">
            {BRAIN_STATS.map(s => (
              <div key={s.label}>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl font-bold text-stone-900">{s.value}</span>
                  <span className="text-xs font-mono text-stone-500">{s.unit}</span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">Key Findings</h2>
        <p className="text-sm text-stone-500 font-mono mb-8">WHAT THE EVIDENCE SHOWS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {KEY_FINDINGS.map(f => (
            <div key={f.title} className="border border-stone-200 rounded-lg p-5 hover:border-stone-300 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{f.icon}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${TIER_COLORS[f.tier]}`}>
                  TIER {f.tier}
                </span>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 leading-snug">{f.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Brain-Diet Connection explainer */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Why diet shapes cognition</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The brain is the most metabolically active organ in the body. It requires a continuous supply of glucose, fatty acids, amino acids, and micronutrients to maintain synaptic plasticity, neurogenesis, and neurotransmitter synthesis.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Chronic dietary deficiencies — particularly in omega-3 DHA, choline, B vitamins, magnesium, and vitamin D — are now understood to accelerate neurodegeneration and increase the risk of late-onset Alzheimer's disease.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Conversely, dietary patterns rich in polyphenols, long-chain omega-3s, and fermented foods have been shown in RCTs to slow cognitive decline, reduce neuroinflammation, and improve mood outcomes.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">The gut-brain axis</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The enteric nervous system contains more neurons than the spinal cord. The vagus nerve carries bidirectional signals between the gut microbiome and the brain — meaning that what you eat directly modulates anxiety, depression, and cognitive clarity.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Ultra-processed food diets reduce microbial diversity within 14 days, measurably increasing markers of neuroinflammation. Mediterranean-pattern diets restore diversity and are associated with lower rates of depression in prospective cohort studies.
              </p>
              <div className="mt-4 p-4 border border-violet-200 bg-violet-50 rounded-lg">
                <p className="text-sm text-violet-800 font-medium">
                  "Diet is the single most modifiable risk factor for dementia — more impactful than any currently approved pharmacological intervention."
                </p>
                <p className="text-xs text-violet-600 mt-2 font-mono">— Lancet Commission on Dementia Prevention, 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">Brain Health Guides</h2>
            <p className="text-sm font-mono text-stone-500">{articles.length} EVIDENCE-BASED ARTICLES</p>
          </div>
          <BookOpen className="w-5 h-5 text-stone-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article: JournalArticle, i: number) => (
            <Link key={article.slug} href={`/journals/${article.slug}`}>
              <div className="group border border-stone-200 rounded-lg p-5 hover:border-stone-400 hover:shadow-sm transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs font-mono text-stone-400">#{(i + 1).toString().padStart(2, "0")}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${TIER_COLORS[article.tier] ?? TIER_COLORS["III"]}`}>
                      TIER {article.tier}
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      article.verdictShort === "Myth" ? "bg-red-50 text-red-700" :
                      article.verdictShort === "Mostly True" ? "bg-emerald-50 text-emerald-700" :
                      "bg-stone-100 text-stone-600"
                    }`}>
                      {article.verdictShort}
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-stone-900 leading-snug mb-2 group-hover:text-emerald-800 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">{article.intro}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-stone-400 font-mono">
                  <span>{article.readTime}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-stone-900 mb-1">Find your optimal diet for brain health</h3>
            <p className="text-sm text-stone-500">Take the 12-question evidence-based protocol quiz and get a personalised recommendation.</p>
          </div>
          <Link href="/protocol">
            <button className="shrink-0 bg-stone-900 text-white px-6 py-3 rounded text-sm font-mono hover:bg-stone-700 transition-colors whitespace-nowrap">
              BUILD PROTOCOL →
            </button>
          </Link>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-stone-200">
        <Link href="/journals" className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-stone-800 transition-colors">
          <ArrowLeft className="w-3 h-3" />
          BACK TO ALL JOURNALS
        </Link>
      </div>
    </div>
  );
}
