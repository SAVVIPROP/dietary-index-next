import type { Metadata } from "next";
import GutHealthPageClient from "./GutHealthPageClient";

export const metadata: Metadata = {
  title: "Gut Health — Dietary Patterns & Microbiome Evidence",
  description: "Evidence-based dietary patterns for gut microbiome health. Fermented foods, fibre, prebiotics, and probiotics reviewed against clinical research.",
  alternates: { canonical: "https://dietaryindex.com/journals/gut-health" },
};

export default function Page() {
  return <GutHealthPageClient />;
}
