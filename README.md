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

One-command demo (placeholder art + batch compose):

```bash
npm run card:demo -- \
  --series DYSON_SWARM \
  --meta experiments/dyson-swarm/cards.js
```

See `cards/README.md` for full details.
