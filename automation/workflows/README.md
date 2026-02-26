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

## Notes
- This file is a **high-fidelity template** based on your requested structure.
- Depending on your OpenClaw version, type names/params may need minor adaptation.
- Keep secrets in env vars (`NEWSLETTER_WEBHOOK_URL`, model keys, etc.).
