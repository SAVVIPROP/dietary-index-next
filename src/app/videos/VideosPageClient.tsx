"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const VideosPage = dynamic(() => import("../../page-components/VideosPage"), { ssr: false });

export default function VideosPageClient() {
  return (
    <Suspense fallback={null}>
      <VideosPage />
    </Suspense>
  );
}
