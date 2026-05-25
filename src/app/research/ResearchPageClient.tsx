"use client";
import dynamic from "next/dynamic";
const ResearchPage = dynamic(() => import("../../page-components/ResearchPage"), { ssr: false });
export default function ResearchPageClient() {
  return <ResearchPage />;
}
