"use client";
import dynamic from "next/dynamic";
const LongevityPage = dynamic(() => import("../../../page-components/LongevityPage"), { ssr: false });
export default function LongevityPageClient() {
  return <LongevityPage />;
}
