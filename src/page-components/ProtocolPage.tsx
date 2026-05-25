"use client";
// ProtocolPage — Evidence-based Dietary Assessment & Protocol Generator
// Design: vitaei.com light editorial style — white bg, Playfair Display headings, JetBrains Mono labels
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useSearch } from "@/lib/wouter-shim";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Share2, Bookmark, CheckCircle, ExternalLink, ChevronDown, ChevronUp, Link2 } from "lucide-react";
import {
  QUIZ_QUESTIONS,
  QUIZ_SECTIONS,
  scoreProtocol,
  type QuizAnswers,
  type ProtocolResult,
} from "@/lib/protocol";
import Seo from "@/components/Seo";
import { useReadingList } from "@/contexts/ReadingListContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  SUPPLEMENT_PRODUCTS,
  buildAmazonUrl,
  buildAmazonSearchUrl,
  buildAmazonMulticartUrl,
  buildIherbUrl,
  partitionBasket,
  getAsinForRegion,
  detectRegion,
  countryToRegion,
  type AffiliateRegion,
} from "@/lib/affiliateLinks";

// ── Progress bar ──
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full h-0.5 bg-border">
      <motion.div
        className="h-full bg-foreground"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

// ── Section indicator ──
function SectionIndicator({ currentSection }: { currentSection: string }) {
  const idx = QUIZ_SECTIONS.findIndex(s => s.id === currentSection);
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1">
      {QUIZ_SECTIONS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-1.5 shrink-0">
          <div className={`flex items-center gap-1 ${i === idx ? "opacity-100" : i < idx ? "opacity-40" : "opacity-20"}`}>
            <span className="text-[10px] font-mono">{s.icon}</span>
            <span className="text-[10px] font-mono tracking-wider uppercase">{s.label}</span>
          </div>
          {i < QUIZ_SECTIONS.length - 1 && (
            <span className="text-[10px] text-muted-foreground/30 shrink-0">—</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Single choice option ──
function SingleOption({
  option,
  selected,
  onSelect,
}: {
  option: { value: string; label: string; subtext?: string; icon?: string };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left border transition-all duration-150 px-4 py-3 group ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border hover:border-foreground/40 bg-background"
      }`}
    >
      <div className="flex items-start gap-3">
        {option.icon && (
          <span className={`text-[14px] mt-0.5 shrink-0 ${selected ? "text-background" : "text-muted-foreground"}`}>
            {option.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className={`text-[13px] sm:text-[14px] font-medium leading-snug ${selected ? "text-background" : "text-foreground"}`}>
            {option.label}
          </div>
          {option.subtext && (
            <div className={`text-[11px] mt-0.5 leading-snug ${selected ? "text-background/70" : "text-muted-foreground"}`}>
              {option.subtext}
            </div>
          )}
        </div>
        <div className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
          selected ? "border-background bg-background" : "border-border"
        }`}>
          {selected && <div className="w-2 h-2 rounded-full bg-foreground" />}
        </div>
      </div>
    </button>
  );
}

// ── Multi choice option ──
function MultiOption({
  option,
  selected,
  onToggle,
}: {
  option: { value: string; label: string; subtext?: string };
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left border transition-all duration-150 px-4 py-3 ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border hover:border-foreground/40 bg-background"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-4 h-4 border shrink-0 mt-0.5 flex items-center justify-center ${
          selected ? "border-background bg-background" : "border-border"
        }`}>
          {selected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-[13px] sm:text-[14px] font-medium leading-snug ${selected ? "text-background" : "text-foreground"}`}>
            {option.label}
          </div>
          {option.subtext && (
            <div className={`text-[11px] mt-0.5 ${selected ? "text-background/70" : "text-muted-foreground"}`}>
              {option.subtext}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ── Tier pill ──
function TierPill({ tier }: { tier: "I" | "II" | "III" }) {
  const colors: Record<string, string> = {
    I: "border-[oklch(0.42_0.07_152)] text-[oklch(0.42_0.07_152)]",
    II: "border-[oklch(0.60_0.10_72)] text-[oklch(0.60_0.10_72)]",
    III: "border-slate-400 text-slate-400",
  };
  return (
    <span className={`text-[9px] font-mono tracking-widest uppercase border px-1.5 py-0.5 ${colors[tier]}`}>
      TIER {tier}
    </span>
  );
}

// ── Match score ring ──
function MatchRing({ score }: { score: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--border)" strokeWidth="3" />
        <motion.circle
          cx="40" cy="40" r={r}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-mono font-bold text-foreground leading-none">{score}</span>
        <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider">match</span>
      </div>
    </div>
  );
}

// ── Result card — primary diet ──
function PrimaryDietCard({ diet }: { diet: ProtocolResult["primaryDiet"] }) {
  return (
    <div className="border border-foreground p-5 sm:p-6">
      <div className="flex items-start gap-4 mb-4">
        <MatchRing score={diet.matchScore} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <TierPill tier={diet.tier} />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Primary Recommendation</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl sm:text-3xl font-normal text-foreground leading-tight">
            {diet.name}
          </h2>
        </div>
      </div>
      <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{diet.rationale}</p>
      <div className="space-y-1.5 mb-4">
        {diet.keyBenefits.map((b, i) => (
          <div key={i} className="flex items-start gap-2 text-[12px] text-foreground/80">
            <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[oklch(0.42_0.07_152)]" />
            <span>{b}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-3">
        <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">Key Reference</div>
        <p className="text-[11px] text-muted-foreground leading-relaxed mb-1">{diet.primaryRef}</p>
        <a
          href={`https://doi.org/${diet.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 inline-flex items-center gap-1"
        >
          DOI: {diet.doi} <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}

// ── Supporting diet card ──
function SupportingDietCard({ diet, index }: { diet: ProtocolResult["supportingDiets"][0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border">
      <button
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/20 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
          <span className="text-[11px] font-mono text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[15px] text-foreground">{diet.name}</span>
            <TierPill tier={diet.tier} />
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{diet.matchScore}% match</div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border">
          <p className="text-[12px] text-muted-foreground leading-relaxed mt-3 mb-3">{diet.rationale || diet.keyBenefits[0]}</p>
          <div className="space-y-1">
            {diet.keyBenefits.slice(0, 2).map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] text-foreground/70">
                <CheckCircle className="w-3 h-3 shrink-0 mt-0.5 text-[oklch(0.42_0.07_152)]" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Priority card ──
function PriorityCard({ priority }: { priority: ProtocolResult["keyPriorities"][0] }) {
  const urgencyColor = {
    high: "border-l-red-500",
    medium: "border-l-amber-500",
    low: "border-l-emerald-600",
  }[priority.urgency];
  return (
    <div className={`border border-border border-l-2 ${urgencyColor} px-4 py-3`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-[13px] font-medium text-foreground">{priority.label}</span>
        <span className={`text-[9px] font-mono uppercase tracking-wider shrink-0 mt-0.5 ${
          priority.urgency === "high" ? "text-red-500" : priority.urgency === "medium" ? "text-[oklch(0.65_0.10_72)]" : "text-emerald-600"
        }`}>{priority.urgency}</span>
      </div>
      <p className="text-[12px] text-muted-foreground leading-relaxed mb-1.5">{priority.description}</p>
      <p className="text-[10px] font-mono text-muted-foreground/60">{priority.evidence}</p>
    </div>
  );
}

// ── Supplement name → affiliate key mapping ──
const SUPPLEMENT_KEY_MAP: Record<string, string> = {
  "Omega-3 (EPA/DHA)": "omega-3",
  "Omega-3": "omega-3",
  "Magnesium": "magnesium",
  "Magnesium glycinate": "magnesium",
  "Vitamin D3": "vitamin-d",
  "Vitamin D": "vitamin-d",
  "Vitamin K2": "vitamin-k2",
  "Creatine": "creatine",
  "Creatine monohydrate": "creatine",
  "Selenium": "selenium",
  "Vitamin B6": "vitamin-b6",
  "Iodine": "iodine",
  "Vitamin B12": "vitamin-b12",
  "Zinc": "zinc",
  "Probiotic": "probiotic",
  "Fibre": "fibre",
  "Folate": "folate",
  "CoQ10": "coq10",
  "Vitamin C": "vitamin-c",
};

function getSupplementKey(name: string): string | null {
  // Exact match first
  if (SUPPLEMENT_KEY_MAP[name]) return SUPPLEMENT_KEY_MAP[name];
  // Partial match
  for (const [k, v] of Object.entries(SUPPLEMENT_KEY_MAP)) {
    if (name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase())) return v;
  }
  return null;
}

// ── Supplement card ──
function SupplementCard({
  supplement,
  inCart,
  onToggleCart,
  region,
}: {
  supplement: ProtocolResult["supplements"][0];
  inCart: boolean;
  onToggleCart: () => void;
  region: AffiliateRegion;
}) {
  const key = getSupplementKey(supplement.name);
  const products = key ? (SUPPLEMENT_PRODUCTS[key] ?? []) : [];
  const product = products[0] ?? null;
  const amazonUrl = product ? buildAmazonUrl(product, region) : null;
  const amazonSearchUrl = product ? buildAmazonSearchUrl(product, region) : null;
  const iherbUrl = product ? buildIherbUrl(product) : null;
  const regionLabel: Record<AffiliateRegion, string> = { US: "Amazon US", UK: "Amazon UK", DE: "Amazon DE", default: "Amazon" };

  return (
    <div className={`border px-4 py-3 transition-all duration-200 ${
      inCart ? "border-[oklch(0.72_0.08_152)] bg-[oklch(0.95_0.04_152/0.5)]" : "border-border"
    }`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-[13px] font-medium text-foreground">{supplement.name}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <TierPill tier={supplement.tier} />
          <button
            onClick={onToggleCart}
            className={`text-[10px] font-semibold px-2 py-1 rounded transition-all duration-150 border ${
              inCart
                ? "bg-[oklch(0.92_0.05_152)] border-[oklch(0.80_0.06_152)] text-[oklch(0.42_0.07_152)] hover:bg-[oklch(0.88_0.06_152)]"
                : "bg-muted border-border text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {inCart ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
      <div className="text-[10px] font-mono text-muted-foreground mb-1.5">{supplement.dose}</div>
      <p className="text-[12px] text-muted-foreground leading-relaxed">{supplement.rationale}</p>
      {supplement.note && (
        <p className="text-[11px] text-[oklch(0.60_0.10_72)] mt-1.5 border-t border-border pt-1.5">⚠ {supplement.note}</p>
      )}
      {(amazonUrl || amazonSearchUrl || iherbUrl) && (
        <div className="flex gap-2 mt-3 pt-2 border-t border-border/50">
          {amazonUrl ? (
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-amazon flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase transition-all"
            >
              {regionLabel[region]}
            </a>
          ) : amazonSearchUrl ? (
            <a
              href={amazonSearchUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              title="No direct listing — searching Amazon"
              className="btn-amazon flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase transition-all opacity-70"
            >
              Search
            </a>
          ) : null}
          {iherbUrl && (
            <a
              href={iherbUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-iherb flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase transition-all"
            >
              iHerb
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ── Weekly protocol ──
function WeeklyProtocolPanel({ protocol }: { protocol: ProtocolResult["weeklyProtocol"] }) {
  return (
    <div className="space-y-4">
      {protocol.fastingWindow && (
        <div className="border border-border px-4 py-3 bg-muted/10">
          <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">Fasting Window</div>
          <p className="text-[13px] text-foreground">{protocol.fastingWindow}</p>
        </div>
      )}
      <div className="space-y-3">
        {protocol.meals.map((meal, i) => (
          <div key={i} className="border border-border px-4 py-3">
            <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">{meal.meal}</div>
            <div className="text-[12px] font-medium text-foreground mb-2">{meal.focus}</div>
            <div className="space-y-0.5">
              {meal.examples.map((ex, j) => (
                <div key={j} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                  <span className="text-muted-foreground/40 shrink-0">·</span>
                  <span>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border border-border px-4 py-3">
        <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">Hydration</div>
        <p className="text-[12px] text-muted-foreground">{protocol.hydration}</p>
      </div>
      <div className="space-y-1.5">
        {protocol.notes.map((note, i) => (
          <div key={i} className="flex items-start gap-2 text-[12px] text-muted-foreground">
            <span className="text-muted-foreground/40 shrink-0 mt-0.5">→</span>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Encode/decode answers to/from URL ──
function encodeAnswers(answers: QuizAnswers): string {
  try {
    return btoa(JSON.stringify(answers));
  } catch {
    return "";
  }
}

function decodeAnswers(encoded: string): QuizAnswers | null {
  try {
    return JSON.parse(atob(encoded)) as QuizAnswers;
  } catch {
    return null;
  }
}

// ── Full Results View ──
function ResultsView({ result, answers, onReset }: { result: ProtocolResult; answers: QuizAnswers; onReset: () => void }) {
  const [activeTab, setActiveTab] = useState<"protocol" | "priorities" | "supplements" | "weekly">("protocol");
  const { addBookmark } = useReadingList();
  const topRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [region, setRegion] = useState<AffiliateRegion>(() => detectRegion());
  const { addItem, removeItem, hasItem, openCart: openCartPanel, count: cartCount, items: cartItemsList } = useCart();

  // Accurate IP geolocation via Vercel edge headers
  useEffect(() => {
    fetch('/api/geo')
      .then((r) => r.json())
      .then((data) => { if (data?.country) setRegion(countryToRegion(data.country)); })
      .catch(() => {});
  }, []);

  const toggleCart = (supplementName: string) => {
    const key = getSupplementKey(supplementName);
    if (!key) return;
    const product = (SUPPLEMENT_PRODUCTS[key] ?? [])[0];
    if (!product) return;
    if (hasItem(key)) {
      removeItem(key);
    } else {
      addItem(key, product);
      openCartPanel();
    }
  };

  const handleAddAllToAmazon = () => {
    const products = result.supplements
      .flatMap(s => {
        const key = getSupplementKey(s.name);
        return key ? (SUPPLEMENT_PRODUCTS[key] ?? []) : [];
      })
      .filter(p => p != null);
    if (products.length === 0) return;
    const { withAsin, withoutAsin } = partitionBasket(products, region);
    if (withAsin.length > 0) {
      const url = buildAmazonMulticartUrl(withAsin, region);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    // Fallback: open search tabs for items without region ASINs
    withoutAsin.forEach(product => {
      window.open(buildAmazonSearchUrl(product, region), '_blank', 'noopener,noreferrer');
    });
  };

  const handleAddSelectedToAmazon = () => {
    const products = cartItemsList.map(i => i.product);
    if (products.length === 0) { toast.info('Add supplements to cart first'); return; }
    const { withAsin, withoutAsin } = partitionBasket(products, region);
    if (withAsin.length > 0) {
      const url = buildAmazonMulticartUrl(withAsin, region);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    withoutAsin.forEach(product => {
      window.open(buildAmazonSearchUrl(product, region), '_blank', 'noopener,noreferrer');
    });
  };

  const handleAddAllToIherb = () => {
    // iHerb doesn't support multicart — open a combined search for all supplements
    const terms = result.supplements
      .map(s => {
        const key = getSupplementKey(s.name);
        const products = key ? (SUPPLEMENT_PRODUCTS[key] ?? []) : [];
        return products[0]?.iherbSearchTerm ?? null;
      })
      .filter((x): x is string => x !== null);
    if (terms.length === 0) return;
    // Use the first supplement as the primary search; open each in a single tab
    const primaryTerm = terms[0];
    const iherbBase = `https://www.iherb.com/search?kw=${encodeURIComponent(primaryTerm)}`;
    const encoded = encodeURIComponent(iherbBase);
    window.open(`https://www.awin1.com/cread.php?awinmid=76736&awinaffid=2873641&ued=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddSelectedToIherb = () => {
    const terms = cartItemsList.map(i => i.product.iherbSearchTerm).filter(Boolean);
    if (terms.length === 0) { toast.info('Add supplements to cart first'); return; }
    const primaryTerm = terms[0];
    const iherbBase = `https://www.iherb.com/search?kw=${encodeURIComponent(primaryTerm)}`;
    const encoded = encodeURIComponent(iherbBase);
    window.open(`https://www.awin1.com/cread.php?awinmid=76736&awinaffid=2873641&ued=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Build the shareable URL with encoded answers
  const getShareableUrl = useCallback(() => {
    const encoded = encodeAnswers(answers);
    const base = window.location.origin + "/protocol";
    return encoded ? `${base}?r=${encoded}` : base;
  }, [answers]);

  const handleShare = async () => {
    const shareUrl = getShareableUrl();
    const text = `My personalised dietary protocol: ${result.primaryDiet.name} (${result.primaryDiet.matchScore}% match) — via Dietary Index`;
    if (navigator.share) {
      await navigator.share({ title: "My Dietary Protocol", text, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareableUrl();
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Shareable link copied!", {
      description: "Anyone with this link will see your protocol results.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBookmark = () => {
    addBookmark({
      id: `protocol-result-${Date.now()}`,
      title: `My Protocol: ${result.primaryDiet.name}`,
      subtitle: `${result.primaryDiet.matchScore}% match · Evidence-based dietary assessment`,
      type: "collection",
      category: "Protocol",
      url: "/protocol",
    });
    toast.success("Protocol saved to reading list");
  };

  const TABS = [
    { id: "protocol", label: "Diet Protocol" },
    { id: "priorities", label: "Key Priorities" },
    { id: "supplements", label: cartCount > 0 ? `Supplements (${cartCount} in cart)` : "Supplements" },
    { id: "weekly", label: "Weekly Plan" },
  ] as const;

  return (
    <div ref={topRef} className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Protocol</span>
            <span className="text-[10px] font-mono text-muted-foreground/40">—</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Results</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={handleShare} className="w-7 h-7 flex items-center justify-center border border-border hover:border-foreground/40 transition-colors">
              <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button onClick={handleBookmark} className="w-7 h-7 flex items-center justify-center border border-border hover:border-foreground/40 transition-colors">
              <Bookmark className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button onClick={onReset} className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-2.5 py-1.5 hover:border-foreground/40 transition-colors">
              <RotateCcw className="w-3 h-3" /> Retake
            </button>
          </div>
        </div>

        <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl sm:text-4xl font-normal text-foreground mb-2 leading-tight">
          Your Dietary Protocol
        </h1>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Generated from {result.evidenceSummary.totalTrials.toLocaleString()} trials across {result.evidenceSummary.tierIStudies} Tier I studies.
          All recommendations are traceable to peer-reviewed sources.
        </p>
      </div>

      {/* Evidence summary bar */}
      <div className="grid grid-cols-3 border border-border mb-6">
        {[
          { label: "Trials Analysed", value: result.evidenceSummary.totalTrials.toLocaleString() },
          { label: "Tier I Studies", value: result.evidenceSummary.tierIStudies },
          { label: "Match Score", value: `${result.personalScore}%` },
        ].map((stat, i) => (
          <div key={i} className={`px-3 py-3 text-center ${i < 2 ? "border-r border-border" : ""}`}>
            <div className="text-[16px] sm:text-[18px] font-mono font-bold text-foreground">{stat.value}</div>
            <div className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Primary diet */}
      <div className="mb-6">
        <PrimaryDietCard diet={result.primaryDiet} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide pb-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-[10px] font-mono tracking-wider uppercase px-3 py-1.5 border transition-colors shrink-0 ${
              activeTab === tab.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "protocol" && (
            <div className="space-y-3">
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">Supporting Dietary Patterns</div>
              {result.supportingDiets.map((d, i) => (
                <SupportingDietCard key={d.dietId} diet={d} index={i} />
              ))}
              <div className="border border-border px-4 py-3 mt-4">
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">Avoidances</div>
                <div className="space-y-3">
                  {result.avoidances.map((a, i) => (
                    <div key={i}>
                      <div className="text-[12px] font-medium text-foreground mb-0.5">{a.item}</div>
                      <div className="text-[11px] text-muted-foreground mb-0.5">{a.reason}</div>
                      <div className="text-[10px] font-mono text-muted-foreground/50">{a.evidence}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "priorities" && (
            <div className="space-y-3">
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">Evidence-based action priorities</div>
              {result.keyPriorities.map((p, i) => (
                <PriorityCard key={i} priority={p} />
              ))}
            </div>
          )}

          {activeTab === "supplements" && (
            <div className="space-y-3">
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">Evidence-ranked supplements</div>
              <p className="text-[11px] text-muted-foreground mb-3">Consult a physician before starting any supplement regimen, particularly if you take medications.</p>
              {result.supplements.map((s, i) => {
                const sKey = getSupplementKey(s.name);
                return (
                <SupplementCard
                  key={i}
                  supplement={s}
                  inCart={sKey ? hasItem(sKey) : false}
                  onToggleCart={() => toggleCart(s.name)}
                  region={region}
                />
                );
              })}
              {/* Cart action bar */}
              <div className="border border-border bg-muted/10 px-4 py-3 mt-4">
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">Add to cart</div>
                <div className="flex flex-wrap gap-2">
                  {/* Amazon */}
                  <button
                    onClick={handleAddAllToAmazon}
                    className="btn-amazon flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono tracking-wider uppercase rounded transition-all"
                  >
                    Add all to Amazon
                  </button>
                  {cartCount > 0 && (
                    <button
                      onClick={handleAddSelectedToAmazon}
                      className="btn-amazon flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono tracking-wider uppercase rounded transition-all"
                    >
                      Add selected ({cartCount}) to Amazon
                    </button>
                  )}
                  {/* iHerb */}
                  <button
                    onClick={handleAddAllToIherb}
                    className="btn-iherb flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono tracking-wider uppercase rounded transition-all"
                  >
                    Add all to iHerb
                  </button>
                  {cartCount > 0 && (
                    <button
                      onClick={handleAddSelectedToIherb}
                      className="btn-iherb flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono tracking-wider uppercase rounded transition-all"
                    >
                      Add selected ({cartCount}) to iHerb
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

          {activeTab === "weekly" && (
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">7-day dietary framework</div>
              <WeeklyProtocolPanel protocol={result.weeklyProtocol} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer actions */}
      <div className="mt-8 pt-6 border-t border-border">
        {/* Shareable link highlight box */}
        <div className="border border-border bg-muted/20 px-4 py-3 mb-4">
          <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1.5">Share your protocol</div>
          <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed">
            Copy a unique link to your results — anyone with it will see your exact protocol, including your primary diet recommendation, priorities, and weekly plan.
          </p>
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase border px-3 py-2 transition-all ${
              copied
                ? "border-[oklch(0.42_0.07_152)] text-[oklch(0.42_0.07_152)] bg-[oklch(0.95_0.04_152)]"
                : "border-foreground bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            <Link2 className="w-3 h-3" />
            {copied ? "Copied!" : "Copy shareable link"}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-3 py-2 hover:border-foreground/40 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3" /> Back to Index
          </Link>
          <Link href="/journals/does-the-mediterranean-diet-actually-work" className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-3 py-2 hover:border-foreground/40 transition-colors">
            Read the Evidence →
          </Link>
          <button onClick={onReset} className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-3 py-2 hover:border-foreground/40 transition-colors flex items-center gap-1.5">
            <RotateCcw className="w-3 h-3" /> Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ProtocolPage ──
export default function ProtocolPage() {
  const searchString = useSearch();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<ProtocolResult | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // On mount: if ?r= param is present, decode answers and auto-generate result
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const encoded = params.get("r");
    if (encoded) {
      const decoded = decodeAnswers(encoded);
      if (decoded) {
        setAnswers(decoded);
        setResult(scoreProtocol(decoded));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const question = QUIZ_QUESTIONS[currentQ];
  const totalQ = QUIZ_QUESTIONS.length;
  const isLast = currentQ === totalQ - 1;

  const currentAnswer = answers[question?.id];
  const hasAnswer = currentAnswer !== undefined &&
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : currentAnswer !== "");

  const handleSingle = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleMulti = (value: string) => {
    const current = (answers[question.id] as string[]) || [];
    // "none" / "none_above" / "no_restrictions" clears others
    if (value === "none" || value === "none_above" || value === "no_restrictions") {
      setAnswers(prev => ({ ...prev, [question.id]: [value] }));
      return;
    }
    const filtered = current.filter(v => v !== "none" && v !== "none_above" && v !== "no_restrictions");
    if (filtered.includes(value)) {
      setAnswers(prev => ({ ...prev, [question.id]: filtered.filter(v => v !== value) }));
    } else {
      setAnswers(prev => ({ ...prev, [question.id]: [...filtered, value] }));
    }
  };

  const handleNext = () => {
    if (isLast) {
      const r = scoreProtocol(answers);
      setResult(r);
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setCurrentQ(q => q + 1);
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(q => q - 1);
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQ(0);
    setResult(null);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Seo
        title="Dietary Protocol Builder — Evidence-Based Assessment"
        description="Answer 12 evidence-based questions about your health goals, conditions, and lifestyle. Receive a personalised dietary protocol ranked by clinical trial evidence."
        canonical="/protocol"
      />

      <div ref={containerRef} className="min-h-screen bg-background">
        {result ? (
          <ResultsView result={result} answers={answers} onReset={handleReset} />
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            {/* Top bar */}
            <div className="py-4 sm:py-6 border-b border-border mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3">
                <Link href="/" className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-3 h-3" /> Dietary Index
                </Link>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {currentQ + 1} / {totalQ}
                </span>
              </div>
              <ProgressBar current={currentQ + 1} total={totalQ} />
            </div>

            {/* Intro (only on first question) */}
            {currentQ === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ Protocol</span>
                  <span className="text-[10px] font-mono text-muted-foreground/40">—</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Assessment</span>
                </div>
                <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl sm:text-4xl font-normal text-foreground mb-3 leading-tight">
                  Build your evidence-based dietary protocol.
                </h1>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                  12 questions. Scored against 10,000+ clinical trials. Your personalised protocol includes a primary diet recommendation, key priorities, evidence-ranked supplements, and a weekly meal framework — all traceable to peer-reviewed sources.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["~4 minutes", "Evidence-based", "No account required"].map(tag => (
                    <span key={tag} className="text-[10px] font-mono tracking-wider uppercase border border-border px-2.5 py-1 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Section indicator */}
            <div className="mb-4">
              <SectionIndicator currentSection={question.section} />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="mb-5 sm:mb-6">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">
                    {question.sectionLabel}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)" }} className="text-xl sm:text-2xl font-normal text-foreground mb-1.5 leading-snug">
                    {question.question}
                  </h2>
                  {question.subtext && (
                    <p className="text-[12px] text-muted-foreground">{question.subtext}</p>
                  )}
                </div>

                {/* Options */}
                <div className={`grid gap-2 mb-6 ${question.type === "multi" && question.options.length > 4 ? "sm:grid-cols-2" : ""}`}>
                  {question.options.map(option => (
                    question.type === "single" ? (
                      <SingleOption
                        key={option.value}
                        option={option}
                        selected={(answers[question.id] as string) === option.value}
                        onSelect={() => handleSingle(option.value)}
                      />
                    ) : (
                      <MultiOption
                        key={option.value}
                        option={option}
                        selected={((answers[question.id] as string[]) || []).includes(option.value)}
                        onToggle={() => handleMulti(option.value)}
                      />
                    )
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pb-12">
              <button
                onClick={handleBack}
                disabled={currentQ === 0}
                className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-muted-foreground border border-border px-3 py-2 hover:border-foreground/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>

              <button
                onClick={handleNext}
                disabled={!hasAnswer}
                className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase border px-4 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-foreground bg-foreground text-background hover:bg-foreground/90"
              >
                {isLast ? "Generate Protocol" : "Next"}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
