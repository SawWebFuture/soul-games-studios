import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const posts = [
  {
    title: "How to Run a 24-Hour AI Experiment Loop (Daily, Without Burning Out)",
    outline: ["What the loop is", "Hour-by-hour breakdown", "Launch checklist", "Burnout guardrails", "KPI dashboard template"],
  },
  {
    title: "Zone Score Framework: Measure Clarity, Speed, Energy, Quality After Every Launch",
    outline: ["Why output-only metrics fail", "Scoring rubric", "Weekly review process", "Trend interpretation"],
  },
  {
    title: "The Experiment Rule Pillars: A Repeatable Blueprint for High-Quality Launches",
    outline: ["The 7 pillars", "Why each matters", "Failure patterns", "Pre-publish QA checklist"],
  },
  {
    title: "How to Turn One Experiment into Social + Email + YouTube Growth Loops",
    outline: ["One artifact, three channels", "Format map", "Tracking links", "Attribution basics"],
  },
  {
    title: "Collectible Cards as Retention Infrastructure (Not Just Gamification)",
    outline: ["Why cards work", "Rarity model", "Unlock logic", "Retention KPI targets"],
  },
  {
    title: "Building an AI-Native Studio Operating System (Lean 4-Agent Model)",
    outline: ["Role split", "Handoffs", "Daily rituals", "Scale trigger"],
  },
  {
    title: "Website Funnel for AI Experiments: Homepage → Experiment → Subscribe → Revenue",
    outline: ["Funnel architecture", "Required pages", "CTA placement", "Benchmarks"],
  },
  {
    title: "YouTube Announcement Framework: Launch This Experiment, Then Bridge to the Next",
    outline: ["Video structure", "Description template", "Pinned comment strategy", "Watch-to-click KPI"],
  },
  {
    title: "SEO for AI Search (Gemini, ChatGPT, Perplexity): How to Become Citable",
    outline: ["How AI picks sources", "Citation-friendly structure", "Schema", "90-day plan"],
  },
  {
    title: "From Experiments to Revenue: A Practical Ladder for Creator-Led AI Products",
    outline: ["Revenue ladder", "Offer design", "Pricing validation", "When to add merch/portal"],
  },
];

const fourWeekPlan = [
  "Week 1: posts #1, #2, #3",
  "Week 2: posts #4, #5",
  "Week 3: posts #6, #7, #8",
  "Week 4: posts #9, #10 + monthly recap post",
];

export default async function BlogRoadmapPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/blog-roadmap">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Blog Roadmap — AI Search + Growth Content</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p>Canonical content engine for search visibility, trust, and conversion into experiments/subscribers.</p>
            <a href="/calendar" className="text-xs text-indigo-300 hover:text-indigo-200">Open content calendar →</a>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">10-Post Priority Backlog</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {posts.map((post, idx) => (
              <div key={post.title} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
                <p className="text-zinc-100">#{idx + 1} {post.title}</p>
                <div className="mt-1 space-y-1">
                  {post.outline.map((item) => (
                    <p key={item} className="text-xs text-zinc-400">• {item}</p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">4-Week Publishing Cadence</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {fourWeekPlan.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
