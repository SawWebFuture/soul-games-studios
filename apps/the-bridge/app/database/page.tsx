import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

export default async function DatabasePage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/database">
      <Card className="border-zinc-800 bg-[#0c1016]">
        <CardHeader><CardTitle>Database</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-zinc-300">
          <p>Primary Database: US East (North Virginia)</p>
          <p>Cluster: bridge-main-01</p>
          <p>Tier: t4g.nano</p>
        </CardContent>
      </Card>
    </BridgeShell>
  );
}
