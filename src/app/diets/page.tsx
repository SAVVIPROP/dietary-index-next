import type { Metadata } from "next";
import DietsPageClient from "./DietsPageClient";

export const metadata: Metadata = {
  title: "Dietary Patterns — Evidence-Based Diet Comparison",
  description: "Compare 40+ dietary patterns by evidence tier, health outcomes, and scientific consensus. Mediterranean, DASH, ketogenic, plant-based, and more.",
  alternates: { canonical: "https://dietaryindex.com/diets" },
};

export default function Page() {
  return <DietsPageClient />;
}
