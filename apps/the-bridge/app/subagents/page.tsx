import { isAuthed } from "@/lib/auth";
import { readStore } from "@/lib/store";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function statusClass(status: string) {
  if (status === "running") return "bg-blue-500/20 text-blue-300 border-blue-400/40";
  if (status === "completed") return "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
  if (status === "failed") return "bg-red-500/20 text-red-300 border-red-400/40";
  return "bg-zinc-500/20 text-zinc-300 border-zinc-400/40";
}

export default async function SubagentsPage() {
  if (!(await isAuthed())) redirect("/login");
  const store = readStore();

  return (
    <main className="min-h-screen bg-[#090b10] p-4 text-zinc-100 md:p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Subagent Registry</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {store.subagents.map((a) => (
              <div key={a.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{a.role}</p>
                  <span className={`text-xs px-2 py-1 rounded-full border ${statusClass(a.status)}`}>{a.status}</span>
                </div>
                <p className="text-xs text-zinc-500">{a.id}</p>
                <p className="text-xs text-zinc-500">Created: {a.createdAt}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
