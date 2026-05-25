/**
 * Supplements Collection Page — /journals/supplements
 * Design: vitaei.com light editorial style
 * — White background, Playfair Display headings, JetBrains Mono labels
 * — Evidence-tier colour coding: Tier I green, Tier II amber, Tier III slate
 */

import { Link } from "@/lib/wouter-shim";
import { ArrowLeft, FlaskConical, BookOpen, ChevronRight, AlertTriangle } from "lucide-react";
import Seo from "@/components/Seo";
import ShareBookmark from "@/components/ShareBookmark";
import { journalArticles, JournalArticle } from "@/lib/journals";

const SUPPLEMENT_SLUGS = [
  "omega-3-supplements-do-they-work",
  "vitamin-d-deficiency-what-you-need-to-know",
  "magnesium-deficiency-the-invisible-nutrient-gap",
  "creatine-the-most-evidence-backed-supplement-you-probably-arent-taking",
  "ashwagandha-what-the-evidence-shows-for-stress-sleep-and-testosterone",
  "berberine-vs-metformin-the-evidence",
  "collagen-supplements-do-they-actually-work-for-skin-joints-and-hair",
  "spermidine-and-longevity-the-autophagy-activator",
  "vitamin-k2-the-forgotten-vitamin-that-protects-your-heart-and-bones",
  "vitamin-c-beyond-the-common-cold",
  "zinc-deficiency-the-overlooked-mineral",
  "sulforaphane-the-most-evidence-backed-phytochemical",
];

const SUPP_STATS = [
  { value: "12", unit: "guides", label: "Supplement articles" },
  { value: "3", unit: "Tier I", label: "RCT-backed supplements" },
  { value: "3.1M", unit: "/mo", label: "Monthly searches" },
  { value: "$50B", unit: "market", label: "Global supplement industry" },
];

const EVIDENCE_TIERS = [
  {
    tier: "I",
    label: "Strong evidence",
    color: "text-[oklch(0.42_0.07_152)] bg-[oklch(0.95_0.04_152)] border-[oklch(0.85_0.05_152)]",
    supplements: ["Omega-3 DHA/EPA", "Vitamin D3", "Creatine monohydrate", "Magnesium glycinate"],
    note: "Supported by multiple large RCTs with consistent results",
  },
  {
    tier: "II",
    label: "Moderate evidence",
    color: "text-amber-700 bg-[oklch(0.96_0.04_78)] border-[oklch(0.85_0.06_75)]",
    supplements: ["Berberine", "Ashwagandha", "Vitamin K2", "Collagen peptides", "Zinc"],
    note: "Supported by smaller RCTs or strong mechanistic evidence",
  },
  {
    tier: "III",
    label: "Emerging evidence",
    color: "text-slate-600 bg-slate-50 border-slate-200",
    supplements: ["Spermidine", "Sulforaphane", "NMN/NR", "Urolithin A"],
    note: "Promising mechanistic data; human trial evidence still limited",
  },
];

const TIER_COLORS: Record<string, string> = {
  I: "text-[oklch(0.42_0.07_152)] bg-[oklch(0.95_0.04_152)] border-[oklch(0.85_0.05_152)]",
  II: "text-amber-700 bg-[oklch(0.96_0.04_78)] border-[oklch(0.85_0.06_75)]",
  III: "text-slate-600 bg-slate-50 border-slate-200",
};

export default function SupplementsPage() {
  const articles = SUPPLEMENT_SLUGS
    .map(slug => journalArticles.find((j: JournalArticle) => j.slug === slug))
    .filter((j): j is JournalArticle => j !== undefined);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Supplements — Evidence-Based Guides | Dietary Index"
        description="What the science actually says about popular supplements. Evidence-based guides on Omega-3, Vitamin D, Magnesium, Creatine, Berberine, Ashwagandha, Collagen, and more."
        tags={["best supplements", "evidence based supplements", "omega 3", "vitamin d supplement", "creatine evidence", "berberine"]}
        canonical="/journals/supplements"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Supplements Evidence Collection",
          "description": "Evidence-based guides on the most popular dietary supplements, ranked by evidence tier.",
          "url": "https://dietaryindex.com/journals/supplements",
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
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-blue-700" />
                </div>
                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Collection · Supplements</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
                Supplements: What the Evidence Actually Shows
              </h1>
              <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
                The supplement industry generates $50 billion annually — yet most products have little to no clinical evidence. This collection ranks the most popular supplements by evidence tier, separating what works from what is marketing.
              </p>
            </div>
            <div className="shrink-0">
              <ShareBookmark
                id="supplements-collection"
                title="Supplements Evidence Collection"
                type="collection"
                category="Supplements"
                subtitle="Evidence-based guides on the most popular dietary supplements"
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-stone-200">
            {SUPP_STATS.map(s => (
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

      {/* Evidence Tier Ranking */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">Evidence Tier Ranking</h2>
        <p className="text-sm text-stone-500 font-mono mb-8">RANKED BY CLINICAL EVIDENCE STRENGTH</p>
        <div className="space-y-4">
          {EVIDENCE_TIERS.map(t => (
            <div key={t.tier} className={`border rounded-lg p-5 ${t.color}`}>
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center font-display font-bold text-lg ${t.color}`}>
                  {t.tier}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{t.label}</span>
                  </div>
                  <p className="text-xs mb-3 opacity-80">{t.note}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.supplements.map(s => (
                      <span key={s} className={`text-xs font-mono px-2 py-0.5 rounded border ${t.color}`}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Warning callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-start gap-3 p-4 border border-[oklch(0.85_0.06_75)] bg-[oklch(0.96_0.04_78)] rounded-lg">
          <AlertTriangle className="w-4 h-4 text-[oklch(0.60_0.10_72)] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[oklch(0.44_0.08_68)] mb-1">Important: Food first, supplements second</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              No supplement replaces a nutrient-dense diet. The evidence for whole-food dietary patterns (Mediterranean, DASH, MIND) consistently outperforms isolated supplement interventions. Supplements are most useful for correcting documented deficiencies — not for optimising an already adequate diet.
            </p>
          </div>
        </div>
      </section>

      {/* The supplement problem */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">The supplement problem</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Unlike pharmaceuticals, dietary supplements are not required to demonstrate efficacy before reaching market in most countries. The result: an industry where marketing budgets dwarf research budgets, and where consumer spending is largely driven by influencer claims rather than clinical evidence.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                A 2023 systematic review of 884 supplement trials found that fewer than 24% were pre-registered, and publication bias inflated effect sizes by an average of 31%. The supplements with the strongest evidence — omega-3, vitamin D, creatine, and magnesium — are also among the cheapest and least marketed.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">How we evaluate supplements</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Each supplement guide in this collection applies the same evidence framework used across the Dietary Index: Tier I (multiple large RCTs), Tier II (smaller RCTs or strong mechanistic evidence), Tier III (emerging mechanistic data, limited human trials).
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                We evaluate bioavailability (which form of the supplement is absorbed), dose-response relationships, safety profile, and whether the effect size is clinically meaningful — not just statistically significant.
              </p>
              <div className="mt-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  "The most effective supplements are also the most boring — they correct deficiencies that most people already have."
                </p>
                <p className="text-xs text-blue-600 mt-2 font-mono">— Dietary Index Editorial Framework</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">Supplement Guides</h2>
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
                      article.verdictShort === "Mostly True" ? "bg-[oklch(0.95_0.04_152)] text-[oklch(0.42_0.07_152)]" :
                      "bg-stone-100 text-stone-600"
                    }`}>
                      {article.verdictShort}
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-stone-900 leading-snug mb-2 group-hover:text-[oklch(0.36_0.07_152)] transition-colors">
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
            <h3 className="font-display text-xl font-bold text-stone-900 mb-1">Find out which supplements are right for you</h3>
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
