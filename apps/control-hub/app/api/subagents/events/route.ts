import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";
import { Subagent, SubagentEvent } from "@/lib/types";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-hub-token");
  if (!process.env.HUB_INGEST_TOKEN || auth !== process.env.HUB_INGEST_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const now = new Date().toISOString();

  const event: SubagentEvent = {
    id: randomUUID(),
    subagentId: body.subagentId,
    type: body.type,
    at: body.at ?? now,
    message: body.message ?? "",
  };

  const store = readStore();
  store.events.push(event);

  const existing = store.subagents.find((s) => s.id === body.subagentId);
  if (!existing && body.type === "created") {
    const sub: Subagent = {
      id: body.subagentId,
      role: body.role ?? "Unknown",
      status: "running",
      createdAt: event.at,
      lastUpdateAt: event.at,
      summary: body.message ?? "",
    };
    store.subagents.push(sub);
  } else if (existing) {
    existing.lastUpdateAt = event.at;
    existing.summary = body.message ?? existing.summary;
    if (body.type === "completed") existing.status = "completed";
    if (body.type === "failed") existing.status = "failed";
    if (body.type === "updated") existing.status = "running";
  }

  writeStore(store);
  return NextResponse.json({ ok: true, eventId: event.id });
}
