import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import WaveDivider from '../components/common/WaveDivider';
import { SocialIcon } from '../components/common/SocialIcons';
import { COMPANY } from '../data/company';
import { PLANS, GRAPHICS, WEDESIGN } from '../data/works';
import './Works.css';

/* price counts up from 0 every time the card scrolls into view */
function Price({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (!e.isIntersecting) { setN(0); return; }
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / 1300, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className="pc__num">{n.toLocaleString('en-IN')}</span>;
}

const Tick = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

/* ---------- We Design: video plays when visible, pauses when you scroll away ---------- */
function WeDesign() {
  const ref = useRef(null);
  const [ok, setOk] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.play().then(() => setPlaying(true)).catch(() => {}); }
      else { v.pause(); }
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [ok]);

  if (!ok) return null;   // no video file yet: the section stays hidden

  const toggle = () => {
    const v = ref.current;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section className="section dz">
      <div className="container">
        <div className="dz__head reveal">
          <h2>We <em>Design</em></h2>
        </div>
        <div className="dz__frame reveal" data-reveal="zoom">
          <div className="dz__bar"><i /><i /><i /></div>
          <video ref={ref} className="dz__video" src={WEDESIGN} muted loop playsInline preload="metadata"
                 onError={() => setOk(false)} onClick={toggle} />
          <button type="button" className="dz__ctl" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
            {playing
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
          </button>
        </div>
      </div>
      <WaveDivider color="var(--blue)" />
    </section>
  );
}

/* ---------- one graphics tile (image or video) ---------- */
function Tile({ g, onOpen, onFail }) {
  const v = useRef(null);

  // on touch screens (no hover) video tiles play while they are on screen
  useEffect(() => {
    const el = v.current;
    if (!el || window.matchMedia('(hover:hover)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (g.type === 'video') {
    return (
      <button type="button" className="gx__item gx__item--video" onClick={onOpen} data-cursor="Play"
              onMouseEnter={() => v.current?.play().catch(() => {})} onMouseLeave={() => v.current?.pause()}>
        <video ref={v} src={g.src} muted loop playsInline preload="metadata" onError={onFail} />
        <span className="gx__play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
      </button>
    );
  }
  return (
    <button type="button" className="gx__item" onClick={onOpen} data-cursor="View">
      <img src={g.src} alt={g.alt} loading="lazy" onError={onFail} />
    </button>
  );
}

/* ---------- Graphics + full-screen viewer ---------- */
function Graphics() {
  const [failed, setFailed] = useState([]);
  const [open, setOpen] = useState(null);
  const list = GRAPHICS.filter((g) => !failed.includes(g.src));
  const fail = (src) => setFailed((f) => (f.includes(src) ? f : [...f, src]));

  const close = () => setOpen(null);
  const step = useCallback((d) => setOpen((i) => (i + d + list.length) % list.length), [list.length]);

  useEffect(() => {
    if (open === null) return;
    const key = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [open, step]);

  const cur = open !== null ? list[open] : null;

  return (
    <section className="section gx" id="graphics">
      <span className="gx__orb gx__orb--1" aria-hidden="true" />
      <span className="gx__orb gx__orb--2" aria-hidden="true" />
      <div className="container">
        <div className="gx__head reveal">
          <h2>Graphics</h2>
          <a className="gx__follow" href={COMPANY.social.instagram} target="_blank" rel="noreferrer">
            <SocialIcon name="instagram" size={20} />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="gx__grid">
          {list.map((g, i) => (
            <div className="gx__cell reveal" data-reveal="zoom" key={g.src} style={{ '--i': i % 3 }}>
              <Tile g={g} onOpen={() => setOpen(i)} onFail={() => fail(g.src)} />
            </div>
          ))}
        </div>
      </div>

      {cur && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Design viewer" onClick={close}>
          <button type="button" className="lb__btn lb__close" onClick={close} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
          <button type="button" className="lb__btn lb__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="lb__btn lb__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <figure className="lb__fig" key={cur.src} onClick={(e) => e.stopPropagation()}>
            {cur.type === 'video'
              ? <video src={cur.src} controls autoPlay loop playsInline />
              : <img src={cur.src} alt={cur.alt} />}
            <figcaption>Graphics · {open + 1} / {list.length}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ---------- page ---------- */
export default function Works() {
  const hero = useRef(null);

  // cursor-reactive parallax in the hero (mouse users only)
  const onMove = (e) => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    hero.current.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
    hero.current.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
  };

  return (
    <>
      <Navbar />

      {/* ---------- hero ---------- */}
      <section className="wk-hero" ref={hero} onMouseMove={onMove}>
        <span className="wk-hero__ring" aria-hidden="true" />
        <div className="wk-hero__disc" aria-hidden="true"><span className="wk-hero__grid" /></div>
        <span className="wk-shape wk-shape--rect" aria-hidden="true" />
        <span className="wk-shape wk-shape--tri" aria-hidden="true" />
        <span className="wk-shape wk-shape--dot" aria-hidden="true" />

        <div className="container wk-hero__in">
          <p className="wk-hero__pill">Fields &amp; Works for Clients</p>
          <h1>Our <em>Works</em></h1>
          <p className="wk-hero__sub">Recent work and project we have done in various field on social media.</p>
        </div>
        <WaveDivider color="var(--navy)" />
      </section>

      {/* ---------- build your website ---------- */}
      <section className="section pr">
        <span className="pr__orb pr__orb--1" aria-hidden="true" />
        <span className="pr__orb pr__orb--2" aria-hidden="true" />
        <div className="container">
          <div className="pr__head reveal">
            <h2>Build Your <em>Website</em></h2>
          </div>
          <div className="pr__grid">
            {PLANS.map((p, n) => (
              <div className="reveal" data-reveal="zoom" key={p.name} style={{ '--i': n }}>
                <article className="pc" data-tilt>
                  <div className="pc__top">
                    <h3>{p.name}</h3>
                    <p className="pc__price"><small>INR</small><Price to={p.price} /></p>
                    <ul className="pc__list">
                      {p.features.map((f) => (<li key={f}><span className="pc__tick"><Tick /></span>{f}</li>))}
                    </ul>
                  </div>
                  <div className="pc__foot">
                    <Link className="pc__btn" to="/contact" data-cursor="Contact">Purchase Now</Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider color="var(--sky)" />
      </section>

      <WeDesign />
      <Graphics />
    </>
  );
}