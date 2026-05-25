"use client";
// Home — Dietary Index main page
// Design: Light scientific editorial, follows vitaei.com aesthetic
// Sections: Hero → Science → Frameworks → Research → Index → Atlas → Glossary → Methodology → Journals → Footer

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ScienceSection from "@/components/ScienceSection";
import FrameworksSection from "@/components/FrameworksSection";
import ResearchSection from "@/components/ResearchSection";
import IndexSection from "@/components/IndexSection";
import AtlasSection from "@/components/AtlasSection";
import GlossarySection from "@/components/GlossarySection";
import MethodologySection from "@/components/MethodologySection";
import JournalsSection from "@/components/JournalsSection";
import VideoChannelStrip from "@/components/VideoChannelStrip";
import Seo from "@/components/Seo";
import { websiteSchema, organizationSchema, SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";

// Combined JSON-LD: WebSite + Organization on the homepage
const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [websiteSchema(), organizationSchema()],
};

export default function Home() {
  // After navigating from another page, scroll to the requested section
  useEffect(() => {
    const hash = sessionStorage.getItem("scrollToSection");
    if (hash) {
      sessionStorage.removeItem("scrollToSection");
      // Wait for sections to render before scrolling
      const attempt = (tries: number) => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 150);
        }
      };
      setTimeout(() => attempt(10), 100);
    }
  }, []);

  return (
    <>
      <Seo
        title="Evidence-Based Dietary Science"
        description={SITE_DESCRIPTION}
        canonical={SITE_URL}
        ogType="website"
        tags={[
          "dietary index", "evidence-based nutrition", "diet science", "Mediterranean diet",
          "DASH diet", "intermittent fasting", "nutrition research", "diet comparison",
          "health outcomes", "clinical trials", "dietary patterns", "AHA diet score",
        ]}
        jsonLd={homepageJsonLd}
      />
      <main>
        <HeroSection />
        <ScienceSection />
        <FrameworksSection />
        <ResearchSection />
        <IndexSection />
        <AtlasSection />
        <GlossarySection />
        <MethodologySection />
        <JournalsSection />
        <VideoChannelStrip />
      </main>
    </>
  );
}
