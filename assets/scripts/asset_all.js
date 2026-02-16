#!/usr/bin/env node

const { spawnSync } = require('child_process');

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

const game = arg('game', 'dyson-swarm');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(args) {
  const r = spawnSync(npmCmd, args, { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);
}

run(['run', 'asset:demo', '--', '--game', game]);
run(['run', 'asset:provenance:init', '--', '--game', game, '--license', 'Check model card / commercial terms']);
run(['run', 'asset:check', '--', '--game', game]);

console.log(`\n✅ Asset all complete for ${game}`);
