import type { Metadata } from "next";
import { journalArticles } from "@/lib/journals";
import { SITE_URL, articleSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
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
    description: article.intro.slice(0, 160),
    alternates: { canonical: `${SITE_URL}/journals/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.intro.slice(0, 160),
      url: `${SITE_URL}/journals/${slug}`,
      publishedTime: article.publishDate,
      tags: article.tags,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  // Build JSON-LD server-side for Google indexing
  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@graph": [
          articleSchema({
            title: article.title,
            description: article.intro.slice(0, 160),
            slug: article.slug,
            publishedTime: article.publishDate,
            tags: article.tags,
            refs: article.refs,
          }),
          breadcrumbSchema([
            { name: "Dietary Index", url: SITE_URL },
            { name: "Journals & Guides", url: `${SITE_URL}/journals` },
            { name: article.category, url: `${SITE_URL}/journals` },
            { name: article.title, url: `${SITE_URL}/journals/${article.slug}` },
          ]),
          faqSchema([
            {
              question: article.title,
              answer: article.verdict,
            },
            ...article.sections
              .filter((s) => s.callout)
              .slice(0, 5)
              .map((s) => ({
                question: s.heading,
                answer: s.callout!.text,
              })),
          ]),
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <ArticlePageClient slug={slug} />
    </>
  );
}
