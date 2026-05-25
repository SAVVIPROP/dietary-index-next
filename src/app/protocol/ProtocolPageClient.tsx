"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProtocolPage = dynamic(() => import("../../page-components/ProtocolPage"), { ssr: false });

export default function ProtocolPageClient() {
  return (
    <Suspense fallback={null}>
      <ProtocolPage />
    </Suspense>
  );
}
