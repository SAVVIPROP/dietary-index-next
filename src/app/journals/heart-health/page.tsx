import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import HeartHealthPageClient from "./HeartHealthPageClient";

export const metadata: Metadata = {
  title: "Heart Health — Dietary Patterns & Cardiovascular Evidence",
  description: "Evidence-based dietary patterns for cardiovascular health. Peer-reviewed research on Mediterranean, DASH, and plant-based diets for heart disease prevention.",
  alternates: { canonical: "https://dietaryindex.com/journals/heart-health" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
  { name: "Heart Health", url: `${SITE_URL}/journals/heart-health` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <HeartHealthPageClient />
    </>
  );
}
