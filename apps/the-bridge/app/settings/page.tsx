import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

export default async function SettingsPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/settings">
      <Card className="border-zinc-800 bg-[#0c1016]">
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-zinc-300">
          <p>Bridge theme: Command Console Dark</p>
          <p>Environment: PRODUCTION</p>
          <p>Auth: cookie session enabled</p>
        </CardContent>
      </Card>
    </BridgeShell>
  );
}
