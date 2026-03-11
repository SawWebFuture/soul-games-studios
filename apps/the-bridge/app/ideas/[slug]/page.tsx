import { isAuthed } from "@/lib/auth";
import { ideas, scoreWeights, totalScore } from "@/lib/ideas";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

export default async function IdeaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthed())) redirect("/login");
  const { slug } = await params;
  const idea = ideas.find((i) => i.slug === slug);
  if (!idea) notFound();

  return (
    <BridgeShell activeHref="/ideas">
      <div className="space-y-4">
        <a href="/ideas" className="text-xs text-zinc-400 hover:text-zinc-200">← Back to Ideas</a>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p>{idea.summary}</p>
            <p className="text-cyan-300">Total Score: {totalScore(idea.score)}/100</p>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="border-zinc-800 bg-[#0c1016]">
            <CardHeader><CardTitle className="text-base">Pros</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-zinc-300">
              {idea.pros.map((p) => <div key={p} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">+ {p}</div>)}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-[#0c1016]">
            <CardHeader><CardTitle className="text-base">Cons</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-zinc-300">
              {idea.cons.map((c) => <div key={c} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">- {c}</div>)}
            </CardContent>
          </Card>
        </section>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Score Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">Painkiller use case: {idea.score.painkiller}/10 · weight {scoreWeights.painkiller}%</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">Time-to-value: {idea.score.timeToValue}/10 · weight {scoreWeights.timeToValue}%</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">Repeat usage: {idea.score.repeatUsage}/10 · weight {scoreWeights.repeatUsage}%</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">Unit economics: {idea.score.unitEconomics}/10 · weight {scoreWeights.unitEconomics}%</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">Quality consistency: {idea.score.qualityConsistency}/10 · weight {scoreWeights.qualityConsistency}%</div>
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
