"use client";
import dynamic from "next/dynamic";
const GlossaryPage = dynamic(() => import("../../page-components/GlossaryPage"), { ssr: false });
export default function GlossaryPageClient() {
  return <GlossaryPage />;
}
