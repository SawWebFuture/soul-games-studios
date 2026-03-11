import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DatabasePage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <main className="min-h-screen bg-[#090b10] p-4 text-zinc-100 md:p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Database</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-zinc-300">
            <p>Primary Database: US East (North Virginia)</p>
            <p>Cluster: bridge-main-01</p>
            <p>Tier: t4g.nano</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
