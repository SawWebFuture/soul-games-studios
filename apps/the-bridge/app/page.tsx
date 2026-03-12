import { Activity, Brain, CalendarDays, CheckCircle2, Database, FileText, Flame, Lightbulb, ListChecks, Rocket, ScrollText, Shield, TrendingUp, Wrench } from "lucide-react";
import Image from "next/image";
import { readStore } from "@/lib/store";
import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";
import { SurpriseLinkButton } from "@/components/surprise-link-button";
import { ideas, totalScore } from "@/lib/ideas";

const mvp30DayFocus = [
  "Run 1 flagship experiment/day (or 3–4/week).",
  "Keep one conversion path: email capture after reveal.",
  "Use one distribution loop: YouTube + one social platform.",
  "Track one scoreboard: CTR, completion, email conversion.",
  "Apply kill/scale weekly: pause flat bets, double down on winners.",
];

export default async function HomePage() {
  if (!(await isAuthed())) redirect("/login");
  const store = readStore();

  const running = store.subagents.filter((s) => s.status === "running").length;
  const completed = store.subagents.filter((s) => s.status === "completed").length;
  const latestEvent = [...store.events].sort((a, b) => (a.at < b.at ? 1 : -1))[0];
  const topIdea = [...ideas].sort((a, b) => totalScore(b.score) - totalScore(a.score))[0];

  return (
    <BridgeShell activeHref="/">
      <div className="space-y-5">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Bridge Command View</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <Image src="/images/bridge-warp.jpg" alt="Bridge warp-speed command view" width={1200} height={675} priority className="h-auto w-full object-cover" />
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Rocket size={16} /> Active</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{running}</CardContent></Card>
          <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Shield size={16} /> Completed</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{completed}</CardContent></Card>
          <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Activity size={16} /> Total Events</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{store.events.length}</CardContent></Card>
        </section>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>MVP First — 30 Day Focus</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {mvp30DayFocus.map((item, idx) => (
              <p key={item} className="flex items-center gap-2"><CheckCircle2 size={15} className={idx === 0 ? "text-emerald-400" : "text-indigo-400"} /> {item}</p>
            ))}
            <div className="pt-1">
              <SurpriseLinkButton href="/experiment-roadmap" className="text-xs text-emerald-300 hover:text-emerald-200">Open MVP-aligned experiment roadmap →</SurpriseLinkButton>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Trend is your Friend — Daily Ops</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 text-sm text-zinc-300">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <p className="font-medium flex items-center gap-2"><TrendingUp size={15} /> Daily trend scan + score</p>
              <p className="text-xs text-zinc-400 mt-1">Scan, score, pick top 1–2, convert to one-page game briefs.</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <p className="font-medium flex items-center gap-2"><Flame size={15} /> 48h kill/scale rule</p>
              <p className="text-xs text-zinc-400 mt-1">Scale winners above KPI floors, archive flat experiments fast.</p>
            </div>
            <a href="/experiment-roadmap" className="text-xs text-indigo-300 hover:text-indigo-200 md:col-span-2">View full Trend operating flow →</a>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Top Idea Right Now</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p className="flex items-center gap-2">
              <Lightbulb size={15} className="text-amber-400" />
              <span className="font-medium">{topIdea.title}</span>
            </p>
            <p>{topIdea.summary}</p>
            <p className="text-cyan-300">Score: {totalScore(topIdea.score)}/100</p>
            <a href={`/ideas/${topIdea.slug}`} className="inline-block pt-1 text-xs text-indigo-300 hover:text-indigo-200">Open idea details →</a>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Roadmaps & Content Planning</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <a href="/website-roadmap" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><Wrench size={15} /> Website Roadmap</p>
              <p className="text-xs text-zinc-400 mt-1">Section-by-section build plan + visual prompts.</p>
            </a>
            <a href="/blog-roadmap" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><FileText size={15} /> Blog Roadmap</p>
              <p className="text-xs text-zinc-400 mt-1">10 priority posts optimized for AI search discoverability.</p>
            </a>
            <a href="/calendar" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><CalendarDays size={15} /> Content Calendar</p>
              <p className="text-xs text-zinc-400 mt-1">Weekly publishing cadence, Supabase-ready connection plan.</p>
            </a>
            <a href="/operations" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><ListChecks size={15} /> Operations</p>
              <p className="text-xs text-zinc-400 mt-1">Execution rhythms, ownership, and daily loop controls.</p>
            </a>
            <a href="/prompt-engineering" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900 md:col-span-3">
              <p className="text-sm font-medium flex items-center gap-2"><Brain size={15} /> Prompt Engineering Playbook</p>
              <p className="text-xs text-zinc-400 mt-1">Best practices, reusable templates, anti-patterns, and a monthly update loop.</p>
            </a>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>System Snapshot</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <a href="/subagents" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><ListChecks size={15} /> Subagent Registry</p>
              <p className="text-xs text-zinc-400 mt-1">{running} running · {completed} completed</p>
            </a>
            <a href="/logs" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><ScrollText size={15} /> Logs</p>
              <p className="text-xs text-zinc-400 mt-1">Latest: {latestEvent ? `${latestEvent.type} · ${latestEvent.subagentId}` : "No events yet"}</p>
            </a>
            <a href="/database" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900 md:col-span-2">
              <p className="text-sm font-medium flex items-center gap-2"><Database size={15} /> Database</p>
              <p className="text-xs text-zinc-400 mt-1">Primary core online (bridge-main-01)</p>
            </a>
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
