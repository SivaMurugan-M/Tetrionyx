import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import { HiArrowUp, HiArrowUpRight, HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2';
import logoT from '../assets/logos/tetrionyx-t.png';
import logoWings from '../assets/logos/tetrionyx-wings.png';
import './Footer.css';

const companyLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const serviceLinks = [
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
  { label: 'Web Development', to: '/services/web-development' },
  { label: 'Mobile App Design', to: '/services/mobile-app-design' },
  { label: 'Video Editing', to: '/services/video-editing' },
  { label: 'Branding & Marketing', to: '/services/branding-marketing' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'X', href: 'https://x.com', icon: FaXTwitter },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__glow footer__glow--left" aria-hidden="true" />
      <div className="footer__glow footer__glow--right" aria-hidden="true" />

      <div className="footer__container">
        <div className="footer__cta">
          <div className="footer__cta-content">
            <p className="footer__eyebrow">Have a project in mind?</p>
            <h2 className="footer__cta-title">Let&apos;s create something remarkable.</h2>
          </div>
          <Link className="footer__cta-link" to="/contact">
            <span>Start a conversation</span>
            <HiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="footer__main">
          <div className="footer__brand-column">
            <Link className="footer__brand" to="/" aria-label="Tetrionyx Technologies home">
              <span className="footer__logo" aria-hidden="true">
                <img
                  className="footer__logo-wings"
                  src={logoWings}
                  alt=""
                  width="184"
                  height="112"
                />
                <img
                  className="footer__logo-t"
                  src={logoT}
                  alt=""
                  width="88"
                  height="96"
                />
              </span>
              <span className="footer__brand-text">
                <span className="footer__brand-name">Tetrionyx</span>
                <span className="footer__brand-suffix">Technologies</span>
              </span>
            </Link>
            <p className="footer__summary">
              We turn ambitious ideas into thoughtful digital products that help
              modern businesses move forward.
            </p>
            <div className="footer__socials" aria-label="Social media links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  className="footer__social-link"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__column" aria-labelledby="footer-company-heading">
            <h3 className="footer__heading" id="footer-company-heading">Company</h3>
            <ul className="footer__links">
              {companyLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__column" aria-labelledby="footer-services-heading">
            <h3 className="footer__heading" id="footer-services-heading">Services</h3>
            <ul className="footer__links">
              {serviceLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__column footer__contact">
            <h3 className="footer__heading">Get in touch</h3>
            <address className="footer__contact-list">
              <a href="mailto:hello@tetrionyx.com">
                <span className="footer__contact-icon"><HiEnvelope aria-hidden="true" /></span>
                <span>hello@tetrionyx.com</span>
              </a>
              <a href="tel:+916374199394">
                <span className="footer__contact-icon"><HiPhone aria-hidden="true" /></span>
                <span>+91 63741 99394</span>
              </a>
              <p>
                <span className="footer__contact-icon"><HiMapPin aria-hidden="true" /></span>
                <span>Coimbatore, Tamil Nadu, India</span>
              </p>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Tetrionyx Technologies. All rights reserved.</p>
          <p className="footer__signature">
            Building the future, one idea at a time.
          </p>
          <button
            type="button"
            className="footer__back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <HiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
