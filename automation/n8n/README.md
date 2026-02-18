# n8n — Mental Health x Tech News Automation

## What this workflow does
1. Fetches news/RSS items from curated sources.
2. Scores each item (relevance, evidence quality, novelty, hype risk).
3. Generates draft posts in Scott's voice.
4. Writes drafts to a Notion queue for approval.
5. Optional: publishes approved posts to social channels.

## Files
- `mental-health-news-flow.json` — n8n workflow template

## Required credentials (configure in n8n)
- OpenAI API key (content generation)
- Notion integration token (queue + status updates)
- Optional posting credentials (LinkedIn/X integrations or webhook bridge)

## Required env vars (suggested)
- `OPENAI_API_KEY`
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID` (or page-based queue)

## Recommended run mode
- Cron: daily at 7:00 AM local
- Output mode: Draft + Approval Required
- Publish mode: Manual approval first (recommended for health topics)

## Suggested queue statuses
- `new`
- `scored`
- `drafted`
- `needs_review`
- `approved`
- `posted`
- `rejected`

## Prompting notes
Use `docs/voice-style-guide.md` as canonical style source. The generation prompt should include:
- voice summary
- avoid list
- safety disclaimer rules
- platform format constraints

## Minimal setup steps
1. Import `mental-health-news-flow.json` into n8n.
2. Configure credentials and env vars.
3. Set Notion destination (database or page).
4. Test with 3 items.
5. Turn on daily cron.
