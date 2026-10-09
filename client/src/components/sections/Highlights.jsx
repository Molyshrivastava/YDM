import './Highlights.css';

const PILLARS = [
  { t: 'Brand Building', d: 'Our professionals focus on unique value propositions, produce engaging content and apply a customer-centric approach.', i: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5' },
  { t: 'Site Optimisation', d: 'Complete end-to-end development and deep market analysis make your platform visible for optimisation.', i: 'M4 18a9 9 0 1116 0M12 18l4-6' },
  { t: 'Social Responsibility', d: 'Our commitment to social and environmental causes that align with your brand values.', i: 'M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z' },
];

export default function Highlights() {
  return (
    <section className="section hl">
      <span className="hl__orb hl__orb--1" />
      <span className="hl__orb hl__orb--2" />
      <div className="container">
        <div className="pack reveal" data-reveal="zoom">
          <div className="pack__intro">
            <h2>Best Package</h2>
            <p>Connect with creators and brands that move your audience.</p>
          </div>
          <article className="pack__card" data-tilt data-cursor="Know more">
            <h3>Influencer Marketing</h3>
            <p>Creators matched to your brand, with campaigns planned and measured from start to finish.</p>
          </article>
          <article className="pack__card" data-tilt data-cursor="Know more">
            <h3>Event Marketing</h3>
            <p>Your events, our strategy to promote and excel your business in events with fond memories.</p>
          </article>
        </div>

        <div className="pillars">
          {PILLARS.map((p, n) => (
            <div className="pillar reveal" key={p.t} style={{ '--i': n }}>
              <div className="pillar__circle">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.i} /></svg>
              </div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}