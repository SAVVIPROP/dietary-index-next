"use client";
// AffiliateSupplements — supplement cards on article pages
// Design: vitaei.com light editorial — JetBrains Mono labels, site design system
import { useEffect, useState } from 'react';
import {
  ARTICLE_SUPPLEMENT_MAP,
  SUPPLEMENT_PRODUCTS,
  buildAmazonUrl,
  buildIherbUrl,
  detectRegion,
  type AffiliateRegion,
} from '@/lib/affiliateLinks';
import { useCart } from '@/contexts/CartContext';

interface Props {
  slug: string;
}

const AmazonIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const IherbIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AffiliateSupplements({ slug }: Props) {
  const [region, setRegion] = useState<AffiliateRegion>('US');
  const { addItem, removeItem, hasItem, openCart } = useCart();

  useEffect(() => {
    setRegion(detectRegion());
  }, []);

  const supplementKeys = ARTICLE_SUPPLEMENT_MAP[slug];
  if (!supplementKeys || supplementKeys.length === 0) return null;

  // Build (key, product) pairs — use first product per key for simplicity
  const entries = supplementKeys.flatMap((key) => {
    const products = SUPPLEMENT_PRODUCTS[key] ?? [];
    return products.map((product, i) => ({ key: i === 0 ? key : `${key}-${i}`, product }));
  });
  if (entries.length === 0) return null;

  const regionLabel: Record<AffiliateRegion, string> = {
    US: 'Amazon US',
    UK: 'Amazon UK',
    DE: 'Amazon DE',
    default: 'Amazon',
  };

  return (
    <section className="mt-12 mb-8">
      <div className="border-t border-border pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            Supplements referenced in this article
          </span>
        </div>

        {/* Supplement cards */}
        <div className="flex flex-col gap-2">
          {entries.map(({ key, product }) => {
            const amazonUrl = buildAmazonUrl(product, region);
            const iherbUrl = buildIherbUrl(product);
            const inCart = hasItem(key);
            return (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-border bg-background hover:bg-muted/20 transition-all duration-200"
              >
                {/* Left: name, dose, note */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-[13px] font-medium text-foreground">{product.name}</p>
                    <span className="text-[10px] font-mono text-muted-foreground border border-border px-1.5 py-0.5">
                      {product.dose}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{product.note}</p>
                </div>

                {/* Right: buttons */}
                <div className="flex gap-2 flex-shrink-0 flex-wrap">
                  {/* Add to cart */}
                  <button
                    onClick={() => {
                      if (inCart) {
                        removeItem(key);
                      } else {
                        addItem(key, product);
                        openCart();
                      }
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono tracking-wider uppercase border transition-all whitespace-nowrap ${
                      inCart
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground/40 text-foreground hover:bg-muted/30"
                    }`}
                  >
                    {inCart ? <CheckIcon /> : <CartIcon />}
                    {inCart ? "In cart" : "Add to cart"}
                  </button>
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
      </div>
    </section>
  );
}
