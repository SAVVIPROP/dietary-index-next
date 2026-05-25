import type { Metadata } from "next";
import MethodologyPageClient from "./MethodologyPageClient";

export const metadata: Metadata = {
  title: "Methodology — How Dietary Index Scores Evidence",
  description: "How Dietary Index assigns evidence tiers, scores dietary patterns, and cross-references peer-reviewed research. Full transparency on our editorial process.",
  alternates: { canonical: "https://dietaryindex.com/methodology" },
};

export default function Page() {
  return <MethodologyPageClient />;
}
