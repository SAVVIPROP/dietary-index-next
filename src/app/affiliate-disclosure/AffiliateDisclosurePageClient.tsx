"use client";
import dynamic from "next/dynamic";
const AffiliateDisclosurePage = dynamic(() => import("../../page-components/AffiliateDisclosurePage"), { ssr: false });
export default function AffiliateDisclosurePageClient() {
  return <AffiliateDisclosurePage />;
}
