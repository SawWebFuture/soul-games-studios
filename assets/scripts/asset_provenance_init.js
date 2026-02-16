#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

const game = arg('game', 'dyson-swarm');
const outDir = arg('out-dir', `assets/provenance/${game}`);
const license = arg('license', 'Check model card / commercial terms');
const overwrite = process.argv.includes('--overwrite');

fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'bg-main.json');

if (fs.existsSync(outFile) && !overwrite) {
  console.log(`↷ Exists: ${outFile}`);
  process.exit(0);
}

const data = {
  game,
  assetId: 'bg-main',
  generatedAt: new Date().toISOString(),
  generator: 'stable-diffusion',
  model: '<checkpoint-name>',
  modelVersion: '<version>',
  license,
  prompt: '<full prompt>',
  negativePrompt: '<negative prompt>',
  seed: 123456789,
  steps: 36,
  cfg: 6.0,
  sampler: 'DPM++ 2M Karras',
  width: 1920,
  height: 1080,
  notes: 'Background asset. No artist-name style references.'
};

fs.writeFileSync(outFile, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`✅ Provenance created: ${outFile}`);
