import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPenTool,
  FiCode,
  FiSmartphone,
  FiFilm,
  FiTrendingUp,
} from 'react-icons/fi';
import './ServicesSection.css';

const SERVICES = [
  {
    title: 'UI/UX Design',
    description: 'Crafting user-centered designs that deliver seamless experiences.',
    icon: FiPenTool,
    colour: 'red',
    path: '/services/ui-ux-design',
  },
  {
    title: 'Web Development',
    description: 'Building responsive, high-performance web applications.',
    icon: FiCode,
    colour: 'blue',
    path: '/services/web-development',
  },
  {
    title: 'Mobile App Design',
    description: 'Designing intuitive and engaging mobile applications.',
    icon: FiSmartphone,
    colour: 'orange',
    path: '/services/mobile-app-design',
  },
  {
    title: 'Video Editing',
    description: 'Creating polished, engaging videos for brands and digital platforms.',
    icon: FiFilm,
    colour: 'green',
    path: '/services/video-editing',
  },
  {
    title: 'Branding & Marketing',
    description: 'Building brands and driving growth through digital marketing.',
    icon: FiTrendingUp,
    colour: 'cyan',
    path: '/services/branding-marketing',
  },
];

function ServiceCard({ service }) {
  const { title, description, icon: Icon, colour, path } = service;
  const className = `services-section__card services-section__card--${colour}${path ? ' services-section__card--link' : ''}`;
  
  const content = (
    <>
      <div className="services-section__card-glow" aria-hidden="true" />
      <div className="services-section__icon-container">
        <div className="services-section__icon-glow" aria-hidden="true" />
        <div className="services-section__icon" aria-hidden="true">
          <Icon />
        </div>
      </div>
      <div className="services-section__card-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="services-section__footer">
        <span className="services-section__learn-more">
          Explore Service
          <svg 
            className="services-section__arrow" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M1 8H15M15 8L8 1M15 8L8 15" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <span className="services-section__accent" aria-hidden="true" />
    </>
  );

  if (path) {
    return (
      <Link className={className} to={path} aria-label={`View details for ${title}`}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

function ServicesSection() {
  const sectionRef = useRef(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCardsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="services-section"
      id="services"
      ref={sectionRef}
      aria-labelledby="services-section-title"
    >
      <div className="services-section__inner">
        <header className="services-section__header">
          <p className="services-section__eyebrow">Our services</p>
          <h2 className="services-section__title" id="services-section-title">
            Solutions That Drive Your Success
          </h2>
        </header>

        <div
          className={`services-section__grid${cardsVisible ? ' services-section__grid--visible' : ''}`}
        >
          {SERVICES.map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
