import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBullseye, FaChartLine, FaPenNib } from 'react-icons/fa';
import workspaceImage from '../assets/images/branding-marketing-workspace.png';
import './UiUxDesignPage.css';

const CAPABILITIES = [
  {
    icon: FaBullseye,
    title: 'Brand strategy',
    description: 'Clear positioning, audience understanding, and a focused direction for every brand decision.',
  },
  {
    icon: FaPenNib,
    title: 'Visual identity',
    description: 'Distinctive visual systems that bring consistency and recognition to every customer touchpoint.',
  },
  {
    icon: FaChartLine,
    title: 'Digital growth',
    description: 'Creative campaigns and measurable marketing experiences designed to reach and convert audiences.',
  },
];

const PROCESS = ['Discover', 'Position', 'Create', 'Grow'];

function BrandingMarketingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="uiux-page branding-page">
      <section className="uiux-page__hero" aria-labelledby="branding-page-title">
        <div className="uiux-page__hero-inner">
          <div className="uiux-page__content">
            <p className="uiux-page__eyebrow">Service · Branding & Marketing</p>
            <h1 className="uiux-page__title" id="branding-page-title">
              Brands built to be <span>remembered and chosen.</span>
            </h1>
            <p className="uiux-page__intro">
              We combine strategy, visual identity, content, and digital campaigns
              to create brands that connect clearly and grow with purpose.
            </p>
            <div className="uiux-page__actions">
              <Link className="uiux-page__button uiux-page__button--primary" to="/contact">
                Grow your brand <FaArrowRight aria-hidden="true" />
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
              alt="Branding and marketing workspace with identity materials, campaign dashboards, audience analytics, and growth charts"
            />
          </div>
        </div>
      </section>

      <section className="uiux-page__capabilities" aria-labelledby="branding-capabilities-title">
        <div className="uiux-page__section-inner">
          <div className="uiux-page__section-heading">
            <p>What we shape</p>
            <h2 id="branding-capabilities-title">A clear identity with the strategy to grow.</h2>
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

          <div className="uiux-page__process" aria-label="Our branding and marketing process">
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

export default BrandingMarketingPage;
