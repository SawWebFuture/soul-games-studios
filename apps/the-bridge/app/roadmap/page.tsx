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
      </div>
    </BridgeShell>
  );
}
