"use client";
import dynamic from "next/dynamic";
const JournalsPage = dynamic(() => import("../../page-components/JournalsPage"), { ssr: false });
export default function JournalsPageClient() {
  return <JournalsPage />;
}
