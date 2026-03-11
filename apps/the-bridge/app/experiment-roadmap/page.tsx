import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const loop24h = [
  "00:00–02:00 — Select concept + define one core KPI",
  "02:00–08:00 — Build the single-button core interaction",
  "08:00–12:00 — Add reveal payload + collector artifact",
  "12:00–16:00 — Add social share hooks + UTM tracking",
  "16:00–19:00 — Add email subscription capture + welcome flow",
  "19:00–22:00 — QA + launch script + publish checks",
  "22:00–24:00 — Publish, log results, write next-day hypothesis",
];

const growthPillars = [
  {
    title: "Email subscription engine",
    points: [
      "Capture moment: after value reveal, never before first value.",
      "Offer: collector card + subscriber-only easter egg.",
      "Flow: welcome email + next experiment teaser + re-engagement at 48h.",
      "KPI: visitor→subscriber conversion and 7-day subscriber activation.",
    ],
  },
  {
    title: "Social media distribution loop",
    points: [
      "Publish one post-ready asset per platform (LinkedIn, X, Instagram).",
      "Use concrete share artifact: image/card/video clip, not just text.",
      "Include a clear CTA back to experiment entry point.",
      "KPI: share CTR, completion rate, and collaborator invites generated.",
    ],
  },
  {
    title: "Retention + collaboration",
    points: [
      "Design each experiment for repeat behavior within 24–72h.",
      "Add compare/remix/invite hooks to create collaboration loops.",
      "Run 10 weekly retention interviews (active + churn-risk users).",
      "KPI: weekly return rate and % users who invite at least one collaborator.",
    ],
  },
];

const launchGate = [
  "Philosophical concept is explicit and compelling.",
  "Single-button core action works on first run.",
  "Public share path is live and tested.",
  "Email capture is non-coercive and functional.",
  "Collector artifact is generated and downloadable.",
  "Public and subscriber-only easter eggs are reachable.",
  "Tracking events and KPI owner are assigned.",
  "Scott final approval received before scheduling/publishing.",
];

const weeklyCadence = [
  "Monday: choose daily experiment themes for the week",
  "Tuesday–Thursday: run 24-hour flagship loop daily",
  "Friday: review Zone Score trend + KPI trend + retention blockers",
  "Saturday: ship one structural improvement (tooling, onboarding, or QA)",
  "Sunday: reset roadmap priorities and assign next week subagent owners",
];

export default async function ExperimentRoadmapPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/experiment-roadmap">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Experiment-First Roadmap (24-Hour Flagship Loop)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p>
              Mission: turn daily experiments into a compounding growth engine by linking product value,
              social distribution, and subscriber capture in one tight system.
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">24-Hour Build → Publish Loop</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {loop24h.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
          </CardContent>
        </Card>

        {growthPillars.map((pillar) => (
          <Card key={pillar.title} className="border-zinc-800 bg-[#0c1016]">
            <CardHeader><CardTitle className="text-base">{pillar.title}</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-zinc-300">
              {pillar.points.map((point) => (
                <div key={point} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">• {point}</div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Pre-Publish Launch Gate (Must Pass)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {launchGate.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">□ {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Weekly Operating Cadence</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {weeklyCadence.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
