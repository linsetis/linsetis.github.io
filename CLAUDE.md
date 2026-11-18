# CLAUDE.md — портфолио Никиты Фоменко (linsetis)

Сайт-портфолио графического дизайнера **Никиты Фоменко** (ник **linsetis**).
Статический сайт на **Astro + TypeScript**, стили — чистый CSS с custom properties
(без Tailwind), анимации — **GSAP + ScrollTrigger**.

## Команды

```bash
npm install          # зависимости
npm run dev          # дев-сервер http://localhost:4321
npm run build        # статическая сборка в dist/ (astro check + build)
npm run preview      # предпросмотр собранного dist/
npm run screenshots  # скриншоты 1440/768/390 в /screenshots (нужен собранный dist/)
```

## Структура

```
src/
  components/   Nav, Hero, PuffyLogo, About, WhyMe, AlsoDo, Projects, ProjectCard,
                Starburst, Sticker, Tag, PhotoFrame, CurvePath, BlobDivider,
                ArrowButton, OvalWord, Contacts, Footer, Cursor, HandHeart
  layouts/      BaseLayout.astro  (head, SEO, OG, шрифты, курсор, подложка)
  pages/        index.astro, projects/[slug].astro, 404.astro
  data/         projects.ts (массив проектов), site.ts (имя, ссылки, услуги)
  lib/          starburst.ts (генерация лучей звезды по seed), motion.ts (GSAP)
  styles/       tokens.css (дизайн-токены), global.css (база, утилиты)
public/images/  SVG-заглушки фото (заменяемые)
public/stickers/ SVG-заглушки стикеров
scripts/        gen-placeholders.mjs, screenshots.mjs
```

Новый проект = новый объект в `src/data/projects.ts` + картинки в `public/images/`.
Страница `/projects/<slug>` генерируется автоматически.

## Дизайн-система (соблюдать строго)

**Настроение:** розово-чёрный зин-коллаж: фото «на плёнку» в белых рамках, наклейки,
бледно-голубые звёзды-вспышки, тонкие рукописные линии, узкий капс. Точная сетка
под «ручным» хаосом. НЕ минималистичный шаблон.

**Цвета** (только эти, без градиентов) — `src/styles/tokens.css`:
| токен | hex | роль |
|---|---|---|
| `--pink` | #F6B8DA | основной фон |
| `--black` | #0E0E0E | второй фон, текст, плашки |
| `--ice` | #BFE6EE | звёзды-вспышки, редкие акценты |
| `--white` | #FFFFFF | рамки фото, обводка стикеров, записки |
| `--paper` | #1A1A1A | внешняя подложка с SVG-шумом |

Контейнер `max-width: 1200px`, радиус 12px, на тёмной подложке. Секции чередуются
розовая → чёрная → розовая → чёрная.

**Типографика:**
- Заголовки — Oswald 400, КАПС, line-height .95, `clamp(32px, …, 64px)`.
- Микротекст — JetBrains Mono, капс, 10–11px, letter-spacing .02em, пояснения с «: ».
- Записка — JetBrains Mono строчные 13px, ~22ch, на белой карточке.
- Логотип — Rubik Mono One + goo-фильтр (PuffyLogo).
- Мелкий моно-текст на розовом — ТОЛЬКО чёрный (контраст).

**Компоненты:** PuffyLogo (goo-капли + розовая линия поверх, проп `text`),
Starburst (seed → неравные лучи, --ice), PhotoFrame (белая рамка, rotate, grain),
Sticker (белая обводка drop-shadow), Tag (white|black), CurvePath (линия + номера,
рисуется при скролле), BlobDivider (клякса-переход), OvalWord, ArrowButton.

**Анимации:** всё через `src/lib/motion.ts`; при `prefers-reduced-motion: reduce`
анимации не запускаются. Курсор-звезда только на `(hover: hover)`.

## Правила
- Плейсхолдеры помечены `// TODO: заменить` (или `<!-- TODO: заменить -->`).
- Нет горизонтального скролла на 390px — проверять `npm run screenshots`.
- Коммиты — маленькие, с понятными сообщениями.
