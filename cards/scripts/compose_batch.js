#!/usr/bin/env node

/**
 * compose_batch.js
 *
 * Batch-compose cards for a series.
 *
 * Default assumes DYSON_SWARM and files at:
 * - meta: experiments/dyson-swarm/cards.js
 * - image: cards/generated/dyson_swarm/<CARD_ID>.png
 * - out:   cards/final/dyson_swarm/<CARD_ID>.png
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

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

const series = arg('series', 'DYSON_SWARM');
const meta = arg('meta', 'experiments/dyson-swarm/cards.js');
const imageDir = arg('image-dir', `cards/generated/${series.toLowerCase()}`);
const outDir = arg('out-dir', `cards/final/${series.toLowerCase()}`);

if (!fs.existsSync(meta)) {
  console.error(`❌ Meta file not found: ${meta}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const cards = parseCardsFromJs(meta);
let ok = 0;
let fail = 0;

for (const c of cards) {
  const image = path.join(imageDir, `${c.id}.png`);
  const out = path.join(outDir, `${c.id}.png`);

  if (!fs.existsSync(image)) {
    console.warn(`⚠️  Missing image for ${c.id}: ${image}`);
    fail += 1;
    continue;
  }

  const res = spawnSync(
    process.execPath,
    ['cards/scripts/compose_card.js', '--series', series, '--card', c.id, '--meta', meta, '--image', image, '--out', out],
    { stdio: 'inherit' }
  );

  if (res.status === 0) ok += 1;
  else fail += 1;
}

console.log(`\nBatch complete: ✅ ${ok} | ❌ ${fail}`);
process.exit(fail > 0 ? 1 : 0);
