"use client";
import dynamic from "next/dynamic";
const AtlasPage = dynamic(() => import("../../page-components/AtlasPage"), { ssr: false });
export default function AtlasPageClient() {
  return <AtlasPage />;
}
