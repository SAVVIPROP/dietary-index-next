// WeightLossPage.tsx
// Design: Light editorial, vitaei.com style
// Collection page for weight loss & metabolic health articles
import { Link } from "@/lib/wouter-shim";
import { ArrowLeft, ArrowRight, Scale, Flame, Clock, TrendingDown, Activity, ChevronRight } from "lucide-react";
import Seo from "@/components/Seo";
import { journalArticles } from "@/lib/journals";
import ShareBookmark from "@/components/ShareBookmark";

const WEIGHT_LOSS_SLUGS = [
  "does-eating-fat-make-you-fat",
  "is-breakfast-the-most-important-meal",
  "does-intermittent-fasting-work",
  "is-the-ketogenic-diet-safe-long-term",
  "how-much-protein-do-you-actually-need",
  "does-eating-at-night-cause-weight-gain",
  "does-fasting-slow-your-metabolism",
  "caloric-restriction-vs-fasting-for-longevity",
  "the-science-of-food-cravings",
  "ultra-processed-foods-the-most-important-concept-in-modern-nutrition",
];

const KEY_PRINCIPLES = [
  {
    icon: Scale,
    title: "Energy Balance",
    body: "Total caloric intake versus expenditure remains the primary driver of weight change. No dietary pattern overrides thermodynamics — but food quality profoundly affects how easy it is to maintain a deficit.",
  },
  {
    icon: Flame,
    title: "Protein Priority",
    body: "High protein intake (1.6–2.2g/kg/day) is the single most evidence-backed dietary strategy for weight loss. It increases satiety, preserves lean mass during caloric restriction, and has a higher thermic effect than carbohydrates or fat.",
  },
  {
    icon: Clock,
    title: "Meal Timing",
    body: "Time-restricted eating and intermittent fasting show modest but consistent benefits for weight loss and metabolic health. The evidence suggests eating earlier in the day aligns better with circadian biology.",
  },
  {
    icon: TrendingDown,
    title: "Glycaemic Load",
    body: "Reducing dietary glycaemic load — by replacing refined carbohydrates with whole grains, legumes, and vegetables — improves insulin sensitivity and reduces hunger hormones, making caloric restriction more sustainable.",
  },
  {
    icon: Activity,
    title: "Metabolic Adaptation",
    body: "Prolonged caloric restriction triggers metabolic adaptation — a reduction in resting metabolic rate beyond what is expected from weight loss alone. Diet breaks and resistance training are the most evidence-backed strategies to mitigate this.",
  },
];

const EVIDENCE_SUMMARY = [
  { diet: "Mediterranean Diet", mechanism: "High satiety, low glycaemic load, anti-inflammatory", weightLoss: "Modest (2–4 kg)", sustainability: "High", tier: "I" },
  { diet: "Ketogenic Diet", mechanism: "Appetite suppression via ketosis, high protein", weightLoss: "Significant short-term (4–7 kg)", sustainability: "Low–Moderate", tier: "I" },
  { diet: "Intermittent Fasting", mechanism: "Caloric restriction through time window", weightLoss: "Comparable to continuous restriction", sustainability: "Moderate", tier: "I" },
  { diet: "High-Protein Diet", mechanism: "Satiety hormones, thermic effect, lean mass preservation", weightLoss: "Significant (3–5 kg)", sustainability: "High", tier: "I" },
  { diet: "Low-Glycaemic Diet", mechanism: "Insulin sensitivity, reduced hunger hormones", weightLoss: "Modest (2–3 kg)", sustainability: "High", tier: "I" },
  { diet: "Plant-Based Diet", mechanism: "High fibre, low energy density", weightLoss: "Modest (2–3 kg)", sustainability: "Moderate–High", tier: "I" },
];

export default function WeightLossPage() {
  const articles = WEIGHT_LOSS_SLUGS
    .map(slug => journalArticles.find(a => a.slug === slug))
    .filter(Boolean) as typeof journalArticles;

  return (
    <>
      <Seo
        title="Weight Loss & Metabolic Health — Evidence-Based Guides | Dietary Index"
        description="Evidence-based guides on weight loss, intermittent fasting, ketogenic diets, protein, and metabolic health. What the RCTs actually show."
        tags={["weight loss", "intermittent fasting", "keto", "protein", "metabolism", "caloric restriction"]}
        ogType="website"
      />

      <div className="min-h-screen bg-[var(--background)]">
        {/* Breadcrumb */}
        <div className="border-b border-[var(--border)] bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)]">
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/#journals" className="hover:text-[var(--foreground)] transition-colors">Journals</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--foreground)]">Weight Loss & Metabolic Health</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-[var(--border)] bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase">Collection</span>
                <span className="w-8 h-px bg-[var(--border)]" />
                <span className="font-mono text-xs text-[var(--tier-i)] tracking-widest uppercase">Tier I Evidence</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight mb-6">
                Weight Loss &<br />
                <span className="text-[var(--tier-i)]">Metabolic Health</span>
              </h1>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8 max-w-2xl">
                The evidence on dietary fat, meal timing, intermittent fasting, ketogenic diets, and the neurobiology of food cravings — synthesised from randomised controlled trials and systematic reviews.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-[var(--muted-foreground)]">
                <span>{articles.length} guides</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                <span>6 dietary strategies reviewed</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                <span>Updated May 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10">
              <span className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase">§ 01</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--foreground)] mt-2">
                Five Evidence-Based Principles
              </h2>
              <p className="text-[var(--muted-foreground)] mt-2 max-w-xl">
                The most consistent findings from weight loss research, distilled into actionable principles.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {KEY_PRINCIPLES.map((p) => (
                <div key={p.title} className="border border-[var(--border)] p-6 hover:border-[var(--tier-i)] transition-colors group">
                  <p.icon className="w-5 h-5 text-[var(--tier-i)] mb-4" />
                  <h3 className="font-serif text-lg font-bold text-[var(--foreground)] mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence Comparison Table */}
        <section className="border-b border-[var(--border)] bg-[var(--muted)]/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10">
              <span className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase">§ 02</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--foreground)] mt-2">
                Dietary Strategy Comparison
              </h2>
              <p className="text-[var(--muted-foreground)] mt-2 max-w-xl">
                How the most-studied weight loss dietary approaches compare on mechanism, efficacy, and long-term sustainability.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase py-3 pr-4">Diet</th>
                    <th className="text-left font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase py-3 pr-4">Primary Mechanism</th>
                    <th className="text-left font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase py-3 pr-4">Weight Loss (12 mo)</th>
                    <th className="text-left font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase py-3 pr-4">Sustainability</th>
                    <th className="text-left font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase py-3">Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {EVIDENCE_SUMMARY.map((row, i) => (
                    <tr key={row.diet} className={`border-b border-[var(--border)] ${i % 2 === 0 ? "" : "bg-[var(--muted)]/20"}`}>
                      <td className="py-3 pr-4 font-medium text-[var(--foreground)]">{row.diet}</td>
                      <td className="py-3 pr-4 text-[var(--muted-foreground)]">{row.mechanism}</td>
                      <td className="py-3 pr-4 text-[var(--foreground)]">{row.weightLoss}</td>
                      <td className="py-3 pr-4 text-[var(--muted-foreground)]">{row.sustainability}</td>
                      <td className="py-3">
                        <span className="font-mono text-xs font-bold text-[var(--tier-i)] border border-[var(--tier-i)] px-1.5 py-0.5">
                          {row.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10">
              <span className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase">§ 03</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--foreground)] mt-2">
                Evidence-Based Guides
              </h2>
              <p className="text-[var(--muted-foreground)] mt-2 max-w-xl">
                {articles.length} guides covering the most-searched questions on weight loss, metabolism, and dietary strategies.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="border border-[var(--border)] hover:border-[var(--tier-i)] transition-colors group flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase">{article.category}</span>
                      <span className={`font-mono text-xs font-bold px-1.5 py-0.5 border ${
                        article.verdictShort === "Myth" || article.verdictShort === "Mostly Myth"
                          ? "text-[var(--destructive)] border-[var(--destructive)]"
                          : article.verdictShort === "Mostly True" || article.verdictShort === "True"
                          ? "text-[var(--tier-i)] border-[var(--tier-i)]"
                          : "text-[var(--muted-foreground)] border-[var(--border)]"
                      }`}>
                        {article.verdictShort}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[var(--foreground)] leading-snug mb-2 group-hover:text-[var(--tier-i)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
                      {article.subtitle}
                    </p>
                  </div>
                  <div className="border-t border-[var(--border)] px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[var(--muted-foreground)]">{article.readTime}</span>
                      <ShareBookmark
                        id={`wl-article-${article.id}`}
                        title={article.title}
                        subtitle={article.subtitle}
                        type="article"
                        category={article.category}
                      />
                    </div>
                    <Link
                      href={`/journals/${article.slug}`}
                      className="flex items-center gap-1 font-mono text-xs text-[var(--tier-i)] hover:gap-2 transition-all"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Insight Callout */}
        <section className="border-b border-[var(--border)] bg-[var(--tier-i)]/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl">
              <span className="font-mono text-xs text-[var(--tier-i)] tracking-widest uppercase">Key Finding</span>
              <blockquote className="font-serif text-xl sm:text-2xl text-[var(--foreground)] leading-relaxed mt-4 mb-4">
                "No single dietary pattern is superior for weight loss when calories are matched. The best diet is the one you can sustain — and high protein, high fibre, and low ultra-processed food intake are the most consistent predictors of long-term success."
              </blockquote>
              <p className="font-mono text-xs text-[var(--muted-foreground)]">
                — Synthesis of Tier I evidence, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Related Collections */}
        <section className="border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-8">
              <span className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest uppercase">Related Collections</span>
              <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mt-2">Explore More</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { href: "/journals/blue-zones", label: "Blue Zones", desc: "Five regions where people live past 100", count: "5 guides" },
                { href: "/journals/heart-health", label: "Heart Health", desc: "Tier I cardiovascular evidence", count: "6 guides" },
                { href: "/journals/longevity", label: "Longevity", desc: "Diet, fasting, and lifespan science", count: "8 guides" },
              ].map((c) => (
                <Link key={c.href} href={c.href} className="border border-[var(--border)] p-6 hover:border-[var(--tier-i)] transition-colors group block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[var(--muted-foreground)]">{c.count}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--tier-i)] transition-colors" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--tier-i)] transition-colors">{c.label}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{c.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back nav */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/#journals" className="inline-flex items-center gap-2 font-mono text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all journals
          </Link>
        </div>
      </div>
    </>
  );
}
