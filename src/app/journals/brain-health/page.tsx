import type { Metadata } from "next";
import BrainHealthPageClient from "./BrainHealthPageClient";

export const metadata: Metadata = {
  title: "Brain Health — Dietary Patterns & Cognitive Evidence",
  description: "Peer-reviewed research on dietary patterns for cognitive health. MIND diet, Mediterranean diet, omega-3s, and neuroprotective nutrition.",
  alternates: { canonical: "https://dietaryindex.com/journals/brain-health" },
};

export default function Page() {
  return <BrainHealthPageClient />;
}
