// AtlasPage — dedicated route for /atlas
import AtlasSection from "@/components/AtlasSection";
import Seo from "@/components/Seo";

export default function AtlasPage() {
  return (
    <>
      <Seo
        title="Diet Atlas — Global Dietary Patterns by Region"
        description="Explore how dietary patterns vary across regions and cultures worldwide. A geographic map of human nutrition, cross-referenced with health outcome data."
        canonical="/atlas"
      />

      <main className="pt-14">
        <div className="container py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 05</span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-3 mb-4 leading-tight"
          >
            The Diet Atlas
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            A geographic survey of how dietary patterns vary by region, culture, and population. Cross-referenced with longevity data, disease burden, and food availability.
          </p>
        </div>
        <AtlasSection />
      </main>

    </>
  );
}
