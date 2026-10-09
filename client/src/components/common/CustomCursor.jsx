import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const TARGETS = 'a, button, [data-cursor], input, textarea, select, label';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!fine) return; // touch devices keep normal behaviour
    document.documentElement.classList.add('has-cursor');

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
      ring.current.classList.remove('is-hidden');
      dot.current.classList.remove('is-hidden');
    };
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => {
      const t = e.target.closest?.(TARGETS);
      ring.current.classList.toggle('is-link', !!t);
      const text = t?.getAttribute?.('data-cursor');
      label.current.textContent = text || '';
      ring.current.classList.toggle('has-label', !!text);
    };
    const down = () => ring.current.classList.add('is-down');
    const up = () => ring.current.classList.remove('is-down');
    const leave = () => { ring.current.classList.add('is-hidden'); dot.current.classList.add('is-hidden'); };

    addEventListener('mousemove', move);
    addEventListener('mouseover', over);
    addEventListener('mousedown', down);
    addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', move);
      removeEventListener('mouseover', over);
      removeEventListener('mousedown', down);
      removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring is-hidden"><span ref={label} /></div>
      <div ref={dot} className="cursor-dot is-hidden" />
    </>
  );
}