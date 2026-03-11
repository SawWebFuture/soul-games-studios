import { Activity, Database, Gauge, LayoutGrid, Logs, Menu, Rocket, Search, Settings, Shield, Workflow, Wrench } from "lucide-react";
import { readStore } from "@/lib/store";
import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Project Overview", icon: LayoutGrid, href: "/", active: true },
  { label: "Subagent Registry", icon: Workflow, href: "/subagents" },
  { label: "Database", icon: Database, href: "/database" },
  { label: "Logs", icon: Logs, href: "/logs" },
  { label: "Operations", icon: Wrench, href: "/operations" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Ideas Bank", icon: Gauge, href: "/ideas" },
];

export default async function HomePage() {
  if (!(await isAuthed())) redirect("/login");
  const store = readStore();

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
              <a key={item.label} href={item.href} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition ${item.active ? "bg-zinc-800/90 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}>
                <item.icon size={15} />{item.label}
              </a>
            ))}
          </nav>
        </aside>

        <section className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-[#0a0d12]/95 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <p className="text-sm text-zinc-300">The Bridge</p>
                <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">PRODUCTION</span>
              </div>
              <div className="flex items-center gap-2">
                <details className="relative md:hidden">
                  <summary className="list-none rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 cursor-pointer"><Menu size={16} /></summary>
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-zinc-800 bg-[#0d1118] p-3 shadow-2xl space-y-1">
                    {navItems.map((item) => <a key={item.label} href={item.href} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800/80"><item.icon size={14} />{item.label}</a>)}
                    <form action="/api/auth/logout" method="post" className="pt-2"><Button variant="secondary" className="w-full border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Logout</Button></form>
                  </div>
                </details>
                <div className="hidden items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-2 py-1 text-zinc-400 md:flex"><Search size={14} /><span className="text-xs">Search</span></div>
                <form action="/api/auth/logout" method="post" className="hidden md:block"><Button variant="secondary" className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Logout</Button></form>
              </div>
            </div>
          </header>

          <div className="space-y-5 p-4 md:p-6">
            <section className="grid gap-4 md:grid-cols-3">
              <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Rocket size={16} /> Active</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{store.subagents.filter((s) => s.status === "running").length}</CardContent></Card>
              <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Shield size={16} /> Completed</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{store.subagents.filter((s) => s.status === "completed").length}</CardContent></Card>
              <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Activity size={16} /> Total Events</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{store.events.length}</CardContent></Card>
            </section>

            <Card className="border-zinc-800 bg-[#0c1016]">
              <CardHeader><CardTitle>Section Pages</CardTitle></CardHeader>
              <CardContent className="grid gap-2 md:grid-cols-3 text-sm">
                {navItems.filter((n) => n.href !== "/").map((item) => (
                  <a key={item.href} href={item.href} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900 flex items-center gap-2"><item.icon size={14} /> {item.label}</a>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
