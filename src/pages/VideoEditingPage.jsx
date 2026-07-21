import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFilm, FaPalette, FaVolumeUp } from 'react-icons/fa';
import workspaceImage from '../assets/images/video-editing-workspace.png';
import './UiUxDesignPage.css';

const CAPABILITIES = [
  {
    icon: FaFilm,
    title: 'Story & structure',
    description: 'Thoughtful pacing and clear narrative structure that keep every video focused and engaging.',
  },
  {
    icon: FaPalette,
    title: 'Motion & color',
    description: 'Polished transitions, motion graphics, and color grading that create a consistent visual mood.',
  },
  {
    icon: FaVolumeUp,
    title: 'Sound & delivery',
    description: 'Balanced audio, platform-ready formats, and careful finishing for a confident final release.',
  },
];

const PROCESS = ['Plan', 'Edit', 'Refine', 'Deliver'];

function VideoEditingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="uiux-page video-editing-page">
      <section className="uiux-page__hero" aria-labelledby="video-editing-page-title">
        <div className="uiux-page__hero-inner">
          <div className="uiux-page__content">
            <p className="uiux-page__eyebrow">Service · Video Editing</p>
            <h1 className="uiux-page__title" id="video-editing-page-title">
              Stories shaped <span>frame by frame.</span>
            </h1>
            <p className="uiux-page__intro">
              We transform raw footage into polished, engaging videos through
              precise editing, thoughtful sound, motion, and cinematic color.
            </p>
            <div className="uiux-page__actions">
              <Link className="uiux-page__button uiux-page__button--primary" to="/contact">
                Edit with us <FaArrowRight aria-hidden="true" />
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
              alt="Professional video editing workspace with a cinematic preview, multitrack timeline, color grading, and audio tools"
            />
          </div>
        </div>
      </section>

      <section className="uiux-page__capabilities" aria-labelledby="video-capabilities-title">
        <div className="uiux-page__section-inner">
          <div className="uiux-page__section-heading">
            <p>What we create</p>
            <h2 id="video-capabilities-title">Every cut works together to tell the story.</h2>
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

          <div className="uiux-page__process" aria-label="Our video editing process">
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

export default VideoEditingPage;
