// GlossaryPage — dedicated route for /glossary
import GlossarySection from "@/components/GlossarySection";
import Seo from "@/components/Seo";

export default function GlossaryPage() {
  return (
    <>
      <Seo
        title="Glossary — Key Nutrition Science Terms Defined"
        description="Plain-language definitions of the key terms used in nutrition science, clinical trials, and dietary research. Each definition linked to its primary source."
        canonical="/glossary"
      />

      <main className="pt-14">
        <div className="container py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">§ 06</span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-3 mb-4 leading-tight"
          >
            Key Concepts
          </h1>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Nutrition science is dense with jargon. Each definition below is linked to the primary source from which it derives. Plain language, precise meaning.
          </p>
        </div>
        <GlossarySection />
      </main>

    </>
  );
}
