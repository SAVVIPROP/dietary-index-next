import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import GlossaryPageClient from "./GlossaryPageClient";

export const metadata: Metadata = {
  title: "Glossary — Dietary Science Terms & Definitions",
  description: "Evidence-based definitions of dietary science terms. From macronutrients to metabolic biomarkers, every term is cross-referenced with peer-reviewed sources.",
  alternates: { canonical: "https://dietaryindex.com/glossary" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Glossary", url: `${SITE_URL}/glossary` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <GlossaryPageClient />
    </>
  );
}
