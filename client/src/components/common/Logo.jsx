import './Logo.css';

// Crops the empty space around logo.webp so the logo itself fills the box.
// Change --s (in CSS) to make the logo bigger or smaller.
export default function Logo() {
  return (
    <span className="logo">
      <img src="/logo.webp" alt="Young Digital Media" />
    </span>
  );
}