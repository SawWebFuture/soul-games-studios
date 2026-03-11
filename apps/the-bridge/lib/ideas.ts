export type IdeaScore = {
  painkiller: number;
  timeToValue: number;
  repeatUsage: number;
  unitEconomics: number;
  qualityConsistency: number;
};

export type Idea = {
  slug: string;
  title: string;
  status: "New" | "Active" | "Exploring";
  summary: string;
  pros: string[];
  cons: string[];
  score: IdeaScore;
  scoreRationale?: Partial<Record<keyof IdeaScore, string>>;
};

export const scoreWeights = {
  painkiller: 25,
  timeToValue: 20,
  repeatUsage: 20,
  unitEconomics: 20,
  qualityConsistency: 15,
} as const;

export function totalScore(score: IdeaScore) {
  return Math.round(
    (score.painkiller / 10) * scoreWeights.painkiller +
      (score.timeToValue / 10) * scoreWeights.timeToValue +
      (score.repeatUsage / 10) * scoreWeights.repeatUsage +
      (score.unitEconomics / 10) * scoreWeights.unitEconomics +
      (score.qualityConsistency / 10) * scoreWeights.qualityConsistency,
  );
}

export const ideas: Idea[] = [
  {
    slug: "openclaw-starter-marketplace",
    title: "OpenClaw App Starter Marketplace + Quality Guardian",
    status: "New",
    summary:
      "Marketplace where contributors sell app starter kits; users buy outcomes. Add an AI Quality Guardian for pre-publish checks, runtime quality, and trust scoring.",
    pros: [
      "Strong marketplace upside with contributor flywheel",
      "Fits high-demand trend of AI-assisted app creation",
      "Quality Guardian can become trust moat",
    ],
    cons: [
      "Quality variance can create refund/support risk",
      "Needs strong abuse and policy controls",
      "Hard to scale if outcomes are inconsistent",
    ],
    score: {
      painkiller: 8,
      timeToValue: 8,
      repeatUsage: 7,
      unitEconomics: 8,
      qualityConsistency: 6,
    },
  },
  {
    slug: "daily-flagship-loop",
    title: "24-hour flagship experiment loop",
    status: "Active",
    summary:
      "Run one flagship experiment per day from idea → publish → learnings to compound speed and execution quality.",
    pros: ["Builds execution muscle fast", "Creates compounding learning loop", "Forces clear prioritization"],
    cons: ["Can sacrifice depth for speed", "Risk of burnout without guardrails", "Needs strict postmortem discipline"],
    score: {
      painkiller: 7,
      timeToValue: 9,
      repeatUsage: 9,
      unitEconomics: 7,
      qualityConsistency: 7,
    },
    scoreRationale: {
      painkiller:
        "Strong internal painkiller for execution drift: creates daily focus and reduces context switching, but not yet an external customer painkiller by itself.",
      timeToValue:
        "Very high time-to-value: the team can ship, learn, and adjust in one day, which compounds quickly.",
      repeatUsage:
        "Designed for daily repetition; cadence itself creates habit loops and a reliable learning rhythm.",
      unitEconomics:
        "Good economics because it reuses the same team/system daily, though quality costs can rise if rushed experiments increase rework.",
      qualityConsistency:
        "Moderate-high consistency when guardrails are followed (clear QA + postmortem), but quality can dip under speed pressure.",
    },
  },
  {
    slug: "zone-score-system",
    title: "Zone Score performance system",
    status: "Active",
    summary:
      "Track Clarity, Speed, Energy, and Quality (1–10) after each launch and optimize trend weekly.",
    pros: ["Improves team self-awareness", "Easy to run daily", "Supports better retrospective decisions"],
    cons: ["Can become subjective without calibration", "May miss hard business metrics", "Needs consistent cadence"],
    score: {
      painkiller: 6,
      timeToValue: 8,
      repeatUsage: 8,
      unitEconomics: 6,
      qualityConsistency: 8,
    },
  },
  {
    slug: "portfolio-702010",
    title: "70/20/10 experiment portfolio",
    status: "Active",
    summary:
      "Split experiments across proven formats (70%), adjacent bets (20%), and wildcards (10%) for balanced growth.",
    pros: ["Balances risk and upside", "Protects core while exploring", "Prevents all-in betting"],
    cons: ["Can overcomplicate planning", "Requires strong idea pipeline", "May slow rapid pivots"],
    score: {
      painkiller: 6,
      timeToValue: 7,
      repeatUsage: 8,
      unitEconomics: 7,
      qualityConsistency: 8,
    },
  },
  {
    slug: "lean-4-agent-model",
    title: "Lean 4-agent operating model",
    status: "Active",
    summary:
      "Operate with Reggie + OpenHands Engineer + Content Agent + Ops Agent; add Research Agent after stable cadence.",
    pros: ["Clear ownership and focus", "Lower coordination overhead", "Scales with staged specialization"],
    cons: ["Single points of failure in small team", "Role bottlenecks during spikes", "Requires tight handoff protocols"],
    score: {
      painkiller: 7,
      timeToValue: 8,
      repeatUsage: 8,
      unitEconomics: 8,
      qualityConsistency: 7,
    },
  },
  {
    slug: "experiment-rule-pillars",
    title: "Standardized experiment rule pillars",
    status: "Active",
    summary:
      "Every experiment includes philosophy, single-button action, social share, email capture, collectors card, and public/subscriber easter eggs.",
    pros: ["Raises consistency across launches", "Improves brand and product coherence", "Makes QA easier"],
    cons: ["Could restrict creativity", "May not fit all experiment types", "Needs regular rule updates"],
    score: {
      painkiller: 7,
      timeToValue: 7,
      repeatUsage: 8,
      unitEconomics: 7,
      qualityConsistency: 9,
    },
  },
];
