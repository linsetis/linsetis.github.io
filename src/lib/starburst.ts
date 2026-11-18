/** Детерминированный ГПСЧ: одинаковый seed → одинаковая звезда. */
export function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Путь звезды-вспышки с неравными острыми лучами в viewBox "-50 -50 100 100".
 * @param seed  любое число — от него зависит форма
 * @param rays  количество лучей (по умолчанию 8–12 по seed)
 */
export function starburstPath(seed = 1, rays?: number): string {
  const rnd = mulberry32(seed * 9973 + 17);
  const n = rays ?? 8 + Math.floor(rnd() * 5);
  const step = (Math.PI * 2) / n;
  const rot = rnd() * Math.PI * 2;
  const outer: number[] = [];
  for (let i = 0; i < n; i++) outer.push(0.5 + rnd() * 0.5);
  const max = Math.max(...outer);
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const a = rot + i * step + (rnd() - 0.5) * step * 0.35;
    const R = (outer[i] / max) * 47;
    pts.push([Math.cos(a) * R, Math.sin(a) * R]);
    const b = rot + (i + 0.5) * step + (rnd() - 0.5) * step * 0.25;
    const r = 47 * (0.13 + rnd() * 0.11);
    pts.push([Math.cos(b) * r, Math.sin(b) * r]);
  }
  return 'M' + pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L') + 'Z';
}

/**
 * Петляющая «каллиграфическая» линия (удлинённая циклоида) поперёк слова.
 * Возвращает d для <path> в координатах viewBox.
 */
export function loopPath(
  x0: number,
  x1: number,
  yMid: number,
  loops: number,
  amp: number,
  seed = 3,
): string {
  const rnd = mulberry32(seed);
  const a = (x1 - x0) / (Math.PI * 2 * loops);
  const b = a * 1.75;
  const steps = loops * 48;
  const tMax = Math.PI * 2 * loops;
  const wob: number[] = Array.from({ length: loops + 2 }, () => 0.7 + rnd() * 0.6);
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * tMax;
    const k = wob[Math.floor(t / (Math.PI * 2))] ?? 1;
    const x = x0 + a * t - b * Math.sin(t) + b * Math.sin(0); // старт в x0
    const y = yMid + amp * k * Math.cos(t) - amp * 0.35 * Math.sin(t * 0.5);
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d;
}
