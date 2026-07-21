import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLayerGroup, FaPalette, FaSearch } from 'react-icons/fa';
import workspaceImage from '../assets/images/ui-ux-design-workspace.png';
import './UiUxDesignPage.css';

const CAPABILITIES = [
  {
    icon: FaSearch,
    title: 'Research & strategy',
    description: 'We uncover user needs and shape a clear experience strategy before pixels are placed.',
  },
  {
    icon: FaPalette,
    title: 'Interface design',
    description: 'We create accessible, responsive interfaces that feel intuitive on every screen.',
  },
  {
    icon: FaLayerGroup,
    title: 'Design systems',
    description: 'We build reusable visual systems that keep products consistent and ready to scale.',
  },
];

const PROCESS = ['Discover', 'Define', 'Design', 'Validate'];

function UiUxDesignPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="uiux-page">
      <section className="uiux-page__hero" aria-labelledby="uiux-page-title">
        <div className="uiux-page__hero-inner">
          <div className="uiux-page__content">
            <p className="uiux-page__eyebrow">Service · UI/UX Design</p>
            <h1 className="uiux-page__title" id="uiux-page-title">
              Interfaces people <span>love to use.</span>
            </h1>
            <p className="uiux-page__intro">
              We turn complex ideas into clear, engaging digital experiences
              through research, thoughtful interaction, and polished visual design.
            </p>
            <div className="uiux-page__actions">
              <Link className="uiux-page__button uiux-page__button--primary" to="/contact">
                Start a project <FaArrowRight aria-hidden="true" />
              </Link>
              <Link className="uiux-page__button uiux-page__button--secondary" to="/services">
                View all services
              </Link>
            </div>
          </div>

          <div className="uiux-page__visual">
            <div className="uiux-page__visual-glow" aria-hidden="true" />
            <img
              src={workspaceImage}
              alt="UI and UX design workspace showing responsive website and mobile interface mockups"
            />
          </div>
        </div>
      </section>

      <section className="uiux-page__capabilities" aria-labelledby="uiux-capabilities-title">
        <div className="uiux-page__section-inner">
          <div className="uiux-page__section-heading">
            <p>What we design</p>
            <h2 id="uiux-capabilities-title">Every interaction, shaped with intention.</h2>
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

          <div className="uiux-page__process" aria-label="Our UI UX design process">
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

export default UiUxDesignPage;
