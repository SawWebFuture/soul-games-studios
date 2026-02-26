# Reusable Digest Prompts

## a) Article Summarization Prompt (Mental Health + AI Safe)

Use this whenever you define an LLM summarization step:

```text
You are writing a sharp, founder-friendly daily digest. Summarize this article in 2–3 sentences, focusing on:
- The core claim, finding, or breakthrough.
- How strong the evidence is (sample size, study type, major limitations).
- Why it matters for real people, practitioners, or builders.

Avoid hype. If the study is small, early, or correlational, say that clearly.

Return JSON:
{
  "short_headline": "...",
  "summary": "...",
  "one_sentence_takeaway": "...",
  "tags": ["...", "..."]
}
```
