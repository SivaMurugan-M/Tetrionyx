/* ================================================================
   Header.jsx — Sticky responsive navigation for Tetrionyx Technologies
   ================================================================ */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from '../assets/logos/tetrionyx.svg';
import './Header.css';

/* Navigation link data — single source of truth (Contact represented via right CTA button) */
const NAV_LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'products', label: 'Products', to: '/products' },
  { id: 'careers', label: 'Careers', to: '/careers' },
];

function Header() {
  /* ---------- state ---------- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- restore last active section instantly on page refresh / load ---------- */
  useEffect(() => {
    const path = window.location.pathname;
    const storedSection = sessionStorage.getItem('last_active_section');
    const pathSection = path === '/' ? '' : path.replace('/', '');
    const targetSection = pathSection || (storedSection && storedSection !== 'home' ? storedSection : '');

    const validSections = ['about', 'services', 'products', 'careers', 'contact'];

    if (validSections.includes(targetSection)) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 84;
          const sectionTop = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = Math.max(0, sectionTop - headerHeight);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'instant',
          });

          setActiveSection(targetSection);
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, []);

  /* ---------- IntersectionObserver scroll spy for section highlight & URL sync ---------- */
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'products', 'careers', 'contact'];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    // Observe multi-section elements in DOM continuously
    if (elements.length < 3) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
            sessionStorage.setItem('last_active_section', sectionId);

            // Update URL bar seamlessly when user is actively scrolling (scrollY > 50)
            if (window.scrollY > 50) {
              const targetPath = sectionId === 'home' ? '/' : `/${sectionId}`;
              if (window.location.pathname !== targetPath) {
                window.history.replaceState(null, '', targetPath);
              }
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.15,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  /* ---------- active link determination (strictly single active item) ---------- */
  const isLinkActive = useCallback(
    (item) => {
      const path = location.pathname;
      const sectionIds = ['home', 'about', 'services', 'products', 'careers', 'contact'];
      const hasMultiSections = sectionIds.filter((id) => document.getElementById(id)).length >= 3;

      // On multi-section page views, rely on scroll-spy activeSection
      if (hasMultiSections || path === '/') {
        return item.id === activeSection;
      }

      // On standalone sub-routes (/careers/apply, /services/ui-ux-design, etc.)
      if (item.to === '/') {
        return false;
      }

      return path.startsWith(item.to);
    },
    [location.pathname, activeSection]
  );

  /* ---------- scroll shadow ---------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---------- close menu & unlock body scroll on route change ---------- */
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  /* ---------- lock body scroll when mobile menu is open ---------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ---------- toggle & navigation handlers ---------- */
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback(
    (e, item) => {
      const section = document.getElementById(item.id);
      const sectionIds = ['home', 'about', 'services', 'products', 'careers', 'contact'];
      const hasMultiSections = sectionIds.filter((id) => document.getElementById(id)).length >= 3;

      if (section && hasMultiSections) {
        e.preventDefault();
        closeMenu();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 84;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, sectionTop - headerHeight);
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({
          top: offsetPosition,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });

        const targetPath = item.to;
        if (window.location.pathname !== targetPath) {
          window.history.pushState(null, '', targetPath);
          setActiveSection(item.id);
          sessionStorage.setItem('last_active_section', item.id);
        }
      } else {
        closeMenu();
        navigate(item.to);
      }
    },
    [closeMenu, navigate]
  );

  const contactItem = { id: 'contact', label: 'Contact Us', to: '/contact' };
  const isContactActive = isLinkActive(contactItem);

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
          to="/"
          aria-label="Tetrionyx home"
          onClick={(e) => handleNavClick(e, { id: 'home', to: '/' })}
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
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item);
              return (
                <li key={item.to} className="header__nav-item">
                  <a
                    className={`header__nav-link${active ? ' header__nav-link--active' : ''}`}
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---- Desktop CTA Button ---- */}
        <a 
          className={`header__cta${isContactActive ? ' header__cta--active' : ''}`} 
          href="/contact"
          onClick={(e) => handleNavClick(e, contactItem)}
        >
          Contact Us
        </a>

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
          {NAV_LINKS.map((item) => {
            const active = isLinkActive(item);
            return (
              <li key={item.to} className="header__mobile-item">
                <a
                  className={`header__mobile-link${active ? ' header__mobile-link--active' : ''}`}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile CTA */}
        <a 
          className={`header__mobile-cta${isContactActive ? ' header__mobile-cta--active' : ''}`} 
          href="/contact"
          onClick={(e) => handleNavClick(e, contactItem)}
        >
          Contact Us
        </a>
      </nav>
    </header>
  );
}

export default Header;
