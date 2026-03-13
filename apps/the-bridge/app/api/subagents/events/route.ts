import { NextRequest, NextResponse } from 'next/server';
import { ingestSubagentEvent } from '@/lib/subagents-repo';
import { SubagentEvent } from '@/lib/types';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('x-hub-token');
  if (!process.env.HUB_INGEST_TOKEN || auth !== process.env.HUB_INGEST_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  if (!body?.subagentId || !body?.type) {
    return NextResponse.json({ error: 'subagentId and type are required' }, { status: 400 });
  }

  const allowedTypes: SubagentEvent['type'][] = ['created', 'updated', 'completed', 'failed'];
  if (!allowedTypes.includes(body.type)) {
    return NextResponse.json({ error: 'invalid event type' }, { status: 400 });
  }

  try {
    const eventId = await ingestSubagentEvent({
      subagentId: body.subagentId,
      role: body.role,
      type: body.type,
      at: body.at,
      message: body.message,
    });

    return NextResponse.json({ ok: true, eventId });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
