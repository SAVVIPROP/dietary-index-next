"use client";
import dynamic from "next/dynamic";
const BlueZonesPage = dynamic(() => import("../../../page-components/BlueZonesPage"), { ssr: false });
export default function BlueZonesPageClient() {
  return <BlueZonesPage />;
}
