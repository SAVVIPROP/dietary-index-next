// ============================================================
// DIETARY INDEX — SEO Configuration
// World-class SEO: meta, OG, Twitter Card, JSON-LD, canonical
// ============================================================

export const SITE_NAME = "Dietary Index";
export const SITE_URL = "https://dietaryindex.com";
export const SITE_DESCRIPTION =
  "A scientific index of dietary patterns — scored by evidence tier, mapped to eight health outcome domains, and cross-referenced with peer-reviewed research.";
export const SITE_TWITTER = "@dietaryindex";
export const DEFAULT_OG_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ozmBmiAJLxvMUGXo.png";

export interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
  jsonLd?: object;
}

export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) return `${SITE_NAME} — Evidence-Based Dietary Science`;
  return `${pageTitle} | ${SITE_NAME}`;
}

// ─── JSON-LD Schemas ─────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
}

export function articleSchema({
  title,
  description,
  slug,
  publishedTime,
  tags,
  refs,
}: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  tags: string[];
  refs: { authors: string; title: string; journal: string; year: number; doi: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/journals/${slug}`,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    keywords: tags.join(", "),
    citation: refs.map(r => ({
      "@type": "ScholarlyArticle",
      name: r.title,
      author: r.authors,
      isPartOf: { "@type": "Periodical", name: r.journal },
      datePublished: String(r.year),
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: r.doi },
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/journals/${slug}`,
    },
  };
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
