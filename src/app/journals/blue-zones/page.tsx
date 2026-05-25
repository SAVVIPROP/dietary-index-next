import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import BlueZonesPageClient from "./BlueZonesPageClient";

export const metadata: Metadata = {
  title: "Blue Zones — Dietary Patterns of Longevity Populations",
  description: "Dietary patterns from Blue Zone populations — Okinawa, Sardinia, Nicoya, Ikaria, and Loma Linda. Evidence-mapped against peer-reviewed longevity research.",
  alternates: { canonical: "https://dietaryindex.com/journals/blue-zones" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Journals & Guides", url: `${SITE_URL}/journals` },
  { name: "Blue Zones", url: `${SITE_URL}/journals/blue-zones` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <BlueZonesPageClient />
    </>
  );
}
