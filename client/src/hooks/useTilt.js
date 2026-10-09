import { useEffect } from 'react';

// 3D tilt + light that follows the cursor, on every [data-tilt] card (mouse devices only)
export default function useTilt(key) {
  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const cleanups = [...document.querySelectorAll('[data-tilt]')].map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', `${((x - 0.5) * 10).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${((0.5 - y) * 8).toFixed(2)}deg`);
        el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
        el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      };
      const leave = () => { el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [key]);
}