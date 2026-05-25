import type { Metadata } from "next";
import BlueZonesPageClient from "./BlueZonesPageClient";

export const metadata: Metadata = {
  title: "Blue Zones — Dietary Patterns of Longevity Populations",
  description: "Dietary patterns from Blue Zone populations — Okinawa, Sardinia, Nicoya, Ikaria, and Loma Linda. Evidence-mapped against peer-reviewed longevity research.",
  alternates: { canonical: "https://dietaryindex.com/journals/blue-zones" },
};

export default function Page() {
  return <BlueZonesPageClient />;
}
