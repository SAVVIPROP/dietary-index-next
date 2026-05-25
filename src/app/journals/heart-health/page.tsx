import type { Metadata } from "next";
import HeartHealthPageClient from "./HeartHealthPageClient";

export const metadata: Metadata = {
  title: "Heart Health — Dietary Patterns & Cardiovascular Evidence",
  description: "Evidence-based dietary patterns for cardiovascular health. Peer-reviewed research on Mediterranean, DASH, and plant-based diets for heart disease prevention.",
  alternates: { canonical: "https://dietaryindex.com/journals/heart-health" },
};

export default function Page() {
  return <HeartHealthPageClient />;
}
