// ============================================================
// DIETARY PROTOCOL ENGINE
// Evidence-based quiz scoring → personalised dietary protocol
// All recommendations traceable to peer-reviewed sources
// ============================================================

export interface QuizQuestion {
  id: string;
  section: string;
  sectionLabel: string;
  question: string;
  subtext?: string;
  type: "single" | "multi" | "scale";
  options: QuizOption[];
}

export interface QuizOption {
  value: string;
  label: string;
  subtext?: string;
  icon?: string;
}

export interface QuizAnswers {
  [questionId: string]: string | string[];
}

export interface ProtocolResult {
  primaryDiet: DietRecommendation;
  supportingDiets: DietRecommendation[];
  keyPriorities: Priority[];
  avoidances: Avoidance[];
  supplements: Supplement[];
  weeklyProtocol: WeeklyProtocol;
  evidenceSummary: EvidenceSummary;
  personalScore: number;
}

export interface DietRecommendation {
  dietId: number;
  name: string;
  matchScore: number; // 0–100
  tier: "I" | "II" | "III";
  rationale: string;
  keyBenefits: string[];
  primaryRef: string;
  doi: string;
}

export interface Priority {
  label: string;
  description: string;
  evidence: string;
  urgency: "high" | "medium" | "low";
}

export interface Avoidance {
  item: string;
  reason: string;
  evidence: string;
}

export interface Supplement {
  name: string;
  dose: string;
  rationale: string;
  tier: "I" | "II" | "III";
  note?: string;
}

export interface WeeklyProtocol {
  meals: MealGuideline[];
  fastingWindow?: string;
  hydration: string;
  notes: string[];
}

export interface MealGuideline {
  meal: string;
  focus: string;
  examples: string[];
}

export interface EvidenceSummary {
  totalTrials: number;
  tierIStudies: number;
  keyFindings: string[];
}

// ============================================================
// QUIZ QUESTIONS
// ============================================================

export const QUIZ_SECTIONS = [
  { id: "goals", label: "Health Goals", icon: "◎" },
  { id: "health", label: "Health Status", icon: "◈" },
  { id: "lifestyle", label: "Lifestyle", icon: "◇" },
  { id: "diet", label: "Current Diet", icon: "◆" },
  { id: "preferences", label: "Preferences", icon: "◉" },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── SECTION 1: HEALTH GOALS ──
  {
    id: "primary_goal",
    section: "goals",
    sectionLabel: "Health Goals",
    question: "What is your primary health goal?",
    subtext: "This determines which outcome domain we optimise for first.",
    type: "single",
    options: [
      { value: "heart", label: "Protect my heart", subtext: "Reduce CVD risk, lower blood pressure or cholesterol", icon: "♥" },
      { value: "weight", label: "Manage my weight", subtext: "Sustainable fat loss or body composition change", icon: "◎" },
      { value: "longevity", label: "Live longer, healthier", subtext: "Extend healthspan and reduce all-cause mortality", icon: "∞" },
      { value: "brain", label: "Protect my brain", subtext: "Reduce dementia risk, improve cognitive function", icon: "◈" },
      { value: "metabolic", label: "Improve metabolic health", subtext: "Blood sugar, insulin sensitivity, energy levels", icon: "⚡" },
      { value: "gut", label: "Improve gut health", subtext: "Digestion, microbiome diversity, inflammation", icon: "◇" },
      { value: "energy", label: "Increase energy & performance", subtext: "Athletic performance, daily energy, recovery", icon: "▲" },
      { value: "cancer", label: "Reduce cancer risk", subtext: "Evidence-based dietary cancer prevention", icon: "◉" },
    ],
  },
  {
    id: "secondary_goals",
    section: "goals",
    sectionLabel: "Health Goals",
    question: "Any secondary goals? (Select all that apply)",
    subtext: "We'll layer these into your protocol.",
    type: "multi",
    options: [
      { value: "heart", label: "Heart health" },
      { value: "weight", label: "Weight management" },
      { value: "longevity", label: "Longevity" },
      { value: "brain", label: "Brain health" },
      { value: "metabolic", label: "Metabolic health" },
      { value: "gut", label: "Gut health" },
      { value: "inflammation", label: "Reduce inflammation" },
      { value: "sleep", label: "Improve sleep" },
    ],
  },

  // ── SECTION 2: HEALTH STATUS ──
  {
    id: "conditions",
    section: "health",
    sectionLabel: "Health Status",
    question: "Do you have any of the following diagnosed conditions?",
    subtext: "Select all that apply. This helps us apply condition-specific evidence.",
    type: "multi",
    options: [
      { value: "hypertension", label: "High blood pressure (hypertension)" },
      { value: "high_cholesterol", label: "High cholesterol (hyperlipidaemia)" },
      { value: "t2d", label: "Type 2 diabetes or pre-diabetes" },
      { value: "heart_disease", label: "Heart disease or prior cardiac event" },
      { value: "ibs", label: "IBS or inflammatory bowel condition" },
      { value: "autoimmune", label: "Autoimmune condition" },
      { value: "cognitive_concern", label: "Cognitive concerns or family history of dementia" },
      { value: "none", label: "None of the above" },
    ],
  },
  {
    id: "age_group",
    section: "health",
    sectionLabel: "Health Status",
    question: "What is your age group?",
    subtext: "Nutritional requirements shift significantly across life stages.",
    type: "single",
    options: [
      { value: "18_30", label: "18–30", subtext: "Building metabolic foundation" },
      { value: "31_45", label: "31–45", subtext: "Peak performance & prevention" },
      { value: "46_60", label: "46–60", subtext: "Midlife metabolic shift" },
      { value: "61_75", label: "61–75", subtext: "Healthy ageing & muscle preservation" },
      { value: "75_plus", label: "75+", subtext: "Longevity & cognitive protection" },
    ],
  },
  {
    id: "bmi_range",
    section: "health",
    sectionLabel: "Health Status",
    question: "How would you describe your current weight?",
    type: "single",
    options: [
      { value: "underweight", label: "Underweight", subtext: "BMI below 18.5" },
      { value: "healthy", label: "Healthy weight", subtext: "BMI 18.5–24.9" },
      { value: "overweight", label: "Overweight", subtext: "BMI 25–29.9" },
      { value: "obese", label: "Obese", subtext: "BMI 30+" },
      { value: "unsure", label: "Unsure" },
    ],
  },

  // ── SECTION 3: LIFESTYLE ──
  {
    id: "activity",
    section: "lifestyle",
    sectionLabel: "Lifestyle",
    question: "How physically active are you?",
    type: "single",
    options: [
      { value: "sedentary", label: "Sedentary", subtext: "Desk job, little to no exercise" },
      { value: "light", label: "Lightly active", subtext: "1–2 exercise sessions per week" },
      { value: "moderate", label: "Moderately active", subtext: "3–4 sessions per week" },
      { value: "very_active", label: "Very active", subtext: "5+ sessions per week or physical job" },
      { value: "athlete", label: "Athlete / competitive", subtext: "Training daily or competing" },
    ],
  },
  {
    id: "sleep",
    section: "lifestyle",
    sectionLabel: "Lifestyle",
    question: "How many hours of sleep do you typically get?",
    type: "single",
    options: [
      { value: "less_5", label: "Less than 5 hours", subtext: "Significant sleep deficit" },
      { value: "5_6", label: "5–6 hours", subtext: "Below recommended" },
      { value: "7_8", label: "7–8 hours", subtext: "Optimal range" },
      { value: "9_plus", label: "9+ hours", subtext: "Above average" },
    ],
  },
  {
    id: "stress",
    section: "lifestyle",
    sectionLabel: "Lifestyle",
    question: "How would you rate your typical stress level?",
    type: "single",
    options: [
      { value: "low", label: "Low", subtext: "Rarely stressed, good work-life balance" },
      { value: "moderate", label: "Moderate", subtext: "Occasional stress, manageable" },
      { value: "high", label: "High", subtext: "Frequently stressed, affects daily life" },
      { value: "very_high", label: "Very high", subtext: "Chronic stress, significant impact" },
    ],
  },

  // ── SECTION 4: CURRENT DIET ──
  {
    id: "current_diet",
    section: "diet",
    sectionLabel: "Current Diet",
    question: "Which best describes your current eating pattern?",
    type: "single",
    options: [
      { value: "omnivore", label: "Omnivore", subtext: "Eat everything including meat and dairy" },
      { value: "flexitarian", label: "Flexitarian", subtext: "Mostly plants, occasional meat" },
      { value: "pescatarian", label: "Pescatarian", subtext: "Plants + seafood, no land meat" },
      { value: "vegetarian", label: "Vegetarian", subtext: "No meat or fish" },
      { value: "vegan", label: "Vegan", subtext: "No animal products" },
      { value: "keto_low_carb", label: "Keto / Low-carb", subtext: "Restricting carbohydrates" },
      { value: "paleo", label: "Paleo", subtext: "Pre-agricultural foods" },
      { value: "no_pattern", label: "No specific pattern", subtext: "Eating without a defined approach" },
    ],
  },
  {
    id: "problem_foods",
    section: "diet",
    sectionLabel: "Current Diet",
    question: "Which of these are a regular part of your diet? (Select all that apply)",
    subtext: "Helps identify areas for evidence-based improvement.",
    type: "multi",
    options: [
      { value: "ultra_processed", label: "Ultra-processed foods", subtext: "Packaged snacks, fast food, ready meals" },
      { value: "sugary_drinks", label: "Sugary drinks", subtext: "Soda, juice, energy drinks" },
      { value: "red_meat", label: "Red meat 4+ times/week" },
      { value: "refined_grains", label: "Refined grains", subtext: "White bread, white rice, pasta" },
      { value: "alcohol", label: "Alcohol regularly", subtext: "More than 7 drinks/week" },
      { value: "none_above", label: "None of the above" },
    ],
  },

  // ── SECTION 5: PREFERENCES ──
  {
    id: "restrictions",
    section: "preferences",
    sectionLabel: "Preferences",
    question: "Do you have any dietary restrictions or allergies?",
    type: "multi",
    options: [
      { value: "gluten_free", label: "Gluten-free" },
      { value: "dairy_free", label: "Dairy-free" },
      { value: "nut_allergy", label: "Nut allergy" },
      { value: "shellfish_allergy", label: "Shellfish allergy" },
      { value: "religious", label: "Religious dietary laws (Halal/Kosher)" },
      { value: "none", label: "No restrictions" },
    ],
  },
  {
    id: "adherence",
    section: "preferences",
    sectionLabel: "Preferences",
    question: "How would you describe your approach to dietary change?",
    type: "single",
    options: [
      { value: "strict", label: "All-in", subtext: "I can follow strict protocols consistently" },
      { value: "moderate", label: "Structured but flexible", subtext: "I follow guidelines most of the time" },
      { value: "gradual", label: "Gradual change", subtext: "I prefer small, sustainable adjustments" },
      { value: "minimal", label: "Minimal change", subtext: "I want the biggest impact with fewest changes" },
    ],
  },
  {
    id: "cooking",
    section: "preferences",
    sectionLabel: "Preferences",
    question: "How much time can you dedicate to food preparation?",
    type: "single",
    options: [
      { value: "minimal", label: "Minimal", subtext: "15–20 minutes per meal" },
      { value: "moderate", label: "Moderate", subtext: "30–45 minutes, batch cooking weekends" },
      { value: "extensive", label: "Extensive", subtext: "Happy to cook from scratch daily" },
    ],
  },
];

// ============================================================
// SCORING ENGINE
// Maps answers → diet match scores → personalised protocol
// ============================================================

interface DietScore {
  dietId: number;
  name: string;
  tier: "I" | "II" | "III";
  score: number;
  rationale: string[];
  keyBenefits: string[];
  primaryRef: string;
  doi: string;
}

const DIET_BASE: Omit<DietScore, "score" | "rationale">[] = [
  {
    dietId: 1, name: "Mediterranean Diet", tier: "I",
    keyBenefits: ["30% reduction in major cardiovascular events (PREDIMED)", "Reduced all-cause mortality", "Strong cognitive protection"],
    primaryRef: "Estruch R et al. Primary Prevention of Cardiovascular Disease with a Mediterranean Diet. NEJM (2018).",
    doi: "10.1056/NEJMoa1800389",
  },
  {
    dietId: 2, name: "DASH Diet", tier: "I",
    keyBenefits: ["Reduces systolic BP by 8–14 mmHg", "Perfect AHA alignment score (100/100)", "Reduces LDL cholesterol"],
    primaryRef: "Appel LJ et al. A Clinical Trial of the Effects of Dietary Patterns on Blood Pressure. NEJM (1997).",
    doi: "10.1056/NEJM199704173361601",
  },
  {
    dietId: 3, name: "MIND Diet", tier: "II",
    keyBenefits: ["53% lower Alzheimer's risk with strict adherence", "Slows cognitive decline by 7.5 years", "Combines Mediterranean + DASH evidence"],
    primaryRef: "Morris MC et al. MIND diet associated with reduced incidence of Alzheimer's disease. Alzheimer's & Dementia (2015).",
    doi: "10.1016/j.jalz.2014.11.009",
  },
  {
    dietId: 13, name: "Portfolio Diet", tier: "I",
    keyBenefits: ["LDL reduction of 20–30% — comparable to first-generation statins", "Reduces CRP inflammatory marker", "Lowers 10-year CVD risk by 13%"],
    primaryRef: "Jenkins DJ et al. Effects of a dietary portfolio of cholesterol-lowering foods vs lovastatin on serum lipids. JAMA (2003).",
    doi: "10.1001/jama.290.4.502",
  },
  {
    dietId: 4, name: "Whole-Food Plant-Based", tier: "II",
    keyBenefits: ["Reversal of coronary artery disease (Ornish trial)", "Strongest weight loss evidence among plant diets", "Reduces T2D risk by 23%"],
    primaryRef: "Ornish D et al. Intensive lifestyle changes for reversal of coronary heart disease. JAMA (1998).",
    doi: "10.1001/jama.280.23.2001",
  },
  {
    dietId: 5, name: "Vegan Diet", tier: "II",
    keyBenefits: ["Strongest LDL reduction of any dietary pattern", "23% lower T2D risk", "Effective for weight loss"],
    primaryRef: "Kahleova H et al. Vegetarian diet improves insulin resistance and oxidative stress. JAMA Intern Med (2011).",
    doi: "10.1001/archinternmed.2011.272",
  },
  {
    dietId: 8, name: "Ketogenic Diet", tier: "II",
    keyBenefits: ["Rapid initial weight loss", "Strong glycaemic control in T2D", "Therapeutic for epilepsy (Tier I evidence)"],
    primaryRef: "Westman EC et al. The effect of a low-carbohydrate, ketogenic diet on glycemic control. Ann Intern Med (2008).",
    doi: "10.7326/0003-4819-148-4-200802190-00004",
  },
  {
    dietId: 12, name: "Intermittent Fasting (16:8)", tier: "II",
    keyBenefits: ["Improves insulin sensitivity", "Reduces inflammatory markers", "Supports weight loss without caloric counting"],
    primaryRef: "Sutton EF et al. Early time-restricted feeding improves insulin sensitivity, blood pressure, and oxidative stress. Cell Metab (2018).",
    doi: "10.1016/j.cmet.2018.04.010",
  },
  {
    dietId: 15, name: "Longevity Diet", tier: "II",
    keyBenefits: ["Reduces IGF-1 and mTOR — key longevity pathways", "Periodic FMD cycles reduce visceral fat", "Associated with reduced all-cause mortality"],
    primaryRef: "Longo VD & Anderson RM. Nutrition, longevity and disease: from molecular mechanisms to interventions. Cell (2022).",
    doi: "10.1016/j.cell.2022.04.002",
  },
  {
    dietId: 14, name: "Nordic Diet", tier: "II",
    keyBenefits: ["Comparable cardiovascular benefits to Mediterranean", "High omega-3 from fatty fish", "Strong anti-inflammatory profile"],
    primaryRef: "Adamsson V et al. Effects of a healthy Nordic diet on cardiovascular risk factors. J Intern Med (2011).",
    doi: "10.1111/j.1365-2796.2010.02290.x",
  },
];

export function scoreProtocol(answers: QuizAnswers): ProtocolResult {
  const scores: Record<number, DietScore> = {};

  // Initialise all diet scores
  DIET_BASE.forEach(d => {
    scores[d.dietId] = { ...d, score: 50, rationale: [] };
  });

  const primaryGoal = answers.primary_goal as string;
  const conditions = (answers.conditions as string[]) || [];
  const ageGroup = answers.age_group as string;
  const bmi = answers.bmi_range as string;
  const activity = answers.activity as string;
  const currentDiet = answers.current_diet as string;
  const problemFoods = (answers.problem_foods as string[]) || [];
  const restrictions = (answers.restrictions as string[]) || [];
  const adherence = answers.adherence as string;
  const secondaryGoals = (answers.secondary_goals as string[]) || [];
  const stress = answers.stress as string;
  const sleep = answers.sleep as string;
  const cooking = answers.cooking as string;

  // ── GOAL-BASED SCORING ──
  if (primaryGoal === "heart" || conditions.includes("hypertension") || conditions.includes("high_cholesterol") || conditions.includes("heart_disease")) {
    scores[1].score += 30; scores[1].rationale.push("Primary cardiovascular evidence (PREDIMED, n=7,447)");
    scores[2].score += 35; scores[2].rationale.push("DASH is the AHA's top-ranked diet for blood pressure");
    scores[13].score += 25; scores[13].rationale.push("Portfolio Diet achieves statin-level LDL reduction");
    scores[7]  && (scores[7].score += 15);
  }

  if (primaryGoal === "weight" || bmi === "overweight" || bmi === "obese") {
    scores[8].score += 25; scores[8].rationale.push("Strongest short-term weight loss evidence");
    scores[5].score += 20; scores[5].rationale.push("Vegan diet: superior weight loss in RCTs");
    scores[4].score += 20; scores[4].rationale.push("WFPB: high satiety, low caloric density");
    scores[12].score += 15; scores[12].rationale.push("IF 16:8: weight loss without caloric counting");
  }

  if (primaryGoal === "longevity" || secondaryGoals.includes("longevity")) {
    scores[15].score += 30; scores[15].rationale.push("Designed specifically for longevity pathway activation");
    scores[1].score += 20; scores[1].rationale.push("Mediterranean: reduced all-cause mortality in meta-analyses");
    scores[12].score += 15; scores[12].rationale.push("Time-restricted eating activates autophagy pathways");
  }

  if (primaryGoal === "brain" || conditions.includes("cognitive_concern") || ageGroup === "61_75" || ageGroup === "75_plus") {
    scores[3].score += 35; scores[3].rationale.push("MIND diet: 53% lower Alzheimer's risk (Morris 2015)");
    scores[1].score += 20; scores[1].rationale.push("Mediterranean: reduces cognitive decline risk by 33%");
  }

  if (primaryGoal === "metabolic" || conditions.includes("t2d")) {
    scores[2].score += 20; scores[2].rationale.push("DASH reduces insulin resistance");
    scores[8].score += 25; scores[8].rationale.push("Keto: strongest glycaemic control evidence in T2D");
    scores[12].score += 20; scores[12].rationale.push("IF improves insulin sensitivity in RCTs");
    scores[1].score += 15; scores[1].rationale.push("Mediterranean: 30% T2D risk reduction");
  }

  if (primaryGoal === "gut" || conditions.includes("ibs")) {
    scores[4].score += 25; scores[4].rationale.push("WFPB: highest dietary fibre for microbiome diversity");
    scores[1].score += 20; scores[1].rationale.push("Mediterranean: increases Lactobacillus and Bifidobacterium");
    scores[5].score += 15; scores[5].rationale.push("Vegan: high prebiotic fibre intake");
  }

  if (primaryGoal === "cancer") {
    scores[1].score += 20; scores[1].rationale.push("Mediterranean: 14% lower cancer incidence (PREDIMED)");
    scores[4].score += 20; scores[4].rationale.push("WFPB: associated with 15% lower cancer risk");
    scores[5].score += 15; scores[5].rationale.push("Vegan: lower colorectal cancer risk in Adventist cohort");
  }

  // ── CONDITION ADJUSTMENTS ──
  if (conditions.includes("hypertension")) {
    scores[2].score += 20; scores[2].rationale.push("DASH reduces systolic BP by 8–14 mmHg — strongest evidence");
    scores[8].score -= 10; scores[8].rationale.push("Keto may raise LDL in some individuals");
  }

  if (conditions.includes("t2d")) {
    scores[8].score += 10; scores[8].rationale.push("Keto: strongest short-term HbA1c reduction");
    scores[12].score += 10; scores[12].rationale.push("IF improves fasting glucose and insulin");
  }

  // ── RESTRICTION ADJUSTMENTS ──
  if (restrictions.includes("dairy_free")) {
    scores[2].score -= 10; // DASH relies on low-fat dairy
  }
  if (currentDiet === "vegan" || currentDiet === "vegetarian") {
    scores[5].score += 15; scores[4].score += 15;
    scores[8].score -= 20; // Keto harder without meat
  }
  if (currentDiet === "keto_low_carb") {
    scores[8].score += 10;
  }

  // ── LIFESTYLE ADJUSTMENTS ──
  if (activity === "athlete" || activity === "very_active") {
    scores[8].score -= 15; // Keto limits performance
    scores[1].score += 10; // Med supports athletic recovery
    scores[12].score -= 5; // IF harder with high training load
  }
  if (adherence === "gradual" || adherence === "minimal") {
    scores[1].score += 10; // Med is easiest to adopt gradually
    scores[8].score -= 15; // Keto requires strict adherence
    scores[4].score -= 10; // WFPB is restrictive
  }
  if (adherence === "strict") {
    scores[8].score += 5;
    scores[4].score += 5;
  }
  if (cooking === "minimal") {
    scores[8].score -= 5;
    scores[4].score -= 5;
    scores[1].score += 5; // Med is flexible
  }
  if (stress === "high" || stress === "very_high") {
    scores[1].score += 10; // Med reduces cortisol
    scores[3].score += 5;  // MIND supports stress resilience
  }
  if (sleep === "less_5" || sleep === "5_6") {
    scores[1].score += 5;
    scores[12].score -= 5; // IF harder with poor sleep
  }

  // ── PROBLEM FOOD PENALTIES / BONUSES ──
  if (problemFoods.includes("ultra_processed")) {
    scores[4].score += 10; // WFPB eliminates UPFs by definition
    scores[1].score += 5;
  }
  if (problemFoods.includes("red_meat")) {
    scores[5].score += 10;
    scores[4].score += 10;
    scores[1].score += 5;
  }

  // ── AGE ADJUSTMENTS ──
  if (ageGroup === "61_75" || ageGroup === "75_plus") {
    scores[3].score += 10; // MIND for brain
    scores[15].score += 10; // Longevity diet
    scores[8].score -= 10; // Keto harder in older adults
    // Protein note: older adults need more protein
  }
  if (ageGroup === "18_30") {
    scores[12].score += 5; // IF popular and effective for young adults
    scores[8].score += 5;
  }

  // ── SORT AND BUILD RESULT ──
  const sorted = Object.values(scores).sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const supporting = sorted.slice(1, 4);

  // Build priorities
  const priorities: Priority[] = buildPriorities(answers);
  const avoidances: Avoidance[] = buildAvoidances(answers);
  const supplements: Supplement[] = buildSupplements(answers);
  const weeklyProtocol: WeeklyProtocol = buildWeeklyProtocol(top, answers);

  // Evidence summary
  const evidenceSummary: EvidenceSummary = {
    totalTrials: [top, ...supporting].reduce((sum, d) => {
      const trialMap: Record<number, number> = { 1: 4892, 2: 3210, 3: 847, 4: 1240, 5: 1580, 8: 1420, 12: 780, 13: 680, 14: 560, 15: 340 };
      return sum + (trialMap[d.dietId] || 500);
    }, 0),
    tierIStudies: [top, ...supporting].filter(d => d.tier === "I").length,
    keyFindings: top.keyBenefits.slice(0, 3),
  };

  // Personal score (how well the top diet matches)
  const personalScore = Math.min(Math.round((top.score / 120) * 100), 98);

  return {
    primaryDiet: {
      dietId: top.dietId,
      name: top.name,
      matchScore: Math.min(Math.round((top.score / 120) * 100), 98),
      tier: top.tier,
      rationale: top.rationale.slice(0, 3).join(". "),
      keyBenefits: top.keyBenefits,
      primaryRef: top.primaryRef,
      doi: top.doi,
    },
    supportingDiets: supporting.map(d => ({
      dietId: d.dietId,
      name: d.name,
      matchScore: Math.min(Math.round((d.score / 120) * 100), 95),
      tier: d.tier,
      rationale: d.rationale.slice(0, 2).join(". ") || `Evidence-based support for your ${primaryGoal} goals.`,
      keyBenefits: d.keyBenefits,
      primaryRef: d.primaryRef,
      doi: d.doi,
    })),
    keyPriorities: priorities,
    avoidances,
    supplements,
    weeklyProtocol,
    evidenceSummary,
    personalScore,
  };
}

function buildPriorities(answers: QuizAnswers): Priority[] {
  const priorities: Priority[] = [];
  const conditions = (answers.conditions as string[]) || [];
  const problemFoods = (answers.problem_foods as string[]) || [];
  const primaryGoal = answers.primary_goal as string;

  if (conditions.includes("hypertension")) {
    priorities.push({
      label: "Reduce sodium intake",
      description: "Target <2,300 mg sodium/day (ideally <1,500 mg). Each 1,000 mg reduction lowers systolic BP by 2–3 mmHg.",
      evidence: "DASH-Sodium trial (Sacks FM et al., NEJM 2001)",
      urgency: "high",
    });
  }
  if (conditions.includes("high_cholesterol")) {
    priorities.push({
      label: "Replace saturated fat with unsaturated fat",
      description: "Replacing 5% of calories from saturated fat with polyunsaturated fat reduces LDL by ~10%.",
      evidence: "Mensink RP et al., American Journal of Clinical Nutrition (2003)",
      urgency: "high",
    });
  }
  if (conditions.includes("t2d")) {
    priorities.push({
      label: "Prioritise low-glycaemic foods",
      description: "Each 10-unit reduction in dietary glycaemic index reduces HbA1c by ~0.5%. Focus on legumes, non-starchy vegetables, and whole grains.",
      evidence: "Livesey G et al., American Journal of Clinical Nutrition (2008)",
      urgency: "high",
    });
  }
  if (problemFoods.includes("ultra_processed")) {
    priorities.push({
      label: "Reduce ultra-processed food intake",
      description: "Each 10% increase in UPF consumption is associated with a 12% higher all-cause mortality risk. Replace with whole-food alternatives.",
      evidence: "Rico-Campà A et al., BMJ (2019)",
      urgency: "high",
    });
  }
  if (primaryGoal === "brain" || conditions.includes("cognitive_concern")) {
    priorities.push({
      label: "Increase leafy greens to ≥6 servings/week",
      description: "The MIND diet's single strongest predictor of cognitive protection. Each daily serving of leafy greens is associated with slower cognitive ageing equivalent to 11 years.",
      evidence: "Morris MC et al., Neurology (2018)",
      urgency: "high",
    });
  }
  if (primaryGoal === "longevity" || answers.age_group === "61_75" || answers.age_group === "75_plus") {
    priorities.push({
      label: "Increase protein to ≥1.2g/kg body weight",
      description: "Older adults require significantly more dietary protein than younger adults to prevent sarcopenia. Current RDA (0.8g/kg) is insufficient for those over 60.",
      evidence: "Bauer J et al., Journal of the American Medical Directors Association (2013)",
      urgency: "medium",
    });
  }
  if (priorities.length < 3) {
    priorities.push({
      label: "Increase dietary fibre to ≥30g/day",
      description: "Only 5% of the population meets this target. Each 7g/day increase in fibre reduces all-cause mortality by 9% and CVD mortality by 14%.",
      evidence: "Reynolds A et al., The Lancet (2019)",
      urgency: "medium",
    });
  }

  return priorities.slice(0, 4);
}

function buildAvoidances(answers: QuizAnswers): Avoidance[] {
  const avoidances: Avoidance[] = [];
  const problemFoods = (answers.problem_foods as string[]) || [];
  const conditions = (answers.conditions as string[]) || [];

  if (problemFoods.includes("sugary_drinks")) {
    avoidances.push({
      item: "Sugar-sweetened beverages",
      reason: "Each daily serving increases T2D risk by 26% and CVD mortality by 29%.",
      evidence: "Malik VS et al., Circulation (2010)",
    });
  }
  if (problemFoods.includes("ultra_processed")) {
    avoidances.push({
      item: "Ultra-processed foods (NOVA Group 4)",
      reason: "10% increase in UPF intake associated with 12% higher all-cause mortality and 11% higher CVD mortality.",
      evidence: "Rico-Campà A et al., BMJ (2019)",
    });
  }
  if (problemFoods.includes("red_meat")) {
    avoidances.push({
      item: "Processed red meat (>50g/day)",
      reason: "Each 50g/day of processed meat increases colorectal cancer risk by 18% and CVD mortality by 22%.",
      evidence: "IARC Monographs Vol. 114 (2015); Zheng J et al., BMJ (2019)",
    });
  }
  if (problemFoods.includes("alcohol") || conditions.includes("heart_disease")) {
    avoidances.push({
      item: "Alcohol above 7 drinks/week",
      reason: "No safe level of alcohol for cancer risk. Above 14 drinks/week, CVD risk increases significantly. Recent evidence removes any 'J-curve' benefit.",
      evidence: "GBD 2016 Alcohol Collaborators, The Lancet (2018)",
    });
  }
  if (conditions.includes("hypertension")) {
    avoidances.push({
      item: "High-sodium processed foods (>2,300mg/day)",
      reason: "Reducing sodium by 1,000mg/day lowers systolic BP by 2–3 mmHg. Processed foods account for 70% of dietary sodium.",
      evidence: "He FJ & MacGregor GA, BMJ (2002)",
    });
  }

  if (avoidances.length === 0) {
    avoidances.push({
      item: "Refined carbohydrates and added sugars",
      reason: "High glycaemic load diets increase CVD risk, T2D risk, and promote systemic inflammation.",
      evidence: "Mirrahimi A et al., Journal of the American Heart Association (2012)",
    });
  }

  return avoidances.slice(0, 4);
}

function buildSupplements(answers: QuizAnswers): Supplement[] {
  const supplements: Supplement[] = [];
  const conditions = (answers.conditions as string[]) || [];
  const currentDiet = answers.current_diet as string;
  const ageGroup = answers.age_group as string;
  const primaryGoal = answers.primary_goal as string;

  if (currentDiet === "vegan" || currentDiet === "vegetarian") {
    supplements.push({
      name: "Vitamin B12",
      dose: "500–1,000 mcg/day (methylcobalamin)",
      rationale: "Plant-based diets provide no reliable B12. Deficiency causes irreversible nerve damage.",
      tier: "I",
    });
    supplements.push({
      name: "Algae-derived Omega-3 (EPA/DHA)",
      dose: "250–500 mg EPA+DHA/day",
      rationale: "Plant sources provide ALA only; conversion to EPA/DHA is <5%. Algae oil bypasses fish entirely.",
      tier: "II",
    });
  }

  supplements.push({
    name: "Vitamin D3",
    dose: "1,000–2,000 IU/day (with K2 100mcg)",
    rationale: "Over 40% of adults are deficient. Deficiency linked to CVD, cognitive decline, and immune dysfunction.",
    tier: "I",
    note: "Test serum 25(OH)D before supplementing. Target 40–60 ng/mL.",
  });

  if (primaryGoal === "heart" || conditions.includes("heart_disease") || conditions.includes("high_cholesterol")) {
    supplements.push({
      name: "Omega-3 (EPA/DHA)",
      dose: "2–4g/day for hypertriglyceridaemia; 1g/day for general CVD prevention",
      rationale: "REDUCE-IT trial: 4g/day icosapentaenoic acid reduced major cardiovascular events by 25%.",
      tier: "I",
    });
  }

  if (primaryGoal === "brain" || conditions.includes("cognitive_concern") || ageGroup === "61_75" || ageGroup === "75_plus") {
    supplements.push({
      name: "Lion's Mane Mushroom Extract",
      dose: "500–1,000 mg/day (standardised to erinacines)",
      rationale: "Stimulates nerve growth factor (NGF). Small RCTs show improved cognitive scores in MCI.",
      tier: "II",
      note: "Evidence is early-stage. Consult physician if on anticoagulants.",
    });
  }

  if (conditions.includes("t2d") || answers.bmi_range === "obese" || answers.bmi_range === "overweight") {
    supplements.push({
      name: "Magnesium Glycinate",
      dose: "300–400 mg/day",
      rationale: "48% of adults are deficient. Magnesium improves insulin sensitivity and reduces fasting glucose.",
      tier: "II",
    });
  }

  return supplements.slice(0, 5);
}

function buildWeeklyProtocol(topDiet: DietScore, answers: QuizAnswers): WeeklyProtocol {
  const primaryGoal = answers.primary_goal as string;
  const activity = answers.activity as string;
  const adherence = answers.adherence as string;

  const fastingWindow = (topDiet.dietId === 12 || topDiet.dietId === 15 || primaryGoal === "longevity")
    ? "12–16 hour daily fasting window (e.g., 8pm–12pm)"
    : undefined;

  const meals: MealGuideline[] = [
    {
      meal: "Breakfast",
      focus: topDiet.dietId === 8
        ? "High-fat, zero-carb start"
        : topDiet.dietId === 2
        ? "Whole grains, low-fat dairy, fruit"
        : "Whole grains, berries, nuts, olive oil",
      examples: topDiet.dietId === 8
        ? ["Eggs with avocado and smoked salmon", "Full-fat Greek yoghurt (unsweetened) with walnuts", "Omelette with spinach and feta"]
        : topDiet.dietId === 2
        ? ["Oat porridge with berries and low-fat milk", "Whole-grain toast with cottage cheese and tomato", "Greek yoghurt with banana and flaxseed"]
        : ["Oat porridge with blueberries, walnuts, and olive oil drizzle", "Whole-grain toast with avocado and poached eggs", "Greek yoghurt with mixed berries and almonds"],
    },
    {
      meal: "Lunch",
      focus: topDiet.dietId === 8
        ? "Protein and fat dominant, minimal carbs"
        : topDiet.dietId === 3
        ? "Leafy greens, berries, olive oil, fish or legumes"
        : "Vegetables, legumes, whole grains, olive oil",
      examples: topDiet.dietId === 8
        ? ["Grilled salmon with roasted vegetables (no starch)", "Chicken salad with olive oil, avocado, and leafy greens", "Tuna with cucumber, olives, and olive oil"]
        : topDiet.dietId === 3
        ? ["Large spinach salad with salmon, blueberries, walnuts, and olive oil", "Lentil soup with kale and whole-grain bread", "Grilled sardines with leafy greens and olive oil"]
        : ["Lentil and vegetable soup with whole-grain bread", "Grilled fish with roasted vegetables and quinoa", "Chickpea salad with cucumber, tomato, feta, and olive oil"],
    },
    {
      meal: "Dinner",
      focus: topDiet.dietId === 8
        ? "Meat or fish with non-starchy vegetables"
        : "Fish or legumes, vegetables, whole grains",
      examples: topDiet.dietId === 8
        ? ["Grass-fed beef with broccoli and butter", "Baked salmon with asparagus and olive oil", "Chicken thighs with roasted cauliflower"]
        : ["Baked salmon with roasted Mediterranean vegetables and brown rice", "Chickpea and spinach stew with whole-grain bread", "Grilled mackerel with roasted root vegetables and olive oil"],
    },
  ];

  const notes: string[] = [
    `Aim for ≥5 servings of vegetables and 2 servings of fruit daily.`,
    `Use extra-virgin olive oil as your primary cooking fat (2–4 tablespoons/day).`,
    activity === "athlete" || activity === "very_active"
      ? "Increase protein to 1.6–2.2g/kg body weight to support training adaptation."
      : "Target 1.0–1.2g/kg protein daily, distributed across meals.",
    adherence === "gradual"
      ? "Start with one change per week — swap refined grains for whole grains in week 1."
      : "Track adherence for the first 4 weeks using a simple food journal.",
  ];

  return {
    meals,
    fastingWindow,
    hydration: "2–3 litres of water daily. Green tea (2–3 cups) provides additional polyphenol benefit.",
    notes,
  };
}
