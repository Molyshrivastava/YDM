import './Services.css';

const SERVICES = [
  { t: 'Social Media Marketing', d: 'Content, calendars and community management that keep your brand active where your customers scroll.', i: 'M4 5h16v11H9l-5 4z' },
  { t: 'Paid Advertisement', d: 'Targeted campaigns on Google and social platforms, tracked so every rupee has a purpose.', i: 'M3 11v3h3l8 4V7L6 11H3zM17 9a4 4 0 010 6' },
  { t: 'Website and Application', d: 'Fast, mobile-first websites and apps built around how your customers actually buy.', i: 'M3 5h18v14H3zM3 9h18' },
  { t: 'Commercial Shoot', d: 'Product, brand and promotional shoots with a team that handles the whole production.', i: 'M3 8h4l2-3h6l2 3h4v11H3zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z' },
  { t: 'Content Writing', d: 'Clear copy for websites, ads and posts that sounds like your business.', i: 'M5 4h10l4 4v12H5zM8 12h8M8 16h6' },
  { t: 'Event Marketing', d: 'Your events, our strategy to promote and excel your business with fond memories.', i: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4' },
  { t: 'Public Relations', d: 'Press, partnerships and reputation work that builds trust beyond the ad budget.', i: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 19c0-3 3-5 6-5s6 2 6 5M17 8a2.5 2.5 0 010 5M18 14c2 .5 3 2 3 4' },
  { t: 'Business Consultancy', d: 'Practical guidance on positioning, pricing and growth, from people who know local markets.', i: 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0012 3z' },
  { t: 'Influencer Marketing', d: 'Connect with creators and brands that fit your audience and your budget.', i: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z' },
];

const WAVE = 'M0,60 C180,20 540,20 720,60 S1260,100 1440,60 C1620,20 1980,20 2160,60 S2700,100 2880,60 V120 H0Z';

export default function Services() {
  return (
    <section className="section services" id="services">
      <span className="svc-orb svc-orb--1" aria-hidden="true" />
      <span className="svc-orb svc-orb--2" aria-hidden="true" />

      <div className="container">
        <div className="sec-head reveal">
          <h2>Everything your brand needs to be <em>seen</em></h2>
          <p>Nine services under one roof, so your promotion stays consistent from the first post to the final sale.</p>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s, n) => (
            <div className="reveal" data-reveal="zoom" key={s.t} style={{ '--i': n % 3 }}>
              <article className="svc" data-tilt data-cursor="Explore">
                <div className="svc__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.i} /></svg>
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="svc-wave" aria-hidden="true">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none"><path d={WAVE} /></svg>
      </div>
    </section>
  );
}