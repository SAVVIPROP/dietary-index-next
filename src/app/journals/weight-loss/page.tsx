import type { Metadata } from "next";
import WeightLossPageClient from "./WeightLossPageClient";

export const metadata: Metadata = {
  title: "Weight Loss — Dietary Patterns & Metabolic Evidence",
  description: "Peer-reviewed evidence on dietary patterns for weight management. Ketogenic, Mediterranean, intermittent fasting, and low-carb diet research.",
  alternates: { canonical: "https://dietaryindex.com/journals/weight-loss" },
};

export default function Page() {
  return <WeightLossPageClient />;
}
