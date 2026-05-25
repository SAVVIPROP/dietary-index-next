"use client";
import dynamic from "next/dynamic";
const NotFound = dynamic(() => import("../page-components/NotFound"), { ssr: false });
export default function NotFoundPage() {
  return <NotFound />;
}
