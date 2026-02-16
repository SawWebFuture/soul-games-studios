import { SERIES, cards } from './cards.js';

const orbit = document.getElementById('orbit');
const sun = document.getElementById('sun');
const glitchHotspot = document.getElementById('glitchHotspot');
const revealPanel = document.getElementById('revealPanel');
const captureBox = document.getElementById('captureBox');
const seriesEl = document.getElementById('seriesEl');
const idEl = document.getElementById('idEl');
const nameEl = document.getElementById('nameEl');
const shortEl = document.getElementById('shortEl');
const descEl = document.getElementById('descEl');
const nextBtn = document.getElementById('nextBtn');
const shareBtn = document.getElementById('shareBtn');
const canvas = document.getElementById('shareCanvas');

const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const captureNote = document.getElementById('captureNote');

const easterDialog = document.getElementById('easterDialog');
const riddleForm = document.getElementById('riddleForm');
const riddleInput = document.getElementById('riddleInput');
const riddleFeedback = document.getElementById('riddleFeedback');

seriesEl.textContent = SERIES;

const disconnectedCard = {
  id: 'DYSON_SWARM-X01',
  number: 'X01',
  name: 'DISCONNECTED',
  short: 'The signal dropped between power and meaning.',
  description: 'An off-ledger card. It appears when you remember that care, dignity, and love are not commodities — even in a Type II world.'
};

let current = 0;
let tracking = false;
let lastAngle = null;
let total = 0; // radians accumulated
let sunTaps = 0;
let sunTapTimer = null;
let secretUnlocked = false;
let riddleAttempts = 0;
const MAX_RIDDLE_ATTEMPTS = 3;

function setProgress(pct) {
  orbit.style.setProperty('--p', `${pct}%`);
}

function normalizeAngle(a) {
  const twoPi = Math.PI * 2;
  return (a % twoPi + twoPi) % twoPi;
}

function angleFromEvent(e) {
  const rect = orbit.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const x = e.clientX - cx;
  const y = e.clientY - cy;
  return normalizeAngle(Math.atan2(y, x));
}

function start(e) {
  e.preventDefault();
  tracking = true;
  lastAngle = angleFromEvent(e);
}

function move(e) {
  if (!tracking) return;
  e.preventDefault();
  const ang = angleFromEvent(e);
  if (lastAngle == null) {
    lastAngle = ang;
    return;
  }

  let d = ang - lastAngle;
  if (d > Math.PI) d -= Math.PI * 2;
  if (d <= -Math.PI) d += Math.PI * 2;

  total += Math.abs(d);
  lastAngle = ang;

  const pct = Math.min(100, (total / (Math.PI * 2)) * 100);
  setProgress(pct);

  if (total >= Math.PI * 2) {
    tracking = false;
    unveilRandom();
  }
}

function end(e) {
  if (!tracking) return;
  e.preventDefault();
  tracking = false;
  lastAngle = null;
  total = 0;
  setProgress(0);
}

function renderCardByData(c) {
  idEl.textContent = c.id;
  nameEl.textContent = c.name;
  shortEl.textContent = c.short;
  descEl.textContent = c.description;
}

function renderCard(i) {
  current = (i + cards.length) % cards.length;
  renderCardByData(cards[current]);
}

function unveilRandom() {
  revealPanel.hidden = false;
  renderCard(Math.floor(Math.random() * cards.length));
  captureBox.hidden = false;
  revealPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

nextBtn.addEventListener('click', () => {
  if (secretUnlocked) {
    secretUnlocked = false;
  }
  renderCard(current + 1);
});

orbit.addEventListener('pointerdown', start);
orbit.addEventListener('pointermove', move);
orbit.addEventListener('pointerup', end);
orbit.addEventListener('pointercancel', end);
orbit.addEventListener('pointerleave', (e) => {
  if (tracking) end(e);
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
  const words = String(text).split(' ');
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

function drawCardPNG(card) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  const grad = ctx.createRadialGradient(W * 0.25, H * 0.12, 40, W * 0.55, H * 0.22, H);
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

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, w, h, 32);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '700 52px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('DYSON SWARM', x + 46, y + 92);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('FCC APPROVED • DEC 2026 • TYPE II', x + 46, y + 132);

  ctx.fillStyle = 'rgba(167,179,197,0.9)';
  ctx.font = '600 28px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
  ctx.fillText(`${SERIES}  ${card.id}`, x + 46, y + 190);

  ctx.fillStyle = 'rgba(253,230,138,0.95)';
  ctx.font = '700 64px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
  wrapText(ctx, card.name, x + 46, y + 280, w - 92, 72);

  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '600 36px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, card.short, x + 46, y + 390, w - 92, 48);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 30px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, card.description, x + 46, y + 470, w - 92, 44);

  const imgY = y + h - 360;
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  roundRect(ctx, x + 46, imgY, w - 92, 220, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(231,238,248,0.55)';
  ctx.font = '600 22px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText(secretUnlocked ? 'DISCONNECTED SIGNAL' : 'IMAGE PLACEHOLDER', x + 66, imgY + 40);

  ctx.fillStyle = 'rgba(167,179,197,0.9)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('soulgamesstudios.com', pad, H - 90);

  ctx.fillStyle = 'rgba(125,211,252,0.75)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('#DysonSwarm', W - pad - 160, H - 90);
}

shareBtn.addEventListener('click', () => {
  const c = secretUnlocked ? disconnectedCard : cards[current] ?? cards[0];
  drawCardPNG(c);
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `${c.id.toLowerCase()}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});

emailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = String(emailInput.value || '').trim();
  if (!email || !email.includes('@')) {
    captureNote.textContent = 'Please enter a valid email.';
    return;
  }
  // Placeholder soft capture behavior; replace with ConvertKit embed/API later.
  captureNote.textContent = 'Nice. You are on the card drop signal.';
  emailInput.value = '';
});

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

function handleSunTap() {
  sunTaps += 1;
  if (sunTapTimer) clearTimeout(sunTapTimer);
  sunTapTimer = setTimeout(() => {
    sunTaps = 0;
  }, 1800);

  if (sunTaps >= 5) {
    sunTaps = 0;
    openRiddleDialog();
  }
}

sun.addEventListener('click', handleSunTap);
sun.addEventListener('touchstart', handleSunTap, { passive: true });
glitchHotspot.addEventListener('click', openRiddleDialog);

function normalizeAnswer(s) {
  return String(s || '').toLowerCase().trim();
}

riddleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (riddleAttempts >= MAX_RIDDLE_ATTEMPTS) {
    riddleFeedback.textContent = 'Signal locked. Max attempts reached for this session.';
    return;
  }

  const answer = normalizeAnswer(riddleInput.value);
  const accepted = new Set(['care', 'love', 'dignity', 'humanity', 'meaning']);

  if (accepted.has(answer)) {
    secretUnlocked = true;
    revealPanel.hidden = false;
    renderCardByData(disconnectedCard);
    captureBox.hidden = false;
    riddleFeedback.textContent = 'Unlocked: DISCONNECTED card.';
    easterDialog.close();
    revealPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  riddleAttempts += 1;
  const left = Math.max(0, MAX_RIDDLE_ATTEMPTS - riddleAttempts);
  if (left === 0) {
    riddleFeedback.textContent = 'Signal locked. Max attempts reached for this session.';
  } else {
    riddleFeedback.textContent = `Not quite. Think beyond currency. Attempts left: ${left}`;
  }
});
