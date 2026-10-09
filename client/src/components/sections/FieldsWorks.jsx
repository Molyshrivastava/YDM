import { Link } from 'react-router-dom';
import WaveDivider from '../common/WaveDivider';
import './FieldsWorks.css';

export default function FieldsWorks() {
  return (
    <section className="section fw">
      <div className="container">
        <div className="fw__panel reveal" data-reveal="zoom">
          <span className="fw__orb fw__orb--1" aria-hidden="true" />
          <span className="fw__orb fw__orb--2" aria-hidden="true" />
          <div className="fw__copy">
            <h2>Fields &amp; Works for <em>Clients</em></h2>
            <p>Recent work and project we have done in various field on social media.</p>
          </div>
          <Link className="fw__btn" to="/works" data-cursor="Open">
            <span className="fw__pulse" />
            <span>Watch Out !</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
      <WaveDivider color="#fff" />
    </section>
  );
}