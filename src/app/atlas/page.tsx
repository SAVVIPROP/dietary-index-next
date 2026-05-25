import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import AtlasPageClient from "./AtlasPageClient";

export const metadata: Metadata = {
  title: "Dietary Atlas — Global Eating Patterns by Region",
  description: "Explore dietary patterns across global regions — from East Asian to Nordic, Mediterranean to Blue Zones. Evidence-mapped and cross-referenced.",
  alternates: { canonical: "https://dietaryindex.com/atlas" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Dietary Atlas", url: `${SITE_URL}/atlas` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <AtlasPageClient />
    </>
  );
}
