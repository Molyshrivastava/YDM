import { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/common/Loader';
import CustomCursor from './components/common/CustomCursor';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import InfluencerMarketing from './pages/InfluencerMarketing';
import Works from './pages/Works';

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  return (
    <div className={ready ? 'ready' : ''}>
      <CustomCursor />
      {!ready && <Loader onDone={done} />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/influencer-marketing" element={<InfluencerMarketing />} />
          <Route path="/works" element={<Works />} />
        </Route>
      </Routes>
    </div>
  );
}