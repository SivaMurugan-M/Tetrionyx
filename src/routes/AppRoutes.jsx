import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import AboutPage from '../pages/AboutPage';
import BrandingMarketingPage from '../pages/BrandingMarketingPage';
import CareersApplyPage from '../pages/CareersApplyPage';
import CareersPage from '../pages/CareersPage';
import ContactPage from '../pages/ContactPage';
import GetStartedPage from '../pages/GetStartedPage';
import HomePage from '../pages/HomePage';
import MobileAppDesignPage from '../pages/MobileAppDesignPage';
import ProductsPage from '../pages/ProductsPage';
import ServicesPage from '../pages/ServicesPage';
import UiUxDesignPage from '../pages/UiUxDesignPage';
import VideoEditingPage from '../pages/VideoEditingPage';
import WebDevelopmentPage from '../pages/WebDevelopmentPage';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/ui-ux-design" element={<UiUxDesignPage />} />
        <Route path="services/web-development" element={<WebDevelopmentPage />} />
        <Route path="services/mobile-app-design" element={<MobileAppDesignPage />} />
        <Route path="services/video-editing" element={<VideoEditingPage />} />
        <Route path="services/branding-marketing" element={<BrandingMarketingPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="careers/apply" element={<CareersApplyPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="get-started" element={<GetStartedPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
