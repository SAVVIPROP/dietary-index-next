/**
 * DIETARY INDEX — Blue Zones Collection Page
 * Design: Light editorial, vitaei.com style
 * Playfair Display headings · JetBrains Mono labels · sage green accents
 * Route: /journals/blue-zones
 */

import { Link } from "@/lib/wouter-shim";
import { ArrowLeft, MapPin, BookOpen, Share2, Bookmark, ExternalLink } from "lucide-react";
import { journalArticles } from "@/lib/journals";
import { useState } from "react";
import { toast } from "sonner";
import Seo from "@/components/Seo";

// ── Blue Zone definitions ──────────────────────────────────────────────────
const BLUE_ZONES = [
  {
    id: "okinawa",
    name: "Okinawa",
    country: "Japan",
    slug: "the-okinawa-diet",
    lat: 26.5,
    lng: 128.0,
    tagline: "The 80% rule & purple sweet potato",
    color: "#2d6a4f",
    population: "~1.4M",
    centenarians: "68 per 100,000",
    keyFoods: ["Sweet potato (imo)", "Tofu & tempeh", "Bitter melon", "Seaweed", "Turmeric"],
    principle: "Hara hachi bu — eat until 80% full",
    stat: "Women live longest on Earth",
  },
  {
    id: "sardinia",
    name: "Sardinia",
    country: "Italy",
    slug: "the-sardinian-diet",
    lat: 40.1,
    lng: 9.1,
    tagline: "Cannonau wine, pecorino & mountain walks",
    color: "#1b4332",
    population: "~1.6M",
    centenarians: "Highest male centenarian ratio in world",
    keyFoods: ["Cannonau wine", "Pecorino cheese", "Fava beans", "Sourdough bread", "Goat's milk"],
    principle: "Moderate red wine daily; strong social bonds",
    stat: "10× more male centenarians than the US",
  },
  {
    id: "ikaria",
    name: "Ikaria",
    country: "Greece",
    slug: "the-ikarian-diet",
    lat: 37.6,
    lng: 26.2,
    tagline: "Wild greens, olive oil & afternoon naps",
    color: "#40916c",
    population: "~8,500",
    centenarians: "1 in 3 reach 90+",
    keyFoods: ["Wild greens (horta)", "Olive oil", "Herbal teas", "Legumes", "Honey"],
    principle: "Daily naps reduce cardiovascular mortality by 37%",
    stat: "10× more 90-year-olds than the US",
  },
  {
    id: "nicoya",
    name: "Nicoya Peninsula",
    country: "Costa Rica",
    slug: "the-nicoya-diet",
    lat: 10.1,
    lng: -85.4,
    tagline: "Corn tortillas, black beans & plan de vida",
    color: "#52b788",
    population: "~160,000",
    centenarians: "2× more 90-year-olds than rest of Costa Rica",
    keyFoods: ["Corn tortillas (nixtamal)", "Black beans", "Squash", "Tropical fruit", "Rice"],
    principle: "Plan de vida — a strong sense of life purpose",
    stat: "Lowest middle-age mortality in the world",
  },
  {
    id: "loma-linda",
    name: "Loma Linda",
    country: "USA",
    slug: "the-loma-linda-diet",
    lat: 34.0,
    lng: -117.3,
    tagline: "Seventh-day Adventist plant-based living",
    color: "#74c69d",
    population: "~24,000 Adventists",
    centenarians: "Live 7–10 years longer than average Americans",
    keyFoods: ["Legumes", "Nuts", "Whole grains", "Fruits", "Water (no alcohol)"],
    principle: "Sabbath rest, community, and plant-based diet",
    stat: "Adventist men live 7.3 years longer than average",
  },
];

// ── Related articles for "You might also like" ────────────────────────────
const RELATED_SLUGS = [
  "the-traditional-japanese-diet",
  "does-eating-less-help-you-live-longer",
  "does-the-mediterranean-diet-actually-work",
  "does-intermittent-fasting-work",
  "the-longevity-diet-what-centenarians-actually-eat",
];

// ── SVG World Map with Blue Zone markers ──────────────────────────────────
function BlueZoneMap({ activeZone, onZoneClick }: {
  activeZone: string | null;
  onZoneClick: (id: string) => void;
}) {
  // Simplified world map projection (equirectangular)
  // Convert lat/lng to SVG coordinates
  const toSvg = (lat: number, lng: number) => ({
    x: ((lng + 180) / 360) * 800,
    y: ((90 - lat) / 180) * 400,
  });

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-[#e8e4dc]" style={{ background: "#f7f5f0" }}>
      <svg viewBox="0 0 800 400" className="w-full" style={{ display: "block" }}>
        {/* Ocean background */}
        <rect width="800" height="400" fill="#eef2f7" />

        {/* Simplified continent shapes */}
        {/* North America */}
        <path d="M 80 60 L 180 50 L 220 80 L 240 120 L 220 160 L 200 200 L 180 240 L 160 260 L 140 240 L 120 200 L 100 160 L 80 120 Z" fill="#e8e4dc" stroke="#d4cfc6" strokeWidth="0.5" />
        {/* South America */}
        <path d="M 160 260 L 200 250 L 220 280 L 230 320 L 220 360 L 200 380 L 180 370 L 165 340 L 155 300 Z" fill="#e8e4dc" stroke="#d4cfc6" strokeWidth="0.5" />
        {/* Europe */}
        <path d="M 380 60 L 440 55 L 460 75 L 450 100 L 430 110 L 410 105 L 390 90 Z" fill="#e8e4dc" stroke="#d4cfc6" strokeWidth="0.5" />
        {/* Africa */}
        <path d="M 390 110 L 450 105 L 470 130 L 475 180 L 460 230 L 440 270 L 420 280 L 400 260 L 390 220 L 385 170 L 385 130 Z" fill="#e8e4dc" stroke="#d4cfc6" strokeWidth="0.5" />
        {/* Asia */}
        <path d="M 450 55 L 620 45 L 680 70 L 700 100 L 680 130 L 640 140 L 600 130 L 560 120 L 520 110 L 480 100 L 460 80 Z" fill="#e8e4dc" stroke="#d4cfc6" strokeWidth="0.5" />
        {/* Southeast Asia / Japan */}
        <path d="M 640 100 L 680 90 L 700 110 L 690 130 L 670 135 L 650 120 Z" fill="#e8e4dc" stroke="#d4cfc6" strokeWidth="0.5" />
        {/* Australia */}
        <path d="M 600 240 L 680 230 L 720 260 L 720 310 L 690 340 L 650 340 L 620 310 L 600 280 Z" fill="#e8e4dc" stroke="#d4cfc6" strokeWidth="0.5" />

        {/* Graticule lines */}
        {[-60, -30, 0, 30, 60].map(lat => {
          const y = ((90 - lat) / 180) * 400;
          return <line key={lat} x1="0" y1={y} x2="800" y2={y} stroke="#d4cfc6" strokeWidth="0.3" strokeDasharray="4,4" />;
        })}
        {[-120, -60, 0, 60, 120].map(lng => {
          const x = ((lng + 180) / 360) * 800;
          return <line key={lng} x1={x} y1="0" x2={x} y2="400" stroke="#d4cfc6" strokeWidth="0.3" strokeDasharray="4,4" />;
        })}

        {/* Blue Zone markers */}
        {BLUE_ZONES.map((zone) => {
          const pos = toSvg(zone.lat, zone.lng);
          const isActive = activeZone === zone.id;
          return (
            <g key={zone.id} onClick={() => onZoneClick(zone.id)} style={{ cursor: "pointer" }}>
              {/* Pulse ring */}
              {isActive && (
                <circle cx={pos.x} cy={pos.y} r="18" fill="none" stroke={zone.color} strokeWidth="1.5" opacity="0.4" />
              )}
              {/* Marker */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 9 : 7}
                fill={zone.color}
                stroke="white"
                strokeWidth="2"
                style={{ transition: "r 0.2s" }}
              />
              {/* Label */}
              <text
                x={pos.x}
                y={pos.y - 14}
                textAnchor="middle"
                fontSize="9"
                fontFamily="'JetBrains Mono', monospace"
                fill={zone.color}
                fontWeight="600"
              >
                {zone.name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Map legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#e8e4dc] px-3 py-1.5 rounded-sm">
        <div className="w-3 h-3 rounded-full bg-[#2d6a4f]" />
        <span className="text-xs font-mono text-[#6b6560]">BLUE ZONE LOCATION</span>
      </div>
    </div>
  );
}

export default function BlueZonesPage() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const relatedArticles = RELATED_SLUGS
    .map(slug => journalArticles.find(a => a.slug === slug))
    .filter(Boolean);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "The Blue Zones Diet — Dietary Index", url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const handleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem("di_bookmarks") || "[]");
    const entry = {
      type: "collection",
      id: "blue-zones",
      title: "The Blue Zones Diet Collection",
      url: "/journals/blue-zones",
      savedAt: new Date().toISOString(),
    };
    const exists = saved.some((b: { id: string }) => b.id === "blue-zones");
    if (!exists) {
      localStorage.setItem("di_bookmarks", JSON.stringify([...saved, entry]));
      setBookmarked(true);
      toast.success("Added to reading list");
    } else {
      const updated = saved.filter((b: { id: string }) => b.id !== "blue-zones");
      localStorage.setItem("di_bookmarks", JSON.stringify(updated));
      setBookmarked(false);
      toast("Removed from reading list");
    }
  };

  const activeZoneData = BLUE_ZONES.find(z => z.id === activeZone);

  return (
    <>
      <Seo
        title="The Blue Zones Diet Collection — 5 Regions Where People Live the Longest | Dietary Index"
        description="A complete evidence-based guide to the five Blue Zones — Okinawa, Sardinia, Ikaria, Nicoya, and Loma Linda — and the dietary patterns that explain why people there live past 100."
        canonical="https://dietaryindex.com/journals/blue-zones"
        ogType="article"
        tags={["Blue Zones", "Okinawa diet", "Sardinian diet", "Ikarian diet", "Nicoya diet", "Loma Linda diet", "longevity diet", "centenarian diet"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "The Blue Zones Diet Collection",
          "description": "Evidence-based guides to the five Blue Zones — regions where people consistently live past 100.",
          "url": "https://dietaryindex.com/journals/blue-zones",
          "publisher": { "@type": "Organization", "name": "Dietary Index" },
          "hasPart": BLUE_ZONES.map(z => ({
            "@type": "Article",
            "name": `The ${z.name} Diet`,
            "url": `https://dietaryindex.com/journals/${z.slug}`,
          })),
        }}
      />

      <div className="min-h-screen bg-background">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#9b9590] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#2d6a4f] transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/#journals" className="hover:text-[#2d6a4f] transition-colors">JOURNALS</Link>
            <span>/</span>
            <span className="text-[#2d6a4f]">BLUE ZONES</span>
          </nav>

          {/* ── Hero ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-mono border border-[#2d6a4f] text-[#2d6a4f] px-2 py-0.5 rounded-sm">COLLECTION</span>
              <span className="text-xs font-mono text-[#9b9590]">5 REGIONS · LONGEVITY SCIENCE</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2d2520] leading-[1.1] mb-5">
              The Blue Zones<br />
              <em className="text-[#2d6a4f] not-italic">Diet Collection</em>
            </h1>
            <p className="text-lg text-[#5a5550] max-w-2xl leading-relaxed mb-8">
              Five regions of the world where people consistently live past 100 — and the dietary patterns, lifestyle principles, and social structures that explain why. Coined by researcher Dan Buettner and validated by demographic studies, the Blue Zones represent the most compelling natural experiment in human longevity.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { label: "BLUE ZONES", value: "5" },
                { label: "CENTENARIANS", value: "10×" },
                { label: "SHARED PRINCIPLES", value: "9" },
                { label: "YEARS GAINED", value: "7–12" },
              ].map(stat => (
                <div key={stat.label} className="border border-[#e8e4dc] p-4 bg-white">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#2d6a4f] mb-1">{stat.value}</div>
                  <div className="text-xs font-mono text-[#9b9590]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── World Map ── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-[#9b9590]">FIG. 1</span>
              <div className="flex-1 h-px bg-[#e8e4dc]" />
              <span className="text-xs font-mono text-[#9b9590]">GLOBAL DISTRIBUTION</span>
            </div>
            <BlueZoneMap activeZone={activeZone} onZoneClick={(id) => setActiveZone(id === activeZone ? null : id)} />
            <p className="text-xs font-mono text-[#9b9590] mt-2 text-center">
              Click a marker to highlight a Blue Zone. Locations are approximate.
            </p>
          </section>

          {/* ── Active zone detail panel ── */}
          {activeZoneData && (
            <div
              className="mb-10 border border-[#2d6a4f]/30 bg-[#f0f7f4] p-6 rounded-sm"
              style={{ borderLeftWidth: "3px", borderLeftColor: activeZoneData.color }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" style={{ color: activeZoneData.color }} />
                    <span className="text-xs font-mono" style={{ color: activeZoneData.color }}>
                      {activeZoneData.country.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#2d2520] mb-1">{activeZoneData.name}</h3>
                  <p className="text-sm text-[#5a5550] italic mb-3">{activeZoneData.tagline}</p>
                  <p className="text-sm font-mono text-[#2d6a4f] font-semibold mb-3">"{activeZoneData.principle}"</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeZoneData.keyFoods.map(f => (
                      <span key={f} className="text-xs font-mono border border-[#2d6a4f]/30 text-[#2d6a4f] px-2 py-0.5 bg-white rounded-sm">{f}</span>
                    ))}
                  </div>
                  <div className="text-xs font-mono text-[#6b6560]">
                    <span className="text-[#9b9590]">CENTENARIANS: </span>{activeZoneData.centenarians}
                  </div>
                </div>
                <Link
                  href={`/journals/${activeZoneData.slug}`}
                  className="flex items-center gap-2 text-sm font-mono border border-[#2d6a4f] text-[#2d6a4f] px-4 py-2 hover:bg-[#2d6a4f] hover:text-white transition-colors rounded-sm whitespace-nowrap"
                >
                  READ GUIDE <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* ── The 9 Power 9 principles ── */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-2xl font-bold text-[#2d2520]">The Power 9 Principles</h2>
              <div className="flex-1 h-px bg-[#e8e4dc]" />
            </div>
            <p className="text-[#5a5550] mb-6 max-w-2xl">
              Across all five Blue Zones, nine lifestyle factors consistently emerge. These are not isolated dietary rules — they are an integrated way of living that produces extraordinary longevity outcomes.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: "01", title: "Move Naturally", desc: "Physical activity is built into daily life — walking, gardening, manual work — not scheduled exercise." },
                { num: "02", title: "Purpose (Ikigai)", desc: "A clear sense of why you wake up in the morning adds up to 7 years of life expectancy." },
                { num: "03", title: "Downshift", desc: "Daily stress-relief rituals: prayer, napping, ancestor remembrance, happy hour." },
                { num: "04", title: "80% Rule", desc: "Hara hachi bu — stop eating when 80% full. Meals are the smallest of the day." },
                { num: "05", title: "Plant Slant", desc: "Beans, legumes, and whole grains are the cornerstone. Meat eaten ~5 times/month." },
                { num: "06", title: "Wine at 5", desc: "1–2 glasses of wine daily with food and friends (except Loma Linda Adventists)." },
                { num: "07", title: "Belong", desc: "All but five of the 263 centenarians interviewed belonged to a faith community." },
                { num: "08", title: "Loved Ones First", desc: "Centenarians keep ageing parents and grandparents nearby. Commit to a life partner." },
                { num: "09", title: "Right Tribe", desc: "Social networks that support healthy behaviours. Smoking, obesity, and happiness are all contagious." },
              ].map(p => (
                <div key={p.num} className="border border-[#e8e4dc] bg-white p-5">
                  <div className="text-xs font-mono text-[#2d6a4f] mb-2">{p.num}</div>
                  <div className="font-display text-lg font-semibold text-[#2d2520] mb-2">{p.title}</div>
                  <p className="text-sm text-[#5a5550] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Five Blue Zone article cards ── */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-2xl font-bold text-[#2d2520]">The Five Blue Zones</h2>
              <div className="flex-1 h-px bg-[#e8e4dc]" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BLUE_ZONES.map((zone) => {
                const article = journalArticles.find(a => a.slug === zone.slug);
                return (
                  <Link key={zone.id} href={`/journals/${zone.slug}`}>
                    <div
                      className="border border-[#e8e4dc] bg-white p-6 hover:border-[#2d6a4f]/40 hover:shadow-sm transition-all cursor-pointer h-full"
                      onMouseEnter={() => setActiveZone(zone.id)}
                      onMouseLeave={() => setActiveZone(null)}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: zone.color }} />
                        <span className="text-xs font-mono text-[#9b9590]">{zone.country.toUpperCase()}</span>
                        {article && (
                          <span className="ml-auto text-xs font-mono border px-1.5 py-0.5 rounded-sm"
                            style={{ borderColor: zone.color + "40", color: zone.color }}>
                            TIER {article.tier}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#2d2520] mb-2">{zone.name}</h3>
                      <p className="text-sm text-[#5a5550] italic mb-3">{zone.tagline}</p>
                      <div className="text-xs font-mono text-[#2d6a4f] font-semibold mb-4 leading-relaxed">
                        {zone.stat}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {zone.keyFoods.slice(0, 3).map(f => (
                          <span key={f} className="text-xs font-mono bg-[#f7f5f0] text-[#6b6560] px-2 py-0.5 rounded-sm">{f}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono text-[#2d6a4f] mt-auto">
                        <BookOpen className="w-3 h-3" />
                        {article ? `${article.readTime} read` : "Read guide"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── Common dietary thread ── */}
          <section className="mb-14 border border-[#e8e4dc] bg-white p-8">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-display text-xl font-bold text-[#2d2520]">The Common Dietary Thread</h2>
            </div>
            <p className="text-[#5a5550] mb-6 max-w-2xl leading-relaxed">
              Despite their geographic diversity, all five Blue Zones share a remarkably consistent dietary pattern. This is not coincidence — it is convergent evidence for what a longevity-promoting diet looks like.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-mono font-semibold text-[#2d6a4f] mb-3">WHAT THEY EAT (95%+ OF CALORIES)</h3>
                <ul className="space-y-2">
                  {[
                    "Legumes — beans, lentils, chickpeas, fava beans",
                    "Whole grains — sourdough, corn tortillas, brown rice",
                    "Vegetables — seasonal, local, often wild-foraged",
                    "Fruits — whole, seasonal, not juiced",
                    "Nuts and seeds — daily, small portions",
                    "Olive oil or similar whole-food fats",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#5a5550]">
                      <span className="text-[#2d6a4f] mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-mono font-semibold text-[#9b9590] mb-3">WHAT THEY MINIMISE</h3>
                <ul className="space-y-2">
                  {[
                    "Meat — typically 5 times per month or less",
                    "Dairy — minimal; fermented forms preferred",
                    "Sugar — rare; reserved for celebrations",
                    "Ultra-processed foods — essentially absent",
                    "Refined grains — white bread, white rice minimal",
                    "Sugary beverages — water, herbal tea, coffee",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#5a5550]">
                      <span className="text-[#9b9590] mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Related articles ── */}
          {relatedArticles.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-display text-xl font-bold text-[#2d2520]">You Might Also Like</h2>
                <div className="flex-1 h-px bg-[#e8e4dc]" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedArticles.map((article) => article && (
                  <Link key={article.id} href={`/journals/${article.slug}`}>
                    <div className="border border-[#e8e4dc] bg-white p-5 hover:border-[#2d6a4f]/40 hover:shadow-sm transition-all cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-[#9b9590]">{article.category.toUpperCase()}</span>
                        <span className="ml-auto text-xs font-mono text-[#9b9590]">{article.readTime}</span>
                      </div>
                      <h3 className="font-display text-base font-semibold text-[#2d2520] mb-2 line-clamp-2">{article.title}</h3>
                      <div className="text-xs font-mono text-[#2d6a4f]">{article.verdictShort}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Back link ── */}
          <div className="border-t border-[#e8e4dc] pt-8">
            <Link href="/#journals" className="inline-flex items-center gap-2 text-sm font-mono text-[#6b6560] hover:text-[#2d6a4f] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              BACK TO ALL JOURNALS
            </Link>
          </div>

        </main>
      </div>
    </>
  );
}
