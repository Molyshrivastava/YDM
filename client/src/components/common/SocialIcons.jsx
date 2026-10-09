import { COMPANY } from '../../data/company';

const ICONS = {
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" fill="currentColor" />,
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </g>
  ),
  youtube: (
    <g>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9.3v5.4l4.7-2.7Z" fill="currentColor" />
    </g>
  ),
  linkedin: <path d="M3 9h4v12H3zM5 3a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 5 3zM10 9h3.8v1.7C14.4 9.6 15.7 8.8 17.6 8.8 21 8.8 22 11 22 14.5V21h-4v-5.8c0-1.4-.4-2.5-1.9-2.5S14 13.8 14 15.3V21h-4z" fill="currentColor" />,
};

export const SOCIALS = [
  { key: 'facebook', name: 'Facebook', href: COMPANY.social.facebook },
  { key: 'instagram', name: 'Instagram', href: COMPANY.social.instagram },
  { key: 'youtube', name: 'YouTube', href: COMPANY.social.youtube },
  { key: 'linkedin', name: 'LinkedIn', href: COMPANY.social.linkedin },
];

export function SocialIcon({ name, size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>;
}