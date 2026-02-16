# Provenance Metadata Schema (per card)

Save as: `provenance/<series>/<card-id>.json`

```json
{
  "series": "DYSON_SWARM",
  "cardId": "DYSON_SWARM-001",
  "generatedAt": "2026-02-16T00:00:00Z",
  "generator": "stable-diffusion",
  "model": "<checkpoint-name>",
  "modelVersion": "<version>",
  "license": "<model-license-summary>",
  "prompt": "<full prompt>",
  "negativePrompt": "<negative prompt>",
  "seed": 123456789,
  "steps": 36,
  "cfg": 6.0,
  "sampler": "DPM++ 2M Karras",
  "width": 1536,
  "height": 960,
  "notes": "No artist-name style references."
}
```
