import { isAuthed } from "@/lib/auth";
import { readStore } from "@/lib/store";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LogsPage() {
  if (!(await isAuthed())) redirect("/login");
  const store = readStore();
  const sortedEvents = [...store.events].sort((a, b) => (a.at < b.at ? 1 : -1));

  return (
    <main className="min-h-screen bg-[#090b10] p-4 text-zinc-100 md:p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Logs</CardTitle></CardHeader>
          <CardContent className="space-y-3 max-h-[70vh] overflow-auto">
            {sortedEvents.map((e) => (
              <div key={e.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                <p className="text-sm font-medium">{e.type} · {e.subagentId}</p>
                <p className="text-xs text-zinc-500">{e.at}</p>
                <p className="text-sm text-zinc-300">{e.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
