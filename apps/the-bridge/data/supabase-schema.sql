-- Run in Supabase SQL editor

create table if not exists public.subagents (
  id text primary key,
  role text not null,
  status text not null check (status in ('running', 'completed', 'failed', 'idle')),
  created_at timestamptz not null,
  last_update_at timestamptz not null,
  summary text default ''
);

create table if not exists public.subagent_events (
  id uuid primary key,
  subagent_id text not null references public.subagents(id) on delete cascade,
  type text not null check (type in ('created', 'updated', 'completed', 'failed')),
  at timestamptz not null,
  message text default ''
);

create index if not exists idx_subagent_events_subagent_id on public.subagent_events(subagent_id);
create index if not exists idx_subagent_events_at on public.subagent_events(at desc);

alter table public.subagents enable row level security;
alter table public.subagent_events enable row level security;

-- For now, service-role access is used by backend routes.
-- Add authenticated-user policies later when exposing direct client reads/writes.
