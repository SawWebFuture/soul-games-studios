import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const corePrinciples = [
  "Lead with objective + constraints before asking for output.",
  "Provide source context (files, examples, data) so the model reasons from truth, not guesses.",
  "Specify output format explicitly (JSON schema, bullet list, code diff, checklist).",
  "Break big tasks into phases: plan → draft → critique → final.",
  "Ask for edge cases and failure modes up front.",
  "Prefer testable acceptance criteria over vague quality requests.",
  "Use reusable prompt templates for recurring workflows.",
];

const goldenPromptTemplate = `Role: You are a senior [domain] assistant helping with [task].

Objective:
- [What success looks like in one sentence]

Context:
- [Key background and references]
- [Known constraints]
- [What has already been tried]

Requirements:
1) [Must-have #1]
2) [Must-have #2]
3) [Must-have #3]

Output format:
- [Exact structure wanted]
- [Tone/length requirements]

Quality bar:
- Flag assumptions explicitly
- Include risks + mitigations
- End with next 3 concrete actions`;

const practicalWorkflows = [
  {
    title: "Feature Build Prompt",
    steps: [
      "Define target user outcome and success metric.",
      "Provide current file paths/components to edit.",
      "Demand exact patch-level output (or full file replacement).",
      "Require test checklist + rollback notes.",
    ],
  },
  {
    title: "Research + Synthesis Prompt",
    steps: [
      "Set decision to be made (not just information to collect).",
      "Ask for source quality ranking and confidence level.",
      "Require concise recommendation with rationale.",
      "Request what to monitor next 7 days.",
    ],
  },
  {
    title: "Content Draft Prompt",
    steps: [
      "Define audience, channel, and conversion goal.",
      "Include brand voice guardrails and words to avoid.",
      "Ask for 3 variants with hooks + CTA options.",
      "Require final recommendation and why it wins.",
    ],
  },
];

const antiPatterns = [
  "Too broad: ‘Make this better’ with no quality target.",
  "No constraints: model optimizes for generic verbosity.",
  "No format spec: output becomes hard to use programmatically.",
  "Single-pass for high-stakes tasks (skip critique/refinement).",
  "Ignoring versioning: prompts drift and quality regresses over time.",
];

const stayingCurrentLoop = [
  "Monthly: review one new prompting technique and test it on a real workflow.",
  "Quarterly: update prompt templates based on what actually improved output quality.",
  "After major model updates: rerun 3 benchmark prompts and compare performance.",
  "Track a Prompt Quality Score (clarity, usefulness, actionability, rework needed).",
];

export default async function PromptEngineeringPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/prompt-engineering">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Prompt Engineering — Best Practices (Living Playbook)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p>
              Use this page as your practical guide for writing high-performance prompts across product, research,
              and content workflows.
            </p>
            <p className="text-xs text-zinc-500">Last refreshed: March 2026</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Core Principles</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {corePrinciples.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">• {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Golden Prompt Template</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <div className="rounded-md border border-zinc-800 bg-zinc-900/50 p-3">
              <pre className="whitespace-pre-wrap text-xs text-zinc-300">{goldenPromptTemplate}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Practical Workflow Patterns</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-300">
            {practicalWorkflows.map((workflow) => (
              <div key={workflow.title} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
                <p className="text-zinc-100">{workflow.title}</p>
                <div className="mt-2 space-y-1">
                  {workflow.steps.map((step) => (
                    <p key={step} className="text-xs text-zinc-400">→ {step}</p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Anti-Patterns to Avoid</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {antiPatterns.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 text-zinc-400">⚠️ {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Stay Up-To-Date Loop</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {stayingCurrentLoop.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">↻ {item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
