import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import { SOCIALS, SocialIcon } from '../common/SocialIcons';
import { COMPANY } from '../../data/company';
import './Navbar.css';

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/about', label: 'About Us' },
];
const MOBILE_LINKS = [...LINKS, { to: '/contact', label: 'Contact' }];

export default function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef(null);
  const { pathname } = useLocation();

  // logo + "Digital Marketing in Bilaspur" go to the home page (smooth scroll to top if already there)
  const goHome = () => {
    setOpen(false);
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const check = () => {
      const el = bar.current;
      setStuck(el.getBoundingClientRect().top <= 1);               // pinned to the top?
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1).toFixed(4) : 0); // scroll progress line
    };
    check();
    addEventListener('scroll', check, { passive: true });
    addEventListener('resize', check);
    return () => { removeEventListener('scroll', check); removeEventListener('resize', check); };
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header ref={bar} className={`nav ${stuck ? 'is-stuck' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" aria-label="Young Digital Media home" onClick={goHome}><Logo /></Link>

        <nav className="nav__links" aria-label="Main">
          <Link to="/" className="nav__tag" onClick={goHome}>Digital Marketing in Bilaspur</Link>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav__link"><span>{l.label}</span></NavLink>
          ))}
          <Link to="/contact" className="nav__cta">Contact</Link>
        </nav>

        <button className="nav__burger" onClick={() => setOpen(true)} aria-expanded={open} aria-label="Open menu">
          <i /><i /><i />
        </button>
      </div>

      {/* ---- mobile / tablet menu ---- */}
      <div className="nav__drawer" aria-hidden={!open}>
        <span className="dr-orb dr-orb--1" /><span className="dr-orb dr-orb--2" />

        <div className="dr-top">
          <Link to="/" className="nav__logo" aria-label="Home" onClick={goHome}><Logo /></Link>
          <button className="dr-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>

        <nav className="dr-links" aria-label="Mobile">
          {MOBILE_LINKS.map((l, i) => (
            <NavLink key={l.to} to={l.to} className="dr-link" style={{ '--i': i }}>
              <span className="dr-num">0{i + 1}</span>
              <span className="dr-label">{l.label}</span>
              <svg className="dr-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </NavLink>
          ))}
        </nav>

        <div className="dr-foot">
          <Link to="/" className="dr-tag" onClick={goHome}>Digital Marketing in Bilaspur</Link>
          <div className="dr-social">
            {SOCIALS.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}><SocialIcon name={s.key} size={20} /></a>
            ))}
          </div>
          <a className="dr-phone" href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
        </div>
      </div>
    </header>
  );
}