import { Link } from 'react-router-dom';
import bannerArtwork from '../../assets/images/tetrionyx-banner.png';
import './HeroBanner.css';

function HeroBanner() {
  const handleNavClick = (e, targetId, targetPath) => {
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 84;
      const sectionTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, sectionTop - headerHeight);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: offsetPosition,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });

      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
        sessionStorage.setItem('last_active_section', targetId);
      }
    }
  };

  return (
    <section className="hero-banner" id="home" aria-labelledby="hero-banner-title">
      <div className="hero-banner__tech-backdrop" aria-hidden="true">
        <span className="hero-banner__tech-orbit hero-banner__tech-orbit--large" />
        <span className="hero-banner__tech-orbit hero-banner__tech-orbit--small" />

        <svg viewBox="0 0 1440 680" preserveAspectRatio="xMidYMid slice">
          <path
            className="hero-banner__circuit-line"
            d="M0 126h138c36 0 48 18 48 48v35c0 27 14 42 42 42h80"
          />
          <path
            className="hero-banner__circuit-line hero-banner__circuit-line--delayed"
            d="M65 608v-72c0-30 15-45 45-45h86c34 0 51-17 51-51v-30"
          />
          <path
            className="hero-banner__circuit-line"
            d="M1088 58h108c32 0 48 16 48 48v32c0 30 15 45 45 45h151"
          />
          <path
            className="hero-banner__circuit-line hero-banner__circuit-line--delayed"
            d="M1208 574h66c30 0 44-15 44-44v-72c0-28 14-42 42-42h80"
          />

          <circle className="hero-banner__circuit-node" cx="186" cy="209" r="5" />
          <circle className="hero-banner__circuit-node hero-banner__circuit-node--delayed" cx="247" cy="440" r="5" />
          <circle className="hero-banner__circuit-node hero-banner__circuit-node--delayed" cx="1244" cy="138" r="5" />
          <circle className="hero-banner__circuit-node" cx="1318" cy="458" r="5" />
        </svg>
      </div>

      <div className="hero-banner__data-horizon" aria-hidden="true">
        <span className="hero-banner__data-arc" />
        <span className="hero-banner__data-node hero-banner__data-node--one" />
        <span className="hero-banner__data-node hero-banner__data-node--two" />
        <span className="hero-banner__data-node hero-banner__data-node--three" />
        <span className="hero-banner__data-node hero-banner__data-node--four" />
      </div>

      <div className="hero-banner__inner">
        <div className="hero-banner__content">
          <p className="hero-banner__eyebrow">Welcome to</p>

          <h1 className="hero-banner__title" id="hero-banner-title">
            <span className="hero-banner__title-highlight">Tetrionyx</span>{' '}
            <span className="hero-banner__title-text">Technologies</span>
          </h1>

          <p className="hero-banner__description">
            Creative digital solutions for design, web development, and video
            editing.
          </p>

          <div className="hero-banner__actions" aria-label="Hero actions">
            <Link
              className="hero-banner__button hero-banner__button--primary"
              to="/contact"
              onClick={(e) => handleNavClick(e, 'contact', '/contact')}
            >
              Get Started
            </Link>
            <Link
              className="hero-banner__button hero-banner__button--secondary"
              to="/services"
              onClick={(e) => handleNavClick(e, 'services', '/services')}
            >
              Explore Services
            </Link>
          </div>
        </div>

        <div className="hero-banner__visual">
          <div className="hero-banner__glow" aria-hidden="true" />
          <div className="hero-banner__artwork-shell">
            <img
              className="hero-banner__artwork"
              src={bannerArtwork}
              alt="Laptop displaying development and video-editing tools"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
