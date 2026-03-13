import { randomUUID } from 'node:crypto';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { Subagent, SubagentEvent, Store } from '@/lib/types';

type IngestInput = {
  subagentId: string;
  role?: string;
  type: SubagentEvent['type'];
  at?: string;
  message?: string;
};

export async function getSubagentStore(): Promise<Store> {
  const admin = getSupabaseAdminClient();

  const [{ data: subagents, error: subErr }, { data: events, error: evtErr }] = await Promise.all([
    admin
      .from('subagents')
      .select('id, role, status, created_at, last_update_at, summary')
      .order('created_at', { ascending: false }),
    admin
      .from('subagent_events')
      .select('id, subagent_id, type, at, message')
      .order('at', { ascending: false })
      .limit(500),
  ]);

  if (subErr) throw new Error(`Failed to fetch subagents: ${subErr.message}`);
  if (evtErr) throw new Error(`Failed to fetch subagent events: ${evtErr.message}`);

  return {
    subagents: (subagents ?? []).map((s) => ({
      id: s.id,
      role: s.role,
      status: s.status,
      createdAt: s.created_at,
      lastUpdateAt: s.last_update_at,
      summary: s.summary ?? '',
    } as Subagent)),
    events: (events ?? []).map((e) => ({
      id: e.id,
      subagentId: e.subagent_id,
      type: e.type,
      at: e.at,
      message: e.message ?? '',
    } as SubagentEvent)),
  };
}

export async function ingestSubagentEvent(input: IngestInput): Promise<string> {
  const admin = getSupabaseAdminClient();
  const now = new Date().toISOString();
  const at = input.at ?? now;
  const eventId = randomUUID();

  const { data: existing, error: findErr } = await admin
    .from('subagents')
    .select('id, role, status, created_at, last_update_at, summary')
    .eq('id', input.subagentId)
    .maybeSingle();

  if (findErr) throw new Error(`Failed to fetch subagent: ${findErr.message}`);

  const status =
    input.type === 'completed'
      ? 'completed'
      : input.type === 'failed'
        ? 'failed'
        : 'running';

  if (!existing && input.type === 'created') {
    const { error: createErr } = await admin.from('subagents').insert({
      id: input.subagentId,
      role: input.role ?? 'Unknown',
      status,
      created_at: at,
      last_update_at: at,
      summary: input.message ?? '',
    });
    if (createErr) throw new Error(`Failed to create subagent: ${createErr.message}`);
  } else if (existing) {
    const { error: updateErr } = await admin
      .from('subagents')
      .update({
        role: input.role ?? existing.role,
        status,
        last_update_at: at,
        summary: input.message ?? existing.summary,
      })
      .eq('id', input.subagentId);

    if (updateErr) throw new Error(`Failed to update subagent: ${updateErr.message}`);
  } else {
    throw new Error('Subagent does not exist yet. Send a "created" event first.');
  }

  const { error: eventErr } = await admin.from('subagent_events').insert({
    id: eventId,
    subagent_id: input.subagentId,
    type: input.type,
    at,
    message: input.message ?? '',
  });

  if (eventErr) throw new Error(`Failed to insert subagent event: ${eventErr.message}`);

  return eventId;
}
