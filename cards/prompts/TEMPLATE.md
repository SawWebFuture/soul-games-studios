# Prompt Template (Art Panel Only)

Use this template per card. Generate **image only** (no text/typography).

## Base prompt
"A small group of alien beings from the {civilization_name}, with a distinctive spaceship visible, cinematic alien landscape in the background, sleek sci-fi atmosphere, calm luminous lighting, rich but restrained color palette, high detail, concept-art quality, centered composition, clear subject separation, no text, no logo, no watermark"

## Negative prompt
"text, letters, logo, watermark, blurry, low-res, extra limbs, deformed faces, cropped heads, noisy artifacts, oversaturated neon chaos"

## Suggested params (Stable Diffusion)
- Aspect: 16:10 or close (for panel crop)
- Steps: 30-40
- CFG: 5-7
- Sampler: DPM++ 2M Karras (or equivalent)
- Seed: fixed per card for reproducibility

## Output naming
`generated/<series>/<card-id>.png`
