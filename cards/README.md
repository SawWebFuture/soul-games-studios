# Soul Games Card Art Pipeline

This pipeline separates **frame/layout** from **image generation**.

## Why
- Consistent collectible look across all games
- Easier automation
- Better ownership/provenance tracking for future merch

## Folders
- `frame/` — reusable frame/layout assets + specs
- `prompts/` — prompt templates and per-series prompt packs
- `generated/` — raw AI image outputs (art panel only)
- `final/` — composited final cards (share-ready PNGs)
- `provenance/` — model/prompt/seed/license metadata per card
- `scripts/` — helper scripts for composition + bookkeeping

## Recommended flow
1) Generate art panel image (`generated/<series>/<card-id>.png`)
2) Compose with frame + card text into final card (`final/<series>/<card-id>.png`)
3) Write provenance metadata (`provenance/<series>/<card-id>.json`)

## Compose command (implemented)
Install deps once:

```bash
npm install
```

Compose a single card:

```bash
npm run card:compose -- \
  --series DYSON_SWARM \
  --card DYSON_SWARM-001 \
  --meta experiments/dyson-swarm/cards.js \
  --image cards/generated/dyson_swarm/DYSON_SWARM-001.png \
  --out cards/final/dyson_swarm/DYSON_SWARM-001.png
```

Compose all cards in a series (batch):

```bash
npm run card:batch -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js \
  --image-dir cards/generated/dyson_swarm \
  --out-dir cards/final/dyson_swarm
```

Expected image naming in `--image-dir`:
- `DYSON_SWARM-001.png`
- `DYSON_SWARM-002.png`
- ...

One-command demo run (creates placeholders + composes full series):

```bash
npm run card:demo -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js
```

Initialize provenance JSON stubs for all cards in a series:

```bash
npm run card:provenance:init -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js \
  --license "Check model card / commercial terms"
```

Use `--overwrite` to regenerate existing stubs.

## Legal/ownership guardrails
- Use checkpoints/LoRAs with explicit commercial terms.
- Keep provenance for each card (model version, prompt, seed, date).
- Avoid prompts referencing living artists or copyrighted characters.
- Treat this as operational guidance, not legal advice.
