import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLaptopCode, FaRocket, FaServer } from 'react-icons/fa';
import workspaceImage from '../assets/images/web-development-workspace.png';
import './UiUxDesignPage.css';

const CAPABILITIES = [
  {
    icon: FaLaptopCode,
    title: 'Frontend engineering',
    description: 'Responsive, accessible interfaces built with clean components and thoughtful interactions.',
  },
  {
    icon: FaServer,
    title: 'Backend & APIs',
    description: 'Secure application logic, dependable integrations, and scalable data flows behind every screen.',
  },
  {
    icon: FaRocket,
    title: 'Performance & launch',
    description: 'Fast loading, careful testing, and deployment workflows designed for confident releases.',
  },
];

const PROCESS = ['Plan', 'Develop', 'Test', 'Launch'];

function WebDevelopmentPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="uiux-page webdev-page">
      <section className="uiux-page__hero" aria-labelledby="webdev-page-title">
        <div className="uiux-page__hero-inner">
          <div className="uiux-page__content">
            <p className="uiux-page__eyebrow">Service · Web Development</p>
            <h1 className="uiux-page__title" id="webdev-page-title">
              Web experiences built for <span>speed and scale.</span>
            </h1>
            <p className="uiux-page__intro">
              We develop responsive, dependable web applications that combine
              polished interfaces, solid engineering, and measurable performance.
            </p>
            <div className="uiux-page__actions">
              <Link className="uiux-page__button uiux-page__button--primary" to="/contact">
                Build with us <FaArrowRight aria-hidden="true" />
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
              alt="Web development workspace with code editors, responsive website previews, APIs, and performance dashboards"
            />
          </div>
        </div>
      </section>

      <section className="uiux-page__capabilities" aria-labelledby="webdev-capabilities-title">
        <div className="uiux-page__section-inner">
          <div className="uiux-page__section-heading">
            <p>What we build</p>
            <h2 id="webdev-capabilities-title">Reliable technology behind every experience.</h2>
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

          <div className="uiux-page__process" aria-label="Our web development process">
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

export default WebDevelopmentPage;
