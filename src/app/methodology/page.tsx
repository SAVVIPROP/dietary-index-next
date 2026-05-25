import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import MethodologyPageClient from "./MethodologyPageClient";

export const metadata: Metadata = {
  title: "Methodology — How Dietary Index Scores Evidence",
  description: "How Dietary Index assigns evidence tiers, scores dietary patterns, and cross-references peer-reviewed research. Full transparency on our editorial process.",
  alternates: { canonical: "https://dietaryindex.com/methodology" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Methodology", url: `${SITE_URL}/methodology` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <MethodologyPageClient />
    </>
  );
}
