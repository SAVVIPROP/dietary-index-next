import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const dynamic = "force-dynamic";

const OG_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ozmBmiAJLxvMUGXo.png";

export const metadata: Metadata = {
  title: {
    default: "Dietary Index — Evidence-Based Dietary Science",
    template: "%s | Dietary Index",
  },
  description:
    "A scientific index of dietary patterns — scored by evidence tier, mapped to eight health outcome domains, and cross-referenced with peer-reviewed research.",
  keywords: [
    "dietary index",
    "evidence-based nutrition",
    "Mediterranean diet",
    "DASH diet",
    "intermittent fasting",
    "diet science",
    "nutrition research",
    "diet comparison",
    "health outcomes",
  ],
  authors: [{ name: "Dietary Index" }],
  applicationName: "Dietary Index",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Dietary Index",
    title: "Dietary Index — Evidence-Based Dietary Science",
    description:
      "A scientific index of dietary patterns — scored by evidence tier, mapped to eight health outcome domains, and cross-referenced with peer-reviewed research.",
    url: "https://dietaryindex.com",
    locale: "en_GB",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Dietary Index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dietaryindex",
    title: "Dietary Index — Evidence-Based Dietary Science",
    description:
      "A scientific index of dietary patterns — scored by evidence tier, mapped to eight health outcome domains, and cross-referenced with peer-reviewed research.",
    images: [OG_IMAGE],
  },
  themeColor: "#fafaf9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="color-scheme" content="light" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
