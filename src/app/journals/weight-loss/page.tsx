import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import WeightLossPageClient from "./WeightLossPageClient";

export const metadata: Metadata = {
  title: "Weight Loss — Dietary Patterns & Metabolic Evidence",
  description: "Peer-reviewed evidence on dietary patterns for weight management. Ketogenic, Mediterranean, intermittent fasting, and low-carb diet research.",
  alternates: { canonical: "https://dietaryindex.com/journals/weight-loss" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
  { name: "Weight Loss", url: `${SITE_URL}/journals/weight-loss` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <WeightLossPageClient />
    </>
  );
}
