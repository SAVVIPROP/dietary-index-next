import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import DietsPageClient from "./DietsPageClient";

export const metadata: Metadata = {
  title: "Dietary Patterns — Evidence-Based Diet Comparison",
  description: "Compare 40+ dietary patterns by evidence tier, health outcomes, and scientific consensus. Mediterranean, DASH, ketogenic, plant-based, and more.",
  alternates: { canonical: "https://dietaryindex.com/diets" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Dietary Patterns", url: `${SITE_URL}/diets` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <DietsPageClient />
    </>
  );
}
