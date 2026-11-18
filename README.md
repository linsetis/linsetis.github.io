# linsetis — портфолио Никиты Фоменко

Astro + TypeScript, чистый CSS, GSAP. Статическая сборка, работает офлайн.

## Запуск
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # проверка типов + сборка в dist/
npm run preview   # посмотреть собранный dist/
```

## Добавить проект
1. Положите картинки в `public/images/` (jpg/webp; обложка ~1200×900).
2. Допишите объект в `src/data/projects.ts` (`slug`, `title`, `year`, `client`, `role`,
   `summary`, `description`, `tags`, `categories`, `cover`, `gallery`).
   Страница `/projects/<slug>` и карточка с фильтром появятся сами.

Заглушки для нового проекта можно сгенерировать: `npm run placeholders`
(существующие файлы не перезаписываются).

## Заменить фото и тексты
- Фото: замените файлы в `public/images/` и `public/stickers/` (стикеры — PNG с прозрачным фоном)
  и поправьте пути в `src/data/*.ts` / компонентах. Все заглушки помечены `TODO: заменить`.
- Ссылки, почта, Formspree, CV: `src/data/site.ts`. CV → `public/cv.pdf`.
- OG-картинка: `public/og.png` (пересобрать: `node scripts/gen-og.mjs`).
- Найти всё, что нужно заменить: `grep -rn "TODO: заменить" src scripts`.

## Деплой
Перед деплоем укажите домен: `SITE_URL=https://ваш-домен` (или в `astro.config.mjs`).
- **Vercel / Netlify:** импортируйте репозиторий, build `npm run build`, output `dist`.
- **GitHub Pages:** в Actions используйте `withastro/action`; для адреса вида
  `user.github.io/repo` задайте `BASE_PATH=/repo` и `SITE_URL=https://user.github.io`.
