import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../components/About';

function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 84;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
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

