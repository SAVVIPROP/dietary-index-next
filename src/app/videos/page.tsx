import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import VideosPageClient from "./VideosPageClient";

export const metadata: Metadata = {
  title: "Video Channel — Authoritative Dietary Science Talks",
  description: "39 curated talks from leading dietary scientists — Willett, Spector, Gardner, Attia, Panda, Mozaffarian, and more. Filtered by speaker and topic.",
  alternates: { canonical: "https://dietaryindex.com/videos" },
};

const jsonLd = breadcrumbSchema([
  { name: "Dietary Index", url: SITE_URL },
  { name: "Video Channel", url: `${SITE_URL}/videos` },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <VideosPageClient />
    </>
  );
}
