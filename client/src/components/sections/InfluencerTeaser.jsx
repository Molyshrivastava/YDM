import { Link } from 'react-router-dom';
import WaveDivider from '../common/WaveDivider';
import './InfluencerTeaser.css';

export default function InfluencerTeaser() {
  return (
    <section className="section it">
      <WaveDivider pos="top" color="var(--sky)" />
      <span className="it__orb it__orb--1" aria-hidden="true" />
      <span className="it__orb it__orb--2" aria-hidden="true" />

      <div className="container it__grid">
        <div className="it__copy">
          <p className="it__eyebrow reveal">Connect with Creators &amp; Brands</p>
          <h2 className="it__title reveal" style={{ '--i': 1 }}>Influencer <em>Marketing</em></h2>
          <p className="it__text reveal" style={{ '--i': 2 }}>
            Creators matched to your brand, with campaigns planned and measured from start to finish.
            From fashion and lifestyle to local stories, we connect you with voices your audience already follows.
          </p>
          <div className="reveal" style={{ '--i': 3 }}>
            <Link className="it__btn" to="/influencer-marketing">
              <span>View Gallery</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>

        <div className="it__art reveal" data-reveal="right">
          <span className="it__blob" />
          <img src="/images/influencer/influencer-teaser.webp" alt="Creator taking a selfie inside a social media post" loading="lazy" />
        </div>
      </div>

      <WaveDivider pos="bottom" color="var(--sky)" />
    </section>
  );
}