// ============================================================
// DIETARY INDEX — Journal Articles Data
// 90 evidence-based guides: dietary myths + cultural longevity
// ============================================================

import type { EvidenceTier } from "./data";
import { newJournalArticles } from "./journals_new";
import { batch2JournalArticles } from "./journals_batch2";
import { batch3JournalArticles } from "./journals_batch3";
import { batch4JournalArticles } from "./journals_batch4";
import { batch5JournalArticles } from "./journals_batch5";
import { batch6JournalArticles } from "./journals_batch6";
import { batch7JournalArticles } from './journals_batch7';
import { batch8JournalArticles } from './journals_batch8';
import { batch9JournalArticles } from './journals_batch9';
import { journalsBatch10 } from './journals_batch10';
import { journalsBatch11 } from './journals_batch11';

export interface JournalRef {
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
}

export interface JournalSection {
  heading: string;
  body: string;
  callout?: { type: "verdict" | "myth" | "fact" | "warning"; text: string };
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tier: EvidenceTier;
  readTime: string;
  publishDate: string;
  searchVolume: string;
  verdict: string;
  verdictShort: "Myth" | "Mostly Myth" | "Partly True" | "Mostly True" | "True" | "Nuanced";
  tags: string[];
  intro: string;
  sections: JournalSection[];
  keyTakeaways: string[];
  refs: JournalRef[];
}

export const journalArticles: JournalArticle[] = [
  // ─── 1 ───────────────────────────────────────────────────
  {
    id: "1",
    slug: "does-eating-fat-make-you-fat",
    title: "Does Eating Fat Make You Fat?",
    subtitle: "The low-fat era is over. Here is what the evidence actually says about dietary fat and body weight.",
    category: "Myths Debunked",
    tier: "I",
    readTime: "8 min",
    publishDate: "2025-04-01",
    searchVolume: "1.2M searches/mo",
    verdict: "Dietary fat does not cause weight gain in isolation. Total caloric balance, food quality, and macronutrient composition all matter more than fat content alone. The low-fat hypothesis of the 1980s was not supported by subsequent large-scale RCTs.",
    verdictShort: "Myth",
    tags: ["Fat", "Weight Loss", "Macronutrients", "Low-Fat"],
    intro: "For three decades, dietary fat was public health enemy number one. Food manufacturers stripped fat from everything — and replaced it with sugar. The result was an obesity epidemic, not its cure. The question 'does fat make you fat?' is one of the most Googled nutrition questions on Earth, and the answer from the evidence is clear: no, not inherently.",
    sections: [
      {
        heading: "Where the myth came from",
        body: "The fat-makes-you-fat hypothesis originated in the 1950s with Ancel Keys' Seven Countries Study, which found a correlation between saturated fat intake and heart disease mortality. The study was later criticised for cherry-picking data from 22 available countries. Nevertheless, the US government adopted a low-fat dietary guideline in 1980, and the food industry followed. By the 1990s, low-fat products dominated supermarket shelves — but obesity rates continued to climb.",
        callout: { type: "myth", text: "\"Fat is fattening because it has 9 kcal/g, more than carbs or protein.\" — This ignores satiety, hormonal effects, and total dietary context." }
      },
      {
        heading: "What the RCTs actually show",
        body: "The Women's Health Initiative (WHI) — the largest dietary RCT ever conducted, with 48,835 participants followed for 8.1 years — found that a low-fat diet produced no significant reduction in body weight compared to a control diet. The PREDIMED trial demonstrated that a Mediterranean diet high in fat (from olive oil and nuts) reduced cardiovascular events by 30% versus a low-fat control. A 2020 meta-analysis in The Lancet (n=73,589) found no significant difference in weight loss between low-fat and low-carbohydrate diets at 12 months.",
        callout: { type: "fact", text: "The WHI trial (n=48,835, 8.1 years) found no significant weight difference between low-fat and control diets. Fat restriction alone does not drive weight loss." }
      },
      {
        heading: "Fat type matters enormously",
        body: "The evidence consistently distinguishes between fat types. Unsaturated fats — monounsaturated (olive oil, avocado) and polyunsaturated (oily fish, walnuts) — are associated with reduced cardiovascular risk and improved metabolic markers. Trans fats (partially hydrogenated oils) are unambiguously harmful and have been largely banned. Saturated fat occupies a more nuanced position: replacing saturated fat with refined carbohydrates does not improve cardiovascular outcomes, but replacing it with unsaturated fats does.",
      },
      {
        heading: "The carbohydrate-insulin model",
        body: "One competing framework — the carbohydrate-insulin model (CIM) — proposes that dietary fat is uniquely non-fattening because it does not stimulate insulin secretion. Insulin promotes fat storage; therefore, high-carbohydrate diets should cause more fat gain than high-fat diets at equal calories. While the CIM has mechanistic support, controlled feeding studies (Hall et al., Cell Metabolism, 2015) found that isocaloric low-fat diets produced slightly more fat loss than low-carb diets over 6 days, contradicting the strong form of the CIM.",
        callout: { type: "verdict", text: "The evidence supports a nuanced view: fat quality matters, total calories matter, and the low-fat hypothesis was not supported by the largest RCTs ever conducted." }
      },
    ],
    keyTakeaways: [
      "Dietary fat does not cause weight gain in isolation — total caloric balance is the primary driver.",
      "The Women's Health Initiative (n=48,835) found no weight benefit from a low-fat diet over 8 years.",
      "Unsaturated fats (olive oil, oily fish, nuts) are associated with cardiovascular benefit.",
      "Replacing saturated fat with refined carbohydrates does not improve health outcomes.",
      "Fat type matters far more than fat quantity.",
    ],
    refs: [
      { authors: "Howard BV et al.", title: "Low-fat dietary pattern and weight change over 7 years: the Women's Health Initiative Dietary Modification Trial.", journal: "JAMA", year: 2006, doi: "10.1001/jama.295.1.39" },
      { authors: "Estruch R et al.", title: "Primary Prevention of Cardiovascular Disease with a Mediterranean Diet.", journal: "NEJM", year: 2018, doi: "10.1056/NEJMoa1800389" },
      { authors: "Tobias DK et al.", title: "Effect of low-fat diet interventions versus other diet interventions on long-term weight change in adults: a systematic review and meta-analysis.", journal: "Lancet Diabetes Endocrinol", year: 2015, doi: "10.1016/S2213-8587(15)00367-8" },
      { authors: "Hall KD et al.", title: "Calorie for calorie, dietary fat restriction results in more body fat loss than carbohydrate restriction in people with obesity.", journal: "Cell Metabolism", year: 2015, doi: "10.1016/j.cmet.2015.07.021" },
    ],
  },

  // ─── 2 ───────────────────────────────────────────────────
  {
    id: "2",
    slug: "is-breakfast-the-most-important-meal",
    title: "Is Breakfast the Most Important Meal of the Day?",
    subtitle: "A marketing slogan from 1944 became dietary gospel. The RCTs tell a different story.",
    category: "Myths Debunked",
    tier: "I",
    readTime: "7 min",
    publishDate: "2025-04-08",
    searchVolume: "890K searches/mo",
    verdict: "Breakfast is not inherently the most important meal of the day. Whether eating breakfast benefits health depends on individual chronotype, metabolic status, and overall dietary pattern. Skipping breakfast is not harmful for most healthy adults.",
    verdictShort: "Mostly Myth",
    tags: ["Breakfast", "Intermittent Fasting", "Meal Timing", "Metabolism"],
    intro: "The phrase 'breakfast is the most important meal of the day' was coined in a 1944 Grape-Nuts cereal advertisement. It became nutritional orthodoxy. But when researchers actually tested it in randomised controlled trials, the evidence was far less convincing than the marketing.",
    sections: [
      {
        heading: "The origin of the claim",
        body: "The breakfast myth has two origins: a 1944 cereal advertisement by Grape-Nuts, and a series of observational studies from the 1960s–1990s that found breakfast eaters had lower BMI and better cognitive performance. The problem with these studies is confounding: people who eat breakfast also tend to have healthier overall lifestyles, sleep better, and exercise more. Correlation was mistaken for causation.",
        callout: { type: "myth", text: "\"Skipping breakfast slows your metabolism.\" — No RCT evidence supports this. Metabolic rate is not meaningfully affected by meal timing in healthy adults." }
      },
      {
        heading: "What the RCTs show",
        body: "A 2019 systematic review and meta-analysis in the BMJ (13 RCTs, n=1,261) found that breakfast consumption was associated with slightly higher daily caloric intake and slightly higher body weight compared to breakfast skipping — the opposite of the conventional wisdom. A landmark 2016 RCT by Betts et al. (n=33) found no significant effect of breakfast on resting metabolic rate, physical activity, or body composition over 6 weeks in lean adults.",
        callout: { type: "fact", text: "A 2019 BMJ meta-analysis (13 RCTs) found breakfast eaters consumed more calories and weighed slightly more than breakfast skippers." }
      },
      {
        heading: "When breakfast does matter",
        body: "The evidence is more supportive of breakfast in specific populations. Children and adolescents show consistent cognitive and academic performance benefits from eating breakfast, likely due to glucose availability during school hours. People with type 2 diabetes may benefit from breakfast to stabilise morning blood glucose. Athletes with morning training sessions have clear performance reasons to eat before exercise.",
      },
      {
        heading: "Meal timing and circadian biology",
        body: "Emerging evidence from chronobiology suggests that meal timing relative to circadian rhythm matters more than whether breakfast is eaten. Eating earlier in the day — aligning food intake with peak insulin sensitivity in the morning — may offer metabolic advantages. A 2018 Cell Metabolism RCT found that early time-restricted eating (eating all food before 3pm) improved insulin sensitivity, blood pressure, and oxidative stress independently of weight loss.",
        callout: { type: "verdict", text: "Breakfast matters for children, athletes, and people with diabetes. For healthy adults, skipping breakfast is not harmful and may support weight management." }
      },
    ],
    keyTakeaways: [
      "The 'most important meal' claim originated in a 1944 cereal advertisement, not science.",
      "A 2019 BMJ meta-analysis found breakfast eaters consumed more calories and weighed slightly more.",
      "Breakfast benefits are clearest in children, athletes, and people with type 2 diabetes.",
      "Circadian alignment (eating earlier in the day) may matter more than whether breakfast is eaten.",
      "Skipping breakfast is a form of time-restricted eating and is not harmful for most healthy adults.",
    ],
    refs: [
      { authors: "Sievert K et al.", title: "Effect of breakfast on weight and energy intake: systematic review and meta-analysis of randomised controlled trials.", journal: "BMJ", year: 2019, doi: "10.1136/bmj.l42" },
      { authors: "Betts JA et al.", title: "The causal role of breakfast in energy balance and health: a randomized controlled trial in lean adults.", journal: "Am J Clin Nutr", year: 2014, doi: "10.3945/ajcn.114.083402" },
      { authors: "Sutton EF et al.", title: "Early time-restricted feeding improves insulin sensitivity, blood pressure, and oxidative stress even without weight loss in men with prediabetes.", journal: "Cell Metabolism", year: 2018, doi: "10.1016/j.cmet.2018.04.010" },
    ],
  },

  // ─── 3 ───────────────────────────────────────────────────
  {
    id: "3",
    slug: "does-red-meat-cause-cancer",
    title: "Does Red Meat Cause Cancer?",
    subtitle: "The WHO classified processed meat as a Group 1 carcinogen. What does that actually mean?",
    category: "Cancer & Diet",
    tier: "I",
    readTime: "10 min",
    publishDate: "2025-04-15",
    searchVolume: "760K searches/mo",
    verdict: "Processed red meat (bacon, sausage, deli meats) is a confirmed Group 1 carcinogen for colorectal cancer. Unprocessed red meat is classified Group 2A (probably carcinogenic). The absolute risk increase is modest: approximately 18% relative risk increase per 50g/day of processed meat, translating to about 6 additional colorectal cancer cases per 100,000 people per year.",
    verdictShort: "Mostly True",
    tags: ["Red Meat", "Cancer", "Colorectal", "WHO", "Processed Meat"],
    intro: "In 2015, the World Health Organisation's International Agency for Research on Cancer (IARC) classified processed meat as a Group 1 carcinogen — the same category as tobacco and asbestos. The headlines were alarming. But the classification system measures certainty of evidence, not magnitude of risk. Here is what the data actually shows.",
    sections: [
      {
        heading: "Understanding the IARC classification",
        body: "IARC Group 1 means there is sufficient evidence that the substance causes cancer in humans — not that it is as dangerous as tobacco. The classification is based on the strength of evidence, not the size of the risk. Tobacco causes approximately 85% of lung cancers. Processed meat is associated with an 18% relative risk increase in colorectal cancer — a very different magnitude of harm.",
        callout: { type: "fact", text: "IARC Group 1 measures certainty of evidence, not magnitude of risk. Processed meat and tobacco are both Group 1, but their absolute risks are vastly different." }
      },
      {
        heading: "The absolute risk numbers",
        body: "The IARC working group estimated that eating 50g of processed meat daily — roughly two slices of bacon — increases the lifetime risk of colorectal cancer by approximately 18% relative risk. In absolute terms, this translates from a baseline lifetime risk of 5% to approximately 5.9% — an absolute increase of 0.9 percentage points. For unprocessed red meat (beef, pork, lamb), the evidence is classified as 'limited' — Group 2A — based primarily on observational data.",
        callout: { type: "myth", text: "\"Red meat is as dangerous as smoking.\" — The relative risk increase from processed meat (18%) is not comparable to smoking's 2,500% relative risk increase for lung cancer." }
      },
      {
        heading: "Proposed biological mechanisms",
        body: "Several mechanisms have been proposed. Haem iron in red meat may promote the formation of N-nitroso compounds in the gut, which can damage DNA. Cooking meat at high temperatures (grilling, frying) produces heterocyclic amines (HCAs) and polycyclic aromatic hydrocarbons (PAHs), both of which are mutagens. Nitrites used to preserve processed meats form nitrosamines in the gut. The gut microbiome may also mediate some of the association.",
      },
      {
        heading: "Context: overall dietary pattern",
        body: "The association between red meat and cancer risk is substantially modified by overall dietary pattern. In the context of a Mediterranean or high-fibre diet, the association is attenuated. A 2022 analysis of UK Biobank data (n=472,377) found that the association between red meat and colorectal cancer was largely explained by low fibre intake — people who ate red meat alongside high-fibre diets had substantially lower risk than those who ate red meat with low-fibre diets.",
        callout: { type: "verdict", text: "Processed red meat is a confirmed colorectal carcinogen, but the absolute risk increase is modest. Unprocessed red meat in moderation, within a high-fibre diet, carries substantially lower risk." }
      },
    ],
    keyTakeaways: [
      "Processed meat (bacon, sausage, deli meats) is a confirmed Group 1 carcinogen for colorectal cancer.",
      "The absolute risk: 50g/day of processed meat increases lifetime colorectal cancer risk by ~0.9 percentage points.",
      "Unprocessed red meat is Group 2A — probable carcinogen — based on limited observational evidence.",
      "IARC Group 1 measures certainty of evidence, not magnitude of risk — it is not comparable to tobacco.",
      "High dietary fibre substantially attenuates the association between red meat and colorectal cancer.",
    ],
    refs: [
      { authors: "Bouvard V et al. (IARC Working Group)", title: "Carcinogenicity of consumption of red and processed meat.", journal: "Lancet Oncology", year: 2015, doi: "10.1016/S1470-2045(15)00444-1" },
      { authors: "Zhao Z et al.", title: "Red and processed meat consumption and colorectal cancer risk: a systematic review and meta-analysis.", journal: "Oncotarget", year: 2017, doi: "10.18632/oncotarget.13959" },
      { authors: "Bradbury KE et al.", title: "Diet and colorectal cancer in UK Biobank: a prospective study.", journal: "Int J Epidemiol", year: 2020, doi: "10.1093/ije/dyaa152" },
    ],
  },

  // ─── 4 ───────────────────────────────────────────────────
  {
    id: "4",
    slug: "how-much-protein-do-you-need",
    title: "How Much Protein Do You Actually Need?",
    subtitle: "The RDA is a minimum, not an optimum. Evidence-based targets for muscle, longevity, and metabolic health.",
    category: "Nutrition Science",
    tier: "I",
    readTime: "9 min",
    publishDate: "2025-04-22",
    searchVolume: "2.1M searches/mo",
    verdict: "The RDA of 0.8g/kg/day is a minimum to prevent deficiency, not an optimum for health. For muscle maintenance, metabolic health, and satiety, the evidence supports 1.2–1.6g/kg/day for most adults. Older adults (>65) benefit from 1.6–2.0g/kg/day to counteract sarcopenia.",
    verdictShort: "Nuanced",
    tags: ["Protein", "Muscle", "Sarcopenia", "RDA", "Longevity"],
    intro: "Protein is the most searched macronutrient on the internet, and for good reason — it is central to muscle building, satiety, metabolic rate, and longevity. The official RDA of 0.8g per kilogram of body weight per day is widely misunderstood as a target. It is actually a minimum threshold to prevent deficiency. The evidence for optimal protein intake tells a substantially different story.",
    sections: [
      {
        heading: "The RDA is not a target",
        body: "The RDA of 0.8g/kg/day was established to meet the needs of 97.5% of the population and prevent nitrogen deficiency. It was never intended to represent an optimal intake for muscle maintenance, metabolic health, or longevity. A 2016 meta-analysis of 49 RCTs (Morton et al., British Journal of Sports Medicine) found that protein supplementation significantly increased muscle mass and strength in resistance-trained individuals up to approximately 1.62g/kg/day, beyond which additional protein produced no further benefit.",
        callout: { type: "fact", text: "The RDA of 0.8g/kg/day prevents deficiency in 97.5% of people. It is a floor, not a ceiling — and not an optimum for muscle or metabolic health." }
      },
      {
        heading: "Protein and muscle: the evidence",
        body: "Resistance exercise combined with adequate protein is the most evidence-supported intervention for muscle hypertrophy. The anabolic response to protein is maximised at approximately 0.4g/kg per meal, suggesting that distributing protein across 3–4 meals optimises muscle protein synthesis better than consuming it in one or two large meals. Leucine — an amino acid abundant in animal proteins, soy, and legumes — is the primary trigger for muscle protein synthesis via mTORC1 activation.",
      },
      {
        heading: "Protein and longevity: the tension",
        body: "A paradox exists in the longevity literature. Higher protein intake supports muscle mass (protective against sarcopenia and falls in older adults), but animal protein activates mTORC1 and IGF-1 — pathways associated with accelerated cellular aging. A 2014 Cell Metabolism study (Levine et al., n=6,381) found that high protein intake (>20% of calories) was associated with a 4-fold increase in cancer mortality in adults aged 50–65, but a protective effect in adults over 65. The authors concluded that protein needs increase with age, but the source matters.",
        callout: { type: "myth", text: "\"More protein is always better for longevity.\" — High animal protein activates mTORC1/IGF-1 aging pathways. Plant protein sources appear to carry lower longevity risk." }
      },
      {
        heading: "Practical evidence-based targets",
        body: "Synthesising the evidence: 1.2–1.6g/kg/day is well-supported for active adults seeking to maintain or build muscle. 1.6–2.0g/kg/day is supported for adults over 65 to counteract age-related muscle loss (sarcopenia). Plant protein sources (legumes, soy, quinoa) appear to carry lower longevity risk than animal proteins at equivalent intakes. Spreading protein intake across meals (0.4g/kg per meal) optimises muscle protein synthesis.",
        callout: { type: "verdict", text: "Optimal protein intake for most active adults is 1.2–1.6g/kg/day — significantly above the RDA. Older adults need more. Plant sources carry lower longevity risk." }
      },
    ],
    keyTakeaways: [
      "The RDA of 0.8g/kg/day is a minimum to prevent deficiency, not an optimal target.",
      "Evidence supports 1.2–1.6g/kg/day for muscle maintenance and metabolic health in active adults.",
      "Adults over 65 benefit from 1.6–2.0g/kg/day to counteract sarcopenia.",
      "Spreading protein across 3–4 meals (0.4g/kg each) optimises muscle protein synthesis.",
      "Plant protein sources carry lower longevity risk than animal proteins at equivalent intakes.",
    ],
    refs: [
      { authors: "Morton RW et al.", title: "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength.", journal: "Br J Sports Med", year: 2018, doi: "10.1136/bjsports-2017-097608" },
      { authors: "Levine ME et al.", title: "Low protein intake is associated with a major reduction in IGF-1, cancer, and overall mortality in the 65 and younger but not older population.", journal: "Cell Metabolism", year: 2014, doi: "10.1016/j.cmet.2014.02.006" },
      { authors: "Stokes T et al.", title: "Recent perspectives regarding the role of dietary protein for the promotion of muscle hypertrophy with resistance exercise training.", journal: "Nutrients", year: 2018, doi: "10.3390/nu10020180" },
    ],
  },

  // ─── 5 ───────────────────────────────────────────────────
  {
    id: "5",
    slug: "is-sugar-toxic",
    title: "Is Sugar Toxic?",
    subtitle: "From Robert Lustig's viral lecture to the WHO guidelines — what the evidence says about sugar and health.",
    category: "Myths Debunked",
    tier: "I",
    readTime: "9 min",
    publishDate: "2025-04-29",
    searchVolume: "1.5M searches/mo",
    verdict: "Added sugar — particularly fructose in excess — is associated with metabolic harm, fatty liver disease, and cardiovascular risk. However, 'toxic' overstates the evidence. The dose, source, and dietary context determine the harm. Sugar from whole fruit, consumed in normal quantities, does not carry the same risks as added sugar in processed foods.",
    verdictShort: "Partly True",
    tags: ["Sugar", "Fructose", "Metabolic Health", "NAFLD", "WHO"],
    intro: "In 2009, Robert Lustig's lecture 'Sugar: The Bitter Truth' went viral on YouTube, accumulating over 10 million views. His central claim: fructose is a poison, metabolised like alcohol, and responsible for the obesity and metabolic disease epidemic. The claim sparked a decade of research. The truth is more nuanced — but not entirely reassuring.",
    sections: [
      {
        heading: "The fructose metabolism argument",
        body: "Unlike glucose, fructose is metabolised almost exclusively in the liver. In large quantities, fructose overwhelms hepatic capacity and is converted to fat via de novo lipogenesis, contributing to non-alcoholic fatty liver disease (NAFLD), elevated triglycerides, and insulin resistance. This is the mechanistic basis of Lustig's 'toxic' claim. The evidence for this pathway is strong in controlled feeding studies at high doses.",
        callout: { type: "fact", text: "Fructose is metabolised primarily in the liver. At high doses, it promotes de novo lipogenesis, NAFLD, and elevated triglycerides — pathways not shared by glucose." }
      },
      {
        heading: "What 'toxic' gets wrong",
        body: "The word 'toxic' implies harm at any dose. This is not supported by the evidence. Whole fruit — which contains fructose — is consistently associated with reduced disease risk in epidemiological studies. The difference lies in dose and delivery: a glass of orange juice contains the same fructose as three oranges, but without the fibre that slows absorption. The dose, the food matrix, and the overall dietary context determine whether fructose causes harm.",
        callout: { type: "myth", text: "\"All sugar is toxic.\" — Fructose from whole fruit, consumed in normal quantities, is not associated with metabolic harm. Dose and food matrix matter." }
      },
      {
        heading: "WHO guidelines and the evidence base",
        body: "The WHO recommends limiting free sugars (added sugars plus sugars in fruit juice and honey) to less than 10% of total energy intake, with a conditional recommendation to reduce to below 5% for additional health benefits. This guidance is based on evidence linking added sugar intake to dental caries, weight gain, and metabolic disease. A 2016 JAMA Internal Medicine investigation revealed that the sugar industry had funded research in the 1960s to shift blame for heart disease from sugar to fat.",
      },
      {
        heading: "Liquid sugar: the strongest evidence",
        body: "The clearest evidence for sugar harm comes from sugar-sweetened beverages (SSBs). A 2019 BMJ meta-analysis found that each additional serving of SSBs per day was associated with an 18% higher risk of type 2 diabetes and a 16% higher risk of cardiovascular disease. SSBs provide calories without triggering satiety signals, making them uniquely obesogenic. The evidence for harm from SSBs is substantially stronger than for solid added sugar.",
        callout: { type: "verdict", text: "Added sugar — especially in liquid form — is associated with metabolic harm. But 'toxic' overstates it. Whole fruit is protective. The dose and food matrix are decisive." }
      },
    ],
    keyTakeaways: [
      "Fructose in excess promotes NAFLD, elevated triglycerides, and insulin resistance via hepatic de novo lipogenesis.",
      "Whole fruit fructose is not associated with metabolic harm — the food matrix and fibre content matter.",
      "WHO recommends <10% of calories from free sugars; <5% for additional benefit.",
      "Sugar-sweetened beverages are the most strongly evidenced dietary risk factor for type 2 diabetes.",
      "The sugar industry funded research in the 1960s to shift blame for heart disease from sugar to fat.",
    ],
    refs: [
      { authors: "Stanhope KL et al.", title: "Consuming fructose-sweetened beverages increases visceral adiposity and lipids and decreases insulin sensitivity.", journal: "J Clin Invest", year: 2009, doi: "10.1172/JCI37385" },
      { authors: "Imamura F et al.", title: "Consumption of sugar sweetened beverages, artificially sweetened beverages, and fruit juice and incidence of type 2 diabetes.", journal: "BMJ", year: 2015, doi: "10.1136/bmj.h3576" },
      { authors: "Kearns CE et al.", title: "Sugar industry and coronary heart disease research: a historical analysis of internal industry documents.", journal: "JAMA Intern Med", year: 2016, doi: "10.1001/jamainternmed.2016.5394" },
    ],
  },

  // ─── 6 ───────────────────────────────────────────────────
  {
    id: "6",
    slug: "does-gluten-harm-everyone",
    title: "Does Gluten Harm Everyone?",
    subtitle: "Coeliac disease is real. Non-coeliac gluten sensitivity is contested. The evidence on who should avoid gluten.",
    category: "Food Intolerances",
    tier: "II",
    readTime: "8 min",
    publishDate: "2025-05-06",
    searchVolume: "980K searches/mo",
    verdict: "Gluten causes serious harm in people with coeliac disease (~1% of the population) and wheat allergy. Non-coeliac gluten sensitivity (NCGS) is a real but poorly understood condition affecting an estimated 0.5–6% of people. For the remaining ~93% of the population, there is no evidence that gluten causes harm — and gluten-free diets may be nutritionally inferior.",
    verdictShort: "Nuanced",
    tags: ["Gluten", "Coeliac", "NCGS", "Wheat", "Gut Health"],
    intro: "The global gluten-free food market is worth over $7 billion annually. Surveys suggest that up to 30% of people in Western countries are actively trying to reduce or eliminate gluten. Yet coeliac disease — the only condition for which gluten avoidance is medically necessary — affects approximately 1% of the population. The gap between who needs to avoid gluten and who does is one of the most striking disconnects in modern nutrition.",
    sections: [
      {
        heading: "Coeliac disease: the clear case",
        body: "Coeliac disease is an autoimmune condition in which gluten triggers an immune response that damages the small intestinal villi, impairing nutrient absorption. It affects approximately 1% of the global population and is associated with serious complications including osteoporosis, anaemia, infertility, and a small increased risk of intestinal lymphoma if untreated. A strict, lifelong gluten-free diet is the only effective treatment. Diagnosis requires serological testing (anti-tTG IgA) and intestinal biopsy.",
        callout: { type: "fact", text: "Coeliac disease affects ~1% of the population. A strict gluten-free diet is medically necessary and dramatically reduces complication risk." }
      },
      {
        heading: "Non-coeliac gluten sensitivity: the contested middle",
        body: "NCGS describes gastrointestinal and extra-intestinal symptoms triggered by gluten in people who test negative for coeliac disease and wheat allergy. The condition was validated in a 2011 double-blind crossover RCT by Biesiekierski et al., but a 2013 follow-up by the same group found that when FODMAPs (fermentable carbohydrates also present in wheat) were controlled, gluten itself did not cause symptoms in most participants. The field remains contested: some researchers argue NCGS is primarily FODMAP sensitivity, others maintain a genuine gluten-specific mechanism exists.",
        callout: { type: "myth", text: "\"Everyone feels better without gluten.\" — In double-blind trials controlling for FODMAPs, most people without coeliac disease show no specific response to gluten." }
      },
      {
        heading: "The gluten-free diet for healthy people",
        body: "For people without coeliac disease or wheat allergy, a gluten-free diet offers no demonstrated health benefit and may carry nutritional costs. Gluten-free products are typically lower in fibre, iron, zinc, and B vitamins than their gluten-containing equivalents, and are often higher in sugar and fat to compensate for texture. A 2017 BMJ analysis of 110,000 adults found that long-term low gluten intake was associated with higher cardiovascular risk, likely due to reduced whole grain consumption.",
        callout: { type: "verdict", text: "Gluten causes harm in coeliac disease and wheat allergy. For the ~93% without these conditions, gluten-free diets offer no benefit and may reduce fibre and micronutrient intake." }
      },
    ],
    keyTakeaways: [
      "Coeliac disease (~1% of population) requires strict lifelong gluten avoidance.",
      "Non-coeliac gluten sensitivity is real but contested; FODMAPs may explain most symptoms.",
      "For people without coeliac disease, gluten-free diets offer no demonstrated health benefit.",
      "Gluten-free products are often lower in fibre, iron, zinc, and B vitamins.",
      "A 2017 BMJ study found long-term low gluten intake was associated with higher cardiovascular risk.",
    ],
    refs: [
      { authors: "Biesiekierski JR et al.", title: "No effects of gluten in patients with self-reported non-celiac gluten sensitivity after dietary reduction of fermentable, poorly absorbed, short-chain carbohydrates.", journal: "Gastroenterology", year: 2013, doi: "10.1053/j.gastro.2013.04.051" },
      { authors: "Lebwohl B et al.", title: "Long term gluten consumption in adults without celiac disease and risk of coronary heart disease.", journal: "BMJ", year: 2017, doi: "10.1136/bmj.j1892" },
      { authors: "Fasano A et al.", title: "Nonceliac gluten and wheat sensitivity.", journal: "Gastroenterology", year: 2015, doi: "10.1053/j.gastro.2014.12.049" },
    ],
  },

  // ─── 7 ───────────────────────────────────────────────────
  {
    id: "7",
    slug: "do-detox-diets-work",
    title: "Do Detox Diets and Cleanses Actually Work?",
    subtitle: "The liver and kidneys detoxify continuously. What the evidence says about juice cleanses and detox protocols.",
    category: "Myths Debunked",
    tier: "III",
    readTime: "6 min",
    publishDate: "2025-05-13",
    searchVolume: "1.1M searches/mo",
    verdict: "There is no credible scientific evidence that commercial detox diets or juice cleanses remove toxins, improve liver function, or provide health benefits beyond what a normal healthy diet achieves. The human body has highly effective detoxification systems — primarily the liver and kidneys — that operate continuously.",
    verdictShort: "Myth",
    tags: ["Detox", "Cleanse", "Liver", "Pseudoscience"],
    intro: "The global detox and cleanse market is worth approximately $50 billion annually. Products promise to 'flush toxins', 'reset the gut', and 'give the liver a rest'. The problem: the liver does not need a rest. It is always working. And the 'toxins' being removed are almost never specified. This is one of the most commercially successful myths in nutrition.",
    sections: [
      {
        heading: "What detox actually means biologically",
        body: "Biological detoxification is a continuous, highly regulated process. The liver performs Phase I and Phase II detoxification reactions, converting fat-soluble toxins into water-soluble compounds that can be excreted by the kidneys. The kidneys filter approximately 180 litres of blood per day. The gut microbiome metabolises and neutralises numerous dietary compounds. These systems do not require periodic 'resets' — they operate 24 hours a day, 7 days a week.",
        callout: { type: "myth", text: "\"Juice cleanses give your liver a rest.\" — The liver never rests. It performs over 500 functions continuously, including detoxification, protein synthesis, and glucose regulation." }
      },
      {
        heading: "What the research shows",
        body: "A 2015 systematic review in the Journal of Human Nutrition and Dietetics examined all published studies on commercial detox diets. The authors found no convincing evidence that detox diets remove toxins from the body or improve health. The few studies that reported positive outcomes had serious methodological flaws including no control groups, small sample sizes, and self-reported outcomes. A 2019 review in Nutrition Reviews reached the same conclusion.",
        callout: { type: "fact", text: "A 2015 systematic review found no convincing evidence that any commercial detox diet removes toxins or improves health beyond what a normal diet achieves." }
      },
      {
        heading: "Why people feel better",
        body: "Many people report feeling better after a juice cleanse. This is real, but the mechanism is not toxin removal. Detox diets typically eliminate alcohol, processed foods, caffeine, and refined sugar — all of which have genuine health costs. The improvement comes from removing harmful dietary components, not from any active detoxification. The same benefit could be achieved by simply eating a healthy whole-food diet.",
        callout: { type: "verdict", text: "Detox diets work by eliminating alcohol, processed food, and sugar — not by removing toxins. The liver and kidneys do this work continuously, without commercial assistance." }
      },
    ],
    keyTakeaways: [
      "The liver and kidneys detoxify continuously — they do not require periodic 'resets' or 'cleanses'.",
      "No peer-reviewed RCT has demonstrated that commercial detox diets remove toxins or improve health.",
      "Improvements felt during cleanses come from eliminating alcohol, processed food, and refined sugar.",
      "The detox and cleanse market is worth ~$50 billion annually with no credible scientific basis.",
      "A whole-food diet achieves any benefit a cleanse provides, without the cost or restriction.",
    ],
    refs: [
      { authors: "Klein AV & Kiat H.", title: "Detox diets for toxin elimination and weight management: a critical review of the evidence.", journal: "J Hum Nutr Diet", year: 2015, doi: "10.1111/jhn.12286" },
      { authors: "Capocasa M et al.", title: "Exploring nutritional myths and fake news: impact and implications.", journal: "Nutrition Reviews", year: 2026, doi: "10.1093/nutrit/nuac001" },
    ],
  },

  // ─── 8 ───────────────────────────────────────────────────
  {
    id: "8",
    slug: "are-eggs-bad-for-your-heart",
    title: "Are Eggs Bad for Your Heart?",
    subtitle: "Dietary cholesterol guidelines have changed dramatically. Here is what the current evidence shows.",
    category: "Cardiovascular",
    tier: "II",
    readTime: "8 min",
    publishDate: "2025-05-20",
    searchVolume: "870K searches/mo",
    verdict: "For most healthy people, moderate egg consumption (up to 1 egg/day) is not associated with increased cardiovascular risk. The 2015 US Dietary Guidelines removed the 300mg/day dietary cholesterol limit. However, people with type 2 diabetes or familial hypercholesterolaemia may need to limit intake, and the saturated fat accompanying eggs in typical Western diets may matter more than the eggs themselves.",
    verdictShort: "Mostly Myth",
    tags: ["Eggs", "Cholesterol", "Cardiovascular", "Dietary Guidelines"],
    intro: "For decades, eggs were dietary villains — high in cholesterol, presumed to raise blood cholesterol, and therefore presumed to cause heart disease. In 2015, the US Dietary Guidelines Advisory Committee quietly removed the 300mg/day dietary cholesterol limit, acknowledging that 'cholesterol is not a nutrient of concern for overconsumption'. The science had moved on. The public messaging had not.",
    sections: [
      {
        heading: "The dietary cholesterol hypothesis",
        body: "The concern about eggs originated from the diet-heart hypothesis: dietary cholesterol raises blood cholesterol, which causes atherosclerosis and heart disease. The first part of this chain is partially true — dietary cholesterol does raise LDL cholesterol in some people (hyper-responders). But for most people (hypo-responders), the liver compensates by reducing its own cholesterol synthesis, maintaining homeostasis. The second part — that LDL from dietary cholesterol specifically drives cardiovascular events — is less well-supported.",
        callout: { type: "fact", text: "Most people are cholesterol 'hypo-responders' — the liver compensates for dietary cholesterol by reducing endogenous synthesis, maintaining blood cholesterol homeostasis." }
      },
      {
        heading: "What the meta-analyses show",
        body: "A 2020 BMJ meta-analysis of 23 prospective cohort studies (n=1.4 million) found no significant association between egg consumption and cardiovascular disease in the general population. A 2019 JAMA study (n=29,615) found that each additional half-egg per day was associated with a small but significant increase in cardiovascular events — but critics noted this study did not adjust for overall dietary pattern. The Nurses' Health Study and Health Professionals Follow-Up Study (n=117,000) found no association between moderate egg consumption and cardiovascular risk in healthy adults.",
        callout: { type: "myth", text: "\"Eggs raise your cholesterol and cause heart disease.\" — For most healthy people, moderate egg consumption is not associated with increased cardiovascular risk." }
      },
      {
        heading: "The diabetes exception",
        body: "The picture is different for people with type 2 diabetes. Multiple studies have found a stronger association between egg consumption and cardiovascular risk in diabetic populations, possibly because diabetes impairs the liver's compensatory cholesterol regulation. The American Diabetes Association recommends that people with diabetes limit egg consumption to 3–4 per week.",
        callout: { type: "verdict", text: "For healthy adults, up to 1 egg/day is not associated with cardiovascular risk. People with type 2 diabetes or familial hypercholesterolaemia should limit intake to 3–4/week." }
      },
    ],
    keyTakeaways: [
      "The 2015 US Dietary Guidelines removed the 300mg/day dietary cholesterol limit.",
      "Most people are cholesterol hypo-responders — the liver compensates for dietary cholesterol.",
      "A 2020 BMJ meta-analysis (n=1.4M) found no significant association between eggs and CVD in healthy adults.",
      "People with type 2 diabetes may face higher cardiovascular risk from egg consumption.",
      "The saturated fat in typical egg-containing meals (bacon, butter) may matter more than the eggs.",
    ],
    refs: [
      { authors: "Drouin-Chartier JP et al.", title: "Egg consumption and risk of cardiovascular disease: three large prospective US cohort studies, systematic review, and updated meta-analysis.", journal: "BMJ", year: 2020, doi: "10.1136/bmj.m513" },
      { authors: "Zhong VW et al.", title: "Associations of dietary cholesterol or egg consumption with incident cardiovascular disease and mortality.", journal: "JAMA", year: 2019, doi: "10.1001/jama.2019.1572" },
    ],
  },

  // ─── 9 ───────────────────────────────────────────────────
  {
    id: "9",
    slug: "does-intermittent-fasting-work",
    title: "Does Intermittent Fasting Actually Work?",
    subtitle: "Beyond the hype — what the RCTs show about weight loss, metabolic health, and longevity.",
    category: "Eating Patterns",
    tier: "II",
    readTime: "10 min",
    publishDate: "2025-05-27",
    searchVolume: "3.2M searches/mo",
    verdict: "Intermittent fasting (IF) is an effective weight loss strategy, but not superior to continuous caloric restriction when calories are matched. Its primary advantage is adherence for some people. Emerging evidence supports metabolic benefits beyond weight loss — including improved insulin sensitivity and reduced inflammation — but long-term RCT data on longevity outcomes in humans is absent.",
    verdictShort: "Mostly True",
    tags: ["Intermittent Fasting", "16:8", "5:2", "Weight Loss", "Autophagy"],
    intro: "Intermittent fasting became one of the most searched dietary topics of the 2010s and 2020s. From the 5:2 diet to 16:8 time-restricted eating to multi-day fasts, the variations are numerous. The core claim — that fasting periods trigger metabolic and cellular benefits beyond simple caloric restriction — is partially supported by the evidence, but the picture is more nuanced than the popular press suggests.",
    sections: [
      {
        heading: "IF vs continuous caloric restriction: the weight loss data",
        body: "The most common question about IF is whether it produces more weight loss than simply eating less every day. The answer from the best RCTs is: no, not when calories are matched. A 2022 NEJM study (n=139, 12 months) found that time-restricted eating (16:8) produced no significant additional weight loss compared to continuous caloric restriction. A 2020 JAMA Internal Medicine RCT reached the same conclusion. IF works for weight loss primarily because it reduces total caloric intake, not because of fasting-specific metabolic effects.",
        callout: { type: "fact", text: "When calories are matched, IF produces no more weight loss than continuous caloric restriction. Its advantage is adherence — some people find it easier to skip meals than to count calories." }
      },
      {
        heading: "Metabolic benefits beyond weight",
        body: "Where IF shows more promise is in metabolic effects independent of weight loss. A 2018 Cell Metabolism RCT found that early time-restricted eating (all food before 3pm) improved insulin sensitivity, blood pressure, and oxidative stress in men with prediabetes — without weight loss. This suggests circadian alignment of food intake may have metabolic benefits beyond caloric restriction. IF also consistently reduces fasting insulin and improves insulin sensitivity in overweight adults.",
      },
      {
        heading: "Autophagy and cellular renewal",
        body: "The longevity argument for IF rests heavily on autophagy — the cellular self-cleaning process that removes damaged proteins and organelles. Fasting robustly activates autophagy in animal models and in human cell studies. However, the clinical relevance of fasting-induced autophagy in humans is not yet established. No human RCT has demonstrated that IF-induced autophagy reduces disease incidence or extends lifespan.",
        callout: { type: "myth", text: "\"Intermittent fasting activates autophagy and extends lifespan.\" — Autophagy is activated by fasting in humans, but no RCT has shown this translates to reduced disease or extended lifespan." }
      },
      {
        heading: "Safety and who should avoid IF",
        body: "IF is generally safe for healthy adults. It is not appropriate for people who are pregnant or breastfeeding, children and adolescents, people with a history of eating disorders, people with type 1 diabetes on insulin, or people who are underweight. A 2024 AHA scientific statement noted that 8-hour time-restricted eating was associated with a 91% higher risk of cardiovascular death in a large observational study — though this finding has been contested on methodological grounds and has not been replicated in RCTs.",
        callout: { type: "verdict", text: "IF is effective for weight loss (via reduced caloric intake) and shows metabolic benefits. It is not superior to continuous caloric restriction when calories are matched." }
      },
    ],
    keyTakeaways: [
      "IF produces weight loss primarily by reducing total caloric intake, not through fasting-specific metabolic magic.",
      "When calories are matched, IF is not superior to continuous caloric restriction for weight loss.",
      "Early time-restricted eating improves insulin sensitivity and blood pressure independently of weight loss.",
      "Autophagy is activated by fasting in humans, but no RCT has linked this to reduced disease in people.",
      "IF is not appropriate for pregnant women, children, people with eating disorders, or type 1 diabetics on insulin.",
    ],
    refs: [
      { authors: "Liu D et al.", title: "Calorie restriction with or without time-restricted eating in weight loss.", journal: "NEJM", year: 2022, doi: "10.1056/NEJMoa2114833" },
      { authors: "Sutton EF et al.", title: "Early time-restricted feeding improves insulin sensitivity, blood pressure, and oxidative stress.", journal: "Cell Metabolism", year: 2018, doi: "10.1016/j.cmet.2018.04.010" },
      { authors: "Lowe DA et al.", title: "Effects of time-restricted eating on weight loss and other metabolic parameters in women and men with overweight and obesity.", journal: "JAMA Intern Med", year: 2020, doi: "10.1001/jamainternmed.2020.4153" },
    ],
  },

  // ─── 10 ───────────────────────────────────────────────────
  {
    id: "10",
    slug: "is-the-gut-microbiome-the-key-to-everything",
    title: "Is the Gut Microbiome the Key to Everything?",
    subtitle: "Microbiome science is real and important. But the hype has outrun the evidence. Here is what we actually know.",
    category: "Gut Health",
    tier: "II",
    readTime: "11 min",
    publishDate: "2025-06-03",
    searchVolume: "1.8M searches/mo",
    verdict: "The gut microbiome is a legitimate and important area of science with strong evidence linking it to metabolic health, immune function, and mental health. However, the commercial microbiome industry has substantially outpaced the evidence. Most probiotic supplements have weak or no evidence for specific health claims. Diet — particularly dietary fibre — is the most evidence-supported way to improve microbiome health.",
    verdictShort: "Nuanced",
    tags: ["Gut Microbiome", "Probiotics", "Prebiotics", "Fibre", "Mental Health"],
    intro: "The gut microbiome — the 38 trillion microorganisms living in the human digestive tract — has been linked to obesity, depression, Alzheimer's disease, autism, autoimmune conditions, and cardiovascular disease. The science is real. But the leap from 'the microbiome is associated with X' to 'taking probiotic Y will cure X' is one that the evidence has not yet made.",
    sections: [
      {
        heading: "What the microbiome actually does",
        body: "The gut microbiome performs functions that the human genome cannot: fermenting dietary fibre into short-chain fatty acids (SCFAs) like butyrate, propionate, and acetate; synthesising vitamins K2 and B12; training the immune system; and producing neurotransmitter precursors including serotonin (95% of the body's serotonin is produced in the gut). Disruption of the microbiome — dysbiosis — is associated with inflammatory bowel disease, obesity, type 2 diabetes, and depression.",
        callout: { type: "fact", text: "95% of the body's serotonin is produced in the gut. The microbiome synthesises neurotransmitter precursors, vitamin K2, and short-chain fatty acids critical for immune function." }
      },
      {
        heading: "Fibre: the most evidence-supported intervention",
        body: "The single most evidence-supported dietary intervention for microbiome health is dietary fibre. A landmark 2018 Cell study (Sonnenburg et al.) found that a high-fibre diet dramatically increased microbiome diversity and SCFA production. A 2021 Cell study by the same group found that a high-fibre diet and a high-fermented food diet both increased microbiome diversity, but fermented foods (yoghurt, kefir, kimchi) also reduced inflammatory markers. The WHO recommends 25–38g of fibre per day; most Western adults consume 15–17g.",
      },
      {
        heading: "Probiotics: the evidence gap",
        body: "The global probiotics market is worth over $60 billion annually. The evidence for most commercial probiotic supplements is weak. A 2019 Cell study found that after antibiotic treatment, probiotic supplementation actually delayed microbiome recovery compared to no intervention. The evidence is strongest for specific probiotic strains in specific conditions: Lactobacillus rhamnosus GG for antibiotic-associated diarrhoea, and VSL#3 for ulcerative colitis. Generic 'gut health' claims for most supplements are not supported by RCT evidence.",
        callout: { type: "myth", text: "\"Probiotic supplements improve gut health for everyone.\" — Most commercial probiotics have weak evidence. A 2019 Cell study found they can delay microbiome recovery after antibiotics." }
      },
      {
        heading: "The gut-brain axis",
        body: "The gut-brain axis — bidirectional communication between the gut microbiome and the central nervous system via the vagus nerve, immune system, and metabolic signalling — is one of the most exciting areas of neuroscience. Animal studies have demonstrated that germ-free mice show anxiety-like behaviour that resolves with microbiome transplantation. Human studies have found associations between microbiome composition and depression, anxiety, and cognitive function. However, no RCT has yet demonstrated that microbiome intervention reliably treats a psychiatric condition in humans.",
        callout: { type: "verdict", text: "The microbiome is important and real. Dietary fibre is the most evidence-supported intervention. Most probiotic supplements lack robust RCT evidence for specific health claims." }
      },
    ],
    keyTakeaways: [
      "The gut microbiome performs critical functions: SCFA production, immune training, neurotransmitter synthesis.",
      "Dietary fibre (25–38g/day) is the most evidence-supported way to improve microbiome health and diversity.",
      "Most commercial probiotic supplements lack robust RCT evidence for specific health claims.",
      "Fermented foods (yoghurt, kefir, kimchi) increase microbiome diversity and reduce inflammatory markers.",
      "The gut-brain axis is real but no RCT has yet demonstrated microbiome intervention reliably treats psychiatric conditions.",
    ],
    refs: [
      { authors: "Wastyk HC et al.", title: "Gut-microbiota-targeted diets modulate human immune status.", journal: "Cell", year: 2021, doi: "10.1016/j.cell.2021.06.019" },
      { authors: "Suez J et al.", title: "Post-antibiotic gut mucosal microbiome reconstitution is impaired by probiotics and improved by autologous FMT.", journal: "Cell", year: 2018, doi: "10.1016/j.cell.2018.08.047" },
      { authors: "Sonnenburg JL & Bäckhed F.", title: "Diet–microbiota interactions as moderators of human metabolism.", journal: "Nature", year: 2016, doi: "10.1038/nature18846" },
    ],
  },
  ...newJournalArticles,
  ...batch2JournalArticles,
  ...batch3JournalArticles,
  ...batch4JournalArticles,
  ...batch5JournalArticles,
  ...batch6JournalArticles,
  ...batch7JournalArticles,
  ...batch8JournalArticles,
  ...batch9JournalArticles,
  ...journalsBatch10,
  ...journalsBatch11,
];

export const journalCategories = Array.from(new Set(journalArticles.map(a => a.category)));

export const verdictColors: Record<string, string> = {
  "Myth": "var(--destructive)",
  "Mostly Myth": "oklch(0.52 0.13 72)",
  "Partly True": "oklch(0.52 0.13 72)",
  "Mostly True": "oklch(0.42 0.09 148)",
  "True": "var(--tier-i)",
  "Nuanced": "oklch(0.48 0.008 60)",
};
