"use client";
import dynamic from "next/dynamic";
const VideosPage = dynamic(() => import("../../page-components/VideosPage"), { ssr: false });
export default function VideosPageClient() {
  return <VideosPage />;
}
