// Affiliate link utility for Dietary Index
// Amazon Associates tags: US=ref-idx-20, UK=ukv08-21, DE=dev0e97-21
// iHerb via Awin: awinmid=76736, awinaffid=2873641
// ASINs sourced from vitaei.com master product file (vitaei_molecules_product_links.xlsx)

export type AffiliateRegion = 'US' | 'UK' | 'DE' | 'default';

export interface SupplementEntry {
  name: string;
  dose: string;
  note: string;
  // Real ASIN from vitaei.com master file — used for Amazon multicart
  asin: string;
  // UK ASIN (optional — falls back to US if not set)
  asinUK?: string;
  // DE ASIN (optional — falls back to US if not set)
  asinDE?: string;
  // iHerb search keyword for Awin deep link
  iherbSearchTerm: string;
}

// Amazon retailer config — matches vitaei.com exactly
const AMAZON_RETAILERS: Record<AffiliateRegion, { host: string; tag: string }> = {
  US: { host: 'www.amazon.com', tag: 'ref-idx-20' },
  UK: { host: 'www.amazon.co.uk', tag: 'ukv08-21' },
  DE: { host: 'www.amazon.de', tag: 'dev0e97-21' },
  default: { host: 'www.amazon.com', tag: 'ref-idx-20' },
};

// Supplement data — ASINs from vitaei.com master product file
export const SUPPLEMENT_PRODUCTS: Record<string, SupplementEntry[]> = {

  // ─── Omega-3 ───────────────────────────────────────────────────────────────
  'omega-3': [
    {
      name: 'Omega-3 EPA/DHA (Nordic Naturals)',
      dose: '2 g / day',
      note: 'Triglyceride form — superior absorption vs ethyl ester',
      asin: 'B075F7NNFP',
      asinUK: 'B002CQU4YW',
      asinDE: 'B00DI6CFMO',
      iherbSearchTerm: 'omega-3 epa dha fish oil',
    },
  ],

  // ─── Magnesium ─────────────────────────────────────────────────────────────
  'magnesium': [
    {
      name: 'Magnesium glycinate',
      dose: '300–400 mg / day',
      note: 'Glycinate form: highest bioavailability, gentlest on digestion',
      asin: 'B086RQVNDV',
      asinUK: 'B0CHMXLXV8',
      asinDE: 'B00DI6CFMO',
      iherbSearchTerm: 'magnesium glycinate',
    },
  ],

  // ─── Vitamin D3 ────────────────────────────────────────────────────────────
  'vitamin-d': [
    {
      name: 'Vitamin D3',
      dose: '2000–4000 IU / day',
      note: 'Take with Vitamin K2 MK-7 to direct calcium to bones, not arteries',
      asin: 'B0032BH76O',
      asinUK: 'B07TK5K5TQ',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'vitamin d3',
    },
  ],

  // ─── Vitamin K2 ────────────────────────────────────────────────────────────
  'vitamin-k2': [
    {
      name: 'Vitamin K2 MK-7',
      dose: '180 µg / day',
      note: 'MK-7 form: longer half-life than MK-4, better bone and arterial outcomes',
      asin: 'B076Y6WRKH',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'vitamin k2 mk-7',
    },
  ],

  // ─── Creatine ──────────────────────────────────────────────────────────────
  'creatine': [
    {
      name: 'Creatine monohydrate',
      dose: '5 g / day (no loading needed)',
      note: 'Most-studied form in RCTs — micronised for easy mixing',
      asin: 'B00E9M4XFI',
      asinUK: 'B0CHMXLXV8',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'creatine monohydrate',
    },
  ],

  // ─── Selenium ──────────────────────────────────────────────────────────────
  'selenium': [
    {
      name: 'Selenium (L-selenomethionine)',
      dose: '100–200 µg / day',
      note: 'Organic form with highest bioavailability — do not exceed 400 µg/day',
      asin: 'B000A2L8NQ',
      asinUK: 'B06XVHGC79',
      asinDE: 'B0C5XTSHCN',
      iherbSearchTerm: 'selenium l-selenomethionine',
    },
  ],

  // ─── Vitamin B6 ────────────────────────────────────────────────────────────
  'vitamin-b6': [
    {
      name: 'Vitamin B6 (P5P)',
      dose: '20–50 mg / day',
      note: 'P-5-P (pyridoxal-5-phosphate): active form, no conversion needed',
      asin: 'B0G35WH8LK',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'vitamin b6 p5p pyridoxal',
    },
  ],

  // ─── Iodine ────────────────────────────────────────────────────────────────
  'iodine': [
    {
      name: 'Iodine (potassium iodide)',
      dose: '150 µg / day',
      note: 'Essential for thyroid hormone synthesis — most deficient mineral globally',
      asin: 'B000OSQP3E',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'iodine potassium iodide',
    },
  ],

  // ─── Vitamin B12 ───────────────────────────────────────────────────────────
  'vitamin-b12': [
    {
      name: 'Vitamin B12 (methylcobalamin)',
      dose: '500 µg / day',
      note: 'Methylcobalamin: active form, superior neurological uptake vs cyanocobalamin',
      asin: 'B07N4JZCRZ',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'vitamin b12 methylcobalamin',
    },
  ],

  // ─── Zinc ──────────────────────────────────────────────────────────────────
  'zinc': [
    {
      name: 'Zinc bisglycinate',
      dose: '15–25 mg / day',
      note: 'Bisglycinate form: best tolerated, no nausea vs zinc oxide',
      asin: 'B00024D8N0',
      asinUK: 'B06XVHGC79',
      asinDE: 'B0C5XTSHCN',
      iherbSearchTerm: 'zinc bisglycinate',
    },
  ],

  // ─── Probiotic ─────────────────────────────────────────────────────────────
  'probiotic': [
    {
      name: 'Probiotic (multi-strain)',
      dose: '1–2 capsules / day',
      note: 'Look for clinically studied strains: Lactobacillus, Bifidobacterium',
      asin: 'B01D15LMFS',
      iherbSearchTerm: 'probiotic multi strain lactobacillus bifidobacterium',
    },
  ],

  // ─── Fibre / Psyllium ──────────────────────────────────────────────────────
  'fibre': [
    {
      name: 'Psyllium husk (soluble fibre)',
      dose: '5–10 g / day in water',
      note: 'Most evidence for LDL reduction and glycaemic control',
      asin: 'B07F88MZ4K',
      asinUK: 'B0CHMXLXV8',
      asinDE: 'B00DI6CFMO',
      iherbSearchTerm: 'psyllium husk powder fibre',
    },
  ],

  // ─── Folate ────────────────────────────────────────────────────────────────
  'folate': [
    {
      name: 'Folate (5-MTHF)',
      dose: '400 µg / day',
      note: '5-MTHF: active methylfolate form — works regardless of MTHFR gene variant',
      asin: 'B01G5EQEWC',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'methylfolate 5-mthf',
    },
  ],

  // ─── CoQ10 ─────────────────────────────────────────────────────────────────
  'coq10': [
    {
      name: 'Coenzyme Q10 (ubiquinol)',
      dose: '100–200 mg / day',
      note: 'Ubiquinol form: active, better absorbed than ubiquinone — especially for over-40s',
      asin: 'B00H4HT0EE',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'coq10 ubiquinol',
    },
  ],

  // ─── Vitamin C ─────────────────────────────────────────────────────────────
  'vitamin-c': [
    {
      name: 'Vitamin C (ascorbate)',
      dose: '500–1000 mg / day',
      note: 'Buffered form (calcium ascorbate) reduces gastric irritation at higher doses',
      asin: 'B000I4AIUA',
      asinUK: 'B06XVHGC79',
      asinDE: 'B0C5XTSHCN',
      iherbSearchTerm: 'vitamin c ascorbate buffered',
    },
  ],

  // ─── NEW: NMN ──────────────────────────────────────────────────────────────
  'nmn': [
    {
      name: 'NMN (ProHealth Uthever)',
      dose: '500–1000 mg / day',
      note: 'Uthever-grade NMN: highest purity, most studied form for NAD⁺ restoration',
      asin: 'B09JL8DS1W',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'NMN nicotinamide mononucleotide',
    },
  ],

  // ─── NEW: NR ───────────────────────────────────────────────────────────────
  'nr': [
    {
      name: 'NR — Nicotinamide Riboside (Tru Niagen)',
      dose: '300–600 mg / day',
      note: 'Tru Niagen: the original branded NR with the most clinical trials',
      asin: 'B07TK5K5TQ',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'NR nicotinamide riboside',
    },
  ],

  // ─── NEW: Spermidine ───────────────────────────────────────────────────────
  'spermidine': [
    {
      name: 'Spermidine (Primeadine)',
      dose: '1–3 mg / day',
      note: 'Primeadine: highest-purity wheat germ extract, most clinical data',
      asin: 'B0FNNBVS8F',
      asinUK: 'B0CS6CMLQ9',
      asinDE: 'B0GZLWWKBJ',
      iherbSearchTerm: 'Spermidine',
    },
  ],

  // ─── NEW: Urolithin A ──────────────────────────────────────────────────────
  'urolithin-a': [
    {
      name: 'Urolithin A (Mitopure)',
      dose: '500 mg / day',
      note: 'Mitopure: only clinically validated form — activates mitophagy (cellular cleanup)',
      asin: 'B0D7DBV5LL',
      asinUK: 'B0CYCDRNCV',
      asinDE: 'B0F5FPSDQV',
      iherbSearchTerm: 'Urolithin A',
    },
  ],

  // ─── NEW: Berberine ────────────────────────────────────────────────────────
  'berberine': [
    {
      name: 'Berberine (Thorne)',
      dose: '500 mg × 3 / day',
      note: 'AMPK activator — comparable to metformin in glucose-lowering RCTs',
      asin: 'B07PSMZ3J1',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'berberine',
    },
  ],

  // ─── NEW: Curcumin ─────────────────────────────────────────────────────────
  'curcumin': [
    {
      name: 'Curcumin (Meriva — Thorne)',
      dose: '500–1000 mg / day',
      note: 'Meriva phytosome: 29× higher bioavailability than standard curcumin',
      asin: 'B01BMDAVIY',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'curcumin meriva phytosome',
    },
  ],

  // ─── NEW: Sulforaphane ─────────────────────────────────────────────────────
  'sulforaphane': [
    {
      name: 'Sulforaphane (Avmacol)',
      dose: '30 mg / day',
      note: 'Avmacol: standardised broccoli seed extract with myrosinase enzyme for activation',
      asin: 'B0013OVTM0',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'sulforaphane broccoli seed extract',
    },
  ],

  // ─── NEW: Ashwagandha ──────────────────────────────────────────────────────
  'ashwagandha': [
    {
      name: 'Ashwagandha KSM-66 (Jarrow)',
      dose: '300–600 mg / day',
      note: 'KSM-66: highest-concentration root extract with 22+ clinical trials',
      asin: 'B00HJFR6YK',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'ashwagandha KSM-66',
    },
  ],

  // ─── NEW: L-theanine ───────────────────────────────────────────────────────
  'l-theanine': [
    {
      name: 'L-theanine (Suntheanine)',
      dose: '200 mg / day',
      note: 'Suntheanine: patented pure-form L-theanine — promotes calm focus without sedation',
      asin: 'B000H7P9M0',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'l-theanine suntheanine',
    },
  ],

  // ─── NEW: Collagen peptides ────────────────────────────────────────────────
  'collagen': [
    {
      name: 'Collagen peptides (Verisol — GELITA)',
      dose: '2.5–5 g / day',
      note: 'Verisol: only bioactive collagen peptide with RCT evidence for skin and joints',
      asin: 'B0DG32YJWV',
      asinUK: 'B0CYCDRNCV',
      asinDE: 'B0F5FPSDQV',
      iherbSearchTerm: 'collagen peptides verisol',
    },
  ],

  // ─── NEW: Choline ──────────────────────────────────────────────────────────
  'choline': [
    {
      name: 'Choline (CDP-choline / Citicoline)',
      dose: '250–500 mg / day',
      note: 'CDP-choline: most bioavailable form — crosses blood-brain barrier',
      asin: 'B09NGTHZJV',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'choline cdp-choline citicoline',
    },
  ],

  // ─── NEW: Iron ─────────────────────────────────────────────────────────────
  'iron': [
    {
      name: 'Iron bisglycinate (Thorne)',
      dose: '25 mg / day',
      note: 'Bisglycinate chelate: best tolerated iron form — no constipation or nausea',
      asin: 'B0001OP028',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'iron bisglycinate chelate',
    },
  ],

  // ─── NEW: NAC ──────────────────────────────────────────────────────────────
  'nac': [
    {
      name: 'N-acetylcysteine (Jarrow)',
      dose: '600–1800 mg / day',
      note: 'Glutathione precursor — most evidence for liver protection and antioxidant support',
      asin: 'B0BCXLBKFN',
      asinUK: 'B06XVHGC79',
      asinDE: 'B0C5XTSHCN',
      iherbSearchTerm: 'N-acetylcysteine NAC',
    },
  ],

  // ─── NEW: Alpha-lipoic acid ────────────────────────────────────────────────
  'ala': [
    {
      name: 'Alpha-lipoic acid (Doctor\'s Best)',
      dose: '300–600 mg / day',
      note: 'Both water- and fat-soluble antioxidant — regenerates vitamins C and E',
      asin: 'B0013OUMQE',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'alpha lipoic acid',
    },
  ],

  // ─── NEW: Quercetin ────────────────────────────────────────────────────────
  'quercetin': [
    {
      name: 'Quercetin phytosome (Thorne)',
      dose: '500 mg / day',
      note: 'Phytosome form: 20× better absorption than standard quercetin powder',
      asin: 'B0D4R7PTDD',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'quercetin phytosome',
    },
  ],

  // ─── NEW: Lion's Mane ──────────────────────────────────────────────────────
  'lions-mane': [
    {
      name: 'Lion\'s Mane (Real Mushrooms)',
      dose: '1–2 g / day',
      note: 'Dual-extracted: standardised for hericenones and erinacines (NGF stimulators)',
      asin: 'B07BNVWFKZ',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'lions mane mushroom extract',
    },
  ],

  // ─── NEW: Reishi ───────────────────────────────────────────────────────────
  'reishi': [
    {
      name: 'Reishi (Real Mushrooms)',
      dose: '1–2 g / day',
      note: 'Standardised for beta-glucans — most evidence for immune modulation',
      asin: 'B00FMQM8CG',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'reishi mushroom extract',
    },
  ],

  // ─── NEW: Glycine ──────────────────────────────────────────────────────────
  'glycine': [
    {
      name: 'Glycine (BulkSupplements)',
      dose: '3 g / day',
      note: 'Conditional amino acid — evidence for sleep quality and collagen synthesis',
      asin: 'B00B35A394',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'glycine powder',
    },
  ],

  // ─── NEW: Elderberry ───────────────────────────────────────────────────────
  'elderberry': [
    {
      name: 'Elderberry (Sambucol)',
      dose: '1.5 g / day',
      note: 'Sambucol: original standardised elderberry extract with clinical trial data',
      asin: 'B0BPBJ6W8T',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'elderberry extract sambucol',
    },
  ],

  // ─── NEW: Taurine ──────────────────────────────────────────────────────────
  'taurine': [
    {
      name: 'Taurine (BulkSupplements)',
      dose: '3–6 g / day',
      note: 'Conditional amino acid — 2023 Science study linked taurine depletion to ageing',
      asin: 'B00663G4ZK',
      asinUK: 'B0CHMXLXV8',
      asinDE: 'B00DI6CFMO',
      iherbSearchTerm: 'taurine powder',
    },
  ],

  // ─── NEW: Vitamin B1 (Thiamine) ────────────────────────────────────────────
  'vitamin-b1': [
    {
      name: 'Vitamin B1 — Thiamine (Thorne)',
      dose: '100 mg / day',
      note: 'Thiamine HCl: essential for energy metabolism — commonly deficient in vegans',
      asin: 'B0G35XG9Z3',
      asinUK: 'B07P5K7DQP',
      asinDE: 'B0C63L1VQ6',
      iherbSearchTerm: 'thiamine vitamin b1',
    },
  ],

  // ─── NEW: Vitamin B2 (Riboflavin) ──────────────────────────────────────────
  'vitamin-b2': [
    {
      name: 'Vitamin B2 — Riboflavin (Thorne)',
      dose: '100 mg / day',
      note: 'Riboflavin: cofactor for FAD and FMN — essential for mitochondrial function',
      asin: 'B001F0R94O',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'riboflavin vitamin b2',
    },
  ],

  // ─── NEW: Vitamin E ────────────────────────────────────────────────────────
  'vitamin-e': [
    {
      name: 'Vitamin E (mixed tocopherols)',
      dose: '200–400 IU / day',
      note: 'Mixed tocopherols: full-spectrum form — avoid dl-alpha-tocopherol (synthetic)',
      asin: 'B0001VURB0',
      asinUK: 'B0DZ7YH25Y',
      asinDE: 'B0GVPQL671',
      iherbSearchTerm: 'vitamin e mixed tocopherols',
    },
  ],

};

// Map article slugs to supplement keys
// Expanded to cover 60+ articles using the Vitaei master product file
export const ARTICLE_SUPPLEMENT_MAP: Record<string, string[]> = {

  // ─── Omega-3 ───────────────────────────────────────────────────────────────
  'omega-3-supplements-do-they-work': ['omega-3'],
  'omega-6-to-omega-3-ratio-why-it-matters': ['omega-3'],
  'does-the-mediterranean-diet-actually-work': ['omega-3', 'vitamin-d'],
  'the-anti-inflammatory-diet-what-the-evidence-says': ['omega-3', 'curcumin', 'ala'],
  'the-anti-inflammatory-diet-what-the-evidence-shows': ['omega-3', 'curcumin', 'ala'],
  'carnivore-vs-mediterranean-the-evidence': ['omega-3'],
  'the-best-diet-for-autoimmune-disease': ['omega-3', 'vitamin-d', 'probiotic'],

  // ─── Magnesium ─────────────────────────────────────────────────────────────
  'magnesium-deficiency-the-invisible-nutrient-gap': ['magnesium'],
  'how-diet-affects-sleep-quality': ['magnesium', 'l-theanine', 'glycine'],
  'does-diet-affect-mental-health': ['magnesium', 'omega-3', 'vitamin-d'],
  'the-gut-brain-axis-how-your-diet-affects-mental-health': ['magnesium', 'probiotic', 'lions-mane'],

  // ─── Vitamin D ─────────────────────────────────────────────────────────────
  'vitamin-d-deficiency-what-you-need-to-know': ['vitamin-d', 'vitamin-k2'],
  'vitamin-d-and-sunlight-how-much-do-you-need': ['vitamin-d'],
  'vitamin-d-and-sunlight-the-evidence-for-the-sunshine-vitamin': ['vitamin-d', 'vitamin-k2'],
  'does-diet-affect-fertility': ['vitamin-d', 'folate', 'zinc'],
  'the-best-diet-for-pcos': ['vitamin-d', 'magnesium', 'berberine'],

  // ─── Vitamin K2 ────────────────────────────────────────────────────────────
  'vitamin-k2-the-forgotten-vitamin': ['vitamin-k2'],
  'vitamin-k2-the-forgotten-vitamin-that-protects-your-heart-and-bones': ['vitamin-k2'],
  'is-dairy-good-or-bad-for-you': ['vitamin-k2', 'vitamin-d'],

  // ─── Creatine ──────────────────────────────────────────────────────────────
  'creatine-supplementation-the-complete-evidence-review': ['creatine'],
  'creatine-the-most-evidence-backed-supplement-you-probably-arent-taking': ['creatine'],
  'how-much-protein-do-you-need-for-muscle': ['creatine', 'glycine'],
  'how-exercise-changes-what-you-should-eat': ['creatine', 'omega-3'],
  'protein-and-ageing-how-much-do-older-adults-need': ['creatine', 'glycine', 'vitamin-d'],

  // ─── Selenium ──────────────────────────────────────────────────────────────
  'selenium-deficiency-the-forgotten-mineral': ['selenium'],
  'the-vegan-diet-what-the-evidence-shows': ['selenium', 'vitamin-b12', 'vitamin-b1', 'vitamin-b2', 'iodine', 'zinc'],
  'is-plant-based-eating-healthier-than-eating-meat': ['selenium', 'vitamin-b12', 'zinc'],

  // ─── Vitamin B6 ────────────────────────────────────────────────────────────
  'vitamin-b6-deficiency-the-overlooked-b-vitamin': ['vitamin-b6'],

  // ─── Iodine ────────────────────────────────────────────────────────────────
  'iodine-deficiency-the-silent-epidemic': ['iodine'],

  // ─── Vitamin B12 ───────────────────────────────────────────────────────────
  'vitamin-b12-deficiency-the-silent-nerve-damage': ['vitamin-b12'],
  'choline-the-essential-nutrient-most-people-are-deficient-in': ['choline', 'vitamin-b12', 'folate'],

  // ─── Zinc ──────────────────────────────────────────────────────────────────
  'zinc-deficiency-the-overlooked-mineral': ['zinc'],
  'the-gut-immune-connection-how-diet-shapes-your-immune-system': ['zinc', 'probiotic', 'vitamin-c', 'elderberry', 'reishi'],

  // ─── Gut health ────────────────────────────────────────────────────────────
  'best-foods-for-gut-health-what-the-evidence-shows': ['probiotic', 'fibre'],
  'the-gut-health-diet-what-to-eat-for-a-healthy-microbiome': ['probiotic', 'fibre'],
  'polyphenols-and-gut-health-the-evidence': ['probiotic', 'quercetin'],
  'the-gut-microbiome-and-weight-loss': ['probiotic', 'fibre'],
  'the-microbiome-diet-what-to-eat-for-gut-diversity': ['probiotic', 'fibre'],
  'why-fibre-is-the-most-underrated-nutrient': ['fibre'],
  'resistant-starch-the-forgotten-carbohydrate': ['fibre', 'probiotic'],
  'is-the-gut-microbiome-the-key-to-everything': ['probiotic', 'fibre'],
  'the-gut-liver-axis-how-diet-affects-your-liver': ['probiotic', 'nac', 'ala'],
  'the-gut-skin-axis-diet-and-acne': ['probiotic', 'zinc', 'vitamin-d'],
  'the-gut-skin-axis-how-diet-affects-acne-eczema-and-skin-health': ['probiotic', 'zinc', 'vitamin-d'],
  'the-gut-hormone-connection-how-diet-controls-hunger-and-satiety': ['probiotic', 'fibre'],

  // ─── Folate / Pregnancy ────────────────────────────────────────────────────
  'folate-and-pregnancy-the-evidence': ['folate', 'vitamin-d', 'iodine'],

  // ─── CoQ10 ─────────────────────────────────────────────────────────────────
  'coenzyme-q10-and-heart-health': ['coq10'],
  'the-portfolio-diet-the-most-underrated-diet-for-cholesterol': ['coq10', 'fibre', 'omega-3'],
  'what-is-the-dash-diet-and-does-it-lower-blood-pressure': ['coq10', 'magnesium', 'omega-3'],

  // ─── Vitamin C ─────────────────────────────────────────────────────────────
  'vitamin-c-and-immune-function': ['vitamin-c'],
  'vitamin-c-beyond-the-common-cold': ['vitamin-c'],
  'polyphenols-and-cancer-prevention': ['vitamin-c', 'quercetin', 'vitamin-e'],
  'does-organic-food-reduce-cancer-risk': ['vitamin-c', 'quercetin'],

  // ─── Longevity / NAD+ ──────────────────────────────────────────────────────
  'fasting-and-longevity-what-the-science-says': ['nmn', 'nr', 'taurine', 'spermidine'],
  'does-eating-less-help-you-live-longer': ['nmn', 'nr', 'taurine'],
  'caloric-restriction-vs-fasting-which-is-better-for-longevity': ['nmn', 'taurine', 'spermidine'],
  'the-longevity-diet-what-centenarians-actually-eat': ['nmn', 'taurine', 'spermidine', 'urolithin-a'],
  'the-best-diet-for-longevity-what-centenarians-eat-in-2025': ['nmn', 'taurine', 'spermidine', 'urolithin-a'],
  'polyphenols-and-longevity-the-evidence': ['quercetin', 'urolithin-a', 'curcumin'],
  'green-tea-and-longevity-what-the-evidence-shows': ['l-theanine', 'quercetin'],

  // ─── Spermidine ────────────────────────────────────────────────────────────
  'spermidine-and-longevity-the-autophagy-activator': ['spermidine', 'urolithin-a'],

  // ─── Sulforaphane ──────────────────────────────────────────────────────────
  'sulforaphane-the-most-evidence-backed-phytochemical': ['sulforaphane'],
  'does-red-meat-cause-cancer': ['sulforaphane', 'quercetin'],
  'does-organic-food-have-more-nutrients': ['sulforaphane'],

  // ─── Berberine / Metabolic ─────────────────────────────────────────────────
  'berberine-vs-metformin-the-evidence': ['berberine'],
  'the-best-diet-for-type-2-diabetes': ['berberine', 'magnesium', 'fibre', 'omega-3'],
  'does-fasting-reverse-type-2-diabetes': ['berberine', 'magnesium'],
  'the-glycaemic-index-does-it-actually-matter': ['berberine', 'fibre'],

  // ─── Curcumin / Anti-inflammatory ─────────────────────────────────────────
  'the-indian-diet-and-spices': ['curcumin'],

  // ─── Ashwagandha ───────────────────────────────────────────────────────────
  'ashwagandha-what-the-evidence-shows-for-stress-sleep-and-testosterone': ['ashwagandha', 'magnesium', 'l-theanine'],
  'does-diet-affect-testosterone': ['ashwagandha', 'zinc', 'vitamin-d'],

  // ─── Collagen ──────────────────────────────────────────────────────────────
  'collagen-supplements-do-they-actually-work-for-skin-joints-and-hair': ['collagen', 'vitamin-c'],
  'does-diet-affect-skin-health': ['collagen', 'vitamin-c', 'zinc', 'vitamin-e'],
  'bone-broth-superfood-or-overhyped': ['collagen', 'glycine'],

  // ─── Choline ───────────────────────────────────────────────────────────────
  'the-mind-diet-can-food-prevent-dementia': ['choline', 'omega-3', 'lions-mane', 'vitamin-d'],

  // ─── Iron ──────────────────────────────────────────────────────────────────
  'iron-deficiency-the-worlds-most-common-nutrient-deficiency': ['iron', 'vitamin-c'],

  // ─── NAC / Alcohol ─────────────────────────────────────────────────────────
  'does-alcohol-cause-cancer': ['nac'],
  'is-alcohol-bad-for-you-what-the-evidence-says': ['nac'],

  // ─── Sleep ─────────────────────────────────────────────────────────────────
  'does-eating-at-night-cause-weight-gain': ['magnesium', 'l-theanine'],

  // ─── Coffee ────────────────────────────────────────────────────────────────
  'is-coffee-good-or-bad-for-you': ['l-theanine'],
  'does-coffee-cause-cancer-what-the-evidence-shows': ['l-theanine'],

};

// Map ISO 3166-1 alpha-2 country code -> affiliate region
export function countryToRegion(country: string): AffiliateRegion {
  const c = country.toUpperCase();
  if (['DE', 'AT', 'CH', 'LU', 'LI'].includes(c)) return 'DE';
  if (['GB', 'IE'].includes(c)) return 'UK';
  return 'US';
}

// Detect user region from browser locale / timezone (client-side fallback)
// For accurate detection, call /api/geo and use countryToRegion()
export function detectRegion(): AffiliateRegion {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language || '';
    if (tz.startsWith('Europe/') && (lang.startsWith('de') || tz.includes('Berlin') || tz.includes('Vienna') || tz.includes('Zurich'))) return 'DE';
    if (tz.startsWith('Europe/') || lang.startsWith('en-GB') || tz.includes('London') || tz.includes('Dublin')) return 'UK';
    return 'US';
  } catch {
    return 'US';
  }
}

// Build Amazon single-product URL with ASIN (direct product page)
// Uses region-specific ASIN if available, falls back to US ASIN
export function buildAmazonUrl(product: SupplementEntry, region: AffiliateRegion): string {
  const { host, tag } = AMAZON_RETAILERS[region];
  const asin = (region === 'UK' && product.asinUK) ? product.asinUK
    : (region === 'DE' && product.asinDE) ? product.asinDE
    : product.asin;
  return `https://${host}/dp/${asin}?tag=${tag}`;
}

// Build Amazon multicart URL for multiple items — matches vitaei.com exactly
// Format: https://www.amazon.com/gp/aws/cart/add.html?ASIN.1=xxx&Quantity.1=1&AssociateTag=ref-idx-20
export function buildAmazonMulticartUrl(
  items: Array<{ asin: string; quantity?: number }>,
  region: AffiliateRegion
): string {
  const { host, tag } = AMAZON_RETAILERS[region];
  const params = new URLSearchParams();
  params.set('AssociateTag', tag);
  params.set('tag', tag);
  items.forEach((item, idx) => {
    const n = idx + 1;
    params.set(`ASIN.${n}`, item.asin);
    params.set(`Quantity.${n}`, String(Math.max(1, Math.floor(item.quantity ?? 1))));
  });
  return `https://${host}/gp/aws/cart/add.html?${params.toString()}`;
}

// Build iHerb URL via Awin affiliate network — matches vitaei.com kq() function exactly
export function buildIherbUrl(product: SupplementEntry): string {
  const iherbBase = `https://www.iherb.com/search?kw=${encodeURIComponent(product.iherbSearchTerm)}`;
  const encoded = encodeURIComponent(iherbBase);
  return `https://www.awin1.com/cread.php?awinmid=76736&awinaffid=2873641&ued=${encoded}`;
}
