import type { Metadata } from "next";
import JournalsPageClient from "./JournalsPageClient";

export const metadata: Metadata = {
  title: "Journals — Dietary Science Article Index",
  description: "Browse 110+ peer-reviewed articles on dietary patterns, scored by verdict and evidence tier. Filter by journal source, topic, and outcome domain.",
  alternates: { canonical: "https://dietaryindex.com/journals" },
};

export default function Page() {
  return <JournalsPageClient />;
}
