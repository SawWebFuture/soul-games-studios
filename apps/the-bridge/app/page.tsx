import { Activity, ArrowRight, CheckCircle2, Database, Lightbulb, ListChecks, Rocket, ScrollText, Shield, Wrench } from "lucide-react";
import Image from "next/image";
import { readStore } from "@/lib/store";
import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";
import { ideas, totalScore } from "@/lib/ideas";

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
          <CardHeader><CardTitle>Section Summary</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <a href="/subagents" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><ListChecks size={15} /> Subagent Registry</p>
              <p className="text-xs text-zinc-400 mt-1">{running} running · {completed} completed</p>
            </a>
            <a href="/logs" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><ScrollText size={15} /> Logs</p>
              <p className="text-xs text-zinc-400 mt-1">Latest: {latestEvent ? `${latestEvent.type} · ${latestEvent.subagentId}` : "No events yet"}</p>
            </a>
            <a href="/database" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><Database size={15} /> Database</p>
              <p className="text-xs text-zinc-400 mt-1">Primary core online (bridge-main-01)</p>
            </a>
            <a href="/operations" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900">
              <p className="text-sm font-medium flex items-center gap-2"><Wrench size={15} /> Operations</p>
              <p className="text-xs text-zinc-400 mt-1">Daily loop + KPI + 70/20/10 portfolio active</p>
            </a>
            <a href="/ideas" className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900 md:col-span-2">
              <p className="text-sm font-medium flex items-center gap-2"><Lightbulb size={15} /> Ideas Bank</p>
              <p className="text-xs text-zinc-400 mt-1">Includes marketplace + quality guardian concept and prior strategic ideas</p>
            </a>
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
            <div>
              <a href="/experiment-roadmap" className="inline-block pt-1 text-xs text-emerald-300 hover:text-emerald-200">Open experiment roadmap →</a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Top 3 Roadmap Next Steps</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-400" /> Pick 1 niche with painful, repeatable app needs.</p>
            <p className="flex items-center gap-2"><ArrowRight size={15} className="text-indigo-400" /> Publish 10 high-quality starter kits with clear outcomes.</p>
            <p className="flex items-center gap-2"><ArrowRight size={15} className="text-indigo-400" /> Ship Quality Guardian v1 (pre-publish checks + runtime monitoring).</p>
            <a href="/roadmap" className="inline-block pt-2 text-xs text-indigo-300 hover:text-indigo-200">View full roadmap →</a>
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
