import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutSection from './components/AboutSection/AboutSection';
import BrandIntro from './components/BrandIntro';
import CareersSection from './components/CareersSection/CareersSection';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
<<<<<<< HEAD
<<<<<<< HEAD
import ServicesSection from './components/ServicesSection/ServicesSection';
=======
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer';
<<<<<<< HEAD
>>>>>>> f308b7f20d2704998f27c4eea2ae84e391b37b0f
import ProductsSection from './components/ProductsSection/ProductsSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import BrandingMarketingPage from './pages/BrandingMarketingPage';
<<<<<<< HEAD
=======
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer';
>>>>>>> main
=======
import CareersApplyPage from './pages/CareersApplyPage';
=======
import ProductsSection from './components/ProductsSection/ProductsSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import BrandingMarketingPage from './pages/BrandingMarketingPage';
>>>>>>> main
import MobileAppDesignPage from './pages/MobileAppDesignPage';
import UiUxDesignPage from './pages/UiUxDesignPage';
import VideoEditingPage from './pages/VideoEditingPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
<<<<<<< HEAD
>>>>>>> f308b7f20d2704998f27c4eea2ae84e391b37b0f
=======
>>>>>>> main
import { prefersReducedMotion } from './utils/motionPreference';
import './App.css';

function HomeSections() {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <ServicesSection />
<<<<<<< HEAD
<<<<<<< HEAD
      <ProductsSection />
      <CareersSection />
<<<<<<< HEAD
=======
>>>>>>> main
=======
      <ContactSection />
>>>>>>> f308b7f20d2704998f27c4eea2ae84e391b37b0f
=======
      <ProductsSection />
      <CareersSection />
      <ContactSection />
>>>>>>> main
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
<<<<<<< HEAD
            <Route path="/careers/apply" element={<CareersApplyPage />} />
            <Route path="*" element={<HomeSections />} />
          </Routes>
<<<<<<< HEAD
          <HeroBanner />
          <AboutSection />
          <ContactSection />
=======
>>>>>>> f308b7f20d2704998f27c4eea2ae84e391b37b0f
=======
            <Route path="*" element={<HomeSections />} />
          </Routes>
>>>>>>> main
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

