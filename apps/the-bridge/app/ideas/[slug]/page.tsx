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
            <div className="rounded-md border border-indigo-500/40 bg-indigo-500/10 p-3 text-indigo-200">
              <p className="text-xs uppercase tracking-wide text-indigo-300">Main Quote</p>
              <p className="mt-1">“{idea.mainQuote}”</p>
            </div>
            <p className="text-cyan-300">Total Score: {totalScore(idea.score)}/100</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">How this idea hits all required points</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3"><span className="text-zinc-100">Philosophical concept:</span> {idea.pillars.philosophicalConcept}</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3"><span className="text-zinc-100">Single-button core action:</span> {idea.pillars.singleButtonCoreAction}</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3"><span className="text-zinc-100">Social share:</span> {idea.pillars.socialShare}</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3"><span className="text-zinc-100">Email capture:</span> {idea.pillars.emailCapture}</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3"><span className="text-zinc-100">Collectors cards:</span> {idea.pillars.collectorsCards}</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3"><span className="text-zinc-100">Public easter egg:</span> {idea.pillars.publicEasterEgg}</div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3"><span className="text-zinc-100">Subscriber-only easter egg:</span> {idea.pillars.subscriberOnlyEasterEgg}</div>
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
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
              <p>Painkiller use case: {idea.score.painkiller}/10 · weight {scoreWeights.painkiller}%</p>
              {idea.scoreRationale?.painkiller ? <p className="mt-1 text-xs text-zinc-400">Why: {idea.scoreRationale.painkiller}</p> : null}
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
              <p>Time-to-value: {idea.score.timeToValue}/10 · weight {scoreWeights.timeToValue}%</p>
              {idea.scoreRationale?.timeToValue ? <p className="mt-1 text-xs text-zinc-400">Why: {idea.scoreRationale.timeToValue}</p> : null}
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
              <p>Repeat usage: {idea.score.repeatUsage}/10 · weight {scoreWeights.repeatUsage}%</p>
              {idea.scoreRationale?.repeatUsage ? <p className="mt-1 text-xs text-zinc-400">Why: {idea.scoreRationale.repeatUsage}</p> : null}
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
              <p>Unit economics: {idea.score.unitEconomics}/10 · weight {scoreWeights.unitEconomics}%</p>
              {idea.scoreRationale?.unitEconomics ? <p className="mt-1 text-xs text-zinc-400">Why: {idea.scoreRationale.unitEconomics}</p> : null}
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
              <p>Quality consistency: {idea.score.qualityConsistency}/10 · weight {scoreWeights.qualityConsistency}%</p>
              {idea.scoreRationale?.qualityConsistency ? <p className="mt-1 text-xs text-zinc-400">Why: {idea.scoreRationale.qualityConsistency}</p> : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
