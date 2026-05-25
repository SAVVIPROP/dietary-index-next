import type { Metadata } from "next";
import GlossaryPageClient from "./GlossaryPageClient";

export const metadata: Metadata = {
  title: "Glossary — Dietary Science Terms & Definitions",
  description: "Evidence-based definitions of dietary science terms. From macronutrients to metabolic biomarkers, every term is cross-referenced with peer-reviewed sources.",
  alternates: { canonical: "https://dietaryindex.com/glossary" },
};

export default function Page() {
  return <GlossaryPageClient />;
}
