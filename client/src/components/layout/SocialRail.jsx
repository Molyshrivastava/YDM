import { SOCIALS, SocialIcon } from '../common/SocialIcons';
import './SocialRail.css';

export default function SocialRail() {
  return (
    <aside className="rail" aria-label="Social media">
      {SOCIALS.map((s) => (
        <a key={s.key} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}>
          <SocialIcon name={s.key} />
        </a>
      ))}
    </aside>
  );
}