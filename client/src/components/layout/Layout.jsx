import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import useReveal from '../../hooks/useReveal';
import useTilt from '../../hooks/useTilt';
import useScrollVar from '../../hooks/useScrollVar';

export default function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);   // scroll animations on every page
  useTilt(pathname);     // card tilt on every page
  useScrollVar();        // scroll position for parallax

  // every new page starts at the top
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);

  return (
    <>
      <main><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}