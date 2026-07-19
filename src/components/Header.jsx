/* ================================================================
   Header.jsx — Sticky responsive navigation for Tetrionyx Technologies
   ================================================================ */

import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from '../assets/logos/tetrionyx.svg';
import './Header.css';

/* Navigation link data — single source of truth */
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

function Header() {
  /* ---------- state ---------- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

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
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to} className="header__nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
                  }
                  to={to}
                  end={to === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
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
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to} className="header__mobile-item">
              <NavLink
                className={({ isActive }) =>
                  `header__mobile-link${isActive ? ' header__mobile-link--active' : ''}`
                }
                to={to}
                end={to === '/'}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
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
