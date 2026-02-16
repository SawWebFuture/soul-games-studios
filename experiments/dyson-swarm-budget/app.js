const HOLD_SECONDS = 8;

const holdBtn = document.getElementById('holdBtn');
const easterNodes = Array.from(document.querySelectorAll('.glitch-node'));
const easterDialog = document.getElementById('easterDialog');
const riddleForm = document.getElementById('riddleForm');
const riddleInput = document.getElementById('riddleInput');
const riddleFeedback = document.getElementById('riddleFeedback');
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
    title: 'COMPUTE SUBSTRATE: ONLINE',
    line: 'You converted mass → compute. The ledger stopped caring about dollars.',
    calm: 'Calm move: when the metric changes, keep your values steady.'
  },
  {
    title: 'CURRENCY: MASS / ENERGY',
    line: 'Your budget is now sunlight and orbital real estate.',
    calm: 'Calm move: optimization is a tool, not a religion.'
  },
  {
    title: 'ORBITAL DATA CENTER',
    line: 'The satellites aren’t panels. They’re compute—running in unfiltered light.',
    calm: 'Calm move: capability without purpose is just heat.'
  },
  {
    title: 'SOLAR SHADE: ARMED',
    line: 'You can dim the sun like a slider. Earth becomes an interface.',
    calm: 'Calm move: power demands humility and boundaries.'
  },
  {
    title: 'DOOR LEFT OPEN',
    line: 'A civilization reaches Type II… and still forgets the small things.',
    calm: 'Calm move: care is the real scaling constraint.'
  }
];

let current = 0;
let holding = false;
let startTs = 0;
let raf = 0;
let riddleAttempts = 0;
const MAX_RIDDLE_ATTEMPTS = 3;

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
  reset();
}

holdBtn.addEventListener('pointerdown', startHold);
holdBtn.addEventListener('pointerup', endHold);
holdBtn.addEventListener('pointercancel', endHold);
holdBtn.addEventListener('pointerleave', (e) => { if (holding) endHold(e); });

nextBtn.addEventListener('click', () => reveal(current + 1));

function openRiddleDialog() {
  if (riddleAttempts >= MAX_RIDDLE_ATTEMPTS) {
    riddleFeedback.textContent = 'Signal locked. Max attempts reached for this session.';
    return;
  }
  if (typeof easterDialog.showModal === 'function') {
    easterDialog.showModal();
    riddleInput.focus();
  }
}

easterNodes.forEach((node) => {
  node.addEventListener('click', (e) => {
    e.preventDefault();
    openRiddleDialog();
  });
});

riddleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (riddleAttempts >= MAX_RIDDLE_ATTEMPTS) {
    riddleFeedback.textContent = 'Signal locked. Max attempts reached for this session.';
    return;
  }

  const answer = String(riddleInput.value || '').toLowerCase().trim();
  const accepted = new Set(['care', 'love', 'dignity', 'humanity', 'meaning']);
  if (accepted.has(answer)) {
    riddleFeedback.textContent = 'Unlocked: hidden orbital signal.';
    easterDialog.close();
    return;
  }

  riddleAttempts += 1;
  const left = Math.max(0, MAX_RIDDLE_ATTEMPTS - riddleAttempts);
  riddleFeedback.textContent = left === 0
    ? 'Signal locked. Max attempts reached for this session.'
    : `Not quite. Attempts left: ${left}`;
});

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

function drawShareCard(outcome) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Background
  const grad = ctx.createRadialGradient(W * 0.25, H * 0.15, 40, W * 0.55, H * 0.25, H);
  grad.addColorStop(0, 'rgba(253, 230, 138, 0.16)');
  grad.addColorStop(0.35, 'rgba(125, 211, 252, 0.10)');
  grad.addColorStop(1, 'rgba(11, 15, 20, 1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const pad = 72;
  const x = pad;
  const y = 160;
  const w = W - pad * 2;
  const h = H - y - 220;
  const r = 32;

  // Panel
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.stroke();

  // Header
  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '700 52px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('DYSON SWARM BUDGET', x + 46, y + 92);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('SOUL GAMES STUDIOS', x + 46, y + 132);

  // Outcome
  ctx.fillStyle = 'rgba(253,230,138,0.95)';
  ctx.font = '700 44px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
  wrapText(ctx, outcome.title, x + 46, y + 220, w - 92, 52);

  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '500 34px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, outcome.line, x + 46, y + 330, w - 92, 46);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 30px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, outcome.calm, x + 46, y + 520, w - 92, 44);

  // Philosophy line
  ctx.fillStyle = 'rgba(231,238,248,0.7)';
  ctx.font = '500 24px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('“If everything becomes optimization, what stays sacred?”', x + 46, y + h - 58);

  // Footer
  ctx.fillStyle = 'rgba(167,179,197,0.9)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('soulgamesstudios.com', pad, H - 90);

  ctx.fillStyle = 'rgba(253,230,138,0.8)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('#MassAndEnergy', W - pad - 210, H - 90);
}

shareBtn.addEventListener('click', () => {
  const o = outcomes[current] ?? outcomes[0];
  drawShareCard(o);
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `dyson-swarm-${o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
