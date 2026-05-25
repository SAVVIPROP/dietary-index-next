import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Dietary Index — Evidence-Based Dietary Science",
  description:
    "A scientific index of dietary patterns — scored by evidence tier, mapped to eight health outcome domains, and cross-referenced with peer-reviewed research.",
  alternates: { canonical: SITE_URL },
};

export default function Page() {
  return <HomeClient />;
}
