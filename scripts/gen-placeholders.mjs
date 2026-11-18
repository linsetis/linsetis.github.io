// Генерирует SVG-заглушки в public/images и public/stickers + favicon.
// Запуск: npm run placeholders  (существующие файлы НЕ перезаписываются,
// чтобы не затереть настоящие фото; флаг --force перезапишет всё).
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.ts';
import { starburstPath, mulberry32 } from '../src/lib/starburst.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const force = process.argv.includes('--force');
const C = { pink: '#F6B8DA', black: '#0E0E0E', ice: '#BFE6EE', white: '#FFFFFF' };

function save(rel, svg) {
  const file = join(root, 'public', rel);
  mkdirSync(dirname(file), { recursive: true });
  if (existsSync(file) && !force) return;
  writeFileSync(file, svg.trim() + '\n');
  console.log('  +', rel);
}

const themes = [
  { bg: C.pink, fg: C.black, star: C.ice, line: C.black },
  { bg: C.black, fg: C.pink, star: C.ice, line: C.pink },
  { bg: C.ice, fg: C.black, star: C.white, line: C.black },
];

function photo({ w, h, label, sub, seed, theme }) {
  const t = themes[theme % themes.length];
  const rnd = mulberry32(seed);
  const s = Math.min(w, h);
  const stars = Array.from({ length: 3 }, (_, i) => {
    const size = s * (0.12 + rnd() * 0.22);
    const x = w * (0.12 + rnd() * 0.76);
    const y = h * (0.12 + rnd() * 0.76);
    return `<path d="${starburstPath(seed * 7 + i)}" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${(size / 100).toFixed(2)})" fill="${t.star}" stroke="${t.line}" stroke-width="${(100 / size).toFixed(2)}" opacity=".9"/>`;
  }).join('');
  const blob = `<path d="M${w * 0.18} ${h * 0.62} C ${w * 0.1} ${h * 0.3}, ${w * 0.45} ${h * 0.12}, ${w * 0.62} ${h * 0.3} S ${w * 0.95} ${h * 0.55}, ${w * 0.7} ${h * 0.78} S ${w * 0.26} ${h * 0.92}, ${w * 0.18} ${h * 0.62} Z" fill="none" stroke="${t.line}" stroke-width="2" stroke-dasharray="1 9" stroke-linecap="round"/>`;
  const fs = Math.round(Math.min(w / 13, h / 7));
  const m = 28;
  const crop = (x, y, dx, dy) => `<path d="M${x} ${y + dy * 30}V${y}H${x + dx * 30}" fill="none" stroke="${t.fg}" stroke-width="2"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <!-- TODO: заменить — заглушка, положите вместо неё настоящее фото (jpg/webp) и поправьте путь в src/data -->
  <defs><pattern id="p" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)"><path d="M0 0V22" stroke="${t.fg}" stroke-width="1" opacity=".14"/></pattern></defs>
  <rect width="${w}" height="${h}" fill="${t.bg}"/>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  ${blob}${stars}
  ${crop(m, m, 1, 1)}${crop(w - m, m, -1, 1)}${crop(m, h - m, 1, -1)}${crop(w - m, h - m, -1, -1)}
  <g font-family="'JetBrains Mono', ui-monospace, Menlo, monospace" fill="${t.fg}" text-anchor="middle">
    <rect x="${w / 2 - fs * 5.6}" y="${h / 2 - fs * 0.95}" width="${fs * 11.2}" height="${fs * 1.5}" fill="${t.bg}"/>
    <text x="${w / 2}" y="${h / 2}" font-size="${fs}" font-weight="500" letter-spacing="1">${label}</text>
    <text x="${w / 2}" y="${h / 2 + fs * 1.15}" font-size="${Math.round(fs * 0.36)}" letter-spacing="1">${sub}</text>
  </g>
</svg>`;
}

const dims = (ratio = 4 / 3) => (ratio >= 1 ? { w: 1200, h: Math.round(1200 / ratio) } : { w: Math.round(1200 * ratio), h: 1200 });

let seed = 11;
projects.forEach((p, pi) => {
  const all = [p.cover, ...p.gallery];
  all.forEach((img, i) => {
    const { w, h } = dims(img.ratio);
    const n = String(i).padStart(2, '0');
    save(img.src.replace(/^\//, ''), photo({
      w, h, seed: seed++, theme: pi + i,
      label: i === 0 ? `ОБЛОЖКА ${String(pi + 1).padStart(2, '0')}` : `ФОТО ПРОЕКТА ${n}`,
      sub: `${p.title.toUpperCase()} · ${w}×${h} · ЗАМЕНИТЬ`,
    }));
  });
});

const misc = [
  ['images/about-workplace.svg', 4 / 3, 'РАБОЧЕЕ МЕСТО', 0],
  ['images/about-portrait.svg', 4 / 5, 'ПОРТРЕТ', 2],
  ['images/about-artwork.svg', 16 / 10, 'РАБОТА ИЗ ПОРТФОЛИО', 0],
  ['images/process-01.svg', 4 / 5, 'ПРОЦЕСС 01', 2],
  ['images/process-02.svg', 4 / 3, 'ПРОЦЕСС 02', 0],
  ['images/process-03.svg', 4 / 5, 'ПРОЦЕСС 03', 1],
];
misc.forEach(([rel, ratio, label, theme]) => {
  const { w, h } = dims(ratio);
  save(rel, photo({ w, h, seed: seed++, theme, label, sub: `${w}×${h} · ЗАМЕНИТЬ` }));
});

// ---------- Стикеры (прозрачный фон, «вырезанные» объекты) ----------
const mono = `font-family="'JetBrains Mono', ui-monospace, Menlo, monospace"`;
const head = `font-family="Oswald, 'Arial Narrow', sans-serif"`;
const stickerNote = '<!-- TODO: заменить — заглушка стикера; лучше PNG/WebP с прозрачным фоном -->';

save('stickers/sketchbook.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260">${stickerNote}
  <g transform="rotate(-8 150 130)">
    <rect x="40" y="40" width="220" height="180" rx="10" fill="${C.black}"/>
    <rect x="52" y="48" width="200" height="164" rx="6" fill="${C.white}"/>
    <path d="M80 150c20-60 40-60 50-20s30 30 40-10 30-40 50 10" fill="none" stroke="${C.black}" stroke-width="4" stroke-linecap="round"/>
    <path d="M90 90q30-20 60 0t60 0" fill="none" stroke="${C.pink}" stroke-width="10" stroke-linecap="round"/>
    <path d="${starburstPath(5)}" transform="translate(210 175) scale(.38)" fill="${C.ice}" stroke="${C.black}" stroke-width="3"/>
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${60 + i * 25}" y="30" width="8" height="26" rx="4" fill="${C.black}"/>`).join('')}
    <text x="70" y="200" ${mono} font-size="12" fill="${C.black}">СКЕТЧБУК</text>
  </g></svg>`);

save('stickers/markers.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260">${stickerNote}
  ${[[C.pink, -24, 70], [C.ice, -6, 130], [C.black, 14, 190]].map(([c, r, x]) => `
  <g transform="rotate(${r} ${x} 140)">
    <rect x="${x - 22}" y="60" width="44" height="150" rx="12" fill="${c}" stroke="${C.black}" stroke-width="3"/>
    <rect x="${x - 24}" y="36" width="48" height="50" rx="12" fill="${C.black}"/>
    <path d="M${x - 12} 210h24l-6 26h-12z" fill="${C.black}"/>
    <text x="${x}" y="150" ${mono} font-size="13" fill="${c === C.black ? C.white : C.black}" text-anchor="middle" transform="rotate(-90 ${x} 150)">МАРКЕР</text>
  </g>`).join('')}</svg>`);

save('stickers/poster.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 320">${stickerNote}
  <g transform="rotate(5 130 160)">
    <path d="M30 20h170l30 30v250H30z" fill="${C.white}"/>
    <path d="M200 20v30h30" fill="${C.pink}" stroke="${C.black}" stroke-width="2"/>
    <rect x="46" y="40" width="150" height="150" fill="${C.pink}"/>
    <path d="${starburstPath(9)}" transform="translate(122 115) scale(1.2)" fill="${C.ice}" stroke="${C.black}" stroke-width="1.5"/>
    <text x="46" y="236" ${head} font-size="44" fill="${C.black}">АФИША</text>
    <text x="46" y="262" ${mono} font-size="11" fill="${C.black}">: 21.11 · ПОДВАЛ · 23:00</text>
    <text x="46" y="282" ${mono} font-size="11" fill="${C.black}">: ВХОД СВОБОДНЫЙ</text>
  </g></svg>`);

save('stickers/nikita.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 360">${stickerNote}
  <g fill="${C.black}">
    <circle cx="100" cy="46" r="30"/>
    <path d="M88 20c10-14 34-12 40 6-14-4-26-2-40-6z"/>
    <path d="M60 92c10-10 70-10 80 0l18 100c2 12-14 14-18 4l-12-60-4 90 8 124c0 10-22 10-22 0l-10-112-10 112c0 10-22 10-22 0l8-124-4-90-12 60c-4 10-20 8-18-4z"/>
  </g>
  <text x="100" y="200" ${mono} font-size="12" fill="${C.pink}" text-anchor="middle">НИКИТА</text>
  </svg>`);

// ---------- Favicon: звезда-вспышка ----------
save('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -52 104 104"><path d="${starburstPath(42, 10)}" fill="${C.ice}" stroke="${C.black}" stroke-width="4" stroke-linejoin="round"/></svg>`);

console.log('Готово.');
