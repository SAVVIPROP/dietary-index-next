"use client";
import dynamic from "next/dynamic";
const ArticlePage = dynamic(() => import("../../../page-components/ArticlePage"), { ssr: false });
export default function ArticlePageClient({ slug }: { slug: string }) {
  return <ArticlePage />;
}
