import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import ResearchPageClient from "./ResearchPageClient";

export const metadata: Metadata = {
  title: "Research — Peer-Reviewed Dietary Science",
  description: "Every claim on Dietary Index is traceable to peer-reviewed research. Browse the full evidence base across NEJM, Cell, JAMA, Lancet, Nature, and BMJ.",
  alternates: { canonical: "https://dietaryindex.com/research" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Research", url: `${SITE_URL}/research` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ResearchPageClient />
    </>
  );
}
