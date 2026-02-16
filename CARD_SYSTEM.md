# Card System (Collection + Merch)

## Purpose
All Soul Games experiments can reveal **cards** that:
- feel collectible
- can be shared as images
- can later become merch (stickers, prints, shirts)

## Card fields (required)
- **series**: short identifier (e.g., `DYSON_SWARM`)
- **id**: stable card id (e.g., `DYSON_SWARM-001`)
- **number**: numeric within series (e.g., `001`)
- **name**: display name (e.g., `PLATIANS`)
- **image**: generated/illustration (v1 placeholder OK)
- **short**: one-line tagline
- **description**: 1–3 sentences (calm, philosophical)

## Tone rules
- Sleek sci-fi lab presentation.
- Playful + uncanny.
- No doom, no hype. No shame.

## Share card output
- Export PNG at **1080×1350** (portrait) for social.

**Rule:** The **card share image is the primary social artifact** for all experiments.
- The share card should include:
  - card image area
  - subtle background
  - clean typography
  - series + id/number
  - name
  - tagline
  - short description
  - brand mark + site url

## Implementation approach (web)
- Each experiment owns a `cards.js` (data) file.
- Shared rendering styles live in `shared/styles/cards.css`.
- Share-card canvas generator can be per experiment (v1) or shared utility later.

## Future: rarity + commerce (later)
- Optional rarity tiers (Common/Rare/Mythic) — only if it stays calm.
- Merch mapping: card id → SKU.
