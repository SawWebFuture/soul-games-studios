#!/usr/bin/env node

/**
 * card_check.js
 *
 * Validates card pipeline completeness for a series.
 *
 * Checks:
 * - generated image exists for each card id
 * - final composed image exists for each card id
 * - provenance json exists for each card id
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

function exists(p) {
  return fs.existsSync(p);
}

function main() {
  const series = arg('series', 'DYSON_SWARM');
  const meta = arg('meta', 'experiments/dyson-swarm/cards.js');
  const imageDir = arg('image-dir', `cards/generated/${series.toLowerCase()}`);
  const outDir = arg('out-dir', `cards/final/${series.toLowerCase()}`);
  const provDir = arg('prov-dir', `cards/provenance/${series.toLowerCase()}`);

  if (!exists(meta)) {
    console.error(`❌ Meta file not found: ${meta}`);
    process.exit(1);
  }

  const cards = parseCardsFromJs(meta);

  let missingGenerated = 0;
  let missingFinal = 0;
  let missingProv = 0;

  for (const c of cards) {
    const id = c.id;
    const g = path.join(imageDir, `${id}.png`);
    const f = path.join(outDir, `${id}.png`);
    const p = path.join(provDir, `${id}.json`);

    if (!exists(g)) {
      missingGenerated += 1;
      console.log(`❌ missing generated: ${g}`);
    }
    if (!exists(f)) {
      missingFinal += 1;
      console.log(`❌ missing final:     ${f}`);
    }
    if (!exists(p)) {
      missingProv += 1;
      console.log(`❌ missing provenance:${p}`);
    }
  }

  console.log('\n--- Card Pipeline Check ---');
  console.log(`Series: ${series}`);
  console.log(`Cards:  ${cards.length}`);
  console.log(`Missing generated:  ${missingGenerated}`);
  console.log(`Missing final:      ${missingFinal}`);
  console.log(`Missing provenance: ${missingProv}`);

  const missingTotal = missingGenerated + missingFinal + missingProv;
  if (missingTotal === 0) {
    console.log('✅ All checks passed.');
    process.exit(0);
  }

  console.log('⚠️  Pipeline incomplete.');
  process.exit(1);
}

main();
