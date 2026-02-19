# Dyson Swarm Update — 2026-02-18

## What changed

- Simplified input handling to **pointer events only** for better mobile reliability.
- Removed stale `.glitch-node` hook from app logic (no matching nodes in current markup).
- Added a small `GAME_CONFIG` object in `app.js` for easier tuning:
  - `holdSeconds`
  - `orbitPrompt`

## Why

These changes reduce duplicate-trigger bugs on touch devices, keep logic aligned with current UI, and make quick balancing/A-B testing easier.

## Next knobs to tune

- `holdSeconds: 2.2` for faster completion tests
- `holdSeconds: 3.0` for more challenge
- Prompt copy variants for CTR testing
