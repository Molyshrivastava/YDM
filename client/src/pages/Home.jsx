import Hero from '../components/sections/Hero';
import Navbar from '../components/layout/Navbar';
import Services from '../components/sections/Services';
import BestPackage from '../components/sections/BestPackage';
import InfluencerTeaser from '../components/sections/InfluencerTeaser';
import EventMarketing from '../components/sections/EventMarketing';
import FieldsWorks from '../components/sections/FieldsWorks';
import Pillars from '../components/sections/Pillars';
import MapSection from '../components/sections/MapSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Navbar />   {/* sits at the bottom of the first screen, then sticks to the top */}
      <Services />
      <BestPackage />
      <InfluencerTeaser />
      <EventMarketing />
      <FieldsWorks />
      <Pillars />
      <MapSection />
    </>
  );
}