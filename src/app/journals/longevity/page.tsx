import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import LongevityPageClient from "./LongevityPageClient";

export const metadata: Metadata = {
  title: "Longevity — Dietary Patterns & Lifespan Evidence",
  description: "Scientific evidence on dietary patterns associated with longevity. Blue Zones, caloric restriction, Mediterranean diet, and fasting research.",
  alternates: { canonical: "https://dietaryindex.com/journals/longevity" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
  { name: "Longevity", url: `${SITE_URL}/journals/longevity` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <LongevityPageClient />
    </>
  );
}
