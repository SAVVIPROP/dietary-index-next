import type { Metadata } from "next";
import { journalArticles } from "@/lib/journals";
import { SITE_URL } from "@/lib/seo";
import ArticlePageClient from "./ArticlePageClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) {
    return { title: "Article Not Found | Dietary Index" };
  }
  return {
    title: `${article.title} | Dietary Index`,
    description: article.summary,
    alternates: { canonical: `${SITE_URL}/journals/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: `${SITE_URL}/journals/${slug}`,
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ArticlePageClient slug={slug} />;
}
