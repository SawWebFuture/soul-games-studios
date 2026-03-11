import { Lightbulb } from "lucide-react";
import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";
import { ideas, totalScore } from "@/lib/ideas";

function statusClass(status: string) {
  if (status === "New") return "border-indigo-500/40 bg-indigo-500/10 text-indigo-300";
  if (status === "Exploring") return "border-amber-500/40 bg-amber-500/10 text-amber-300";
  return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
}

export default async function IdeasPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/ideas">
      <Card className="border-zinc-800 bg-[#0c1016]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl"><Lightbulb size={18} className="text-amber-400" />Ideas Bank</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ideas.map((idea) => (
            <a key={idea.slug} href={`/ideas/${idea.slug}`} className="block rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900/80">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="font-medium">{idea.title}</p>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                    Score {totalScore(idea.score)}/100
                  </span>
                  <span className={`rounded-full border px-2 py-1 text-xs ${statusClass(idea.status)}`}>{idea.status}</span>
                </div>
              </div>
              <p className="text-sm text-zinc-300">{idea.summary}</p>
            </a>
          ))}
        </CardContent>
      </Card>
    </BridgeShell>
  );
}
