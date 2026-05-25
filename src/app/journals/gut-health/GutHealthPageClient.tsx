"use client";
import dynamic from "next/dynamic";
const GutHealthPage = dynamic(() => import("../../../page-components/GutHealthPage"), { ssr: false });
export default function GutHealthPageClient() {
  return <GutHealthPage />;
}
