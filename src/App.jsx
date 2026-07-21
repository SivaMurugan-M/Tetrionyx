import { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BrandIntro from './components/BrandIntro';
import Footer from './components/Footer';
import Header from './components/Header';

import AboutPage from './pages/AboutPage';
import BrandingMarketingPage from './pages/BrandingMarketingPage';
import CareersApplyPage from './pages/CareersApplyPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import GetStartedPage from './pages/GetStartedPage';
import HomePage from './pages/HomePage';
import MobileAppDesignPage from './pages/MobileAppDesignPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import UiUxDesignPage from './pages/UiUxDesignPage';
import VideoEditingPage from './pages/VideoEditingPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';

import { prefersReducedMotion } from './utils/motionPreference';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Preserve browser scroll restoration on refresh/initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only scroll to top when actively navigating to a NEW route
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  // Intro animation runs on home route on first session visit only
  const [introActive, setIntroActive] = useState(() => {
    if (prefersReducedMotion()) return false;
    if (window.location.pathname !== '/') return false;
    return !sessionStorage.getItem('tetrionyx_intro_shown');
  });

  const [homepageVisible, setHomepageVisible] = useState(() => !introActive);

  const revealHomepage = useCallback(() => setHomepageVisible(true), []);
  const completeIntro = useCallback(() => {
    setIntroActive(false);
    sessionStorage.setItem('tetrionyx_intro_shown', 'true');
  }, []);

  return (
    <>
      <ScrollToTop />
      <div
        className={`app app-view${homepageVisible ? ' app-view--visible' : ''}`}
        aria-hidden={!homepageVisible}
        inert={homepageVisible ? undefined : ''}
      >
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/ui-ux-design" element={<UiUxDesignPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/mobile-app-design" element={<MobileAppDesignPage />} />
            <Route path="/services/video-editing" element={<VideoEditingPage />} />
            <Route path="/services/branding-marketing" element={<BrandingMarketingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/apply" element={<CareersApplyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {introActive && location.pathname === '/' && (
        <BrandIntro onReveal={revealHomepage} onComplete={completeIntro} />
      )}
    </>
  );
}

export default App;
