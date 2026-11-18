// Общие данные сайта. Всё, что помечено TODO, — проверить и заменить на реальное.

export const site = {
  name: 'Никита Фоменко',
  nick: 'linsetis',
  title: 'Никита Фоменко — графический дизайнер',
  description:
    'Никита Фоменко (linsetis) — графический дизайнер: айдентика, плакаты, веб-дизайн и мерч с характером. Дизайн, в котором можно дышать без напряжения и снобизма.',
  email: 'hello@linsetis.ru', // TODO: заменить — реальная почта
  /** Endpoint Formspree (https://formspree.io/f/xxxx). Пусто → форма откроет почтовый клиент (mailto). */
  formEndpoint: '', // TODO: заменить — вставить свой Formspree endpoint
  cv: '/cv.pdf', // TODO: заменить — положить настоящее CV в public/cv.pdf
  years: '2019—2026', // TODO: заменить — год начала практики
  heroWords: ['ДУМАЙ', 'РИСУЙ', 'ВОЗВРАЩАЙСЯ'],
  heroSkills: ['АЙДЕНТИКА', 'ПЛАКАТЫ', 'ВЕБ-ДИЗАЙН', 'СВОЙ ПОЧЕРК'],
} as const;

export const nav = [
  { label: 'ОБО МНЕ', href: '/#about' },
  { label: 'ПРОЕКТЫ', href: '/#projects' },
  { label: 'УСЛУГИ', href: '/#services' },
  { label: 'КОНТАКТЫ', href: '/#contacts' },
  { label: 'CV', href: site.cv },
] as const;

export const socials = [
  // TODO: заменить — проверить все ссылки и ники
  { label: 'TELEGRAM', handle: '@linsetis', href: 'https://t.me/linsetis' },
  { label: 'INSTAGRAM', handle: '@linsetis', href: 'https://instagram.com/linsetis' },
  { label: 'BEHANCE', handle: 'linsetis', href: 'https://www.behance.net/linsetis' },
  { label: 'EMAIL', handle: site.email, href: `mailto:${site.email}` },
] as const;

export const services = [
  { title: 'ЛОГОТИПЫ И АЙДЕНТИКА', tags: ['бренд', 'целиком', 'с гайдом'] },
  { title: 'ПЛАКАТЫ И АФИШИ', tags: ['музыка', 'ивенты'] },
  { title: 'ВЕБ-ДИЗАЙН', tags: ['лендинги', 'портфолио'] },
  { title: 'МЕРЧ', tags: ['футболки', 'стикеры'] },
  { title: 'ОБЛОЖКИ', tags: ['релизы', 'зины'] },
] as const;

export const reasons = [
  { title: 'СВОЙ СТИЛЬ', text: 'узнаваемо, сложно спутать', sticker: '/stickers/sketchbook.svg', alt: 'Скетчбук с набросками' },
  { title: 'ЖИВОЙ ПРОЦЕСС', text: 'скетчи, итерации, без шаблонов', sticker: '/stickers/markers.svg', alt: 'Связка маркеров' },
  { title: 'ЧЕСТНЫЙ ДИАЛОГ', text: 'без жаргона и закрытых клубов', sticker: '/stickers/poster.svg', alt: 'Распечатка плаката' },
  { title: 'ДОВОЖУ ДО КОНЦА', text: 'от идеи до файлов в печать', sticker: '/stickers/nikita.svg', alt: 'Никита в полный рост' },
] as const; // TODO: заменить — стикеры на реальные вырезанные фото (PNG с прозрачным фоном)
