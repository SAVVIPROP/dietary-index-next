"use client";
import dynamic from "next/dynamic";
const DietsPage = dynamic(() => import("../../page-components/DietsPage"), { ssr: false });
export default function DietsPageClient() {
  return <DietsPage />;
}
