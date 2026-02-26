# OpenClaw Workflow Templates

This folder stores workflow templates that can be adapted to your OpenClaw/n8n runtime.

## Added
- `daily_mental_health_ai_digest.workflow.yaml`

## Intent
Daily 7:00 AM ET digest pipeline:
1. Fetch psychology + mental-health + AI sources
2. Normalize / filter (last 48h)
3. Deduplicate
4. Classify topics
5. Summarize top stories
6. Generate topic commentary
7. Build markdown newsletter
8. Publish to file + webhook

## How this fits your daily flow
- OpenClaw runs this every morning.
- It writes Markdown to a local file.
- It also POSTs to your webhook endpoint.

You can then:
- Connect webhook output into Substack, Beehiiv, Mailbrew, or a custom API.
- Or copy/paste the generated `.md` into Substack, LinkedIn, or your newsletter stack.

## Notion organization
- Notion archive hub page: https://www.notion.so/Daily-Brain-Machine-Digest-Archive-313b79c33440815bb8f8ec1ad002a6a5
- Digest database id: `313b79c3-3440-8113-8e53-fcbb2bfb4179`
- Set env var: `NOTION_DIGEST_DATABASE_ID=313b79c3-3440-8113-8e53-fcbb2bfb4179`

## Notes
- This file is a **high-fidelity template** based on your requested structure.
- Depending on your OpenClaw version, type names/params may need minor adaptation.
- Keep secrets in env vars (`NEWSLETTER_WEBHOOK_URL`, `NOTION_DIGEST_DATABASE_ID`, model keys, etc.).
