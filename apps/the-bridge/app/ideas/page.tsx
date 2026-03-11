import { Lightbulb, ArrowLeft } from "lucide-react";
import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ideas = [
  {
    title: "OpenClaw App Starter Marketplace + Quality Guardian",
    status: "New",
    summary:
      "Marketplace where contributors sell app starter kits; users buy outcomes. Add an AI Quality Guardian for pre-publish checks, runtime quality, and trust scoring.",
  },
  {
    title: "24-hour flagship experiment loop",
    status: "Active",
    summary:
      "Run one flagship experiment per day from idea → publish → learnings to compound speed and execution quality.",
  },
  {
    title: "Zone Score performance system",
    status: "Active",
    summary:
      "Track Clarity, Speed, Energy, and Quality (1–10) after each launch and optimize trend weekly.",
  },
  {
    title: "70/20/10 experiment portfolio",
    status: "Active",
    summary:
      "Split experiments across proven formats (70%), adjacent bets (20%), and wildcards (10%) for balanced growth.",
  },
  {
    title: "Lean 4-agent operating model",
    status: "Active",
    summary:
      "Operate with Reggie + OpenHands Engineer + Content Agent + Ops Agent; add Research Agent after stable cadence.",
  },
  {
    title: "Standardized experiment rule pillars",
    status: "Active",
    summary:
      "Every experiment includes philosophy, single-button action, social share, email capture, collectors card, and public/subscriber easter eggs.",
  },
];

function statusClass(status: string) {
  if (status === "New") return "border-indigo-500/40 bg-indigo-500/10 text-indigo-300";
  return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
}

export default async function IdeasPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <main className="min-h-screen bg-[#090b10] p-4 text-zinc-100 md:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200">
          <ArrowLeft size={14} /> Back to Bridge
        </a>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Lightbulb size={18} className="text-amber-400" />
              Ideas Bank
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ideas.map((idea) => (
              <div key={idea.title} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-medium">{idea.title}</p>
                  <span className={`rounded-full border px-2 py-1 text-xs ${statusClass(idea.status)}`}>{idea.status}</span>
                </div>
                <p className="text-sm text-zinc-300">{idea.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
