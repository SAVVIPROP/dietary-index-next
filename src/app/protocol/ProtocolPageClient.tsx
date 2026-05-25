"use client";
import dynamic from "next/dynamic";
const ProtocolPage = dynamic(() => import("../../page-components/ProtocolPage"), { ssr: false });
export default function ProtocolPageClient() {
  return <ProtocolPage />;
}
