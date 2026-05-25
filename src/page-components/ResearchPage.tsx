// ResearchPage — dedicated route for /research
import ResearchSection from "@/components/ResearchSection";
import Seo from "@/components/Seo";

export default function ResearchPage() {
  return (
    <>
      <Seo
        title="Research Desk — Primary Sources & Trial Database"
        description="The primary literature behind the Dietary Index. Browse the trial database, source journals, and the evidence hierarchy that underpins every diet score."
        canonical="/research"
      />

      <main className="pt-14">
        <div className="container py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 03</span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-3 mb-4 leading-tight"
          >
            The Research Desk
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Every claim on this site traces back to a peer-reviewed source. Browse the primary literature, trial counts by journal, and the evidence hierarchy that underpins every diet score and article.
          </p>
        </div>
        <ResearchSection />
      </main>

    </>
  );
}
