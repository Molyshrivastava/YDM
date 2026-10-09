import './BestPackage.css';

const ITEMS = [
  { t: 'Brand Ideas', i: 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0012 3z' },
  { t: 'Content Planning', i: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4' },
  { t: 'Design & Photography', i: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M9 9.5h.01' },
  { t: 'Social Media Marketing', i: 'M4 5h16v11H9l-5 4z' },
  { t: 'Content Development', i: 'M5 4h10l4 4v12H5zM8 12h8M8 16h6' },
  { t: 'Commercial Shoot', i: 'M3 8h4l2-3h6l2 3h4v11H3zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z' },
];

export default function BestPackage() {
  return (
    <section className="section bp">
      <span className="bp__orb bp__orb--1" aria-hidden="true" />
      <span className="bp__orb bp__orb--2" aria-hidden="true" />

      <div className="container bp__grid">
        <div className="reveal" data-reveal="left">
          <div className="bp__card">
            <img src="/images/influencer/best-package-phone.webp" alt="Social media post mockup for Young Digital Media" loading="lazy" />
          </div>
        </div>

        <div className="bp__copy">
          <h2 className="bp__title reveal">Best <em>Package</em></h2>
          <ul className="bp__list">
            {ITEMS.map((x, n) => (
              <li className="reveal" data-reveal="right" key={x.t} style={{ '--i': n }}>
                <div className="bp__item" data-cursor="Know more">
                  <span className="bp__ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={x.i} /></svg>
                  </span>
                  <span className="bp__label">{x.t}</span>
                  <svg className="bp__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}