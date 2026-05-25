// Seo.tsx — JSON-LD renderer for Next.js migration
// In Next.js, metadata (title/description/OG) is handled via generateMetadata() in page.tsx.
// This component ONLY renders JSON-LD structured data as a <script> tag.
// Used inside page-components (ssr:false dynamic imports) as a client-side fallback.
// The canonical JSON-LD is also injected server-side in the page.tsx server components.
"use client";
import type { SeoConfig } from "@/lib/seo";

interface SeoProps extends SeoConfig {}

export default function Seo({ jsonLd }: SeoProps) {
  if (!jsonLd) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
