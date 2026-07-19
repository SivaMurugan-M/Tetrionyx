import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../components/About';
import { scrollToSection } from '../utils/scrollToSection';

function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    const targetId = hash ? hash.substring(1) : 'home';
    const animationFrame = window.requestAnimationFrame(() => {
      scrollToSection(targetId);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hash]);

  return (
    <>
      <section className="hero" id="home">
        <div className="container">
          <p className="eyebrow">IT services and technology solutions</p>
          <h1>Technology built around your business.</h1>
          <p className="hero-copy">
            Tetrionyx helps organizations build dependable digital solutions.
          </p>
        </div>
      </section>
      <About id="about" />
    </>
  );
}

export default HomePage;

