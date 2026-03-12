import { isAuthed } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";
import { getWebsiteSection } from "@/lib/website-roadmap";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WebsiteRoadmapStepPage({ params }: Props) {
  if (!(await isAuthed())) redirect("/login");

  const { slug } = await params;
  const step = getWebsiteSection(slug);

  if (!step) notFound();

  return (
    <BridgeShell activeHref="/website-roadmap">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle className="text-base">{step.section} — Cursor Development Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-300">
            <p className="text-xs text-zinc-400">
              Copy this prompt into Cursor to generate implementation guidance and code for this website step.
            </p>
            <div className="rounded-md border border-zinc-800 bg-zinc-900/50 p-3">
              <p className="whitespace-pre-wrap text-xs text-zinc-300">{step.cursorPrompt}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle className="text-base">Step Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {step.mustHave.map((line) => (
              <div key={line} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 text-xs text-zinc-400">
                {line}
              </div>
            ))}
            <Link
              href="/website-roadmap"
              className="inline-block rounded-md border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              ← Back to Website Roadmap
            </Link>
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
