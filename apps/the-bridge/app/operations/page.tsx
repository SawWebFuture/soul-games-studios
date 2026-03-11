import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const operations = [
  "Run 1 flagship experiment/day with a strict 24-hour loop.",
  "Track Zone Score daily and review trend every Friday.",
  "Enforce one core KPI per experiment.",
  "Use a 70/20/10 portfolio split for experimentation.",
];

export default async function OperationsPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/operations">
      <Card className="border-zinc-800 bg-[#0c1016]">
        <CardHeader><CardTitle>Operations</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {operations.map((item) => (
            <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3 text-sm text-zinc-300">{item}</div>
          ))}
        </CardContent>
      </Card>
    </BridgeShell>
  );
}
