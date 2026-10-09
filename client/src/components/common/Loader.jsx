import { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-loading');
    const start = performance.now();
    const DURATION = 2600; // minimum time so the animation always plays
    let raf, timer;
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        timer = setTimeout(() => {
          document.body.classList.remove('is-loading');
          onDone();
        }, 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [onDone]);

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-label="Loading">
      <div className="loader__panel loader__panel--top" />
      <div className="loader__panel loader__panel--bottom" />
      <div className="loader__center">
        <svg className="loader__logo" viewBox="0 0 360 120" aria-hidden="true">
          <defs>
            <linearGradient id="ydmGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#F47B20" />
              <stop offset=".5" stopColor="#E8412C" />
              <stop offset="1" stopColor="#1F5FAE" />
            </linearGradient>
          </defs>
          <text x="50%" y="92" textAnchor="middle" className="loader__text">YDM</text>
        </svg>
        <p className="loader__name">Young Digital Media</p>
        <div className="loader__bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="loader__pct">{String(pct).padStart(3, '0')}</div>
      </div>
    </div>
  );
}