import { Activity, Rocket, Shield } from "lucide-react";
import Image from "next/image";
import { readStore } from "@/lib/store";
import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

export default async function HomePage() {
  if (!(await isAuthed())) redirect("/login");
  const store = readStore();

  return (
    <BridgeShell activeHref="/">
      <div className="space-y-5">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Bridge Command View</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <Image src="/images/bridge-warp.jpg" alt="Bridge warp-speed command view" width={1200} height={675} priority className="h-auto w-full object-cover" />
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Rocket size={16} /> Active</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{store.subagents.filter((s) => s.status === "running").length}</CardContent></Card>
          <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Shield size={16} /> Completed</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{store.subagents.filter((s) => s.status === "completed").length}</CardContent></Card>
          <Card className="border-zinc-800 bg-[#0c1016]"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><Activity size={16} /> Total Events</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{store.events.length}</CardContent></Card>
        </section>
      </div>
    </BridgeShell>
  );
}
