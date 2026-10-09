import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import WaveDivider from '../components/common/WaveDivider';
import { SocialIcon } from '../components/common/SocialIcons';
import { CREATORS, FORMS, ig } from '../data/influencer';
import './InfluencerMarketing.css';

const IMG = '/images/influencer/';

// counts up every time it scrolls into view
function CountUp({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (!e.isIntersecting) { setN(0); return; }
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className="cta__num">{n}%</span>;
}

// button whose label rolls to a second label on hover; opens a Google Form
const Roll = ({ href, a, b }) => (
  <a className="duo__btn" href={href} target="_blank" rel="noreferrer" data-cursor="Open form">
    <span className="roll"><span>{a}</span><span aria-hidden="true">{b}</span></span>
  </a>
);

export default function InfluencerMarketing() {
  return (
    <>
      <Navbar />

      {/* ---------- hero: half-screen image with wavy bottom ---------- */}
      <section className="ih">
        <img
          className="ih__img"
          src={`${IMG}hero.webp`}
          alt="Creators shooting videos on a phone"
          style={{ objectPosition: '50% 72%' }}
          fetchPriority="high"
        />
        <div className="ih__shade" />
        <div className="container ih__text">
          <p className="ih__pill">Connect with Creators &amp; Brands</p>
          <h1>Influencer <em>Marketing</em></h1>
        </div>
        <WaveDivider color="var(--sky)" />
      </section>

      {/* ---------- our creators ---------- */}
      <section className="section oc">
        <div className="container">
          <div className="oc__head reveal">
            <p className="eyebrow">Explore</p>
            <h2>Our <em>Creators</em></h2>
          </div>
          <div className="oc__grid">
            {CREATORS.map((c, n) => (
              <div className="reveal" data-reveal="zoom" key={c.handle} style={{ '--i': n }}>
                <a className="cr" href={ig(c.handle)} target="_blank" rel="noreferrer" data-tilt data-cursor="Follow">
                  <span className="cr__photo">
                    <img src={c.img} alt={`Creator @${c.handle}`} loading="lazy" />
                    <span className="cr__ig"><SocialIcon name="instagram" size={22} /></span>
                  </span>
                  <span className="cr__handle">@{c.handle}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- here brands meet creators ---------- */}
      <section className="section bm">
        <svg className="bm__lines" viewBox="0 0 400 600" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M400 30C250 80 300 190 215 255S50 330 135 430 330 545 400 570" />
            <path d="M400 120C310 160 330 230 270 285S150 340 205 405 340 470 400 490" />
            <ellipse cx="372" cy="318" rx="62" ry="36" />
          </g>
        </svg>
        <div className="container bm__grid">
          <div className="bm__photo reveal" data-reveal="left">
            <span className="bm__ring" />
            <span className="bm__disc"><img src={`${IMG}brands-creators.webp`} alt="Creator posing on rocks" loading="lazy" /></span>
            <span className="bm__chip bm__chip--a">Brands</span>
            <span className="bm__chip bm__chip--b">Creators</span>
          </div>
          <div className="bm__copy">
            <h2 className="reveal">Here Brands Meet <em>Creators</em> !</h2>
            <div className="duo reveal" style={{ '--i': 1 }}>
              <Roll href={FORMS.brand} a="Brand" b="I'm Brand" />
              <Roll href={FORMS.creator} a="Creator" b="I'm Creator" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- meet the right creator ---------- */}
      <section className="section mr">
        <div className="container">
          <div className="mr__head reveal">
            <h2>Meet The Right Creator For Your Business</h2>
            <span className="mr__bar" />
          </div>
          <div className="mr__grid">
            <div className="mr__txt reveal">
              <p className="mr__lead">
                Finding the perfect content creator for your business is essential. They should understand your industry,
                share your goals, and have the skills to engage your audience effectively. Make sure to choose a writer who
                aligns with your brand’s vision and values.
              </p>
              <hr />
              <h3>Professional Creators</h3>
              <p>
                Professional creators are the driving force behind impactful content. With expertise in diverse industries,
                they craft compelling narratives, engage audiences, and elevate brands. Trust a professional creator to
                deliver the quality and creativity your content deserves.
              </p>
            </div>
            <figure className="mr__fig mr__fig--blue reveal" data-reveal="right">
              <img src={`${IMG}creator-feature-1.webp`} alt="Professional creator in a blue headpiece" loading="lazy" />
            </figure>
            <figure className="mr__fig mr__fig--bw reveal" data-reveal="left">
              <img src={`${IMG}creator-feature-2.webp`} alt="Black and white creator portrait" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- closing call to action ---------- */}
      <section className="section cta">
        <WaveDivider pos="top" color="#fff" />
        <div className="container cta__in reveal" data-reveal="zoom">
          <h2>
            Young Digital Media we bring something unique to the market.
            We saw the brand grow more than <CountUp to={65} />.
          </h2>
          <div className="cta__btns">
            <Link className="cta__btn cta__btn--ghost" to="/contact">Contact</Link>
            <Link className="cta__btn cta__btn--solid" to="/">Explore More</Link>
          </div>
        </div>
      </section>
    </>
  );
}