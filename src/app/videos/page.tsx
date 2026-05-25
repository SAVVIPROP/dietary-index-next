import type { Metadata } from "next";
import VideosPageClient from "./VideosPageClient";

export const metadata: Metadata = {
  title: "Video Channel — Authoritative Dietary Science Talks",
  description: "39 curated talks from leading dietary scientists — Willett, Spector, Gardner, Attia, Panda, Mozaffarian, and more. Filtered by speaker and topic.",
  alternates: { canonical: "https://dietaryindex.com/videos" },
};

export default function Page() {
  return <VideosPageClient />;
}
