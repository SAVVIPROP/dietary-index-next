import type { Metadata } from "next";
import AffiliateDisclosurePageClient from "./AffiliateDisclosurePageClient";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Dietary Index",
  description: "Dietary Index affiliate disclosure. We may earn commissions from purchases made through links on this site.",
  alternates: { canonical: "https://dietaryindex.com/affiliate-disclosure" },
};

export default function Page() {
  return <AffiliateDisclosurePageClient />;
}
