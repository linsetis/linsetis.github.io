// Рендерит public/og.png (1200×630) и заглушку public/cv.pdf через Playwright.
// Запуск: node scripts/gen-og.mjs  (нужен: npx playwright install chromium)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { starburstPath } from '../src/lib/starburst.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const font = (p) => `data:font/woff2;base64,${readFileSync(join(root, 'node_modules/@fontsource', p)).toString('base64')}`;
const css = `
@font-face{font-family:Puffy;src:url(${font('rubik-mono-one/files/rubik-mono-one-latin-400-normal.woff2')})}
@font-face{font-family:Puffy;src:url(${font('rubik-mono-one/files/rubik-mono-one-cyrillic-400-normal.woff2')});unicode-range:U+0400-04FF}
@font-face{font-family:Mono;src:url(${font('jetbrains-mono/files/jetbrains-mono-cyrillic-400-normal.woff2')});unicode-range:U+0400-04FF}
@font-face{font-family:Mono;src:url(${font('jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2')})}
@font-face{font-family:Head;src:url(${font('oswald/files/oswald-cyrillic-400-normal.woff2')});unicode-range:U+0400-04FF}
@font-face{font-family:Head;src:url(${font('oswald/files/oswald-latin-400-normal.woff2')})}
body{margin:0}`;
const star = (seed, x, y, s) => `<path d="${starburstPath(seed)}" transform="translate(${x} ${y}) scale(${s})" fill="#BFE6EE" stroke="#0E0E0E" stroke-width="${1.5 / s}"/>`;
const og = `<html><head><style>${css}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><filter id="g"><feGaussianBlur stdDeviation="10"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -12"/></filter></defs>
<rect width="1200" height="630" fill="#F6B8DA"/>
<g font-family="Mono" font-size="20" fill="#0E0E0E" letter-spacing=".5"><text x="60" y="80">ДУМАЙ / РИСУЙ / ВОЗВРАЩАЙСЯ</text><text x="60" y="560">: АЙДЕНТИКА · ПЛАКАТЫ · ВЕБ-ДИЗАЙН</text><text x="1140" y="560" text-anchor="end">@LINSETIS</text></g>
<text x="1140" y="88" font-family="Head" font-size="44" text-anchor="end" fill="#0E0E0E">ГРАФИЧЕСКИЙ ДИЗАЙНЕР</text>
<g filter="url(#g)"><text x="60" y="390" font-family="Puffy" font-size="150" textLength="1080" lengthAdjust="spacingAndGlyphs" fill="#0E0E0E" stroke="#0E0E0E" stroke-width="14" stroke-linejoin="round">FOMENKO</text></g>
${star(3, 1080, 170, 1.3)}${star(8, 120, 470, 0.8)}
</svg></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, 'public/og.png') });
// TODO: заменить — это заглушка CV, положите настоящий public/cv.pdf
await page.setContent(`<html><head><style>${css} body{font-family:Mono;padding:60px;background:#F6B8DA} h1{font-family:Head;font-weight:400;font-size:64px;margin:0}</style></head><body><h1>НИКИТА ФОМЕНКО</h1><p>: ГРАФИЧЕСКИЙ ДИЗАЙНЕР · @LINSETIS</p><p>CV В РАБОТЕ — ЗАМЕНИТЬ ЭТОТ ФАЙЛ НАСТОЯЩИМ PUBLIC/CV.PDF</p></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: join(root, 'public/cv.pdf'), format: 'A4', printBackground: true });
await browser.close();
console.log('og.png + cv.pdf готовы');
