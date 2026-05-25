import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import AffiliateDisclosurePageClient from "./AffiliateDisclosurePageClient";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Dietary Index",
  description: "Dietary Index affiliate disclosure. We may earn commissions from purchases made through links on this site.",
  alternates: { canonical: "https://dietaryindex.com/affiliate-disclosure" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Affiliate Disclosure", url: `${SITE_URL}/affiliate-disclosure` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <AffiliateDisclosurePageClient />
    </>
  );
}
