"use client";
import dynamic from "next/dynamic";
const BrainHealthPage = dynamic(() => import("../../../page-components/BrainHealthPage"), { ssr: false });
export default function BrainHealthPageClient() {
  return <BrainHealthPage />;
}
