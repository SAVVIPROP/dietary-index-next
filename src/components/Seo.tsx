// Seo.tsx — No-op stub for Next.js migration
// In Next.js, metadata is handled via generateMetadata() in page.tsx server components.
// This stub prevents import errors in page-components that still call <Seo />.
import type { SeoConfig } from "@/lib/seo";

interface SeoProps extends SeoConfig {}

export default function Seo(_props: SeoProps) {
  // No-op: Next.js handles <head> metadata via layout.tsx and page.tsx generateMetadata()
  return null;
}
