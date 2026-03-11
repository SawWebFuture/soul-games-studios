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
  // Required for every idea so score context is always explicit.
  scoreRationale: Record<keyof IdeaScore, string>;
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
    scoreRationale: {
      painkiller:
        "High painkiller potential for creators and buyers who want faster app outcomes with lower trust risk.",
      timeToValue:
        "Fast to first value because starter kits reduce setup friction and can deliver outcomes quickly.",
      repeatUsage:
        "Moderate-high repeat usage if templates are refreshed and teams keep shipping new use cases.",
      unitEconomics:
        "Strong marketplace economics with upside from distribution and quality-layer differentiation.",
      qualityConsistency:
        "Current consistency is moderate due to contributor variance; the Quality Guardian is the key stabilizer.",
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
    scoreRationale: {
      painkiller:
        "Useful internal painkiller for ambiguity and team drift, but less direct as a customer-facing value proposition.",
      timeToValue:
        "Very fast to implement and use; teams can start scoring immediately after launches.",
      repeatUsage:
        "Naturally recurring after each launch, which supports sustained behavioral adoption.",
      unitEconomics:
        "Low-cost system to run, though impact depends on disciplined follow-through on insights.",
      qualityConsistency:
        "High consistency improvement potential when criteria are calibrated and reviewed regularly.",
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
    scoreRationale: {
      painkiller:
        "Helps prevent strategic whiplash and overexposure to single bets, but it is more governance than direct customer painkiller.",
      timeToValue:
        "Moderate setup speed: framework is simple, but requires disciplined planning and categorization.",
      repeatUsage:
        "High recurring usefulness as an ongoing decision filter for weekly/monthly planning.",
      unitEconomics:
        "Improves capital allocation by reducing reckless bets while preserving room for upside.",
      qualityConsistency:
        "Supports steadier output quality by keeping core throughput protected while exploring edges.",
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
    scoreRationale: {
      painkiller:
        "Directly addresses execution chaos by clarifying ownership and reducing coordination drag.",
      timeToValue:
        "Fast to operate because team boundaries are clear and role overlap is intentionally limited.",
      repeatUsage:
        "Designed for daily use as the core operating structure for experiment execution.",
      unitEconomics:
        "High leverage model: small team, high output, lower overhead versus premature org expansion.",
      qualityConsistency:
        "Good consistency with strong handoff protocols, though resilience can dip during spikes or absences.",
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
    scoreRationale: {
      painkiller:
        "Addresses inconsistency pain by ensuring each launch meets core strategic and product requirements.",
      timeToValue:
        "Moderate speed impact: rules add checklist overhead, but reduce downstream revision cycles.",
      repeatUsage:
        "High repeat utility because the pillars apply to every new experiment.",
      unitEconomics:
        "Improves efficiency by preventing costly misses in distribution, capture, and content structure.",
      qualityConsistency:
        "Very high consistency effect since standards normalize quality across the full experiment pipeline.",
    },
  },
];
