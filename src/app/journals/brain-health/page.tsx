import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import BrainHealthPageClient from "./BrainHealthPageClient";

export const metadata: Metadata = {
  title: "Brain Health — Dietary Patterns & Cognitive Evidence",
  description: "Peer-reviewed research on dietary patterns for cognitive health. MIND diet, Mediterranean diet, omega-3s, and neuroprotective nutrition.",
  alternates: { canonical: "https://dietaryindex.com/journals/brain-health" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
  { name: "Brain Health", url: `${SITE_URL}/journals/brain-health` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <BrainHealthPageClient />
    </>
  );
}
