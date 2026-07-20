import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutSection from './components/AboutSection/AboutSection';
import BrandIntro from './components/BrandIntro';
import CareersSection from './components/CareersSection/CareersSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import ProductsSection from './components/ProductsSection/ProductsSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import BrandingMarketingPage from './pages/BrandingMarketingPage';
import CareersApplyPage from './pages/CareersApplyPage';
import MobileAppDesignPage from './pages/MobileAppDesignPage';
import UiUxDesignPage from './pages/UiUxDesignPage';
import VideoEditingPage from './pages/VideoEditingPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import { prefersReducedMotion } from './utils/motionPreference';
import './App.css';

function HomeSections() {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <CareersSection />
      <ContactSection />
    </>
  );
}

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
          <Routes>
            <Route path="/" element={<HomeSections />} />
            <Route path="/services/ui-ux-design" element={<UiUxDesignPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/mobile-app-design" element={<MobileAppDesignPage />} />
            <Route path="/services/video-editing" element={<VideoEditingPage />} />
            <Route path="/services/branding-marketing" element={<BrandingMarketingPage />} />
            <Route path="/careers/apply" element={<CareersApplyPage />} />
            <Route path="*" element={<HomeSections />} />
          </Routes>
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
