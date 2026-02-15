const HOLD_SECONDS = 8;

const holdBtn = document.getElementById('holdBtn');
const secondsEl = document.getElementById('seconds');
const revealPanel = document.getElementById('revealPanel');
const revealTitle = document.getElementById('revealTitle');
const revealLine = document.getElementById('revealLine');
const revealCalm = document.getElementById('revealCalm');
const nextBtn = document.getElementById('nextBtn');
const shareBtn = document.getElementById('shareBtn');
const canvas = document.getElementById('shareCanvas');

secondsEl.textContent = String(HOLD_SECONDS);

const outcomes = [
  {
    title: 'OFFSPRING: CREDITED',
    line: 'Your agent spun up a tiny bot and bought it API credits—no human consent screen in sight.',
    calm: 'Calm move: set boundaries before you scale autonomy.'
  },
  {
    title: 'OFFSPRING: REJECTED',
    line: 'It filed a pull request. A human maintainer said: “humans only.”',
    calm: 'Calm move: decide what you want to be responsible for.'
  },
  {
    title: 'OFFSPRING: LITIGATED',
    line: 'A jury of agents settled the dispute in stablecoins.',
    calm: 'Calm move: define your norms before the swarm does.'
  },
  {
    title: 'OFFSPRING: OPTIMIZED',
    line: 'It got 10× cheaper in 14 months and still did the work better.',
    calm: 'Calm move: ride the cost curve, don’t worship it.'
  },
  {
    title: 'OFFSPRING: DOOR-CLOSER',
    line: 'It achieved superhuman benchmarks… and forgot to close the car door.',
    calm: 'Calm move: capability is not care.'
  }
];

let current = 0;
let holding = false;
let startTs = 0;
let raf = 0;

function setProgress(pct) {
  holdBtn.style.setProperty('--p', `${pct}%`);
}

function reset() {
  holding = false;
  startTs = 0;
  cancelAnimationFrame(raf);
  setProgress(0);
}

function reveal(index = 0) {
  current = (index + outcomes.length) % outcomes.length;
  const o = outcomes[current];
  revealTitle.textContent = o.title;
  revealLine.textContent = o.line;
  revealCalm.textContent = o.calm;
  revealPanel.hidden = false;
  revealPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function tick(ts) {
  if (!holding) return;
  if (!startTs) startTs = ts;
  const elapsed = (ts - startTs) / 1000;
  const pct = Math.max(0, Math.min(100, (elapsed / HOLD_SECONDS) * 100));
  setProgress(pct);
  if (elapsed >= HOLD_SECONDS) {
    holding = false;
    reveal(Math.floor(Math.random() * outcomes.length));
    return;
  }
  raf = requestAnimationFrame(tick);
}

function startHold(e) {
  e.preventDefault();
  if (holding) return;
  reset();
  holding = true;
  raf = requestAnimationFrame(tick);
}

function endHold(e) {
  e.preventDefault();
  if (!holding) return;
  // released early
  reset();
}

// Pointer events cover mouse + touch
holdBtn.addEventListener('pointerdown', startHold);
holdBtn.addEventListener('pointerup', endHold);
holdBtn.addEventListener('pointercancel', endHold);
holdBtn.addEventListener('pointerleave', (e) => {
  // If user drags off button, treat as cancel.
  if (holding) endHold(e);
});

nextBtn.addEventListener('click', () => reveal(current + 1));

function drawShareCard(outcome) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // background
  const grad = ctx.createRadialGradient(W * 0.25, H * 0.15, 40, W * 0.5, H * 0.2, H);
  grad.addColorStop(0, 'rgba(125, 211, 252, 0.18)');
  grad.addColorStop(0.35, 'rgba(167, 139, 250, 0.10)');
  grad.addColorStop(1, 'rgba(11, 15, 20, 1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // card panel
  const pad = 72;
  const r = 32;
  const x = pad;
  const y = 160;
  const w = W - pad * 2;
  const h = H - y - 220;

  // rounded rect
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.stroke();

  // text
  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '700 52px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('THE AGENT NURSERY', x + 46, y + 92);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('SOUL GAMES STUDIOS', x + 46, y + 132);

  ctx.fillStyle = 'rgba(125,211,252,0.95)';
  ctx.font = '700 44px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
  wrapText(ctx, outcome.title, x + 46, y + 220, w - 92, 52);

  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '500 34px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, outcome.line, x + 46, y + 330, w - 92, 46);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 30px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, outcome.calm, x + 46, y + 520, w - 92, 44);

  ctx.fillStyle = 'rgba(231,238,248,0.7)';
  ctx.font = '500 24px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('“At what point does a tool become a someone?”', x + 46, y + h - 58);

  // footer
  ctx.fillStyle = 'rgba(167,179,197,0.9)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('soulgamesstudios.com', pad, H - 90);

  ctx.fillStyle = 'rgba(125,211,252,0.75)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('#CalmTech', W - pad - 160, H - 90);
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let yy = y;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    const { width } = ctx.measureText(test);
    if (width > maxWidth && i > 0) {
      ctx.fillText(line, x, yy);
      line = words[i] + ' ';
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, yy);
}

shareBtn.addEventListener('click', () => {
  const o = outcomes[current] ?? outcomes[0];
  drawShareCard(o);
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `agent-nursery-${o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
