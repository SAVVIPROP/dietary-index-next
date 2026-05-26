"use client";
// CartPanel — slide-out supplement cart panel
// Design: vitaei.com light editorial — JetBrains Mono labels, Playfair Display headings
import { useEffect, useRef, useState, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";
import {
  buildAmazonUrl,
  buildAmazonSearchUrl,
  buildAmazonMulticartUrl,
  buildAllIherbUrls,
  buildIherbUrl,
  partitionBasket,
  shouldShowAmazon,
  detectRegion,
  countryToRegion,
  SUPPLEMENT_PRODUCTS,
  type AffiliateRegion,
} from "@/lib/affiliateLinks";

// Featured supplements shown in empty state — most evidence-backed, most referenced across articles
const FEATURED_KEYS = [
  'omega-3',
  'magnesium',
  'vitamin-d',
  'vitamin-k2',
  'creatine',
  'zinc',
  'coq10',
  'nmn',
  'berberine',
  'curcumin',
  'ashwagandha',
  'collagen',
];

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <path d="M1 1l12 12M13 1L1 13" />
  </svg>
);

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" />
  </svg>
);

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AmazonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const IherbIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 12h8M12 8v8" />
  </svg>
);

const ShareIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
);

const CheckSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function CartPanel() {
  const { items, count, addItem, removeItem, hasItem, clearCart, isOpen, closeCart, openCart } = useCart();
  const [region, setRegion] = useState<AffiliateRegion>(() => detectRegion());
  const panelRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Accurate IP geolocation via Vercel edge headers
  useEffect(() => {
    fetch('/api/geo')
      .then((r) => r.json())
      .then((data) => { if (data?.country) setRegion(countryToRegion(data.country)); })
      .catch(() => {});
  }, []);

  const handleShareCart = useCallback(() => {
    const keys = items.map(i => i.key).join(",");
    const url = `${window.location.origin}/journals?cart=${encodeURIComponent(keys)}`;
    if (navigator.share) {
      navigator.share({ title: "My supplement stack — Dietary Index", url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  }, [items]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const regionLabel: Record<AffiliateRegion, string> = {
    US: "Amazon US", UK: "Amazon UK", DE: "Amazon DE", default: "Amazon",
  };

  const handleAmazonAll = () => {
    const products = items.map(i => i.product);
    const { withAsin, withoutAsin } = partitionBasket(products, region);
    // Items with region-specific ASINs → multicart URL
    if (withAsin.length > 0) {
      const url = buildAmazonMulticartUrl(withAsin, region);
      window.open(url, "_blank", "noopener,noreferrer");
    }
    // Items without region ASINs → individual Amazon search tabs (fallback)
    withoutAsin.forEach(product => {
      const searchUrl = buildAmazonSearchUrl(product, region);
      window.open(searchUrl, "_blank", "noopener,noreferrer");
    });
  };

  const handleIherbAll = () => {
    if (items.length === 0) return;
    // iHerb has no multicart — open one tab per supplement (matches vitaei.com openAllTabs())
    const urls = buildAllIherbUrls(items.map(i => i.product));
    urls.forEach(url => window.open(url, '_blank', 'noopener,noreferrer'));
  };

  // Build featured entries for empty state
  const featuredEntries = FEATURED_KEYS.flatMap((key) => {
    const products = SUPPLEMENT_PRODUCTS[key] ?? [];
    return products.slice(0, 1).map((product) => ({ key, product }));
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Supplement cart"
        aria-modal="true"
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-background border-l border-border flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
              {count === 0 ? "Supplements" : "Cart"}
            </span>
            {count > 0 && (
              <span className="text-[9px] font-mono bg-foreground text-background px-1.5 py-0.5 rounded-sm">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {count === 0 ? (
            // Empty state — show featured supplement catalogue
            <div className="flex flex-col">
              <div className="px-5 pt-5 pb-3">
                <p className="text-[11px] font-mono text-muted-foreground/60 leading-relaxed">
                  Evidence-backed supplements referenced across our articles. Add to your stack and buy from Amazon or iHerb.
                </p>
              </div>
              <div className="divide-y divide-border">
                {featuredEntries.map(({ key, product }) => {
                  const inCart = hasItem(key);
                  return (
                    <div key={key} className="px-5 py-3.5 flex items-start gap-3">
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-foreground leading-snug">{product.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{product.dose}</p>
                        <p className="text-[10px] text-muted-foreground/70 leading-relaxed mt-1">{product.note}</p>
                      </div>
                      {/* Add button */}
                      <button
                        onClick={() => {
                          if (inCart) {
                            removeItem(key);
                          } else {
                            addItem(key, product);
                          }
                        }}
                        aria-label={inCart ? `Remove ${product.name}` : `Add ${product.name} to cart`}
                        className={`shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center border transition-all ${
                          inCart
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {inCart ? <CheckIcon /> : <PlusIcon />}
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* Hint when items have been added from the catalogue */}
              {count > 0 && (
                <div className="px-5 py-4 border-t border-border">
                  <p className="text-[10px] font-mono text-muted-foreground/50 text-center">
                    {count} item{count !== 1 ? "s" : ""} in cart — scroll up to checkout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map(({ key, product }) => {
                const amazonUrl = buildAmazonUrl(product, region);
                const iherbUrl = buildIherbUrl(product);
                return (
                  <div key={key} className="px-5 py-4 flex flex-col gap-2.5">
                    {/* Name + remove */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-medium text-foreground leading-snug">{product.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{product.dose}</p>
                      </div>
                      <button
                        onClick={() => removeItem(key)}
                        aria-label={`Remove ${product.name}`}
                        className="shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground/40 hover:text-destructive transition-colors mt-0.5"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    {/* Note */}
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{product.note}</p>
                    {/* Buy buttons */}
                    <div className="flex gap-2">
                      {amazonUrl ? (
                        <a
                          href={amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="btn-amazon flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono tracking-wider uppercase rounded transition-all whitespace-nowrap"
                        >
                          <AmazonIcon />
                          {regionLabel[region]}
                        </a>
                      ) : (
                        <a
                          href={buildAmazonSearchUrl(product, region)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          title="No direct listing — searching Amazon"
                          className="btn-amazon flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono tracking-wider uppercase rounded transition-all whitespace-nowrap opacity-70"
                        >
                          <AmazonIcon />
                          Search
                        </a>
                      )}
                      <a
                        href={iherbUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="btn-iherb flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono tracking-wider uppercase rounded transition-all whitespace-nowrap"
                      >
                        <IherbIcon />
                        iHerb
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions — only when cart has items */}
        {count > 0 && (
          <div className="border-t border-border px-5 py-4 flex flex-col gap-3 shrink-0">
            {/* Checkout row */}
            <div className="flex gap-2">
              {shouldShowAmazon(region) && (
                <button
                  onClick={handleAmazonAll}
                  className="btn-amazon flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] font-mono tracking-wider uppercase rounded transition-all whitespace-nowrap"
                >
                  <AmazonIcon />
                  Add all to {regionLabel[region]}
                </button>
              )}
              <button
                onClick={handleIherbAll}
                className="btn-iherb flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] font-mono tracking-wider uppercase rounded transition-all whitespace-nowrap"
              >
                <IherbIcon />
                Add all to iHerb
              </button>
            </div>
            {/* Share + Clear row */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleShareCart}
                className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <CheckSmallIcon /> : <ShareIcon />}
                {copied ? "Link copied" : "Share stack"}
              </button>
              <button
                onClick={clearCart}
                className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
