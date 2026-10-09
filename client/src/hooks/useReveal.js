import { useEffect } from 'react';

// Replays the reveal animation every time an element scrolls into view (down OR up).
// It measures each element's natural position (ignoring its own animation offset),
// so there is no flicker at the screen edges.
export default function useReveal(key) {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')];
    els.forEach((el) => el.classList.remove('in', 'done'));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const m = new DOMMatrix(getComputedStyle(el).transform);
        const scale = m.m22 || 1;
        const h = r.height / scale;
        const top = r.top - m.m42 - (h - r.height) / 2;   // undo the animation offset
        const bottom = top + h;

        if (top < vh * 0.9 && bottom > 0) el.classList.add('in');           // came into view
        else if (top >= vh || bottom <= 0) el.classList.remove('in');       // fully out: reset, ready to replay
      });
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    const t = setTimeout(update, 400);
    document.fonts?.ready.then(update);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    addEventListener('load', update);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      removeEventListener('load', update);
    };
  }, [key]);
}