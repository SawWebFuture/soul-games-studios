#!/usr/bin/env node

/**
 * provenance_init.js
 *
 * Create provenance JSON stubs for cards in a series.
 *
 * Usage:
 * npm run card:provenance:init -- \
 *   --series DYSON_SWARM \
 *   --meta experiments/dyson-swarm/cards.js \
 *   --license "Check model card / commercial terms"
 */

const fs = require('fs');
const path = require('path');

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function parseCardsFromJs(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const m = raw.match(/export\s+const\s+cards\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) throw new Error(`Could not parse cards array from: ${filePath}`);
  const arrayText = m[1]
    .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '"$1":')
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${arrayText});`)();
}

function nowIso() {
  return new Date().toISOString();
}

function makeStub({ series, cardId, license }) {
  return {
    series,
    cardId,
    generatedAt: nowIso(),
    generator: 'stable-diffusion',
    model: '<checkpoint-name>',
    modelVersion: '<version>',
    license: license || '<model-license-summary>',
    prompt: '<full prompt>',
    negativePrompt: '<negative prompt>',
    seed: 123456789,
    steps: 36,
    cfg: 6.0,
    sampler: 'DPM++ 2M Karras',
    width: 1536,
    height: 960,
    notes: 'No artist-name style references.'
  };
}

function main() {
  const series = arg('series', 'DYSON_SWARM');
  const meta = arg('meta', 'experiments/dyson-swarm/cards.js');
  const outDir = arg('out-dir', `cards/provenance/${series.toLowerCase()}`);
  const license = arg('license', 'Check model card / commercial terms');
  const overwrite = process.argv.includes('--overwrite');

  if (!fs.existsSync(meta)) {
    console.error(`❌ Meta file not found: ${meta}`);
    process.exit(1);
  }

  const cards = parseCardsFromJs(meta);
  fs.mkdirSync(outDir, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (const c of cards) {
    const file = path.join(outDir, `${c.id}.json`);
    if (fs.existsSync(file) && !overwrite) {
      skipped += 1;
      continue;
    }
    const data = makeStub({ series, cardId: c.id, license });
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    created += 1;
  }

  console.log(`✅ Provenance stubs: created ${created}, skipped ${skipped}`);
  console.log(`📁 ${outDir}`);
}

main();
