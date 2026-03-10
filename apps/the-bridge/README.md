# The Bridge

Central dashboard for Scott to view subagents, when they were created, and current run status.

## Why this exists

- One place to track all subagents
- Audit trail of creation + lifecycle events
- Management visibility without digging through multiple sessions

## Stack

- Next.js (App Router)
- JSON store for MVP (`data/subagents.json`)
- Token-protected ingest endpoint (`/api/subagents/events`)

> Note: JSON storage is for MVP/local validation. For Vercel production, migrate to Postgres/Neon/Supabase.

## Run locally

```bash
cd apps/the-bridge
npm install
npm run dev
```

Open http://localhost:3000

## Env vars

Create `.env.local`:

```bash
HUB_INGEST_TOKEN=choose-a-long-random-secret
```

## API endpoints

### GET `/api/subagents`
Returns current subagent list + event timeline.

### POST `/api/subagents/events`
Ingests subagent lifecycle events.

Headers:

- `x-hub-token: <HUB_INGEST_TOKEN>`

Body example:

```json
{
  "subagentId": "ops-2026-03-10-01",
  "role": "Ops Agent",
  "type": "created",
  "at": "2026-03-10T01:00:00Z",
  "message": "Created by Reggie for nightly backup verification"
}
```

`type` values: `created | updated | completed | failed`

## Vercel deploy notes

- Root Directory: `apps/the-bridge`
- Add env var: `HUB_INGEST_TOKEN`
- (Recommended next) Move from JSON to managed DB for persistence across serverless invocations

## Next step (I can do this next)

Wire OpenClaw cron/subagent notifications to call `/api/subagents/events` automatically so dashboard updates in near real-time.
