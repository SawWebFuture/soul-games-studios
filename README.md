# Soul Games Studios — Monorepo

This repo hosts Soul Games Studios web experiments and shared assets.

## Structure
- `experiments/` — each experiment is a self-contained HTML/CSS/JS site
- `shared/` — shared styles/components/utils

## Getting started
Open an experiment folder and serve locally (pick one):

```bash
cd experiments/<experiment>
python3 -m http.server 8000
# or
npx serve .
```

## Guardrails
No dark patterns. No pressure loops. Calm tech only.

## Card pipeline quick commands
From repo root:

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

Compose all cards in DYSON_SWARM:

```bash
npm run card:batch -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js \
  --image-dir cards/generated/dyson_swarm \
  --out-dir cards/final/dyson_swarm
```

One-command demo (placeholder art + batch compose + provenance):

```bash
npm run card:demo -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js
```

Initialize provenance stubs:

```bash
npm run card:provenance:init -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js \
  --license "Check model card / commercial terms"
```

Check pipeline completeness:

```bash
npm run card:check -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js
```

One-command full run (demo + provenance + check):

```bash
npm run card:all
```

See `cards/README.md` for full details.

## Asset pipeline quick commands (backgrounds)
Create demo background for a game:

```bash
npm run asset:demo -- --game dyson-swarm
```

Initialize provenance for that background:

```bash
npm run asset:provenance:init -- --game dyson-swarm --license "Check model card / commercial terms"
```

Check completeness:

```bash
npm run asset:check -- --game dyson-swarm
```

Run all three in sequence:

```bash
npm run asset:all -- --game dyson-swarm
```

See `assets/README.md` for full details.
