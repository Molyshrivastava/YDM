import './EventMarketing.css';

// a = width / height of each photo, so every photo keeps its full shape (nothing gets cropped)
const ROWS = [
  [{ n: 1, a: 0.667 }, { n: 2, a: 0.667 }, { n: 3, a: 0.667 }, { n: 4, a: 0.667 }],
  [{ n: 5, a: 1.243 }, { n: 6, a: 1.494 }],
  [{ n: 7, a: 1 }, { n: 8, a: 0.729 }, { n: 9, a: 1.5, full: true }],
];

export default function EventMarketing() {
  return (
    <section className="section ev">
      <span className="ev__orb ev__orb--1" aria-hidden="true" />
      <span className="ev__orb ev__orb--2" aria-hidden="true" />

      <div className="container ev__grid">
        <div className="ev__copy">
          <h2 className="ev__title reveal">Event <em>Marketing</em></h2>
          <p className="ev__tag reveal" style={{ '--i': 1 }}>#brand</p>
          <p className="ev__text reveal" style={{ '--i': 2 }}>
            Your events our strategy to promote &amp; excel your business in Events with fond memories.
          </p>
        </div>

        <div className="ev__mosaic">
          {ROWS.map((row, r) => (
            <div className={`ev__row ev__row--${r + 1}`} key={r}>
              {row.map((t, k) => (
                <div key={t.n} className={`ev__cell reveal ${t.full ? 'is-full' : ''}`} data-reveal="zoom" style={{ '--a': t.a, '--i': k }}>
                  <div className="ev__tile" data-tilt data-cursor="Moments">
                    <img src={`/images/events/event${t.n}.webp`} alt={`Event moment ${t.n}`} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}