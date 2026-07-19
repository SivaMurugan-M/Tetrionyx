import { useCallback, useState } from 'react';
import AboutSection from './components/AboutSection/AboutSection';
import BrandIntro from './components/BrandIntro';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer';
import { prefersReducedMotion } from './utils/motionPreference';
import './App.css';

function App() {
  const [introActive, setIntroActive] = useState(() => !prefersReducedMotion());
  const [homepageVisible, setHomepageVisible] = useState(() => !introActive);

  const revealHomepage = useCallback(() => setHomepageVisible(true), []);
  const completeIntro = useCallback(() => setIntroActive(false), []);

  return (
    <>
      <div
        className={`app app-view${homepageVisible ? ' app-view--visible' : ''}`}
        aria-hidden={!homepageVisible}
        inert={homepageVisible ? undefined : ''}
      >
        <Header />
        <main>
          <HeroBanner />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {introActive && (
        <BrandIntro onReveal={revealHomepage} onComplete={completeIntro} />
      )}
    </>
  );
}

export default App;

