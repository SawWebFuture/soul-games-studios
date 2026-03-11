import { Database, Gauge, LayoutGrid, Logs, Menu, Search, Settings, Workflow, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type Item = { label: string; href: string; icon: any };

const navItems: Item[] = [
  { label: "Project Overview", icon: LayoutGrid, href: "/" },
  { label: "Subagent Registry", icon: Workflow, href: "/subagents" },
  { label: "Database", icon: Database, href: "/database" },
  { label: "Logs", icon: Logs, href: "/logs" },
  { label: "Operations", icon: Wrench, href: "/operations" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Ideas Bank", icon: Gauge, href: "/ideas" },
];

export function BridgeShell({ activeHref, children }: { activeHref: string; children: ReactNode }) {
  const current = navItems.find((i) => i.href === activeHref);

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
              <a
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                  item.href === activeHref
                    ? "bg-zinc-800/90 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <section className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#0a0d12]/95 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <a href="/" className="text-sm text-zinc-300 hover:text-white">The Bridge</a>
                <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  PRODUCTION
                </span>
              </div>
              <div className="flex items-center gap-2">
                <details className="relative md:hidden">
                  <summary className="list-none cursor-pointer rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-300">
                    <Menu size={16} />
                  </summary>
                  <div className="absolute right-0 mt-2 w-64 space-y-1 rounded-lg border border-zinc-800 bg-[#0d1118] p-3 shadow-2xl">
                    {navItems.map((item) => (
                      <a key={item.label} href={item.href} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800/80">
                        <item.icon size={14} />
                        {item.label}
                      </a>
                    ))}
                    <form action="/api/auth/logout" method="post" className="pt-2">
                      <Button variant="secondary" className="w-full border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Logout</Button>
                    </form>
                  </div>
                </details>
                <div className="hidden items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-2 py-1 text-zinc-400 md:flex">
                  <Search size={14} /><span className="text-xs">Search</span>
                </div>
                <form action="/api/auth/logout" method="post" className="hidden md:block">
                  <Button variant="secondary" className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Logout</Button>
                </form>
              </div>
            </div>
          </header>

          {activeHref !== "/" ? (
            <div className="border-b border-zinc-800/70 bg-[#0a0d12]/70 px-4 py-2 text-xs text-zinc-400 md:px-6">
              <a href="/" className="hover:text-zinc-200">Home</a>
              {current ? (
                <>
                  <span className="mx-2 text-zinc-600">/</span>
                  <a href={current.href} className="hover:text-zinc-200">{current.label}</a>
                </>
              ) : null}
            </div>
          ) : null}

          <div className="p-4 md:p-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
