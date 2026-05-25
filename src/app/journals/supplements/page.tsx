import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import SupplementsPageClient from "./SupplementsPageClient";

export const metadata: Metadata = {
  title: "Supplements — Evidence-Based Dietary Supplement Research",
  description: "Scientific evidence on dietary supplements. Omega-3, vitamin D, magnesium, creatine, and other supplements reviewed against peer-reviewed trials.",
  alternates: { canonical: "https://dietaryindex.com/journals/supplements" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
  { name: "Supplements", url: `${SITE_URL}/journals/supplements` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <SupplementsPageClient />
    </>
  );
}
