import { useEffect, useState } from 'react';
import { COMPANY } from '../../data/company';
import './WhatsAppButton.css';

// uses the company phone number from data/company.js (change it there if your WhatsApp number is different)
const NUMBER = COMPANY.phone.replace(/\D/g, '');
const LINK = `https://wa.me/${NUMBER}?text=Hi%20Young%20Digital%20Media%2C%20I%20want%20to%20know%20more%20about%20your%20services.`;

export default function WhatsAppButton() {
  const [peek, setPeek] = useState(false);   // the popup shows itself once, so phones see it too
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setPeek(true), 5000);
    const b = setTimeout(() => setPeek(false), 11000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  return (
    <div className={`wa ${peek ? 'is-peek' : ''} ${closed ? 'is-closed' : ''}`} onMouseLeave={() => setClosed(false)}>
      <div className="wa__pop">
        <div className="wa__top">
          <a className="wa__who" href={LINK} target="_blank" rel="noreferrer">
            <span className="wa__avatar">YDM</span>YDM Team
          </a>
          <button type="button" className="wa__x" onClick={() => setClosed(true)} aria-label="Close message">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>
        <a className="wa__msg" href={LINK} target="_blank" rel="noreferrer">
          <span>Hi! What can I do for you?</span>
        </a>
      </div>

      <a className="wa__btn" href={LINK} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" data-cursor="Chat">
        <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3.5V17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="#fff" />
          <circle cx="8.5" cy="10.5" r="1.3" fill="#1F5FAE" /><circle cx="12" cy="10.5" r="1.3" fill="#1F5FAE" /><circle cx="15.5" cy="10.5" r="1.3" fill="#1F5FAE" />
        </svg>
        <span className="wa__badge" />
      </a>
    </div>
  );
}