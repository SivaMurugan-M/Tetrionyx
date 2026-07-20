import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import careersTeamBanner from '../../assets/images/careers-team-banner.png';
import './CareersSection.css';

function CareersSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`careers-section${visible ? ' careers-section--visible' : ''}`}
      id="careers"
      ref={sectionRef}
      aria-labelledby="careers-title"
    >
      <div className="careers-section__visual">
        <img
          src={careersTeamBanner}
          alt="Four colleagues looking over a city skyline at sunset"
        />
        <span className="careers-section__visual-shade" aria-hidden="true" />
      </div>

      <div className="careers-section__content">
        <div className="careers-section__content-inner">
          <p className="careers-section__eyebrow">
            <span aria-hidden="true" />
            Careers
          </p>

          <h2 id="careers-title">
            Join Our Growing Team
            <br />
            and <span className="careers-section__word careers-section__word--red">Build</span>{' '}
            <span className="careers-section__word careers-section__word--yellow">the</span>{' '}
            <span className="careers-section__word careers-section__word--green">Future</span> with Us.
          </h2>

          <p className="careers-section__description">
            Discover exciting career opportunities and make a meaningful impact with us.
          </p>

              <Link className="careers-section__cta" to="/contact">
            Apply Now
            <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CareersSection;
