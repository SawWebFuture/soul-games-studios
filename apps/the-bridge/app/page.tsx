import {
  Activity,
  BookOpen,
  CalendarCheck2,
  CircleDot,
  Database,
  Gauge,
  LayoutGrid,
  Logs,
  Rocket,
  Search,
  Menu,
  Settings,
  Shield,
  Target,
  Workflow,
  Wrench,
} from "lucide-react";
import Image from "next/image";
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

function subagentEmoji(role: string) {
  const key = role.toLowerCase();
  if (key.includes("content")) return "✍️";
  if (key.includes("ops") || key.includes("operation")) return "🛠️";
  if (key.includes("engineer") || key.includes("openhands")) return "🧠";
  if (key.includes("strategy")) return "🧭";
  if (key.includes("research")) return "🔬";
  return "🤖";
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

const navItems = [
  { label: "Project Overview", icon: LayoutGrid, active: true },
  { label: "Subagent Registry", icon: Workflow },
  { label: "Database", icon: Database },
  { label: "Logs", icon: Logs },
  { label: "Operations", icon: Wrench },
  { label: "Settings", icon: Settings },
];

export default async function HomePage() {
  if (!(await isAuthed())) redirect("/login");

  const store = readStore();
  const sortedEvents = [...store.events].sort((a, b) => (a.at < b.at ? 1 : -1));

  return (
    <main className="min-h-screen bg-[#090b10] text-zinc-100">
      <div className="grid min-h-screen md:grid-cols-[250px_1fr]">
        <aside className="hidden border-r border-zinc-800/80 bg-[#0a0d12] p-4 md:block">
          <div className="mb-6 flex items-center gap-2 px-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-sm font-semibold">Soul Games Studios</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                  item.active ? "bg-zinc-800/90 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-[#0a0d12]/95 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <p className="text-sm text-zinc-300">The Bridge</p>
                <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  PRODUCTION
                </span>
              </div>

              <div className="flex items-center gap-2">
                <details className="relative md:hidden">
                  <summary className="list-none rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 cursor-pointer">
                    <Menu size={16} />
                  </summary>
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-zinc-800 bg-[#0d1118] p-3 shadow-2xl">
                    <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">Navigation</p>
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <a key={item.label} href="#" className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800/80">
                          <item.icon size={14} />
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="mt-3 border-t border-zinc-800 pt-3 space-y-2">
                      <a href="/ideas" className="block rounded-md border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-500/20 text-center">
                        Ideas Bank
                      </a>
                      <form action="/api/auth/logout" method="post">
                        <Button variant="secondary" className="w-full border-zinc-700 bg-zinc-900 hover:bg-zinc-800">
                          Logout
                        </Button>
                      </form>
                    </div>
                  </div>
                </details>

                <a href="/ideas" className="hidden rounded-md border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-300 hover:bg-indigo-500/20 md:inline-block">
                  Ideas Bank
                </a>
                <div className="hidden items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-2 py-1 text-zinc-400 md:flex">
                  <Search size={14} />
                  <span className="text-xs">Search</span>
                </div>
                <form action="/api/auth/logout" method="post" className="hidden md:block">
                  <Button variant="secondary" className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800">
                    Logout
                  </Button>
                </form>
              </div>
            </div>
          </header>

          <div className="space-y-5 p-4 md:p-6">
            <section className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader>
                  <CardTitle className="text-lg">Bridge Command View</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border border-zinc-800">
                    <Image
                      src="/images/bridge-warp.jpg"
                      alt="Bridge warp-speed command view"
                      width={1200}
                      height={675}
                      priority
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader>
                  <CardTitle className="text-lg">Primary Core</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-[#0a0d12]">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(113,113,122,0.35) 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                      }}
                    />
                    <div className="relative w-[280px] rounded-lg border border-zinc-700 bg-zinc-900/80 p-4 shadow-2xl">
                      <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                        <Database size={16} className="text-emerald-400" />
                        Primary Database
                      </div>
                      <p className="text-xs text-zinc-400">US East (North Virginia)</p>
                      <p className="text-xs text-zinc-500">bridge-main-01 · t4g.nano</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2"><Rocket size={16} /> Active</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-semibold">
                  {store.subagents.filter((s) => s.status === "running").length}
                </CardContent>
              </Card>
              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2"><Shield size={16} /> Completed</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-semibold">
                  {store.subagents.filter((s) => s.status === "completed").length}
                </CardContent>
              </Card>
              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2"><Activity size={16} /> Total Events</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-semibold">{store.events.length}</CardContent>
              </Card>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader><CardTitle>Subagents</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {store.subagents.map((a) => (
                    <div key={a.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{subagentEmoji(a.role)} {a.role}</p>
                        <span className={`text-xs px-2 py-1 rounded-full border ${statusClass(a.status)}`}>{a.status}</span>
                      </div>
                      <p className="text-xs text-zinc-500">{a.id}</p>
                      <p className="text-xs text-zinc-500">Created: {a.createdAt}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader><CardTitle>Event Timeline</CardTitle></CardHeader>
                <CardContent className="max-h-[420px] space-y-3 overflow-auto">
                  {sortedEvents.map((e) => (
                    <div key={e.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                      <p className="text-sm font-medium">{e.type} · {e.subagentId}</p>
                      <p className="text-xs text-zinc-500">{e.at}</p>
                      <p className="text-sm text-zinc-300">{e.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-4 xl:grid-cols-2">
              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2"><Target size={16} /> Goal Improvement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {goalUpgrades.map((item) => (
                    <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 text-sm text-zinc-300">
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-[#0c1016]">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2"><CalendarCheck2 size={16} /> Daily Captain&apos;s Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dailyReportTemplate.map((item) => (
                    <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 text-sm text-zinc-300">
                      □ {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <Card className="border-zinc-800 bg-[#0c1016]">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2"><BookOpen size={16} /> Training Briefs</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 md:grid-cols-3 text-sm">
                <a className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900" href="/docs/strategy-agent-training-brief.md" target="_blank" rel="noreferrer">Strategy Agent Brief</a>
                <a className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900" href="/docs/content-agent-training-brief.md" target="_blank" rel="noreferrer">Content Agent Brief</a>
                <a className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900" href="/docs/ops-agent-training-brief.md" target="_blank" rel="noreferrer">Ops Agent Brief</a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
