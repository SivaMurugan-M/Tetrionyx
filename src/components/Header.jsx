/* ================================================================
   Header.jsx — Sticky responsive navigation for Tetrionyx Technologies
   ================================================================ */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from '../assets/logos/tetrionyx.svg';
import { scrollToSection } from '../utils/scrollToSection';
import './Header.css';

/* Navigation link data — single source of truth */
const NAV_LINKS = [
  { label: 'Home', to: '#home' },
  { label: 'About', to: '#about' },
  { label: 'Services', to: '#services' },
  { label: 'Solutions', to: '#solutions' },
  { label: 'Careers', to: '#careers' },
  { label: 'Contact', to: '#contact' },
];

function Header() {
  /* ---------- state ---------- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- scroll spy for active section highlight ---------- */
  useEffect(() => {
    const handleScrollActive = () => {
      const sections = ['home', 'about', 'services', 'solutions', 'careers', 'contact'];
      const scrollPosition = window.scrollY + 180; // detection offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollActive);
    handleScrollActive(); // initial check
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, []);

  /* ---------- scroll shadow ---------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---------- close menu on route change ---------- */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const section = document.getElementById(location.hash.slice(1));
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      section?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  /* ---------- lock body scroll when mobile menu is open ---------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ---------- toggle handler ---------- */
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const scrollToSection = useCallback((target) => {
    closeMenu();

    window.requestAnimationFrame(() => {
      const section = document.getElementById(target.slice(1));
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      section?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }, [closeMenu]);

  /* ---------- render ---------- */
  return (
    <header
      className={`header${scrolled ? ' header--scrolled' : ''}`}
      role="banner"
    >
      <div className="header__inner">
        {/* ---- Brand / Logo ---- */}
        <Link
          className="header__brand"
          to="/#home"
          aria-label="Tetrionyx home"
          onClick={() => scrollToSection('/#home')}
        >
          <img
            className="header__logo"
            src={logo}
            alt="Tetrionyx Technologies logo"
            width="60"
            height="60"
          />
          <span className="header__company-name">Tetrionyx Technologies</span>
        </Link>

        {/* ---- Desktop Navigation ---- */}
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {NAV_LINKS.map(({ label, to }) => {
              const isActive = to === `#${activeSection}`;
              return (
                <li key={to} className="header__nav-item">
                  <Link
                    className={`header__nav-link${isActive ? ' header__nav-link--active' : ''}`}
                    to={to}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---- Desktop CTA Button ---- */}
        <Link className="header__cta" to="/contact">
          Get Started
        </Link>

        {/* ---- Mobile Menu Toggle ---- */}
        <button
          className="header__menu-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* ---- Mobile Navigation Overlay ---- */}
      <div
        className={`header__mobile-overlay${menuOpen ? ' header__mobile-overlay--open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ---- Mobile Navigation Panel ---- */}
      <nav
        className={`header__mobile-nav${menuOpen ? ' header__mobile-nav--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className="header__mobile-list">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = to === `#${activeSection}`;
            return (
              <li key={to} className="header__mobile-item">
                <Link
                  className={`header__mobile-link${isActive ? ' header__mobile-link--active' : ''}`}
                  to={to}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile CTA */}
        <Link className="header__mobile-cta" to="/contact" onClick={closeMenu}>
          Get Started
        </Link>
      </nav>
    </header>
  );
}

export default Header;
