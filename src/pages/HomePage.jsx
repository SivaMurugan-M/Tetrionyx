import AboutSection from '../components/AboutSection/AboutSection';
import CareersSection from '../components/CareersSection/CareersSection';
import ContactSection from '../components/ContactSection/ContactSection';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import ProductsSection from '../components/ProductsSection/ProductsSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';

function HomePage() {
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

export default HomePage;
