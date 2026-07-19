import { useEffect, useRef, useState } from 'react';
import { FaChartLine, FaLightbulb, FaPalette, FaUsers } from 'react-icons/fa';
import './AboutSection.css';

const VALUES = [
  {
    title: 'Innovation',
    description:
      'We explore new ideas and emerging technologies to create smarter, future-ready digital solutions.',
    icon: FaLightbulb,
    colour: 'yellow',
  },
  {
    title: 'Collaboration',
    description:
      'We share ideas, skills, and perspectives as one team to build stronger outcomes together.',
    icon: FaUsers,
    colour: 'red',
  },
  {
    title: 'Creativity',
    description:
      'We turn original thinking into engaging designs and memorable digital experiences that connect.',
    icon: FaPalette,
    colour: 'green',
  },
  {
    title: 'Growth',
    description:
      'We build scalable solutions that support lasting progress for our clients, customers, and team.',
    icon: FaChartLine,
    colour: 'blue',
  },
];

function AboutSection() {
  const sectionRef = useRef(null);
  const [valuesVisible, setValuesVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValuesVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValuesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="about-section"
      id="about"
      ref={sectionRef}
      aria-labelledby="about-section-title"
    >
      <div className="about-section__inner">
        <div className="about-section__content">
          <p className="about-section__eyebrow">About us</p>
          <h2 className="about-section__title" id="about-section-title">
            Four Minds.
            <br />
            One <span>Vision.</span>
            <br />
            Limitless <span>Impact.</span>
          </h2>
          <p className="about-section__description">
            Tetrionyx Technologies was founded by four passionate friends with
            a shared vision to create impactful digital experiences.
          </p>
        </div>

        <div
          className={`about-section__values${valuesVisible ? ' about-section__values--visible' : ''}`}
        >
          {VALUES.map(({ title, description, icon: Icon, colour }) => (
            <article
              className={`about-section__value about-section__value--${colour}`}
              key={title}
            >
              <div
                className={`about-section__icon about-section__icon--${colour}`}
                aria-hidden="true"
              >
                <Icon />
              </div>
              <div className="about-section__value-content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
