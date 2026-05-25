"use client";
import dynamic from "next/dynamic";
const HeartHealthPage = dynamic(() => import("../../../page-components/HeartHealthPage"), { ssr: false });
export default function HeartHealthPageClient() {
  return <HeartHealthPage />;
}
