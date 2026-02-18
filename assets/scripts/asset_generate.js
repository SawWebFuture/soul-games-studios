#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function section(md, heading) {
  const re = new RegExp(`^##\\s+${heading}\\s*[\\r\\n]+([\\s\\S]*?)(?=^##\\s+|$)`, 'im');
  const m = md.match(re);
  if (!m) return null;
  return m[1].trim();
}

function cleanPromptBlock(block) {
  if (!block) return null;
  const lines = block
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^\d+\)\s+/.test(l));

  if (lines.length === 0) return null;
  // Prefer first quoted line or first line.
  const quoted = lines.find((l) => l.startsWith('"') && l.endsWith('"'));
  return (quoted || lines[0]).replace(/^"|"$/g, '').trim();
}

async function generateOpenAI({ prompt, size }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Export it first, then rerun.');
  }

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      size,
      quality: 'high'
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI image generation failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error('OpenAI returned no image data.');
  return Buffer.from(b64, 'base64');
}

(async () => {
  const game = arg('game', 'dyson-swarm');
  const size = arg('size', '1536x1024'); // valid gpt-image-1 size
  const cutoutCenter = process.argv.includes('--cutout-center');
  const cutoutRadius = Number(arg('cutout-radius', '170'));

  const promptPath = `assets/prompts/backgrounds/${game}.md`;
  if (!fs.existsSync(promptPath)) {
    throw new Error(`Prompt file not found: ${promptPath}`);
  }

  const md = fs.readFileSync(promptPath, 'utf8');
  const core = cleanPromptBlock(section(md, 'Core prompt'));
  const neg = cleanPromptBlock(section(md, 'Negative prompt'));

  if (!core) throw new Error(`Could not parse core prompt from ${promptPath}`);

  const finalPrompt = [
    core,
    '16:9 cinematic game background, subtle depth, UI-friendly negative space.',
    cutoutCenter ? 'Keep the center visually calm with no dominant central sun/star disk.' : null,
    neg ? `Avoid: ${neg}` : null
  ].filter(Boolean).join(' ');

  const genDir = `assets/generated/${game}`;
  const finDir = `assets/final/${game}`;
  fs.mkdirSync(genDir, { recursive: true });
  fs.mkdirSync(finDir, { recursive: true });

  const outPng = path.join(genDir, 'bg-main.png');
  const outFinalPng = path.join(finDir, 'bg-main.png');
  const outWebp = path.join(finDir, 'bg-main.webp');

  console.log(`🎨 Generating background for ${game}...`);
  const imageBuffer = await generateOpenAI({ prompt: finalPrompt, size });

  // Normalize to 1920x1080 so all games are consistent.
  let pipeline = sharp(imageBuffer)
    .resize(1920, 1080, {
      fit: 'cover',
      position: 'center'
    });

  if (cutoutCenter) {
    const r = Number.isFinite(cutoutRadius) && cutoutRadius > 10 ? cutoutRadius : 170;
    const mask = Buffer.from(`
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="1920" height="1080" fill="black" />
  <circle cx="960" cy="540" r="${r}" fill="white" />
</svg>`);

    pipeline = pipeline.composite([{ input: mask, blend: 'dest-out' }]);
  }

  await pipeline.png().toFile(outPng);
  await sharp(outPng).png().toFile(outFinalPng);
  await sharp(outPng).webp({ quality: 88 }).toFile(outWebp);

  console.log(`✅ Generated: ${outPng}`);
  console.log(`✅ Final PNG: ${outFinalPng}${cutoutCenter ? ' (transparent center cutout)' : ''}`);
  console.log(`✅ Final:     ${outWebp}`);
})();
