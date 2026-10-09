import { useEffect } from 'react';

// Writes the scroll position to a CSS variable (--sy) so CSS can do parallax
export default function useScrollVar() {
  useEffect(() => {
    let raf;
    const set = () => document.documentElement.style.setProperty('--sy', window.scrollY);
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(set); };
    addEventListener('scroll', on, { passive: true });
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
}