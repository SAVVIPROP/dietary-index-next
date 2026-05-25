"use client";
// CartPanel — slide-out supplement cart panel
// Design: vitaei.com light editorial — JetBrains Mono labels, Playfair Display headings
import { useEffect, useRef, useState, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";
import {
  buildAmazonUrl,
  buildAmazonMulticartUrl,
  buildIherbUrl,
  detectRegion,
  type AffiliateRegion,
} from "@/lib/affiliateLinks";

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

const CartEmptyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/30">
    <path d="M4 4h3l2.5 14h13l2.5-10H9" />
    <circle cx="12" cy="26" r="1.5" />
    <circle cx="22" cy="26" r="1.5" />
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
  const { items, count, removeItem, clearCart, isOpen, closeCart } = useCart();
  const [region] = useState<AffiliateRegion>(() => detectRegion());
  const panelRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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
    const url = buildAmazonMulticartUrl(products, region);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleIherbAll = () => {
    if (items.length === 0) return;
    const primaryTerm = items[0].product.iherbSearchTerm;
    const iherbBase = `https://www.iherb.com/search?kw=${encodeURIComponent(primaryTerm)}`;
    const encoded = encodeURIComponent(iherbBase);
    const url = `https://www.awin1.com/cread.php?awinmid=76736&awinaffid=2873641&ued=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Cart</span>
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
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <CartEmptyIcon />
              <div>
                <p className="text-[13px] text-muted-foreground mb-1">Your cart is empty</p>
                <p className="text-[11px] font-mono text-muted-foreground/50">
                  Add supplements from article pages or the Protocol Builder
                </p>
              </div>
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
                      <a
                        href={amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono tracking-wider uppercase border border-border hover:border-foreground/40 text-foreground hover:bg-muted/30 transition-all whitespace-nowrap"
                      >
                        <AmazonIcon />
                        {regionLabel[region]}
                      </a>
                      <a
                        href={iherbUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono tracking-wider uppercase border border-border hover:border-foreground/40 text-foreground hover:bg-muted/30 transition-all whitespace-nowrap"
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

        {/* Footer actions */}
        {count > 0 && (
          <div className="border-t border-border px-5 py-4 flex flex-col gap-3 shrink-0">
            {/* Checkout row */}
            <div className="flex gap-2">
              <button
                onClick={handleAmazonAll}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] font-mono tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors whitespace-nowrap"
              >
                <AmazonIcon />
                Add all to {regionLabel[region]}
              </button>
              <button
                onClick={handleIherbAll}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] font-mono tracking-wider uppercase border border-border hover:border-foreground/40 text-foreground hover:bg-muted/30 transition-all whitespace-nowrap"
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
