"use client";
// DietComparePanel — side-by-side diet comparison modal
// Design: vitaei.com light editorial — white bg, JetBrains Mono, Playfair Display
import { X, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { diets, healthOutcomes, type Diet, type EvidenceTier } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

const OUTCOME_LABELS: Record<string, string> = {
  CVD: "Cardiovascular",
  MET: "Metabolic",
  COG: "Cognitive",
  CAN: "Cancer",
  LON: "Longevity",
  GUT: "Gut Health",
  WGT: "Weight",
  INF: "Inflammation",
};

const STRENGTH_LABELS = ["None", "Weak", "Moderate", "Strong"];
const STRENGTH_COLORS = ["var(--border)", "var(--tier-iii)", "var(--tier-ii)", "var(--tier-i)"];

function TierPill({ tier }: { tier: EvidenceTier }) {
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

function StrengthDots({ strength }: { strength: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map(level => (
        <div
          key={level}
          className="w-2.5 h-2.5 rounded-sm"
          style={{ background: strength >= level ? STRENGTH_COLORS[strength] : "var(--border)" }}
        />
      ))}
      <span className="text-[10px] font-mono text-muted-foreground ml-1">{STRENGTH_LABELS[strength]}</span>
    </div>
  );
}

// Diet selector dropdown
function DietSelector({
  value,
  onChange,
  exclude,
  label,
}: {
  value: number | null;
  onChange: (id: number) => void;
  exclude: number[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = diets.find(d => d.id === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 border border-border px-3 py-2.5 hover:border-foreground/40 transition-colors text-left"
      >
        <div className="min-w-0">
          {selected ? (
            <div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] text-foreground leading-snug truncate">
                {selected.name}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <TierPill tier={selected.tier} />
                <span className="text-[10px] font-mono text-muted-foreground">{selected.trialCount.toLocaleString()} trials</span>
              </div>
            </div>
          ) : (
            <span className="text-[12px] font-mono text-muted-foreground">{label}</span>
          )}
        </div>
        <ChevronDown
          className="w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 bg-background border border-border shadow-sm max-h-64 overflow-y-auto"
          >
            {diets
              .filter(d => !exclude.includes(d.id))
              .map(d => (
                <button
                  key={d.id}
                  onClick={() => { onChange(d.id); setOpen(false); }}
                  className="w-full text-left px-3 py-2.5 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div style={{ fontFamily: "var(--font-display)" }} className="text-[13px] text-foreground truncate">{d.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{d.category}</div>
                  </div>
                  <TierPill tier={d.tier} />
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main comparison panel
interface DietComparePanelProps {
  onClose: () => void;
}

export default function DietComparePanel({ onClose }: DietComparePanelProps) {
  const [diet1Id, setDiet1Id] = useState<number | null>(1); // Mediterranean default
  const [diet2Id, setDiet2Id] = useState<number | null>(2); // DASH default
  const [diet3Id, setDiet3Id] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const diet1 = diets.find(d => d.id === diet1Id) ?? null;
  const diet2 = diets.find(d => d.id === diet2Id) ?? null;
  const diet3 = diets.find(d => d.id === diet3Id) ?? null;

  const activeDiets = [diet1, diet2, diet3].filter(Boolean) as Diet[];

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const colWidth = activeDiets.length === 3 ? "w-1/3" : activeDiets.length === 2 ? "w-1/2" : "w-full";

  return (
    <div className="fixed inset-0 z-[60] flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 m-auto w-full max-w-5xl max-h-[90vh] bg-background border border-border shadow-xl flex flex-col overflow-hidden"
        style={{ margin: "auto", position: "relative" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-0.5">Compare Mode</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-xl text-foreground">
              Diet Comparison
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-foreground/40"
            aria-label="Close comparison"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Diet selectors */}
          <div className="px-5 py-4 border-b border-border">
            <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
              Select up to 3 diets to compare
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <DietSelector
                value={diet1Id}
                onChange={setDiet1Id}
                exclude={[diet2Id, diet3Id].filter(Boolean) as number[]}
                label="Select diet 1…"
              />
              <DietSelector
                value={diet2Id}
                onChange={setDiet2Id}
                exclude={[diet1Id, diet3Id].filter(Boolean) as number[]}
                label="Select diet 2…"
              />
              <DietSelector
                value={diet3Id}
                onChange={setDiet3Id}
                exclude={[diet1Id, diet2Id].filter(Boolean) as number[]}
                label="Add diet 3 (optional)…"
              />
            </div>
          </div>

          {activeDiets.length === 0 ? (
            <div className="px-5 py-12 text-center text-[13px] font-mono text-muted-foreground">
              Select at least one diet to begin comparison.
            </div>
          ) : (
            <>
              {/* Header row */}
              <div className="border-b border-border">
                <div className="flex">
                  <div className="w-36 sm:w-44 shrink-0 px-4 py-3 border-r border-border">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Metric</span>
                  </div>
                  {activeDiets.map(diet => (
                    <div key={diet.id} className={`${colWidth} px-4 py-3 border-r border-border last:border-r-0`}>
                      <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] sm:text-[15px] text-foreground leading-snug mb-1">
                        {diet.name}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <TierPill tier={diet.tier} />
                        {diet.ahaScore !== null && (
                          <span className="text-[9px] font-mono text-muted-foreground">AHA {diet.ahaScore}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AHA Score row */}
              <div className="border-b border-border">
                <div className="flex">
                  <div className="w-36 sm:w-44 shrink-0 px-4 py-3 border-r border-border bg-muted/10">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">AHA Score</span>
                  </div>
                  {activeDiets.map(diet => (
                    <div key={diet.id} className={`${colWidth} px-4 py-3 border-r border-border last:border-r-0`}>
                      {diet.ahaScore !== null ? (
                        <div>
                          <div className="text-[18px] font-mono font-bold text-foreground leading-none mb-1">{diet.ahaScore}<span className="text-[11px] text-muted-foreground font-normal">/100</span></div>
                          <div className="h-1 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${diet.ahaScore}%`,
                                background: diet.ahaScore >= 80 ? "var(--tier-i)" : diet.ahaScore >= 60 ? "var(--tier-ii)" : "var(--tier-iii)",
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] font-mono text-muted-foreground/30">Not rated</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trial count row */}
              <div className="border-b border-border">
                <div className="flex">
                  <div className="w-36 sm:w-44 shrink-0 px-4 py-3 border-r border-border bg-muted/10">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Trials</span>
                  </div>
                  {activeDiets.map(diet => (
                    <div key={diet.id} className={`${colWidth} px-4 py-3 border-r border-border last:border-r-0`}>
                      <span className="text-[16px] font-mono font-bold text-foreground">{diet.trialCount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category row */}
              <div className="border-b border-border">
                <div className="flex">
                  <div className="w-36 sm:w-44 shrink-0 px-4 py-3 border-r border-border bg-muted/10">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Category</span>
                  </div>
                  {activeDiets.map(diet => (
                    <div key={diet.id} className={`${colWidth} px-4 py-3 border-r border-border last:border-r-0`}>
                      <span className="text-[11px] font-mono text-muted-foreground">{diet.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome rows */}
              <div className="border-b border-border">
                <div className="px-4 py-2 bg-muted/20 border-b border-border">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Evidence by Health Outcome</span>
                </div>
                {healthOutcomes.map((outcome, oi) => (
                  <div key={outcome.code} className={`flex ${oi < healthOutcomes.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="w-36 sm:w-44 shrink-0 px-4 py-3 border-r border-border bg-muted/5">
                      <div className="text-[11px] font-mono text-foreground">{outcome.code}</div>
                      <div className="text-[10px] text-muted-foreground leading-snug">{outcome.shortLabel}</div>
                    </div>
                    {activeDiets.map(diet => {
                      const strength = diet.outcomes[outcome.code] ?? 0;
                      // Highlight the best in the row
                      const maxStrength = Math.max(...activeDiets.map(d => d.outcomes[outcome.code] ?? 0));
                      const isBest = activeDiets.length > 1 && strength === maxStrength && strength > 0;
                      return (
                        <div
                          key={diet.id}
                          className={`${colWidth} px-4 py-3 border-r border-border last:border-r-0 ${isBest ? "bg-[oklch(0.95_0.04_152)]/40" : ""}`}
                        >
                          <StrengthDots strength={strength} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Key reference row */}
              <div className="border-b border-border">
                <div className="px-4 py-2 bg-muted/20 border-b border-border">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Key Reference</span>
                </div>
                <div className="flex">
                  <div className="w-36 sm:w-44 shrink-0 border-r border-border" />
                  {activeDiets.map(diet => (
                    <div key={diet.id} className={`${colWidth} px-4 py-3 border-r border-border last:border-r-0`}>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{diet.keyRef}</p>
                      <a
                        href={`https://doi.org/${diet.keyRefDoi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5 inline-flex items-center gap-1 break-all"
                      >
                        DOI <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tagline row */}
              <div>
                <div className="px-4 py-2 bg-muted/20 border-b border-border">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Summary</span>
                </div>
                <div className="flex">
                  <div className="w-36 sm:w-44 shrink-0 border-r border-border" />
                  {activeDiets.map(diet => (
                    <div key={diet.id} className={`${colWidth} px-4 py-3 border-r border-border last:border-r-0`}>
                      <p className="text-[12px] text-muted-foreground leading-relaxed">{diet.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border shrink-0 flex items-center justify-between gap-3 bg-muted/10">
          <p className="text-[10px] font-mono text-muted-foreground">
            Evidence strength: <span className="text-foreground">Strong = multiple RCTs</span> · <span className="text-[oklch(0.60_0.10_72)]">Moderate = human trials</span> · <span className="text-muted-foreground">Weak = mechanistic</span>
          </p>
          <button
            onClick={onClose}
            className="text-[10px] font-mono tracking-wider uppercase border border-border px-3 py-1.5 hover:border-foreground/40 transition-colors text-muted-foreground hover:text-foreground shrink-0"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
