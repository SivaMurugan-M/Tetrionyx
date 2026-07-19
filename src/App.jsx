import { useCallback, useState } from 'react';
import BrandIntro from './components/BrandIntro';
import AppRoutes from './routes/AppRoutes';
import { prefersReducedMotion } from './utils/motionPreference';

function App() {
  const [introActive, setIntroActive] = useState(() => !prefersReducedMotion());
  const [homepageVisible, setHomepageVisible] = useState(() => !introActive);

  const revealHomepage = useCallback(() => setHomepageVisible(true), []);
  const completeIntro = useCallback(() => setIntroActive(false), []);

  return (
    <>
      <div className={`app-view${homepageVisible ? ' app-view--visible' : ''}`}>
        <AppRoutes />
      </div>

      {introActive && (
        <BrandIntro onReveal={revealHomepage} onComplete={completeIntro} />
      )}
    </>
  );
}

export default App;

