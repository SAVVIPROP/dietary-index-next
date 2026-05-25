"use client";
import dynamic from "next/dynamic";
const WeightLossPage = dynamic(() => import("../../../page-components/WeightLossPage"), { ssr: false });
export default function WeightLossPageClient() {
  return <WeightLossPage />;
}
