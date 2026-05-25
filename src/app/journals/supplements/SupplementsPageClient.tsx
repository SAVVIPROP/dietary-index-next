"use client";
import dynamic from "next/dynamic";
const SupplementsPage = dynamic(() => import("../../../page-components/SupplementsPage"), { ssr: false });
export default function SupplementsPageClient() {
  return <SupplementsPage />;
}
