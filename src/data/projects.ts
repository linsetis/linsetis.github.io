// Портфолио. Чтобы добавить проект — допишите объект в массив и положите
// картинки в public/images/. Страница /projects/<slug> создастся сама.

export type Category = 'identity' | 'posters' | 'web' | 'merch';

export const categories: Array<{ id: Category | 'all'; label: string }> = [
  { id: 'all', label: 'ВСЕ' },
  { id: 'identity', label: 'АЙДЕНТИКА' },
  { id: 'posters', label: 'ПЛАКАТЫ' },
  { id: 'web', label: 'ВЕБ' },
  { id: 'merch', label: 'МЕРЧ' },
];

export interface ProjectImage {
  src: string;
  alt: string;
  /** Пропорции кадра, например 4/3 или 4/5 — чтобы не прыгала вёрстка */
  ratio?: number;
}

export interface Project {
  slug: string;
  title: string;
  year: number;
  client: string;
  role: string;
  /** Короткая строка для карточки */
  summary: string;
  /** Полное описание для страницы проекта (абзацы) */
  description: string[];
  /** Свободные теги — показываются как плашки */
  tags: string[];
  /** Для фильтров в разделе «Проекты» */
  categories: Category[];
  cover: ProjectImage;
  gallery: ProjectImage[];
}

// TODO: заменить — все проекты ниже придуманы как пример: тексты, клиенты и картинки.
export const projects: Project[] = [
  {
    slug: 'zerno',
    title: 'Зерно',
    year: 2025,
    client: 'Кофейня «Зерно»',
    role: 'Айдентика, упаковка, вывеска',
    summary: 'айдентика районной кофейни: знак-зёрнышко, стаканы, меню',
    description: [
      'Маленькая кофейня на углу, куда заходят «на пять минут» и остаются на час. Нужен был знак, который хочется наклеить на ноутбук.',
      'Сделал знак-зёрнышко с трещинкой-улыбкой, рукописный шрифт для меню, систему стикеров для стаканов и вывеску из гнутой трубки.',
    ],
    tags: ['айдентика', 'упаковка', 'вывеска'],
    categories: ['identity'],
    cover: { src: '/images/zerno-cover.svg', alt: 'Айдентика кофейни «Зерно»: стаканы и меню', ratio: 4 / 3 },
    gallery: [
      { src: '/images/zerno-01.svg', alt: 'Знак кофейни «Зерно»', ratio: 4 / 5 },
      { src: '/images/zerno-02.svg', alt: 'Стаканы со стикерами', ratio: 4 / 3 },
      { src: '/images/zerno-03.svg', alt: 'Меню кофейни', ratio: 4 / 5 },
      { src: '/images/zerno-04.svg', alt: 'Вывеска на фасаде', ratio: 16 / 10 },
    ],
  },
  {
    slug: 'podval',
    title: 'Подвал / афиши',
    year: 2025,
    client: 'Клуб «Подвал»',
    role: 'Серия афиш, соцсети',
    summary: 'серия из 24 афиш для клубных вечеринок, ризограф',
    description: [
      'Каждую неделю — новая вечеринка и новая афиша. Придумал систему, в которой каждый плакат разный, но всю серию узнают с другого конца улицы.',
      'Двухцветная печать на ризографе, ручные шрифты, коллажи из плёночных фото с прошлых вечеринок.',
    ],
    tags: ['плакаты', 'ризограф', 'серия'],
    categories: ['posters'],
    cover: { src: '/images/podval-cover.svg', alt: 'Серия афиш для клуба «Подвал»', ratio: 4 / 3 },
    gallery: [
      { src: '/images/podval-01.svg', alt: 'Афиша вечеринки №1', ratio: 4 / 5 },
      { src: '/images/podval-02.svg', alt: 'Афиша вечеринки №7', ratio: 4 / 5 },
      { src: '/images/podval-03.svg', alt: 'Афиши на стене клуба', ratio: 16 / 10 },
      { src: '/images/podval-04.svg', alt: 'Анимированная версия для соцсетей', ratio: 4 / 3 },
    ],
  },
  {
    slug: 'shum-fest',
    title: 'Шум фест',
    year: 2024,
    client: 'Фестиваль «Шум»',
    role: 'Мерч, навигация, стикерпаки',
    summary: 'мерч для фестиваля шумной музыки: футболки, шопперы, стикеры',
    description: [
      'Фестиваль на два дня и три сцены. Нужен был мерч, который раскупят в первый же вечер, и навигация, которую видно в толпе.',
      'Шелкография в два цвета, стикерпак из 12 наклеек, браслеты и указатели из фанеры.',
    ],
    tags: ['мерч', 'шелкография', 'стикеры'],
    categories: ['merch', 'identity'],
    cover: { src: '/images/shum-fest-cover.svg', alt: 'Мерч фестиваля «Шум»: футболки и шопперы', ratio: 4 / 3 },
    gallery: [
      { src: '/images/shum-fest-01.svg', alt: 'Футболка фестиваля', ratio: 4 / 5 },
      { src: '/images/shum-fest-02.svg', alt: 'Стикерпак', ratio: 4 / 3 },
      { src: '/images/shum-fest-03.svg', alt: 'Шоппер', ratio: 4 / 5 },
    ],
  },
  {
    slug: 'lunka',
    title: 'Лунка',
    year: 2024,
    client: 'Бильярдная «Лунка»',
    role: 'Сайт, бронирование, иллюстрации',
    summary: 'сайт бильярдной с бронированием столов и шарами-персонажами',
    description: [
      'Бильярдная, где играют не ради ставок, а ради компании. Сайт должен был звать «зайти вечером», а не пугать прайсом.',
      'Лендинг с живой схемой зала, бронированием в два клика и набором шаров-персонажей, которые реагируют на курсор.',
    ],
    tags: ['веб', 'лендинг', 'иллюстрации'],
    categories: ['web'],
    cover: { src: '/images/lunka-cover.svg', alt: 'Сайт бильярдной «Лунка» на ноутбуке', ratio: 4 / 3 },
    gallery: [
      { src: '/images/lunka-01.svg', alt: 'Главный экран сайта', ratio: 16 / 10 },
      { src: '/images/lunka-02.svg', alt: 'Мобильная версия', ratio: 4 / 5 },
      { src: '/images/lunka-03.svg', alt: 'Шары-персонажи', ratio: 4 / 3 },
    ],
  },
  {
    slug: 'kiks',
    title: 'Кикс',
    year: 2023,
    client: 'Самиздат, личный проект',
    role: 'Зин, обложки, вёрстка',
    summary: 'зин о неудачных набросках: 48 страниц промахов',
    description: [
      'Личный проект про ошибки. Собрал за год всё, что не получилось, и сверстал из этого зин — оказалось, что промахи выглядят лучше удачных работ.',
      'Тираж 100 экземпляров, ризограф, ручная брошюровка, обложка — каждый раз немного другая.',
    ],
    tags: ['зин', 'обложки', 'ризограф'],
    categories: ['posters'],
    cover: { src: '/images/kiks-cover.svg', alt: 'Зин «Кикс»: обложка и развороты', ratio: 4 / 3 },
    gallery: [
      { src: '/images/kiks-01.svg', alt: 'Обложка зина', ratio: 4 / 5 },
      { src: '/images/kiks-02.svg', alt: 'Разворот зина', ratio: 16 / 10 },
      { src: '/images/kiks-03.svg', alt: 'Стопка тиража', ratio: 4 / 3 },
    ],
  },
  {
    slug: 'tsvetnik',
    title: 'Цветник',
    year: 2026,
    client: 'Цветочная лавка «Цветник»',
    role: 'Айдентика, сайт, мерч',
    summary: 'цветочная лавка: знак-клякса, сайт-каталог, ленты и открытки',
    description: [
      'Лавка, где букеты собирают как коллажи. Сделал айдентику на основе кляксы краски, из которой «растут» все остальные элементы.',
      'Сайт-каталог с заказом, фирменные ленты, открытки и упаковочная бумага.',
    ],
    tags: ['айдентика', 'веб', 'упаковка'],
    categories: ['identity', 'web', 'merch'],
    cover: { src: '/images/tsvetnik-cover.svg', alt: 'Айдентика лавки «Цветник»: упаковка и открытки', ratio: 4 / 3 },
    gallery: [
      { src: '/images/tsvetnik-01.svg', alt: 'Знак-клякса', ratio: 4 / 5 },
      { src: '/images/tsvetnik-02.svg', alt: 'Сайт-каталог', ratio: 16 / 10 },
      { src: '/images/tsvetnik-03.svg', alt: 'Ленты и открытки', ratio: 4 / 3 },
    ],
  },
];

export function categoryLabel(id: Category): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
