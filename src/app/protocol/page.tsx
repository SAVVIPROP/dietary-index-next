import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import ProtocolPageClient from "./ProtocolPageClient";

export const metadata: Metadata = {
  title: "Protocol — Evidence-Based Dietary Protocols",
  description: "Structured dietary protocols derived from the highest-tier evidence. Mediterranean, DASH, plant-based, and time-restricted eating protocols.",
  alternates: { canonical: "https://dietaryindex.com/protocol" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Protocol Builder", url: `${SITE_URL}/protocol` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProtocolPageClient />
    </>
  );
}
