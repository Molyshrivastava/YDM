import './WaveDivider.css';

const WAVE = 'M0,60 C180,20 540,20 720,60 S1260,100 1440,60 C1620,20 1980,20 2160,60 S2700,100 2880,60 V120 H0Z';

// A moving wave at the top or bottom of a section. `color` = the colour of the neighbouring section.
export default function WaveDivider({ pos = 'bottom', color = 'var(--sky)' }) {
  return (
    <div className={`wd wd--${pos}`} aria-hidden="true">
      <svg viewBox="0 0 2880 120" preserveAspectRatio="none"><path d={WAVE} style={{ fill: color }} /></svg>
    </div>
  );
}