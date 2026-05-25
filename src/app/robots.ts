import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/cart", "/build", "/api/"],
      },
    ],
    sitemap: "https://dietaryindex.com/sitemap.xml",
  };
}
