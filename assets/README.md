# Game Asset Pipeline (Backgrounds + Scene Art)

Pipeline for non-card visual assets (backgrounds, scene art, atmospherics).

## Folders
- `prompts/backgrounds/` — prompt templates + game-specific prompt packs
- `generated/` — raw generated images
- `final/` — optimized web-ready outputs (webp/png)
- `provenance/` — metadata for legal/process traceability
- `scripts/` — helper scripts

## Recommended flow
1) Generate raw image(s) into `assets/generated/<game>/`
2) Optimize selected images into `assets/final/<game>/`
3) Initialize provenance for each selected asset
4) Run asset check

## Commands
```bash
npm run asset:demo -- --game dyson-swarm
npm run asset:provenance:init -- --game dyson-swarm
npm run asset:check -- --game dyson-swarm
npm run asset:all -- --game dyson-swarm
```

## Guardrails
- Use commercially-allowed models/checkpoints.
- Keep provenance per asset.
- Avoid artist-name style mimic prompts.
- Keep game backgrounds subtle so UI remains readable.
