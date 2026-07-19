import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaCheckCircle,
  FaMobileAlt,
  FaProjectDiagram,
} from 'react-icons/fa';
import workspaceImage from '../assets/images/mobile-app-design-workspace.png';
import './UiUxDesignPage.css';

const CAPABILITIES = [
  {
    icon: FaProjectDiagram,
    title: 'Mobile UX strategy',
    description: 'Clear user flows and information structures designed around real mobile behavior.',
  },
  {
    icon: FaMobileAlt,
    title: 'App interface design',
    description: 'Polished, platform-aware screens that remain consistent, intuitive, and accessible.',
  },
  {
    icon: FaCheckCircle,
    title: 'Prototype & validation',
    description: 'Interactive prototypes that help test key journeys and refine decisions before development.',
  },
];

const PROCESS = ['Discover', 'Flow', 'Prototype', 'Refine'];

function MobileAppDesignPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="uiux-page mobile-design-page">
      <section className="uiux-page__hero" aria-labelledby="mobile-design-page-title">
        <div className="uiux-page__hero-inner">
          <div className="uiux-page__content">
            <p className="uiux-page__eyebrow">Service · Mobile App Design</p>
            <h1 className="uiux-page__title" id="mobile-design-page-title">
              Mobile experiences made to feel <span>effortless.</span>
            </h1>
            <p className="uiux-page__intro">
              We design intuitive mobile applications that turn complex journeys
              into focused, engaging experiences across phones and tablets.
            </p>
            <div className="uiux-page__actions">
              <Link className="uiux-page__button uiux-page__button--primary" to="/contact">
                Design your app <FaArrowRight aria-hidden="true" />
              </Link>
              <Link className="uiux-page__button uiux-page__button--secondary" to="/#services">
                View all services
              </Link>
            </div>
          </div>

          <div className="uiux-page__visual">
            <div className="uiux-page__visual-glow" aria-hidden="true" />
            <img
              src={workspaceImage}
              alt="Mobile app design workspace with smartphone and tablet interfaces, wireframes, components, and prototype flows"
            />
          </div>
        </div>
      </section>

      <section className="uiux-page__capabilities" aria-labelledby="mobile-capabilities-title">
        <div className="uiux-page__section-inner">
          <div className="uiux-page__section-heading">
            <p>What we design</p>
            <h2 id="mobile-capabilities-title">Every tap and swipe, designed with purpose.</h2>
          </div>

          <div className="uiux-page__capability-grid">
            {CAPABILITIES.map(({ icon: Icon, title, description }) => (
              <article className="uiux-page__capability" key={title}>
                <span className="uiux-page__capability-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="uiux-page__process" aria-label="Our mobile app design process">
            {PROCESS.map((step, index) => (
              <div className="uiux-page__process-step" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MobileAppDesignPage;
