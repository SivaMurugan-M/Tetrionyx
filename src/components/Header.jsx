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
  { label: 'Home', to: '/#home', section: 'home' },
  { label: 'About', to: '/#about', section: 'about' },
  { label: 'Services', to: '/#services', section: 'services' },
  { label: 'Solutions', to: '/#solutions', section: 'solutions' },
  { label: 'Careers', to: '/#careers', section: 'careers' },
  { label: 'Contact', to: '/#contact', section: 'contact' },
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
  }, [location.pathname]);

  /* ---------- lock body scroll when mobile menu is open ---------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ---------- toggle handler ---------- */
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleSectionClick = useCallback((event, section) => {
    event.preventDefault();
    setMenuOpen(false);
    navigate(`/#${section}`);

    // Always scroll explicitly. This also handles clicking the active link,
    // where the URL hash does not change and React effects do not rerun.
    window.requestAnimationFrame(() => {
      scrollToSection(section);
    });
  }, [navigate]);

  /* ---------- render ---------- */
  return (
    <header
      className={`header${scrolled ? ' header--scrolled' : ''}`}
      role="banner"
    >
      <div className="header__inner">
        {/* ---- Brand / Logo ---- */}
        <Link className="header__brand" to="/" aria-label="Tetrionyx home">
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
            {NAV_LINKS.map(({ label, to, section }) => {
              const isActive = section === activeSection;
              return (
                <li key={to} className="header__nav-item">
                  <Link
                    className={`header__nav-link${isActive ? ' header__nav-link--active' : ''}`}
                    to={to}
                    onClick={(event) => handleSectionClick(event, section)}
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
          {NAV_LINKS.map(({ label, to, section }) => {
            const isActive = section === activeSection;
            return (
              <li key={to} className="header__mobile-item">
                <Link
                  className={`header__mobile-link${isActive ? ' header__mobile-link--active' : ''}`}
                  to={to}
                  onClick={(event) => handleSectionClick(event, section)}
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
