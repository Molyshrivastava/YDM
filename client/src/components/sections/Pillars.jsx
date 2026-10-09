import WaveDivider from '../common/WaveDivider';
import './Pillars.css';

const ITEMS = [
  { t: 'Brand Building', d: 'Our professionals are completely focused on Unique value propositions, we produce engaging content and apply Customer-centric approach.' },
  { t: 'Site Optimisation', d: 'Complete end to end Development and our deep market analysis makes your platform visible for optimisation.' },
  { t: 'Social Responsibility', d: 'Our commitment to social and environmental causes that align with your Brand values' },
];

export default function Pillars() {
  return (
    <section className="section pl">
      <span className="pl__orb pl__orb--1" aria-hidden="true" />
      <span className="pl__orb pl__orb--2" aria-hidden="true" />

      <div className="container pl__grid">
        <div className="pl__art reveal" data-reveal="left">
          <span className="pl__blob" />
          <span className="pl__dot pl__dot--1" />
          <span className="pl__dot pl__dot--2" />
          <img src="/images/pillars.webp" alt="Team planning a brand strategy at a desk" loading="lazy" />
        </div>

        <ol className="pl__list">
          {ITEMS.map((x, n) => (
            <li className="reveal" data-reveal="right" key={x.t} style={{ '--i': n }}>
              <div className="pl__item" data-cursor="Our values">
                <span className="pl__num">0{n + 1}</span>
                <div>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <WaveDivider color="var(--sky)" />
    </section>
  );
}