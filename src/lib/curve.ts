/** Строит петляющую кривую через центры [data-curve-node] и перестраивает её при ресайзе. */
export function buildCurves() {
  const svgs = document.querySelectorAll<SVGSVGElement>('svg[data-curve]');
  svgs.forEach((svg) => {
    const root = (svg.closest('[data-curve-root]') ?? svg.parentElement) as HTMLElement;
    const path = svg.querySelector('path')!;
    const draw = () => {
      const box = root.getBoundingClientRect();
      const nodes = [...root.querySelectorAll<HTMLElement>('[data-curve-node]')];
      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top] as const;
      });
      if (pts.length < 2) return;
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      let d = `M${pts[0][0] - 60} ${pts[0][1] - 80} Q${pts[0][0] - 40} ${pts[0][1]} ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1];
        const [x1, y1] = pts[i];
        const dir = x1 >= x0 ? 1 : -1;
        const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
        const r = Math.min(46, Math.abs(y1 - y0) / 4 + 18);
        // к середине → маленькая петля → к следующему узлу
        d += ` C${x0 + dir * 120} ${y0 + 10} ${mx - dir * 40} ${my - r * 2} ${mx} ${my - r}`;
        d += ` C${mx + dir * r * 1.6} ${my - r * 0.4} ${mx + dir * r * 0.6} ${my + r} ${mx} ${my + r * 0.4}`;
        d += ` C${mx - dir * r} ${my - r * 0.2} ${mx + dir * 60} ${my + r * 1.2} ${x1} ${y1}`;
      }
      const [lx, ly] = pts[pts.length - 1];
      d += ` Q${lx + 30} ${ly + 70} ${lx + 90} ${ly + 90}`;
      path.setAttribute('d', d);
      svg.dispatchEvent(new CustomEvent('curve:built'));
    };
    draw();
    new ResizeObserver(draw).observe(root);
    document.fonts?.ready.then(draw);
  });
}
