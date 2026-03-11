import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const phases = [
  {
    title: "Phase 1 — Nail the Wedge (0→1)",
    steps: [
      "Pick 1 niche with painful, repeatable app needs.",
      "Publish 10 high-quality starter kits with clear outcomes.",
      "Define acceptance tests for every kit (works, secure, useful).",
      "Target: ≥70% successful first run and <5% refund rate.",
    ],
  },
  {
    title: "Phase 2 — Build Trust Moat",
    steps: [
      "Ship Quality Guardian v1: pre-publish checks + runtime monitoring.",
      "Add contributor trust scores and enforcement ladder.",
      "Show transparent reliability/cost metrics on every listing.",
      "Target: quality consistency becomes a product differentiator.",
    ],
  },
  {
    title: "Phase 3 — Compound Revenue",
    steps: [
      "Monetize with kit sales + usage + premium support/subscriptions.",
      "Improve creator economics so top contributors keep shipping.",
      "Create repeat buyer loops (templates, updates, add-ons).",
      "Target: strong retention + expanding spend per customer.",
    ],
  },
  {
    title: "Phase 4 — Scale with Simplicity",
    steps: [
      "Expand into 2–3 adjacent niches only after wedge traction.",
      "Keep UX simple and fun: fewer clicks, clear outcomes, less setup.",
      "Instrument everything: success, time-to-value, support load, margin.",
      "Target: multi-million revenue with predictable delivery quality.",
    ],
  },
];

const dailyRhythm = [
  "Review roadmap progress (10 min)",
  "Pick one highest-leverage step for today",
  "Assign to subagents in The Bridge",
  "Close loop: log result + next blocker",
];

const marketIntelWorkflow = [
  "Run Market Pattern Intelligence Agent (3 company teardowns: 2 winners + 1 near-winner)",
  "Extract top 5 transferable patterns with evidence",
  "Score Bridge fit (1–10) for each pattern",
  "Commit top 3 actions for the next 7 days",
  "Define KPI + owner + deadline for each action",
];

const productivityStack = [
  "Supabase (The Bridge backend): auth, Postgres, realtime events, row-level security, edge functions",
  "PostHog or Mixpanel: funnel + activation + retention analytics",
  "Sentry: error monitoring and incident triage",
  "n8n + OpenClaw cron: automations, reminders, and operator workflows",
  "Notion: roadmap, decisions, and execution tracking",
  "GitHub + Actions: CI/CD and release reliability",
  "Stripe: monetization instrumentation (conversion, churn, MRR signals)",
];

export default async function RoadmapPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/roadmap">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Roadmap: From Idea to Multi-Million Value Engine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p>
              North Star: Build valuable, high-demand products and experiences — while future-proofing our skills and growing a high-revenue business we’re proud of.
            </p>
          </CardContent>
        </Card>

        {phases.map((phase) => (
          <Card key={phase.title} className="border-zinc-800 bg-[#0c1016]">
            <CardHeader>
              <CardTitle className="text-base">{phase.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-zinc-300">
              {phase.steps.map((step) => (
                <div key={step} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">□ {step}</div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Daily Momentum Loop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {dailyRhythm.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Market Pattern Intelligence Agent (Weekly)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {marketIntelWorkflow.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
            <a
              href="/docs/market-pattern-intelligence-agent.md"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-md border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-500/20"
            >
              Open agent prompt doc
            </a>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Top Tools & Software Stack (Productivity + Efficiency)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {productivityStack.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
