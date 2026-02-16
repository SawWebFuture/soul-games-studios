#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

async function makePlaceholder(game, outPng, outWebp) {
  const width = 1920;
  const height = 1080;
  const hash = [...game].reduce((a, c) => a + c.charCodeAt(0), 0);
  const hueA = hash % 360;
  const hueB = (hash * 5) % 360;

  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hueA}, 45%, 10%)"/>
      <stop offset="100%" stop-color="hsl(${hueB}, 50%, 6%)"/>
    </linearGradient>
    <radialGradient id="r1" cx="28%" cy="26%" r="45%">
      <stop offset="0%" stop-color="rgba(125,211,252,0.26)"/>
      <stop offset="100%" stop-color="rgba(125,211,252,0)"/>
    </radialGradient>
    <radialGradient id="r2" cx="74%" cy="62%" r="40%">
      <stop offset="0%" stop-color="rgba(253,230,138,0.18)"/>
      <stop offset="100%" stop-color="rgba(253,230,138,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#r1)"/>
  <rect width="100%" height="100%" fill="url(#r2)"/>
  <circle cx="960" cy="540" r="220" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)"/>
  <text x="50%" y="90%" text-anchor="middle" fill="rgba(231,238,248,0.45)" font-size="34" font-family="Inter,Arial">${game.toUpperCase()} • BACKGROUND PLACEHOLDER</text>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outPng);
  await sharp(outPng).webp({ quality: 88 }).toFile(outWebp);
}

(async () => {
  const game = arg('game', 'dyson-swarm');
  const genDir = `assets/generated/${game}`;
  const finDir = `assets/final/${game}`;
  fs.mkdirSync(genDir, { recursive: true });
  fs.mkdirSync(finDir, { recursive: true });

  const outPng = path.join(genDir, 'bg-main.png');
  const outWebp = path.join(finDir, 'bg-main.webp');

  if (!fs.existsSync(outPng) || !fs.existsSync(outWebp)) {
    await makePlaceholder(game, outPng, outWebp);
    console.log(`✅ Created demo background for ${game}`);
  } else {
    console.log(`↷ Demo background exists for ${game}, skipping create`);
  }

  console.log(`Generated: ${outPng}`);
  console.log(`Final:     ${outWebp}`);
})();
