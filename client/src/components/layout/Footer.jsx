import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { SOCIALS, SocialIcon } from '../common/SocialIcons';
import { COMPANY } from '../../data/company';
import './Footer.css';

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/careers', label: 'Careers' },
];

const I = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot__grid">
          {/* logo + social icons */}
          <div className="reveal" style={{ '--i': 0 }}>
            <span className="foot__logo"><Logo /></span>
            <div className="foot__social">
              {SOCIALS.map((s) => (
                <a key={s.key} className={`soc soc--${s.key}`} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}>
                  <SocialIcon name={s.key} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* company links */}
          <nav className="reveal" style={{ '--i': 1 }} aria-label="Company">
            <h4>Company</h4>
            <ul className="foot__links">
              {COMPANY_LINKS.map((l) => (<li key={l.to}><Link to={l.to}>{l.label}</Link></li>))}
            </ul>
          </nav>

          {/* contact details */}
          <div className="reveal" style={{ '--i': 2 }}>
            <h4>Contact</h4>
            <ul className="foot__contact">
              <li>
                <span className="ic"><svg width="18" height="18" viewBox="0 0 24 24" {...I}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg></span>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li>
                <span className="ic"><svg width="18" height="18" viewBox="0 0 24 24" {...I}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg></span>
                <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
              </li>
              <li>
                <span className="ic"><svg width="18" height="18" viewBox="0 0 24 24" {...I}><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
                <a href={COMPANY.mapUrl} target="_blank" rel="noreferrer" title="Open in Google Maps">{COMPANY.address}</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="foot__copy">© 2023 - {new Date().getFullYear()} Young Digital Media | All Rights Reserved</p>
      </div>
    </footer>
  );
}