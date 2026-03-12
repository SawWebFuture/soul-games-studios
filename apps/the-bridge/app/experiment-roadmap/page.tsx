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
    title: "YouTube announcement → next project bridge",
    points: [
      "Publish one YouTube video per experiment launch (concept + reveal + lesson).",
      "End every video with a hard handoff CTA to the next project/experiment.",
      "Description must include: current experiment link, next project waitlist/link, and subscriber CTA.",
      "Pin a comment with 'next mission' and deadline to create continuity.",
      "KPI: YouTube CTR to next project, watch-to-click rate, and subscribers gained per video.",
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
  "Collector artifact set is complete (3 standard + 1 rare + 1 subscriber-only) and downloadable.",
  "Public and subscriber-only easter eggs are reachable.",
  "Tracking events and KPI owner are assigned.",
  "YouTube announcement assets are ready (title, thumbnail, CTA to next project, pinned comment).",
  "Scott final approval received before scheduling/publishing.",
];

const weeklyCadence = [
  "Monday: choose daily experiment themes for the week",
  "Tuesday–Thursday: run 24-hour flagship loop daily + publish YouTube launch video",
  "Friday: review Zone Score trend + KPI trend + retention blockers",
  "Saturday: ship one structural improvement (tooling, onboarding, or QA)",
  "Sunday: reset roadmap priorities and assign next week subagent owners",
];

const collectibleCardFlow = [
  "Card set size per experiment: 5 total cards (3 standard + 1 rare + 1 subscriber-only secret).",
  "Guaranteed drop: user always earns 1 standard card at reveal completion.",
  "Chance layer: 20% chance rare card on first completion; +10% luck bonus on second completion in 24h.",
  "Subscriber path: unlock subscriber-only secret card after email confirmation + subscriber easter completion.",
  "Distribution outputs: downloadable PNG card + social caption + unique card ID.",
  "Data model: experiment_slug, card_id, rarity, unlocked_at, source_channel, user_identifier.",
  "Quality gate: every card must pass readability, mobile crop safety, and brand consistency checks.",
];

const collectibleCardKpis = [
  "Reveal→Card claim rate target: ≥75%",
  "Card claim→Share rate target: ≥25%",
  "Card claim→Email subscription target: ≥18%",
  "Subscriber secret card unlock target: ≥35% of new subscribers",
  "7-day return for collectors target: ≥30%",
];

const websiteRollout = [
  "Phase 1 (Now): launch stable home website with experiments index + experiment detail pages + primary subscribe CTA.",
  "Phase 1 (Now): wire analytics for visit→experiment click→email subscription funnel.",
  "Phase 2 (Next): launch merch storefront with 3–5 hero products linked to experiment themes.",
  "Phase 2 (Next): add subscriber portal for early drops, secret cards, and private easter unlocks.",
  "Phase 3 (Scale): build collector profile/progress view across all experiments.",
  "Phase 3 (Scale): tie YouTube/social traffic directly to next mission pages on-site.",
];

const websiteKpis = [
  "Home→Experiment CTR target: ≥35%",
  "Experiment visitor→Email subscription target: ≥18%",
  "Subscriber→Merch conversion target: ≥3% (initial)",
  "Returning visitor rate (7-day) target: ≥25%",
];

const websiteBaseReview = [
  "Already solid: Next.js site foundation, branded homepage, hero/about/features sections, SEO metadata, sitemap and robots.",
  "Already solid: waitlist UI exists and is wired to POST /api/waitlist from the frontend.",
  "Gap to fix first: /api/waitlist backend route is missing, so subscribe flow can fail in production.",
  "Gap to fix next: experiments are shown as cards/text, but no dedicated experiment index/detail routes yet.",
  "Gap to fix next: merch storefront and subscriber portal routes are not yet implemented.",
  "Gap to fix next: YouTube -> next mission tracking links/UTM standardization not yet visible on site.",
];

const websiteBuildRoadmap = [
  "Sprint 1 (Critical): implement /api/waitlist with storage + spam protection + confirmation message tracking.",
  "Sprint 1 (Critical): create /experiments index page with live experiment entries and status badges.",
  "Sprint 1 (Critical): create /experiments/[slug] detail pages with play CTA + share + email capture.",
  "Sprint 2 (Revenue): launch /shop with 3–5 themed merch SKUs mapped to experiment universes.",
  "Sprint 2 (Retention): launch /portal for subscribers (secret cards, early drops, private easter unlocks).",
  "Sprint 2 (Acquisition): add YouTube handoff blocks on homepage + experiment pages (next mission links).",
  "Sprint 3 (Optimization): add dashboard metrics for funnel conversion by channel/campaign.",
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
          <CardHeader><CardTitle className="text-base">Collectible Card System (Drilldown)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {collectibleCardFlow.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
            <div className="pt-1 text-xs uppercase tracking-wide text-zinc-400">KPI Targets</div>
            {collectibleCardKpis.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">• {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Soul Games Studios Website Rollout</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {websiteRollout.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
            <div className="pt-1 text-xs uppercase tracking-wide text-zinc-400">Website KPI Targets</div>
            {websiteKpis.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">• {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Website Base Review + Build Roadmap (from /website)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <div className="pt-1 text-xs uppercase tracking-wide text-zinc-400">Current Base Review</div>
            {websiteBaseReview.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">• {item}</div>
            ))}
            <div className="pt-2 text-xs uppercase tracking-wide text-zinc-400">Execution Roadmap</div>
            {websiteBuildRoadmap.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
            <div className="pt-2 text-xs uppercase tracking-wide text-zinc-400">Content planning</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ Blog content backlog and outlines are tracked in <a href="/blog-roadmap" className="text-indigo-300 hover:text-indigo-200">/blog-roadmap</a>.</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ Weekly publishing schedule and Supabase connection plan are tracked in <a href="/calendar" className="text-indigo-300 hover:text-indigo-200">/calendar</a>.</div>
          </CardContent>
        </Card>

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
