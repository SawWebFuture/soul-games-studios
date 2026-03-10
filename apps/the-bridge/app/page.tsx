import { Rocket, Shield, Activity, Target, CalendarCheck2 } from "lucide-react";
import { readStore } from "@/lib/store";
import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function statusClass(status: string) {
  if (status === "running") return "bg-blue-500/20 text-blue-300 border-blue-400/40";
  if (status === "completed") return "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
  if (status === "failed") return "bg-red-500/20 text-red-300 border-red-400/40";
  return "bg-zinc-500/20 text-zinc-300 border-zinc-400/40";
}

const goalUpgrades = [
  "Run 1 flagship experiment/day with a strict 24-hour loop from idea → publish → learnings.",
  "Track Zone Score daily (Clarity, Speed, Energy, Quality) and review trend every Friday.",
  "Enforce one core KPI per experiment (CTR, saves, email opt-in, or completion) to avoid noisy decisions.",
  "Use a 70/20/10 portfolio: 70% proven formats, 20% adjacent bets, 10% wildcards.",
];

const dailyReportTemplate = [
  "Top 3 wins",
  "Top 3 blockers",
  "KPI snapshot (today vs yesterday)",
  "Highest-leverage next action",
  "Risk alert + mitigation",
];

export default function HomePage() {
  if (!isAuthed()) redirect("/login");

  const store = readStore();
  const sortedEvents = [...store.events].sort((a, b) => (a.at < b.at ? 1 : -1));

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">The Bridge</h1>
          <p className="text-muted-foreground">Command center for sub-agent operations.</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <Button variant="secondary">Logout</Button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Rocket size={16} /> Active</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{store.subagents.filter((s) => s.status === "running").length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Shield size={16} /> Completed</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{store.subagents.filter((s) => s.status === "completed").length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Activity size={16} /> Total Events</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{store.events.length}</CardContent>
        </Card>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Subagents</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {store.subagents.map((a) => (
              <div key={a.id} className="rounded-lg border border-border p-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{a.role}</p>
                  <span className={`text-xs px-2 py-1 rounded-full border ${statusClass(a.status)}`}>{a.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{a.id}</p>
                <p className="text-xs text-muted-foreground">Created: {a.createdAt}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Event Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-3 max-h-[420px] overflow-auto">
            {sortedEvents.map((e) => (
              <div key={e.id} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{e.type} · {e.subagentId}</p>
                <p className="text-xs text-muted-foreground">{e.at}</p>
                <p className="text-sm">{e.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2"><Target size={16} /> Goal Improvement Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {goalUpgrades.map((item) => (
              <div key={item} className="text-sm rounded-md border border-border p-3">{item}</div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2"><CalendarCheck2 size={16} /> Daily Captain&apos;s Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs text-muted-foreground">Fill this once per day to keep execution aligned and compounding.</p>
            {dailyReportTemplate.map((item) => (
              <div key={item} className="text-sm rounded-md border border-border p-3">□ {item}</div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
