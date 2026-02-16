import { SERIES, cards } from './cards.js';

const orbit = document.getElementById('orbit');
const revealPanel = document.getElementById('revealPanel');
const seriesEl = document.getElementById('seriesEl');
const idEl = document.getElementById('idEl');
const nameEl = document.getElementById('nameEl');
const shortEl = document.getElementById('shortEl');
const descEl = document.getElementById('descEl');
const nextBtn = document.getElementById('nextBtn');
const shareBtn = document.getElementById('shareBtn');
const canvas = document.getElementById('shareCanvas');

seriesEl.textContent = SERIES;

let current = 0;
let tracking = false;
let lastAngle = null;
let total = 0; // radians accumulated

function setProgress(pct) {
  orbit.style.setProperty('--p', `${pct}%`);
}

function normalizeAngle(a) {
  // map to [0, 2pi)
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
  if (lastAngle == null) { lastAngle = ang; return; }

  // smallest signed delta in (-pi, pi]
  let d = ang - lastAngle;
  if (d > Math.PI) d -= Math.PI * 2;
  if (d <= -Math.PI) d += Math.PI * 2;

  total += Math.abs(d); // allow either direction; keep it simple
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
  // If they let go early, reset for calm simplicity
  tracking = false;
  lastAngle = null;
  total = 0;
  setProgress(0);
}

function renderCard(i) {
  current = (i + cards.length) % cards.length;
  const c = cards[current];
  idEl.textContent = c.id;
  nameEl.textContent = c.name;
  shortEl.textContent = c.short;
  descEl.textContent = c.description;
}

function unveilRandom() {
  revealPanel.hidden = false;
  renderCard(Math.floor(Math.random() * cards.length));
  revealPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

nextBtn.addEventListener('click', () => renderCard(current + 1));

// Pointer events
orbit.addEventListener('pointerdown', start);
orbit.addEventListener('pointermove', move);
orbit.addEventListener('pointerup', end);
orbit.addEventListener('pointercancel', end);
orbit.addEventListener('pointerleave', (e) => { if (tracking) end(e); });

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
  const r = 32;

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.stroke();

  // header
  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '700 52px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('DYSON SWARM', x + 46, y + 92);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('FCC APPROVED • DEC 2026 • TYPE II', x + 46, y + 132);

  // series + id
  ctx.fillStyle = 'rgba(167,179,197,0.9)';
  ctx.font = '600 28px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
  ctx.fillText(`${SERIES}  ${card.id}`, x + 46, y + 190);

  // name
  ctx.fillStyle = 'rgba(253,230,138,0.95)';
  ctx.font = '700 64px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
  wrapText(ctx, card.name, x + 46, y + 280, w - 92, 72);

  // short + desc
  ctx.fillStyle = 'rgba(231,238,248,0.92)';
  ctx.font = '600 36px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, card.short, x + 46, y + 390, w - 92, 48);

  ctx.fillStyle = 'rgba(167,179,197,0.95)';
  ctx.font = '500 30px ui-sans-serif, system-ui, -apple-system';
  wrapText(ctx, card.description, x + 46, y + 470, w - 92, 44);

  // image placeholder block
  const imgY = y + h - 360;
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  roundRect(ctx, x + 46, imgY, w - 92, 220, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(231,238,248,0.55)';
  ctx.font = '600 22px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('IMAGE PLACEHOLDER', x + 66, imgY + 40);

  // footer
  ctx.fillStyle = 'rgba(167,179,197,0.9)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('soulgamesstudios.com', pad, H - 90);

  ctx.fillStyle = 'rgba(125,211,252,0.75)';
  ctx.font = '600 28px ui-sans-serif, system-ui, -apple-system';
  ctx.fillText('#DysonSwarm', W - pad - 160, H - 90);
}

shareBtn.addEventListener('click', () => {
  const c = cards[current] ?? cards[0];
  drawCardPNG(c);
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `${c.id.toLowerCase()}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
