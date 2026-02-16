#!/usr/bin/env node

const fs = require('fs');

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

const game = arg('game', 'dyson-swarm');
const generated = `assets/generated/${game}/bg-main.png`;
const final = `assets/final/${game}/bg-main.webp`;
const prov = `assets/provenance/${game}/bg-main.json`;

let miss = 0;
if (!fs.existsSync(generated)) { console.log(`❌ missing generated: ${generated}`); miss++; }
if (!fs.existsSync(final)) { console.log(`❌ missing final:     ${final}`); miss++; }
if (!fs.existsSync(prov)) { console.log(`❌ missing provenance:${prov}`); miss++; }

console.log('\n--- Asset Pipeline Check ---');
console.log(`Game: ${game}`);
console.log(`Missing: ${miss}`);

if (miss === 0) {
  console.log('✅ All checks passed.');
  process.exit(0);
}

console.log('⚠️  Asset pipeline incomplete.');
process.exit(1);
