import type { Metadata } from "next";
import ProtocolPageClient from "./ProtocolPageClient";

export const metadata: Metadata = {
  title: "Protocol — Evidence-Based Dietary Protocols",
  description: "Structured dietary protocols derived from the highest-tier evidence. Mediterranean, DASH, plant-based, and time-restricted eating protocols.",
  alternates: { canonical: "https://dietaryindex.com/protocol" },
};

export default function Page() {
  return <ProtocolPageClient />;
}
