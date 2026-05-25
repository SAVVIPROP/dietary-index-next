import type { Metadata } from "next";
import LongevityPageClient from "./LongevityPageClient";

export const metadata: Metadata = {
  title: "Longevity — Dietary Patterns & Lifespan Evidence",
  description: "Scientific evidence on dietary patterns associated with longevity. Blue Zones, caloric restriction, Mediterranean diet, and fasting research.",
  alternates: { canonical: "https://dietaryindex.com/journals/longevity" },
};

export default function Page() {
  return <LongevityPageClient />;
}
