import type { Metadata } from "next";
import { SITE_URL, websiteSchema, organizationSchema } from "@/lib/seo";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Dietary Index — Evidence-Based Dietary Science",
  description:
    "A scientific index of dietary patterns — scored by evidence tier, mapped to eight health outcome domains, and cross-referenced with peer-reviewed research.",
  alternates: { canonical: SITE_URL },
};

// Combined JSON-LD: WebSite + Organization — server-rendered for Google indexing
const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [websiteSchema(), organizationSchema()],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeClient />
    </>
  );
}
