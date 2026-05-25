import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import GutHealthPageClient from "./GutHealthPageClient";

export const metadata: Metadata = {
  title: "Gut Health — Dietary Patterns & Microbiome Evidence",
  description: "Evidence-based dietary patterns for gut microbiome health. Fermented foods, fibre, prebiotics, and probiotics reviewed against clinical research.",
  alternates: { canonical: "https://dietaryindex.com/journals/gut-health" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
  { name: "Gut Health", url: `${SITE_URL}/journals/gut-health` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <GutHealthPageClient />
    </>
  );
}
