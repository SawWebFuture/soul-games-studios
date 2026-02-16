#!/usr/bin/env node

/**
 * demo_cards.js
 *
 * Creates placeholder generated images for all cards in a series,
 * then composes final cards in batch.
 *
 * Usage:
 * npm run card:demo -- --series DYSON_SWARM --meta experiments/dyson-swarm/cards.js
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const sharp = require('sharp');

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

async function createPlaceholder({ card, outPath }) {
  const width = 1600;
  const height = 1000;
  const hash = [...card.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const hueA = hash % 360;
  const hueB = (hash * 7) % 360;

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hueA}, 55%, 18%)"/>
        <stop offset="100%" stop-color="hsl(${hueB}, 60%, 10%)"/>
      </linearGradient>
      <radialGradient id="r1" cx="30%" cy="30%" r="40%">
        <stop offset="0%" stop-color="rgba(125,211,252,0.35)"/>
        <stop offset="100%" stop-color="rgba(125,211,252,0)"/>
      </radialGradient>
      <radialGradient id="r2" cx="70%" cy="70%" r="40%">
        <stop offset="0%" stop-color="rgba(253,230,138,0.28)"/>
        <stop offset="100%" stop-color="rgba(253,230,138,0)"/>
      </radialGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#r1)"/>
    <rect width="100%" height="100%" fill="url(#r2)"/>

    <!-- ship silhouette -->
    <g opacity="0.35" fill="rgba(231,238,248,0.65)">
      <polygon points="800,450 980,530 620,530"/>
      <rect x="760" y="530" width="80" height="22" rx="10"/>
    </g>

    <!-- alien group silhouettes -->
    <g fill="rgba(231,238,248,0.55)">
      <circle cx="650" cy="690" r="30"/>
      <rect x="625" y="720" width="50" height="90" rx="20"/>
      <circle cx="760" cy="680" r="34"/>
      <rect x="730" y="714" width="60" height="100" rx="22"/>
      <circle cx="875" cy="695" r="28"/>
      <rect x="852" y="722" width="46" height="86" rx="18"/>
    </g>

    <text x="50%" y="88%" text-anchor="middle" fill="rgba(231,238,248,0.72)" font-size="34" font-family="Inter,system-ui,Arial">${card.name}</text>
    <text x="50%" y="93%" text-anchor="middle" fill="rgba(167,179,197,0.78)" font-size="22" font-family="Inter,system-ui,Arial">PLACEHOLDER ART PANEL</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

async function main() {
  const series = arg('series', 'DYSON_SWARM');
  const meta = arg('meta', 'experiments/dyson-swarm/cards.js');
  const imageDir = arg('image-dir', `cards/generated/${series.toLowerCase()}`);
  const outDir = arg('out-dir', `cards/final/${series.toLowerCase()}`);

  if (!fs.existsSync(meta)) {
    console.error(`❌ Meta file not found: ${meta}`);
    process.exit(1);
  }

  fs.mkdirSync(imageDir, { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });

  const cards = parseCardsFromJs(meta);

  for (const card of cards) {
    const img = path.join(imageDir, `${card.id}.png`);
    if (!fs.existsSync(img)) {
      await createPlaceholder({ card, outPath: img });
      console.log(`🧪 Placeholder created: ${img}`);
    } else {
      console.log(`↷ Exists, skipping placeholder: ${img}`);
    }
  }

  const res = spawnSync(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'card:batch', '--', '--series', series, '--meta', meta, '--image-dir', imageDir, '--out-dir', outDir],
    { stdio: 'inherit' }
  );

  if (res.status !== 0) process.exit(res.status || 1);
  console.log(`\n✅ Demo complete. Finals in: ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
