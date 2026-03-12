import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const starterSchedule = [
  { day: "Monday", task: "Publish blog post + announce on LinkedIn/X" },
  { day: "Tuesday", task: "YouTube launch recap + next mission CTA" },
  { day: "Wednesday", task: "Experiment build log short post" },
  { day: "Thursday", task: "Subscriber email digest + experiment CTA" },
  { day: "Friday", task: "Weekly Zone Score + roadmap update post" },
];

const supabasePlan = [
  "Create `content_calendar_events` table (id, title, channel, publish_at, owner, status, notes)",
  "Add row-level security policy for internal editor roles",
  "Create API route for create/update/list calendar events",
  "Render events in calendar UI (week/month views)",
  "Add webhook/cron reminders for pending publishes",
];

export default async function CalendarPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/calendar">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle>Content Calendar (Supabase-ready)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p>This is the planning shell. We will connect persistence to Supabase after backend connections are finished.</p>
            <a href="/blog-roadmap" className="text-xs text-indigo-300 hover:text-indigo-200">Open blog roadmap →</a>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Starter Weekly Calendar</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {starterSchedule.map((item) => (
              <div key={item.day} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
                <p className="text-zinc-100">{item.day}</p>
                <p className="text-xs text-zinc-400 mt-1">{item.task}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Supabase Connection Plan</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {supabasePlan.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
