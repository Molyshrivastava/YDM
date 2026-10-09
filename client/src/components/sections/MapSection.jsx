import { COMPANY } from '../../data/company';
import './MapSection.css';

// Shows the Google Maps listing for the business. If it points to the wrong place, change the text after q=
const EMBED = 'https://www.google.com/maps?q=Young+Digital+Media+Bilaspur+Chhattisgarh&output=embed';

export default function MapSection() {
  return (
    <section className="section mp">
      <div className="container">
        <div className="mp__head reveal">
          <p className="mp__eyebrow">Find us</p>
          <h2>Visit <em>Young Digital Media</em></h2>
        </div>

        <div className="mp__wrap reveal" data-reveal="zoom">
          <iframe
            className="mp__map"
            title="Young Digital Media on Google Maps"
            src={EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="mp__card">
            <span className="mp__pin" aria-hidden="true" />
            <h3>Young Digital Media</h3>
            <p>{COMPANY.address}</p>
            <div className="mp__btns">
              <a className="mp__btn mp__btn--solid" href={COMPANY.mapUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
              <a className="mp__btn" href={`tel:${COMPANY.phone}`}>Call us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}