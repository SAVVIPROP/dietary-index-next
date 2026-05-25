// MethodologyPage — dedicated route for /methodology
import MethodologySection from "@/components/MethodologySection";
import Seo from "@/components/Seo";

export default function MethodologyPage() {
  return (
    <>
      <Seo
        title="Methodology — How We Score Diets & Assign Evidence Tiers"
        description="The pre-specified scoring methodology behind the Dietary Index. How evidence tiers are assigned, what study designs qualify, and what we exclude."
        canonical="/methodology"
      />

      <main className="pt-14">
        <div className="container py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 07</span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-3 mb-4 leading-tight"
          >
            Methodology
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            How we score. What we include. What we exclude. The Dietary Index applies a pre-specified scoring methodology to every dietary pattern, with evidence tier assignment following a strict hierarchy based on study design quality, sample size, and consistency of results.
          </p>
        </div>
        <MethodologySection />
      </main>

    </>
  );
}
