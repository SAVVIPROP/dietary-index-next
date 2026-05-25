import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import JournalsPageClient from "./JournalsPageClient";

export const metadata: Metadata = {
  title: "Journals — Dietary Science Article Index",
  description: "Browse 110+ peer-reviewed articles on dietary patterns, scored by verdict and evidence tier. Filter by journal source, topic, and outcome domain.",
  alternates: { canonical: "https://dietaryindex.com/journals" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <JournalsPageClient />
    </>
  );
}
