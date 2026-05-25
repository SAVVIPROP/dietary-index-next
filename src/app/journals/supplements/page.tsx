import type { Metadata } from "next";
import SupplementsPageClient from "./SupplementsPageClient";

export const metadata: Metadata = {
  title: "Supplements — Evidence-Based Dietary Supplement Research",
  description: "Scientific evidence on dietary supplements. Omega-3, vitamin D, magnesium, creatine, and other supplements reviewed against peer-reviewed trials.",
  alternates: { canonical: "https://dietaryindex.com/journals/supplements" },
};

export default function Page() {
  return <SupplementsPageClient />;
}
