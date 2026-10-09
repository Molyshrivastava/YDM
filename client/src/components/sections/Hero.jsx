import { useEffect, useRef, useState } from 'react';
import SocialRail from '../layout/SocialRail';
import './Hero.css';

const ROTATE = ['Social media', 'Paid advertising', 'Websites & apps', 'Commercial shoots', 'Content writing', 'Event marketing', 'Influencer campaigns'];

const WAVE_FILL = 'M0,60 C180,20 540,20 720,60 S1260,100 1440,60 C1620,20 1980,20 2160,60 S2700,100 2880,60 V120 H0Z';
const WAVE_LINE = 'M0,60 C180,20 540,20 720,60 S1260,100 1440,60 C1620,20 1980,20 2160,60 S2700,100 2880,60';

const Words = ({ text, start = 0 }) =>
  text.split(' ').map((w, i) => (
    <span className="word" key={i}><span style={{ '--d': `${start + i * 0.12}s` }}>{w}&nbsp;</span></span>
  ));

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [run, setRun] = useState(0);   // increases each time you come back to the top, to replay the intro
  const root = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATE.length), 2300);
    return () => clearInterval(t);
  }, []);

  // replay the headline animation when you scroll back up to the top
  useEffect(() => {
    let away = false;
    const on = () => {
      if (window.scrollY > 500) away = true;
      else if (away && window.scrollY < 30) { away = false; setRun((r) => r + 1); }
    };
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  // cursor-reactive parallax + light (mouse users only)
  const onMove = (e) => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const el = root.current;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
    el.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  // on replays the rotator + button appear sooner than on the very first load
  const again = run > 0;

  return (
    <section className="hero" ref={root} onMouseMove={onMove}>
      {/* fixed layer: the photo stays still while the page scrolls over it */}
      <div className="hero__media" aria-hidden="true">
        <div className="hero__parallax">
          <img className="hero__img" src="/images/hero.webp" alt="" fetchPriority="high" />
        </div>
        <div className="hero__shade" />
        <div className="hero__grain" />
      </div>
      <div className="hero__spot" aria-hidden="true" />

      <div className="container hero__content" key={run}>
        <h1 className="hero__title">
          <span className="ln"><Words text="Your Promotional" start={0.1} /></span>
          <span className="ln ln--serif"><Words text="partner !" start={0.4} /></span>
        </h1>

        <p className="hero__rotate" aria-live="polite" style={again ? { animationDelay: '.7s' } : undefined}>
          <span>We take care of</span>
          <span className="hero__rotate-word" key={idx}>{ROTATE[idx]}</span>
        </p>

        <div className="hero__cta" style={again ? { animationDelay: '.9s' } : undefined}>
          <a className="hero__btn" href="#services">
            <span>Our Services</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>

      {/* social icons: first screen only */}
      <SocialRail />

      {/* animated glass wave: same blue glass as the navbar below it */}
      <div className="hero__wave" aria-hidden="true">
        <svg className="w1" viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path className="wf" d={WAVE_FILL} /><path className="wl" d={WAVE_LINE} />
        </svg>
        <svg className="w2" viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path className="wl" d={WAVE_LINE} />
        </svg>
      </div>
    </section>
  );
}