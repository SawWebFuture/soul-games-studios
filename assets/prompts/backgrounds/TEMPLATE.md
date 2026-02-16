# Background Prompt Template

Use for game scene/background generation.

## Prompt
"{GAME_NAME} background, sleek sci-fi lab atmosphere, cinematic but minimal, readable negative space for UI overlays, subtle depth, calm luminous lighting, high detail, no text, no logos, no watermark"

## Negative prompt
"text, letters, logo, watermark, busy composition, low-res, oversaturated neon chaos, clutter"

## Suggested params (Stable Diffusion)
- Size: 1920x1080 (or 1536x1024)
- Steps: 30-40
- CFG: 5-7
- Sampler: DPM++ 2M Karras
- Seed: fixed for reproducibility

## Naming
- Generated: `assets/generated/<game>/bg-main.png`
- Final: `assets/final/<game>/bg-main.webp`
- Provenance: `assets/provenance/<game>/bg-main.json`
