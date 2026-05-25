import type { MetadataRoute } from "next";
import { journalArticles } from "@/lib/journals";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/diets`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/journals`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/research`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/atlas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/videos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/protocol`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Journal category pages
    { url: `${SITE_URL}/journals/heart-health`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/journals/longevity`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/journals/weight-loss`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/journals/brain-health`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/journals/supplements`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/journals/gut-health`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/journals/blue-zones`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/affiliate-disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic journal article routes
  const articleRoutes: MetadataRoute.Sitemap = journalArticles.map((article) => ({
    url: `${SITE_URL}/journals/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
