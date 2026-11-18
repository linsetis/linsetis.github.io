// Все анимации сайта. При prefers-reduced-motion ничего не запускается.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMotion() {
  const root = document.documentElement;
  (window as unknown as { __motionReady: boolean }).__motionReady = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.remove('motion');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Появление: элементы «прилетают» и «наклеиваются»
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 1.1, rotation: (i % 2 ? 1 : -1) * (3 + (i % 3) * 2), y: el.hasAttribute('data-parallax') ? 0 : 24 },
      {
        opacity: 1, scale: 1, rotation: 0, y: 0, duration: 0.9, ease: 'back.out(1.8)',
        delay: Number(el.dataset.reveal || 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        clearProps: 'scale,rotation',
      },
    );
  });

  // Параллакс: data-parallax="0.3" — сила
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const k = Number(el.dataset.parallax || 0.2);
    gsap.fromTo(el, { y: k * 80 }, {
      y: -k * 80, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // PuffyLogo: капля надувается, линия прорисовывается
  gsap.utils.toArray<HTMLElement>('[data-puffy]').forEach((el) => {
    const blob = el.querySelector('.puffy__blob');
    const loop = el.querySelector<SVGPathElement>('.puffy__loop');
    const outline = el.querySelector<SVGTextElement>('.puffy__outline');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    if (blob) tl.fromTo(blob, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'elastic.out(1, 0.5)' });
    if (outline) tl.fromTo(outline, { strokeDasharray: 600, strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.2);
    if (loop) tl.fromTo(loop, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.3);
  });

  // CurvePath: прорисовка при скролле
  document.querySelectorAll<SVGSVGElement>('svg[data-curve]').forEach((svg) => {
    const path = svg.querySelector('path')!;
    const setup = () => {
      const len = path.getTotalLength();
      if (!len) return;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      ScrollTrigger.getById(svg.id || 'x')?.kill();
      gsap.to(path, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: svg.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
      });
    };
    svg.addEventListener('curve:built', () => { setup(); ScrollTrigger.refresh(); }, { once: true });
    setup();
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
