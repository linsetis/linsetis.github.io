// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: заменить — укажите реальный домен после деплоя (нужно для sitemap и OG-ссылок)
const SITE = process.env.SITE_URL ?? 'https://linsetis.example.com';
// Для GitHub Pages в подпапке задайте BASE_PATH=/repo-name
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
