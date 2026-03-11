import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const sampleMessages = [
  { role: "Scott", text: "Reggie, what’s the highest-leverage move for today?" },
  { role: "Reggie", text: "Ship one high-demand experiment with a clear KPI and publish before noon." },
  { role: "Scott", text: "What should we measure?" },
  { role: "Reggie", text: "Primary KPI: conversion to email capture. Secondary: share rate." },
];

export default async function ChatPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/chat">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Bridge Chat (Sample)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleMessages.map((m, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 text-sm ${
                  m.role === "Reggie"
                    ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-100"
                    : "border-zinc-700 bg-zinc-900/60 text-zinc-200"
                }`}
              >
                <p className="mb-1 text-xs uppercase tracking-wide opacity-70">{m.role}</p>
                <p>{m.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardContent className="pt-6">
            <div className="rounded-lg border border-zinc-700 bg-zinc-900/60 p-3 text-sm text-zinc-400">
              Composer placeholder: connect this to an API route (e.g. /api/chat) to send/receive real-time messages.
            </div>
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
