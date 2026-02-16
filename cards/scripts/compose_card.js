#!/usr/bin/env node

/**
 * compose_card.js
 *
 * Build a final 1080x1350 collectible card image.
 *
 * Usage:
 * node cards/scripts/compose_card.js \
 *   --series DYSON_SWARM \
 *   --card DYSON_SWARM-001 \
 *   --meta experiments/dyson-swarm/cards.js \
 *   --image cards/generated/dyson_swarm/DYSON_SWARM-001.png \
 *   --out cards/final/dyson_swarm/DYSON_SWARM-001.png
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const W = 1080;
const H = 1350;
const PANEL = { x: 72, y: 760, w: 936, h: 430 };

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function die(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function parseCardsFromJs(filePath) {
  if (!fs.existsSync(filePath)) die(`Meta file not found: ${filePath}`);
  const raw = fs.readFileSync(filePath, 'utf8');

  // Very lightweight parse for our cards.js shape
  // export const cards = [ ... ];
  const m = raw.match(/export\s+const\s+cards\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) die(`Could not parse cards array from: ${filePath}`);

  const arrayText = m[1]
    .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '"$1":') // fallback if unquoted keys ever appear
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');

  try {
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${arrayText});`)();
  } catch (e) {
    die(`Failed parsing cards array: ${e.message}`);
  }
}

function cardById(cards, cardId) {
  return cards.find((c) => c.id === cardId) || null;
}

function svgOverlay({ series, card }) {
  const safeSeries = esc(series);
  const safeId = esc(card.id || 'UNKNOWN-ID');
  const safeName = esc(card.name || 'UNKNOWN');
  const safeShort = esc(card.short || '');
  const safeDesc = esc(card.description || '');

  return Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="25%" cy="12%" r="95%">
      <stop offset="0%" stop-color="rgba(253,230,138,0.16)"/>
      <stop offset="35%" stop-color="rgba(125,211,252,0.10)"/>
      <stop offset="100%" stop-color="rgba(11,15,20,1)"/>
    </radialGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.04)"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bg)"/>

  <rect x="72" y="160" width="936" height="970" rx="32" fill="url(#panel)" stroke="rgba(255,255,255,0.14)" stroke-width="3"/>

  <text x="118" y="252" fill="rgba(231,238,248,0.92)" font-size="52" font-weight="700" font-family="Inter, system-ui, -apple-system, Segoe UI, Arial">DYSON SWARM</text>
  <text x="118" y="292" fill="rgba(167,179,197,0.95)" font-size="28" font-weight="500" font-family="Inter, system-ui, -apple-system, Segoe UI, Arial">FCC APPROVED • DEC 2026 • TYPE II</text>

  <text x="118" y="348" fill="rgba(167,179,197,0.9)" font-size="24" font-weight="600" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas">${safeSeries}</text>
  <text x="620" y="348" fill="rgba(167,179,197,0.9)" font-size="24" font-weight="600" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas">${safeId}</text>

  <text x="118" y="430" fill="rgba(253,230,138,0.95)" font-size="62" font-weight="700" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas">${safeName}</text>

  <foreignObject x="118" y="458" width="844" height="280">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Inter,system-ui,-apple-system,Segoe UI,Arial; color: rgba(231,238,248,0.92);">
      <div style="font-size:34px; font-weight:600; line-height:1.25; margin-bottom:14px;">${safeShort}</div>
      <div style="font-size:28px; color: rgba(167,179,197,0.95); line-height:1.35;">${safeDesc}</div>
    </div>
  </foreignObject>

  <text x="72" y="1260" fill="rgba(167,179,197,0.9)" font-size="28" font-weight="600" font-family="Inter, system-ui, -apple-system, Segoe UI, Arial">soulgamesstudios.com</text>
  <text x="850" y="1260" fill="rgba(125,211,252,0.75)" font-size="28" font-weight="600" font-family="Inter, system-ui, -apple-system, Segoe UI, Arial">#DysonSwarm</text>
</svg>
  `);
}

async function main() {
  const series = arg('series');
  const cardId = arg('card');
  const metaPath = arg('meta', 'experiments/dyson-swarm/cards.js');
  const imagePath = arg('image');
  const outPath = arg('out');

  if (!series) die('Missing --series');
  if (!cardId) die('Missing --card');
  if (!imagePath) die('Missing --image (raw art panel image path)');
  if (!outPath) die('Missing --out (final card output path)');

  if (!fs.existsSync(imagePath)) die(`Image not found: ${imagePath}`);

  const cards = parseCardsFromJs(metaPath);
  const card = cardById(cards, cardId);
  if (!card) die(`Card id not found in meta: ${cardId}`);

  ensureDir(outPath);

  const base = sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: '#0b0f14',
    },
  });

  const panelImage = await sharp(imagePath)
    .resize(PANEL.w, PANEL.h, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();

  const overlay = svgOverlay({ series, card });

  await base
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: panelImage, left: PANEL.x, top: PANEL.y },
    ])
    .png({ quality: 95 })
    .toFile(outPath);

  console.log(`✅ Card composed: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
