import Seo from "@/components/Seo";
import { Link } from "@/lib/wouter-shim";

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Seo
        title="Affiliate Disclosure — Dietary Index"
        description="Dietary Index participates in the Amazon Associates programme. We only link to supplements directly supported by the evidence cited in our articles."
        noIndex={false}
      />
      <div className="container max-w-2xl py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10">
          <Link href="/" className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
            Dietary Index
          </Link>
          <span className="text-muted-foreground/30 text-[10px]">/</span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
            Affiliate Disclosure
          </span>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight mb-2">Affiliate Disclosure</h1>
        <p className="text-[11px] font-mono text-muted-foreground mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm prose-stone max-w-none space-y-6 text-[14px] leading-relaxed text-foreground/80">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">Amazon Associates</h2>
            <p>
              Dietary Index participates in the Amazon Associates Programme, an affiliate advertising
              programme designed to provide a means for sites to earn advertising fees by advertising
              and linking to Amazon. We operate affiliate accounts for the United States
              (<code className="text-xs bg-muted px-1 py-0.5 rounded">ref-idx-20</code>),
              United Kingdom (<code className="text-xs bg-muted px-1 py-0.5 rounded">ukv08-21</code>),
              and Germany (<code className="text-xs bg-muted px-1 py-0.5 rounded">dev0e97-21</code>).
            </p>
            <p className="mt-3">
              When you click an affiliate link and purchase a product, we may earn a small commission.
              This does not increase the price you pay.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">Our Selection Policy</h2>
            <p>
              We only include affiliate links to supplements that are <strong>directly supported by
              the evidence cited in the article</strong> in which they appear. We do not link to
              products in articles where the evidence does not support supplementation, and we do not
              accept payment from supplement companies for inclusion or positive coverage.
            </p>
            <p className="mt-3">
              Product selection criteria:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-[13px]">
              <li>Third-party tested for purity and label accuracy (NSF, USP, or Informed Sport certification preferred)</li>
              <li>Active form of the nutrient (e.g. methylcobalamin over cyanocobalamin for B12; P-5-P over pyridoxine for B6)</li>
              <li>Clean formulation — no unnecessary fillers, artificial colours, or proprietary blends</li>
              <li>Consistent with the dose range used in the cited randomised controlled trials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">Geo-targeting</h2>
            <p>
              Affiliate links are automatically directed to the Amazon store most relevant to your
              location (US, UK, or Germany) based on your browser's timezone and language settings.
              If you are redirected to the wrong store, you can search for the product directly on
              your local Amazon.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">Editorial Independence</h2>
            <p>
              Affiliate commissions do not influence our editorial positions. Our evidence tiers,
              verdicts, and article conclusions are determined solely by the quality and weight of
              the published human trial evidence. A supplement can appear in an affiliate section
              only if the article's own evidence review supports its use — not the other way around.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">Questions</h2>
            <p>
              If you have questions about our affiliate relationships or would like to report a
              concern, please contact us at{" "}
              <a
                href="mailto:disclosures@dietaryindex.com"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                disclosures@dietaryindex.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Dietary Index
          </Link>
        </div>
      </div>
    </>
  );
}
