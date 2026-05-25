// LongevityPage — /journals/longevity
// Design: vitaei.com light editorial — white bg, Playfair Display, JetBrains Mono
import { useState } from "react";
import { Link } from "@/lib/wouter-shim";
import { ArrowLeft, ExternalLink, Share2, Bookmark, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { useReadingList } from "@/contexts/ReadingListContext";
import { toast } from "sonner";

// ── Longevity article cluster ──
const LONGEVITY_ARTICLES = [
  {
    slug: "the-okinawa-diet",
    title: "The Okinawa Diet",
    subtitle: "Japan's Blue Zone — where people routinely live past 100 on sweet potato, tofu, and the 80% rule.",
    tier: "II" as const,
    readTime: "13 min",
    region: "Okinawa, Japan",
    keyFinding: "Okinawans have 4× more centenarians per capita than the US. Caloric intake averages 1,800 kcal/day — 20% below Western norms.",
    doi: "10.1007/s12603-014-0014-y",
  },
  {
    slug: "the-sardinian-diet",
    title: "The Sardinian Diet",
    subtitle: "Europe's Blue Zone — pecorino cheese, cannonau wine, and why Sardinian men outlive their women.",
    tier: "II" as const,
    readTime: "12 min",
    region: "Sardinia, Italy",
    keyFinding: "Sardinia has the highest concentration of male centenarians on Earth. Cannonau wine contains 2–3× more polyphenols than other reds.",
    doi: "10.1017/S1368980011001534",
  },
  {
    slug: "the-ikarian-diet",
    title: "The Ikarian Diet",
    subtitle: "The Greek island where people 'forget to die' — wild greens, olive oil, and daily herbal teas.",
    tier: "II" as const,
    readTime: "11 min",
    region: "Ikaria, Greece",
    keyFinding: "Ikarians have 10× more centenarians than the US and almost no dementia. Herbal teas provide daily doses of anti-inflammatory polyphenols.",
    doi: "10.1093/eurpub/ckr196",
  },
  {
    slug: "the-nicoya-diet",
    title: "The Nicoya Diet",
    subtitle: "Costa Rica's Blue Zone — corn tortillas, black beans, and why the Nicoyan diet defies cardiovascular predictions.",
    tier: "II" as const,
    readTime: "10 min",
    region: "Nicoya, Costa Rica",
    keyFinding: "Nicoyans have the lowest middle-age mortality in the Americas. The corn-bean combination provides a complete amino acid profile and resistant starch.",
    doi: "10.1080/07853890.2013.765517",
  },
  {
    slug: "the-loma-linda-diet",
    title: "The Loma Linda Diet",
    subtitle: "America's only Blue Zone — Seventh-day Adventists who live 7–10 years longer than their neighbours.",
    tier: "II" as const,
    readTime: "12 min",
    region: "Loma Linda, California",
    keyFinding: "Adventist Health Study-2 (n=96,000): vegetarian Adventists live 7.28 years longer than non-vegetarian Californians.",
    doi: "10.1093/ajcn/78.3.526S",
  },
  {
    slug: "does-eating-less-help-you-live-longer",
    title: "Does Eating Less Help You Live Longer?",
    subtitle: "Caloric restriction, the CALERIE trial, and what 30 years of longevity research actually shows.",
    tier: "I" as const,
    readTime: "14 min",
    region: "Global",
    keyFinding: "25% caloric restriction for 2 years reduced biological age markers by 2–3 years (CALERIE-2, NEJM 2022).",
    doi: "10.1056/NEJMoa2201481",
  },
  {
    slug: "does-intermittent-fasting-work",
    title: "Does Intermittent Fasting Work?",
    subtitle: "The evidence on 16:8, 5:2, and alternate-day fasting — what the RCTs actually show.",
    tier: "I" as const,
    readTime: "13 min",
    region: "Global",
    keyFinding: "IF produces equivalent weight loss to continuous caloric restriction but may offer additional metabolic benefits via autophagy induction.",
    doi: "10.1056/NEJMra1905136",
  },
  {
    slug: "the-longevity-diet-what-centenarians-actually-eat",
    title: "The Longevity Diet",
    subtitle: "What do the world's longest-lived people actually eat? The common threads across all five Blue Zones.",
    tier: "II" as const,
    readTime: "15 min",
    region: "Global",
    keyFinding: "All Blue Zone diets share five traits: 95% plant-based, high legume intake, low protein after 65, moderate caloric restriction, and social eating.",
    doi: "10.1016/j.cell.2022.04.002",
  },
  {
    slug: "fasting-and-longevity-what-the-science-says",
    title: "Fasting & Longevity",
    subtitle: "Autophagy, mTOR, and the molecular case for periodic fasting as a longevity intervention.",
    tier: "II" as const,
    readTime: "13 min",
    region: "Global",
    keyFinding: "Periodic fasting activates autophagy within 24–48 hours, clearing damaged cellular components linked to accelerated ageing.",
    doi: "10.1016/j.cell.2014.01.018",
  },
];

// ── Longevity stats ──
const LONGEVITY_STATS = [
  { value: "5", label: "Blue Zone regions identified worldwide", source: "Buettner 2005" },
  { value: "7–10", label: "Extra years lived by Blue Zone populations", source: "AHS-2 2013" },
  { value: "95%", label: "Plant-based calories in all Blue Zone diets", source: "Buettner 2023" },
  { value: "20%", label: "Caloric restriction vs Western average in Okinawa", source: "Willcox 2014" },
];

// ── Power 9 longevity principles ──
const POWER_9 = [
  { number: "01", title: "Move Naturally", description: "The world's longest-lived people don't pump iron or run marathons — they live in environments that constantly nudge them into movement." },
  { number: "02", title: "Purpose", description: "Knowing your sense of purpose is worth up to 7 extra years of life expectancy." },
  { number: "03", title: "Downshift", description: "Even people in Blue Zones experience stress. They have routines to shed that stress: prayer, naps, happy hour." },
  { number: "04", title: "80% Rule", description: "Hara hachi bu — the Okinawan 2,500-year-old Confucian mantra to stop eating when 80% full." },
  { number: "05", title: "Plant Slant", description: "Beans, including fava, black, soy, and lentils, are the cornerstone of most centenarian diets." },
  { number: "06", title: "Wine at 5", description: "People in all Blue Zones (except Adventists) drink alcohol moderately and regularly — 1–2 glasses per day with friends and/or food." },
  { number: "07", title: "Belong", description: "All but five of the 263 centenarians interviewed belonged to some faith-based community." },
  { number: "08", title: "Loved Ones First", description: "Successful centenarians in Blue Zones put their families first. They keep ageing parents and grandparents nearby." },
  { number: "09", title: "Right Tribe", description: "The world's longest-lived people chose — or were born into — social circles that supported healthy behaviours." },
];

function TierPill({ tier }: { tier: "I" | "II" | "III" }) {
  const styles: Record<string, string> = {
    I: "border-emerald-700 text-emerald-700",
    II: "border-amber-600 text-amber-600",
    III: "border-slate-400 text-slate-400",
  };
  return (
    <span className={`text-[9px] font-mono tracking-widest uppercase border px-1.5 py-0.5 ${styles[tier]}`}>
      TIER {tier}
    </span>
  );
}

export default function LongevityPage() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const { addBookmark } = useReadingList();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "Longevity Collection — Dietary Index", url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const handleBookmark = () => {
    addBookmark({
      id: "collection-longevity",
      title: "Longevity Collection — Dietary Index",
      subtitle: "Blue Zones, caloric restriction, fasting, and the science of living longer",
      type: "collection",
      category: "Longevity",
      url: "/journals/longevity",
    });
    toast.success("Saved to reading list");
  };

  return (
    <>
      <Seo
        title="Longevity Collection — Blue Zones, Fasting & the Science of Living Longer"
        description="The complete evidence base for dietary longevity. All five Blue Zones, caloric restriction, intermittent fasting, and the Power 9 principles — all traceable to peer-reviewed research."
        canonical="/journals/longevity"
        tags={["longevity diet", "Blue Zones diet", "caloric restriction longevity", "intermittent fasting longevity", "centenarian diet", "how to live longer"]}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container py-3 flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Dietary Index
            </Link>
            <span className="text-muted-foreground/30">—</span>
            <span>Collections</span>
            <span className="text-muted-foreground/30">—</span>
            <span className="text-foreground">Longevity</span>
          </div>
        </div>

        {/* Hero */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14 lg:py-18">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Collection</span>
                <span className="text-[10px] font-mono text-muted-foreground/30">—</span>
                <span className="text-[9px] font-mono tracking-widest uppercase border border-emerald-700 text-emerald-700 px-1.5 py-0.5">Blue Zones</span>
                <span className="text-[9px] font-mono tracking-widest uppercase border border-amber-600 text-amber-600 px-1.5 py-0.5">Longevity Science</span>
              </div>

              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-4 leading-tight"
              >
                Longevity
              </h1>
              <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                Five regions on Earth where people routinely live past 100. One question: what do they eat? This collection brings together all five Blue Zones, the caloric restriction evidence, and the molecular science of fasting — everything the research says about diet and a longer life.
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-2.5 py-1.5 hover:border-foreground/40 transition-colors"
                >
                  <Share2 className="w-3 h-3" /> Share
                </button>
                <button
                  onClick={handleBookmark}
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-2.5 py-1.5 hover:border-foreground/40 transition-colors"
                >
                  <Bookmark className="w-3 h-3" /> Save
                </button>
                <Link
                  href="/protocol"
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase border border-foreground bg-foreground text-background px-2.5 py-1.5 hover:bg-foreground/90 transition-colors"
                >
                  Build My Protocol →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {LONGEVITY_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`py-4 sm:py-5 px-4 sm:px-6 first:pl-0 ${i < 3 ? "border-r border-border" : ""} ${i >= 2 ? "hidden sm:block" : ""}`}
                >
                  <div className="text-[20px] sm:text-[24px] font-mono font-bold text-foreground leading-none mb-1">{stat.value}</div>
                  <div className="text-[10px] font-mono text-muted-foreground leading-snug">{stat.label}</div>
                  <div className="text-[9px] font-mono text-muted-foreground/50 mt-0.5">{stat.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blue Zones world map — SVG */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 01</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">The Five Blue Zones</span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-normal text-foreground mb-3 leading-tight"
            >
              Five places where people forget to die.
            </h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              The term "Blue Zone" was coined by demographer Michel Poulain and journalist Dan Buettner after drawing blue circles on maps to mark regions with extraordinary concentrations of centenarians. All five share remarkable dietary and lifestyle similarities despite being separated by thousands of miles.
            </p>

            {/* Blue Zone cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "Okinawa", country: "Japan", pop: "~1.3M", centenarians: "68 per 100K", slug: "the-okinawa-diet", color: "border-l-emerald-600" },
                { name: "Sardinia", country: "Italy", pop: "~1.6M", centenarians: "22 per 100K", slug: "the-sardinian-diet", color: "border-l-emerald-600" },
                { name: "Ikaria", country: "Greece", pop: "~8K", centenarians: "1 in 3 reach 90", slug: "the-ikarian-diet", color: "border-l-emerald-600" },
                { name: "Nicoya", country: "Costa Rica", pop: "~130K", centenarians: "Lowest mid-age mortality in Americas", slug: "the-nicoya-diet", color: "border-l-emerald-600" },
                { name: "Loma Linda", country: "California, USA", pop: "~9K Adventists", centenarians: "Live 7–10 yrs longer than neighbours", slug: "the-loma-linda-diet", color: "border-l-emerald-600" },
              ].map((zone, i) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className={`border border-border border-l-2 ${zone.color} p-4 hover:bg-muted/10 transition-colors`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div style={{ fontFamily: "var(--font-display)" }} className="text-[16px] text-foreground">{zone.name}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">{zone.country}</div>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest uppercase border border-emerald-700 text-emerald-700 px-1.5 py-0.5 shrink-0">Blue Zone</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mb-3">{zone.centenarians}</div>
                  <Link
                    href={`/journals/${zone.slug}`}
                    className="text-[10px] font-mono tracking-wider uppercase text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 inline-flex items-center gap-1"
                  >
                    Read the evidence →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Power 9 */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 02</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">The Power 9</span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-normal text-foreground mb-3 leading-tight"
            >
              Nine habits shared by every Blue Zone.
            </h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              After studying all five Blue Zones, researchers identified nine evidence-linked lifestyle factors that appear in every region. Diet is only part of the picture.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POWER_9.map((p, i) => (
                <motion.div
                  key={p.number}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border border-border p-4"
                >
                  <div className="text-[11px] font-mono text-muted-foreground/40 mb-1">{p.number}</div>
                  <div style={{ fontFamily: "var(--font-display)" }} className="text-[15px] text-foreground mb-2">{p.title}</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Longevity articles */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 03</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Evidence Guides</span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-normal text-foreground mb-3 leading-tight"
            >
              Nine guides on diet and longevity.
            </h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              From the Okinawan 80% rule to the molecular biology of caloric restriction — every article presents the clinical evidence with a clear verdict and primary source citations.
            </p>

            <div className="border border-border">
              {LONGEVITY_ARTICLES.map((article, i) => (
                <div key={article.slug} className="border-b border-border last:border-b-0">
                  <button
                    className="w-full text-left px-4 sm:px-5 py-4 hover:bg-muted/20 transition-colors"
                    onClick={() => setActiveArticle(activeArticle === article.slug ? null : article.slug)}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="text-[11px] font-mono text-muted-foreground/40 w-5 shrink-0 mt-0.5 hidden sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <TierPill tier={article.tier} />
                          <span className="text-[9px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-1.5 py-0.5">
                            {article.region}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />{article.readTime}
                          </span>
                        </div>
                        <div
                          style={{ fontFamily: "var(--font-display)" }}
                          className="text-[15px] sm:text-[16px] font-normal text-foreground leading-snug mb-1"
                        >
                          {article.title}
                        </div>
                        <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">{article.subtitle}</p>
                      </div>
                      <span className="text-muted-foreground/40 shrink-0 text-[16px] mt-1">
                        {activeArticle === article.slug ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {activeArticle === article.slug && (
                    <div className="px-4 sm:px-5 pb-4 border-t border-border bg-muted/10">
                      <div className="pt-4 max-w-2xl">
                        <div className="border-l-2 border-emerald-700 pl-4 mb-4">
                          <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">Key Finding</div>
                          <p className="text-[13px] text-foreground leading-relaxed">{article.keyFinding}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Link
                            href={`/journals/${article.slug}`}
                            className="text-[11px] font-mono tracking-wider uppercase border border-foreground bg-foreground text-background px-3 py-1.5 hover:bg-foreground/90 transition-colors inline-flex items-center gap-1.5"
                          >
                            Read Full Guide →
                          </Link>
                          <a
                            href={`https://doi.org/${article.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono text-muted-foreground border border-border px-2.5 py-1.5 hover:border-foreground/40 transition-colors inline-flex items-center gap-1"
                          >
                            Primary Source <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Common dietary threads */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 04</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Common Threads</span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-normal text-foreground mb-6 leading-tight"
            >
              What every Blue Zone diet has in common.
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
              {[
                { icon: "🌱", title: "95% plant-based calories", detail: "Meat is eaten on average 5 times per month, in small portions (85–113g), as a side dish or celebration food." },
                { icon: "🫘", title: "Legumes daily", detail: "Fava beans, black beans, soy, and lentils are the cornerstone of every Blue Zone diet — providing fibre, protein, and resistant starch." },
                { icon: "🐟", title: "Fish 2–3× per week", detail: "Where fish is eaten, it is small, inexpensive, and abundant — sardines, anchovies, and cod — not large predatory fish high in mercury." },
                { icon: "🥛", title: "Minimal dairy", detail: "Except Sardinia (sheep's milk) and Loma Linda (some dairy), Blue Zone populations consume little to no cow's milk products." },
                { icon: "🍷", title: "Moderate alcohol (except Loma Linda)", detail: "1–2 glasses of wine per day with food and friends. Cannonau wine in Sardinia has 2–3× more polyphenols than other reds." },
                { icon: "🌾", title: "Whole grains and sourdough", detail: "Refined carbohydrates are absent. Sardinian sourdough bread has a lower glycaemic index than standard wheat bread due to fermentation." },
              ].map((thread, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-3 border border-border p-4"
                >
                  <span className="text-[20px] shrink-0">{thread.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] text-foreground mb-1">{thread.title}</div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{thread.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Protocol CTA */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 05 — Next Step</div>
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl sm:text-3xl font-normal text-foreground mb-3 leading-tight"
              >
                Build your personalised longevity protocol.
              </h2>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
                Answer 12 questions about your health goals, conditions, and lifestyle. Our evidence-based scoring engine generates a personalised dietary protocol drawing on the Blue Zone evidence, caloric restriction research, and the latest longevity trials.
              </p>
              <Link
                href="/protocol"
                className="inline-flex items-center gap-2 text-[12px] font-mono tracking-wider uppercase border border-foreground bg-foreground text-background px-5 py-3 hover:bg-foreground/90 transition-colors"
              >
                Start the Assessment →
              </Link>
            </div>
          </div>
        </div>

        {/* Related collections */}
        <div className="container py-8 sm:py-10">
          <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4">Related Collections</div>
          <div className="flex flex-wrap gap-2">
            <Link href="/journals/blue-zones" className="text-[11px] font-mono tracking-wider uppercase border border-border px-3 py-2 hover:border-foreground/40 transition-colors text-muted-foreground hover:text-foreground">
              Blue Zones →
            </Link>
            <Link href="/journals/heart-health" className="text-[11px] font-mono tracking-wider uppercase border border-border px-3 py-2 hover:border-foreground/40 transition-colors text-muted-foreground hover:text-foreground">
              Heart Health →
            </Link>
            <Link href="/#index" className="text-[11px] font-mono tracking-wider uppercase border border-border px-3 py-2 hover:border-foreground/40 transition-colors text-muted-foreground hover:text-foreground">
              Full Diet Index →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
