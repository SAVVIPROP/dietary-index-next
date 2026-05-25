"use client";
import dynamic from "next/dynamic";
const MethodologyPage = dynamic(() => import("../../page-components/MethodologyPage"), { ssr: false });
export default function MethodologyPageClient() {
  return <MethodologyPage />;
}
