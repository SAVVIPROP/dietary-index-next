// DietsPage — dedicated route for /diets
// Renders the full Diet Index section as a standalone page
import IndexSection from "@/components/IndexSection";
import Seo from "@/components/Seo";

export default function DietsPage() {
  return (
    <>
      <Seo
        title="Diet Index — Evidence-Ranked Dietary Patterns"
        description="Browse all 15+ dietary patterns ranked by evidence tier across eight health outcome domains. Each diet scored by RCT weight, meta-analysis depth, and outcome breadth."
        canonical="/diets"
      />

      <main className="pt-14">
        <div className="container py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 04</span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-3 mb-4 leading-tight"
          >
            The Diet Index
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Every major dietary pattern, scored across eight health outcome domains and ranked by evidence tier. Each entry is assigned a tier based on human trial weight, mapped to health outcomes, and cross-referenced with peer-reviewed sources.
          </p>
        </div>
        <IndexSection />
      </main>

    </>
  );
}
