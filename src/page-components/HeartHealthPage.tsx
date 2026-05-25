"use client";
// HeartHealthPage — /journals/heart-health
// Design: vitaei.com light editorial — white bg, Playfair Display, JetBrains Mono
import { useState } from "react";
import { Link } from "@/lib/wouter-shim";
import { ArrowLeft, ExternalLink, CheckCircle, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { useReadingList } from "@/contexts/ReadingListContext";
import { toast } from "sonner";

// ── Heart Health article cluster ──
const HEART_ARTICLES = [
  {
    slug: "does-the-mediterranean-diet-actually-work",
    title: "Does the Mediterranean Diet Actually Work?",
    subtitle: "The PREDIMED trial, 7,447 participants, and a 30% reduction in major cardiovascular events.",
    tier: "I" as const,
    readTime: "14 min",
    verdict: "Mostly True",
    verdictShort: "Supported",
    keyFinding: "30% relative risk reduction in major cardiovascular events (PREDIMED, NEJM 2018).",
    doi: "10.1056/NEJMoa1800389",
  },
  {
    slug: "what-is-the-dash-diet-and-does-it-lower-blood-pressure",
    title: "What Is the DASH Diet and Does It Lower Blood Pressure?",
    subtitle: "The AHA's top-ranked diet. Reduces systolic BP by 8–14 mmHg — comparable to first-line antihypertensives.",
    tier: "I" as const,
    readTime: "12 min",
    verdict: "Mostly True",
    verdictShort: "Supported",
    keyFinding: "Systolic BP reduction of 8–14 mmHg. AHA alignment score: 100/100.",
    doi: "10.1056/NEJM199704173361601",
  },
  {
    slug: "is-plant-based-eating-healthier-than-eating-meat",
    title: "Is Plant-Based Eating Healthier Than Eating Meat?",
    subtitle: "What 30 years of cohort data and multiple RCTs actually show about plant-based diets and cardiovascular risk.",
    tier: "II" as const,
    readTime: "16 min",
    verdict: "Nuanced",
    verdictShort: "Context-Dependent",
    keyFinding: "Whole-food plant-based diets reduce CVD mortality by 19%. Ultra-processed vegan diets do not.",
    doi: "10.1001/jamainternmed.2019.2195",
  },
  {
    slug: "does-eating-fat-make-you-fat",
    title: "Does Eating Fat Make You Fat?",
    subtitle: "The dietary fat hypothesis that shaped 40 years of public health policy — and what the evidence actually shows.",
    tier: "I" as const,
    readTime: "13 min",
    verdict: "Mostly Myth",
    verdictShort: "Refuted",
    keyFinding: "Replacing saturated fat with unsaturated fat reduces LDL by 10% and CVD events by 14%.",
    doi: "10.1161/CIR.0000000000000510",
  },
  {
    slug: "are-eggs-bad-for-your-heart",
    title: "Are Eggs Bad for Your Heart?",
    subtitle: "Dietary cholesterol, the egg debate, and why the 2020 Dietary Guidelines changed the advice.",
    tier: "II" as const,
    readTime: "11 min",
    verdict: "Mostly Myth",
    verdictShort: "Largely Refuted",
    keyFinding: "Moderate egg consumption (≤1/day) does not significantly increase CVD risk in healthy adults.",
    doi: "10.1136/bmj.l1149",
  },
  {
    slug: "is-sugar-toxic",
    title: "Is Sugar Toxic?",
    subtitle: "Added sugar, fructose, and the cardiovascular evidence — separating the science from the headlines.",
    tier: "II" as const,
    readTime: "12 min",
    verdict: "Partly True",
    verdictShort: "Partly Supported",
    keyFinding: "Consuming ≥25% of calories from added sugar doubles CVD mortality risk (JAMA Intern Med, 2014).",
    doi: "10.1001/jamainternmed.2013.13563",
  },
];

// ── Key cardiovascular stats ──
const CVD_STATS = [
  { value: "17.9M", label: "CVD deaths per year globally", source: "WHO 2023" },
  { value: "30%", label: "CVD risk reduction with Mediterranean diet", source: "PREDIMED 2018" },
  { value: "8–14", label: "mmHg systolic BP reduction with DASH", source: "Appel et al. 1997" },
  { value: "20–30%", label: "LDL reduction with Portfolio Diet", source: "Jenkins et al. 2003" },
];

// ── Tier I diets for heart health ──
const TIER_I_DIETS = [
  {
    name: "Mediterranean Diet",
    score: 95,
    ahaScore: 89,
    keyBenefit: "30% reduction in major cardiovascular events",
    mechanism: "Olive oil polyphenols, omega-3 from fish, and high fibre reduce LDL oxidation and systemic inflammation.",
    ref: "PREDIMED, NEJM 2018",
    doi: "10.1056/NEJMoa1800389",
  },
  {
    name: "DASH Diet",
    score: 98,
    ahaScore: 100,
    keyBenefit: "8–14 mmHg systolic BP reduction",
    mechanism: "High potassium, magnesium, and calcium from fruits, vegetables, and low-fat dairy counteract sodium's pressor effect.",
    ref: "Appel LJ et al., NEJM 1997",
    doi: "10.1056/NEJM199704173361601",
  },
  {
    name: "Portfolio Diet",
    score: 88,
    ahaScore: null,
    keyBenefit: "LDL reduction comparable to first-generation statins",
    mechanism: "Four food groups (plant sterols, soy protein, viscous fibre, nuts) each independently lower LDL; the combination is additive.",
    ref: "Jenkins DJ et al., JAMA 2003",
    doi: "10.1001/jama.290.4.502",
  },
];

// ── Evidence tier pill ──
function TierPill({ tier }: { tier: "I" | "II" | "III" }) {
  const styles: Record<string, string> = {
    I: "border-[oklch(0.42_0.07_152)] text-[oklch(0.42_0.07_152)]",
    II: "border-[oklch(0.60_0.10_72)] text-[oklch(0.60_0.10_72)]",
    III: "border-slate-400 text-slate-400",
  };
  return (
    <span className={`text-[9px] font-mono tracking-widest uppercase border px-1.5 py-0.5 ${styles[tier]}`}>
      TIER {tier}
    </span>
  );
}

// ── Verdict badge ──
function VerdictBadge({ verdict }: { verdict: string }) {
  const styles: Record<string, string> = {
    "Supported": "bg-[oklch(0.95_0.04_152)] text-[oklch(0.36_0.07_152)] border-[oklch(0.85_0.05_152)]",
    "Largely Refuted": "bg-red-50 text-red-800 border-red-200",
    "Refuted": "bg-red-50 text-red-800 border-red-200",
    "Context-Dependent": "bg-blue-50 text-blue-800 border-blue-200",
    "Partly Supported": "bg-[oklch(0.96_0.04_78)] text-[oklch(0.44_0.08_68)] border-[oklch(0.85_0.06_75)]",
  };
  const cls = styles[verdict] || "bg-slate-50 text-slate-700 border-slate-200";
  return (
    <span className={`text-[9px] font-mono tracking-wider uppercase border px-1.5 py-0.5 ${cls}`}>
      {verdict}
    </span>
  );
}

// ── Score bar ──
function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-mono text-foreground">{score}</span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-foreground rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function HeartHealthPage() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const { addBookmark } = useReadingList();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "Heart Health — Dietary Index", url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const handleBookmark = () => {
    addBookmark({
      id: "collection-heart-health",
      title: "Heart Health Collection — Dietary Index",
      subtitle: "Tier I cardiovascular diets: Mediterranean, DASH, Portfolio, and more",
      type: "collection",
      category: "Heart Health",
      url: "/journals/heart-health",
    });
    toast.success("Saved to reading list");
  };

  return (
    <>
      <Seo
        title="Heart Health Collection — Tier I Cardiovascular Diets"
        description="The complete evidence base for dietary prevention of cardiovascular disease. Mediterranean, DASH, and Portfolio diets — all Tier I evidence, all traceable to peer-reviewed trials."
        canonical="/journals/heart-health"
        tags={["heart health diet", "DASH diet blood pressure", "Mediterranean diet cardiovascular", "dietary prevention CVD", "Portfolio diet cholesterol"]}
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
            <span className="text-foreground">Heart Health</span>
          </div>
        </div>

        {/* Hero */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14 lg:py-18">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Collection</span>
                <span className="text-[10px] font-mono text-muted-foreground/30">—</span>
                <TierPill tier="I" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Cardiovascular Evidence</span>
              </div>

              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground mb-4 leading-tight"
              >
                Heart Health
              </h1>
              <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                Cardiovascular disease kills 17.9 million people annually — more than any other cause. The dietary evidence for prevention is among the strongest in all of nutritional science. This collection presents the Tier I evidence: the diets and interventions backed by large-scale randomised controlled trials.
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
              {CVD_STATS.map((stat, i) => (
                <div key={i} className={`py-4 sm:py-5 ${i < 3 ? "border-r border-border" : ""} ${i >= 2 ? "hidden sm:block" : ""} px-4 sm:px-6 first:pl-0`}>
                  <div className="text-[20px] sm:text-[24px] font-mono font-bold text-foreground leading-none mb-1">{stat.value}</div>
                  <div className="text-[10px] font-mono text-muted-foreground leading-snug">{stat.label}</div>
                  <div className="text-[9px] font-mono text-muted-foreground/50 mt-0.5">{stat.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier I Diets */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 01</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Tier I Cardiovascular Diets</span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-normal text-foreground mb-3 leading-tight"
            >
              Three diets with RCT-level cardiovascular evidence.
            </h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Tier I designation requires at least one large-scale randomised controlled trial (n ≥ 500) with cardiovascular endpoints as the primary outcome. Only three dietary patterns currently meet this threshold.
            </p>

            <div className="space-y-4">
              {TIER_I_DIETS.map((diet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="border border-border p-5 sm:p-6"
                >
                  <div className="grid sm:grid-cols-[1fr_200px] gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <TierPill tier="I" />
                        {diet.ahaScore !== null && (
                          <span className="text-[9px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-1.5 py-0.5">
                            AHA {diet.ahaScore}/100
                          </span>
                        )}
                      </div>
                      <h3
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-xl sm:text-2xl font-normal text-foreground mb-2"
                      >
                        {diet.name}
                      </h3>
                      <div className="flex items-start gap-2 mb-3">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[oklch(0.42_0.07_152)]" />
                        <span className="text-[13px] font-medium text-foreground">{diet.keyBenefit}</span>
                      </div>
                      <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{diet.mechanism}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-muted-foreground">{diet.ref}</span>
                        <a
                          href={`https://doi.org/${diet.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 inline-flex items-center gap-1"
                        >
                          DOI <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <ScoreBar score={diet.score} label="Evidence Score" />
                      {diet.ahaScore !== null && (
                        <ScoreBar score={diet.ahaScore} label="AHA Alignment" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* The PREDIMED Story */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 02</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">The PREDIMED Trial</span>
            </div>
            <div className="max-w-2xl">
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl sm:text-3xl font-normal text-foreground mb-4 leading-tight"
              >
                The most important dietary trial ever conducted.
              </h2>
              <div className="space-y-4 text-[13px] text-muted-foreground leading-relaxed">
                <p>
                  The PREDIMED trial (Prevención con Dieta Mediterránea) enrolled 7,447 high-risk participants across Spain and randomised them to one of three diets: a Mediterranean diet supplemented with extra-virgin olive oil, a Mediterranean diet supplemented with mixed nuts, or a control low-fat diet.
                </p>
                <p>
                  After a median follow-up of 4.8 years, both Mediterranean diet groups showed a <strong className="text-foreground">30% relative risk reduction</strong> in the primary composite endpoint of major cardiovascular events (myocardial infarction, stroke, or cardiovascular death), compared to the control group.
                </p>
                <p>
                  The trial was stopped early by the independent data safety monitoring board — a rare event in nutritional science — because the benefit was so clear that continuing the control arm was considered unethical.
                </p>
              </div>
              <div className="grid grid-cols-3 border border-border mt-6">
                {[
                  { value: "7,447", label: "Participants" },
                  { value: "4.8 yrs", label: "Follow-up" },
                  { value: "30%", label: "Risk Reduction" },
                ].map((s, i) => (
                  <div key={i} className={`px-4 py-3 text-center ${i < 2 ? "border-r border-border" : ""}`}>
                    <div className="text-[18px] font-mono font-bold text-foreground">{s.value}</div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href="https://doi.org/10.1056/NEJMoa1800389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 inline-flex items-center gap-1"
                >
                  Estruch R et al. NEJM (2018) — Primary Prevention of Cardiovascular Disease with a Mediterranean Diet <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Articles */}
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
              Six guides on diet and cardiovascular health.
            </h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Each guide presents the clinical evidence, explains the mechanisms, and gives a clear verdict — no headlines, no sponsorship, no conflicts of interest.
            </p>

            <div className="space-y-0 border border-border">
              {HEART_ARTICLES.map((article, i) => (
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
                          <VerdictBadge verdict={article.verdictShort} />
                          <span className="text-[10px] font-mono text-muted-foreground">{article.readTime}</span>
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
                        <div className="border-l-2 border-[oklch(0.42_0.07_152)] pl-4 mb-4">
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

        {/* Protocol CTA */}
        <div className="border-b border-border">
          <div className="container py-10 sm:py-14">
            <div className="max-w-2xl">
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">§ 04 — Next Step</div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl sm:text-3xl font-normal text-foreground mb-3 leading-tight"
              >
                Build your personalised heart health protocol.
              </h2>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
                Answer 12 questions about your health goals, conditions, and lifestyle. Our evidence-based scoring engine — drawing on 10,000+ clinical trials — generates a personalised dietary protocol with tier-ranked recommendations, supplement guidance, and a weekly meal framework.
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
            <Link href="/#index" className="text-[11px] font-mono tracking-wider uppercase border border-border px-3 py-2 hover:border-foreground/40 transition-colors text-muted-foreground hover:text-foreground">
              Full Diet Index →
            </Link>
            <Link href="/#atlas" className="text-[11px] font-mono tracking-wider uppercase border border-border px-3 py-2 hover:border-foreground/40 transition-colors text-muted-foreground hover:text-foreground">
              Evidence Atlas →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
