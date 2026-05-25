"use client";
// NavBar — sticky header with compact premium mega menu using custom SVG icons
// Design: vitaei.com light editorial — JetBrains Mono labels, Playfair Display wordmark
// Mega menu: Stripe/Linear-style — compact, icon-per-link, no AI images
import { useState, useEffect, useRef } from "react";
import { Bookmark, ChevronDown, ArrowRight } from "lucide-react";
import { Link, useLocation } from "@/lib/wouter-shim";
import { useReadingList } from "@/contexts/ReadingListContext";
import { useCart } from "@/contexts/CartContext";

// ─── Custom SVG icon components ─────────────────────────────────────────────

const IconMediterranean = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconDASH = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const IconMIND = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14z"/>
  </svg>
);

const IconKeto = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const IconPlantBased = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22V12M12 12C12 7 7 3 2 3c0 5 4 9 10 9M12 12c0-5 5-9 10-9-1 5-5 9-10 9"/>
  </svg>
);

const IconAtlas = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconEastAsia = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconBlueZones = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconNordic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 6h18M3 12h18M3 18h18"/>
    <path d="M8 3v18"/>
  </svg>
);

const IconRCT = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4m-6 0h6"/>
  </svg>
);

const IconMeta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="3" width="6" height="6" rx="1"/>
    <rect x="9" y="3" width="6" height="6" rx="1"/>
    <rect x="16" y="3" width="6" height="6" rx="1"/>
    <rect x="5" y="13" width="6" height="6" rx="1"/>
    <rect x="13" y="13" width="6" height="6" rx="1"/>
  </svg>
);

const IconJournals = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconLongevity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconWeight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14z"/>
  </svg>
);

const IconSupplements = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"/>
    <circle cx="18" cy="18" r="3"/>
    <path d="M18 15v3l2 1"/>
  </svg>
);

const IconGlossary = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

const IconTier = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconMethodology = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const IconExclusion = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);

const IconBiomarker = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const IconSource = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

// ─── Nav data ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: "Diets",
    href: "/diets",
    description: "15 dietary patterns scored across 8 health outcomes",
    subLinks: [
      { label: "Mediterranean", href: "/diets#mediterranean", icon: <IconMediterranean />, desc: "Olive oil, fish, legumes — the gold standard" },
      { label: "DASH", href: "/diets#dash", icon: <IconDASH />, desc: "Clinically proven to lower blood pressure" },
      { label: "MIND", href: "/diets#mind", icon: <IconMIND />, desc: "Hybrid diet targeting cognitive decline" },
      { label: "Ketogenic", href: "/diets#keto", icon: <IconKeto />, desc: "High-fat, very low carbohydrate protocol" },
      { label: "Plant-Based", href: "/diets#plant-based", icon: <IconPlantBased />, desc: "Whole foods, minimal animal products" },
    ],
    viewAll: { label: "View all 15 diets", href: "/diets" },
  },
  {
    label: "Atlas",
    href: "/atlas",
    description: "Geographic survey of dietary patterns by region",
    subLinks: [
      { label: "Mediterranean Basin", href: "/atlas#mediterranean", icon: <IconAtlas />, desc: "Greece, Italy, Spain & the Levant" },
      { label: "East Asia", href: "/atlas#east-asia", icon: <IconEastAsia />, desc: "Japan, Korea, China dietary traditions" },
      { label: "Blue Zones", href: "/journals/blue-zones", icon: <IconBlueZones />, desc: "5 regions with highest longevity rates" },
      { label: "Nordic Region", href: "/atlas#nordic", icon: <IconNordic />, desc: "Rye, fish, fermented foods & root veg" },
    ],
    viewAll: { label: "Explore the atlas", href: "/atlas" },
  },
  {
    label: "Research",
    href: "/research",
    description: "Primary literature and trial database",
    subLinks: [
      { label: "RCT Database", href: "/research#rct", icon: <IconRCT />, desc: "Randomised controlled trials only" },
      { label: "Meta-analyses", href: "/research#meta", icon: <IconMeta />, desc: "Pooled analysis of multiple studies" },
      { label: "Source journals", href: "/research#journals", icon: <IconSource />, desc: "NEJM, Lancet, JAMA, BMJ & more" },
      { label: "Evidence tiers", href: "/methodology", icon: <IconTier />, desc: "How we classify study quality" },
    ],
    viewAll: { label: "Open research desk", href: "/research" },
  },
  {
    label: "Journals",
    href: "/journals",
    description: "120+ evidence-ranked nutrition articles",
    subLinks: [
      { label: "Heart Health", href: "/journals/heart-health", icon: <IconHeart />, desc: "Cardiovascular diet science" },
      { label: "Longevity", href: "/journals/longevity", icon: <IconLongevity />, desc: "Diet & lifespan extension" },
      { label: "Weight & Metabolic", href: "/journals/weight-loss", icon: <IconWeight />, desc: "Obesity, insulin & metabolic health" },
      { label: "Brain Health", href: "/journals/brain-health", icon: <IconBrain />, desc: "Cognition, mood & neurodegeneration" },
      { label: "Supplements", href: "/journals/supplements", icon: <IconSupplements />, desc: "Evidence-ranked supplement guides" },
    ],
    viewAll: { label: "Browse all 120+ articles", href: "/journals" },
  },
  {
    label: "Glossary",
    href: "/glossary",
    description: "Key nutrition science terms, defined",
    subLinks: [
      { label: "Evidence tiers", href: "/glossary#evidence-tiers", icon: <IconTier />, desc: "Tier I–III explained" },
      { label: "RCT", href: "/glossary#rct", icon: <IconRCT />, desc: "Randomised controlled trial" },
      { label: "Meta-analysis", href: "/glossary#meta-analysis", icon: <IconMeta />, desc: "Pooled statistical synthesis" },
      { label: "Biomarkers", href: "/glossary#biomarkers", icon: <IconBiomarker />, desc: "Measurable health indicators" },
    ],
    viewAll: { label: "Full glossary", href: "/glossary" },
  },
  {
    label: "Methodology",
    href: "/methodology",
    description: "How we score diets and assign evidence tiers",
    subLinks: [
      { label: "Tier I — RCT", href: "/methodology#tier-1", icon: <IconTier />, desc: "Highest quality: randomised trials" },
      { label: "Tier II — Human", href: "/methodology#tier-2", icon: <IconJournals />, desc: "Prospective & cohort studies" },
      { label: "Tier III — Mechanism", href: "/methodology#tier-3", icon: <IconMeta />, desc: "Animal & mechanistic evidence" },
      { label: "Exclusion criteria", href: "/methodology#exclusions", icon: <IconExclusion />, desc: "What we don't include & why" },
    ],
    viewAll: { label: "Read the methodology", href: "/methodology" },
  },
  {
    label: "Videos",
    href: "/videos",
    description: "20 curated interviews from leading dietary scientists",
    subLinks: [
      { label: "Mediterranean Diet", href: "/videos?topic=Mediterranean+Diet", icon: <IconMediterranean />, desc: "Willett, Gardner on the gold standard" },
      { label: "Gut Microbiome", href: "/videos?topic=Gut+Microbiome", icon: <IconSource />, desc: "Spector on the PREDICT studies" },
      { label: "Metabolic Health", href: "/videos?topic=Metabolic+Health", icon: <IconWeight />, desc: "Lustig, Attia on insulin & glucose" },
      { label: "Protein & Muscle", href: "/videos?topic=Protein+%26+Muscle", icon: <IconHeart />, desc: "Norton & Lyon on optimal protein" },
    ],
    viewAll: { label: "Browse all 20 videos", href: "/videos" },
  },
];

const COLLECTIONS = [
  { label: "Blue Zones", href: "/journals/blue-zones", tag: "5 regions" },
  { label: "Heart Health", href: "/journals/heart-health", tag: "Tier I" },
  { label: "Longevity", href: "/journals/longevity", tag: "8 guides" },
  { label: "Weight & Metabolic", href: "/journals/weight-loss", tag: "10 guides" },
  { label: "Brain Health", href: "/journals/brain-health", tag: "10 guides" },
  { label: "Supplements", href: "/journals/supplements", tag: "12 guides" },
  { label: "Gut Health", href: "/journals/gut-health", tag: "11 guides" },
];

// Derive a human-readable breadcrumb from the current path
function useBreadcrumb(location: string) {
  if (location === "/" || location === "") return null;

  const collectionMatch = location.match(/^\/journals\/(blue-zones|heart-health|longevity|weight-loss|brain-health|supplements|gut-health)$/);
  if (collectionMatch) {
    const col = COLLECTIONS.find(c => c.href === location);
    return col ? [{ label: "Journals", href: "/journals" }, { label: col.label }] : null;
  }

  if (location.startsWith("/journals/")) {
    const slug = location.replace("/journals/", "");
    const label = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return [{ label: "Journals", href: "/journals" }, { label }];
  }

  const navItem = NAV_ITEMS.find(n => n.href === location);
  if (navItem) return [{ label: navItem.label }];

  if (location === "/videos") return [{ label: "Video Channel" }];
  if (location === "/protocol") return [{ label: "Protocol Builder" }];
  if (location === "/affiliate-disclosure") return [{ label: "Affiliate Disclosure" }];

  return null;
}

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [location] = useLocation();
  const breadcrumb = useBreadcrumb(location);
  const { count, openPanel } = useReadingList();
  const { count: cartCount, toggleCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setCollectionsOpen(false);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setCollectionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
    setCollectionsOpen(false);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const handleMenuMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleCollectionsEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCollectionsOpen(true);
    setActiveMenu(null);
  };

  const handleCollectionsLeave = () => {
    closeTimer.current = setTimeout(() => setCollectionsOpen(false), 150);
  };

  const activeItem = NAV_ITEMS.find(n => n.label === activeMenu);

  return (
    <header
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 bg-background ${scrolled ? "shadow-[0_1px_0_0_hsl(var(--border))]" : "border-b border-border"}`}
    >
      <div className="container flex items-center h-14 gap-6">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
          <span className="w-6 h-6 rounded-sm bg-foreground flex items-center justify-center">
            <span className="text-background text-[10px] font-mono font-bold">Di</span>
          </span>
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[15px] font-normal text-foreground hidden sm:block">
            Dietary Index
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={`px-3 py-1.5 text-[12px] font-mono tracking-wider uppercase transition-colors rounded-sm ${
                  activeMenu === item.label || location === item.href || location.startsWith(item.href + "/")
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}

          {/* Collections dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCollectionsEnter}
            onMouseLeave={handleCollectionsLeave}
          >
            <button
              className={`flex items-center gap-1 px-3 py-1.5 text-[12px] font-mono tracking-wider uppercase transition-colors rounded-sm ${
                collectionsOpen ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              Collections
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""}`} />
            </button>

            {collectionsOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-56 bg-background border border-border shadow-lg py-1 z-50"
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleCollectionsLeave}
              >
                {COLLECTIONS.map(c => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="flex items-center justify-between px-4 py-2.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    {c.label}
                    <span className="text-[9px] font-mono text-muted-foreground/50">{c.tag}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Breadcrumb (non-home pages) */}
        {breadcrumb && (
          <nav className="hidden md:flex items-center gap-1.5 flex-1 justify-center pointer-events-none">
            <Link href="/" className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors pointer-events-auto">
              Dietary Index
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="text-muted-foreground/30 text-[10px]">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors pointer-events-auto">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[11px] font-mono tracking-wider uppercase text-foreground truncate max-w-[200px]">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Cart icon */}
          <button
            onClick={toggleCart}
            className="relative flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Supplement cart${cartCount > 0 ? ` — ${cartCount} item${cartCount !== 1 ? "s" : ""}` : ""}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] flex items-center justify-center bg-foreground text-background text-[8px] font-mono font-bold rounded-full px-0.5 leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
          {/* Reading list */}
          <button
            onClick={openPanel}
            className="relative flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Reading list${count > 0 ? ` — ${count} saved` : ""}`}
          >
            <Bookmark className="w-4 h-4" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] flex items-center justify-center bg-foreground text-background text-[8px] font-mono font-bold rounded-full px-0.5 leading-none">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
          <Link
            href="/protocol"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase border border-foreground bg-foreground text-background px-3 py-1.5 hover:bg-foreground/90 transition-colors whitespace-nowrap"
          >
            Build Protocol →
          </Link>
          {/* Hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-foreground transition-all ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block w-5 h-px bg-foreground transition-all ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Compact mega menu panel ── */}
      {activeItem && (
        <div
          className="hidden md:block absolute top-full left-0 right-0 bg-background border-b border-border shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] z-40"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container py-4">
            <div className="grid grid-cols-[200px_1fr] gap-6">

              {/* Left: section label + description + CTA */}
              <div className="flex flex-col justify-between py-1 border-r border-border pr-6">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60 mb-1">{activeItem.label}</p>
                  <p className="text-[12px] text-foreground leading-snug font-medium">{activeItem.description}</p>
                </div>
                <Link
                  href={activeItem.href}
                  className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors mt-3 group"
                >
                  {activeItem.viewAll.label}
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Right: sub-links grid — compact rows with icon + text */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 content-start">
                {activeItem.subLinks.map(sub => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className="group flex items-center gap-2.5 px-2 py-2 rounded-sm hover:bg-accent transition-colors"
                  >
                    <span className="w-7 h-7 shrink-0 flex items-center justify-center rounded-sm bg-muted text-muted-foreground group-hover:bg-foreground/8 group-hover:text-foreground transition-colors">
                      {sub.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-foreground leading-tight">{sub.label}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 truncate">{sub.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-border bg-background overflow-y-auto max-h-[80vh]"
        >
          {NAV_ITEMS.map(item => (
            <div key={item.label} className="border-b border-border">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-3 text-[13px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
                <button
                  className="px-4 py-3 text-muted-foreground"
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                </button>
              </div>
              {mobileExpanded === item.label && (
                <div className="bg-accent/30 px-4 pb-3 space-y-0.5">
                  {item.subLinks.map(sub => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors pl-2"
                    >
                      <span className="text-muted-foreground/60">{sub.icon}</span>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Collections */}
          <div className="border-b border-border">
            <button
              className="flex items-center justify-between w-full px-4 py-3 text-[13px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileExpanded(mobileExpanded === "collections" ? null : "collections")}
            >
              Collections
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileExpanded === "collections" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "collections" && (
              <div className="bg-accent/30 px-4 pb-3 space-y-0.5">
                {COLLECTIONS.map(c => (
                  <Link
                    key={c.label}
                    href={c.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors pl-2"
                  >
                    {c.label}
                    <span className="text-[9px] font-mono text-muted-foreground/50">{c.tag}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Reading list */}
          <button
            onClick={() => { setMobileOpen(false); openPanel(); }}
            className="flex items-center gap-2 w-full px-4 py-3 text-[13px] text-muted-foreground hover:text-foreground transition-colors border-b border-border"
          >
            <Bookmark className="w-4 h-4" />
            Reading List
            {count > 0 && (
              <span className="ml-auto text-[10px] font-mono bg-foreground text-background px-1.5 py-0.5 rounded-sm">
                {count}
              </span>
            )}
          </button>

          <div className="px-4 py-3">
            <Link
              href="/protocol"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center text-[11px] font-mono tracking-wider uppercase border border-foreground/80 px-3 py-2.5 hover:bg-foreground hover:text-background transition-colors"
            >
              Build Protocol →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
