import type { Metadata } from "next";
import AtlasPageClient from "./AtlasPageClient";

export const metadata: Metadata = {
  title: "Dietary Atlas — Global Eating Patterns by Region",
  description: "Explore dietary patterns across global regions — from East Asian to Nordic, Mediterranean to Blue Zones. Evidence-mapped and cross-referenced.",
  alternates: { canonical: "https://dietaryindex.com/atlas" },
};

export default function Page() {
  return <AtlasPageClient />;
}
