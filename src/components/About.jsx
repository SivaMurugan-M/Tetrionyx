/* ================================================================
   About.jsx — Premium, responsive About section for Tetrionyx Technologies
   ================================================================ */

import React from 'react';
import { FaLightbulb, FaUsers, FaPalette, FaChartLine } from 'react-icons/fa';
import './About.css';

/**
 * Feature pillars defining the core values and capabilities of Tetrionyx
 */
const FEATURES = [
  {
    id: 'innovation',
    Icon: FaLightbulb,
    title: 'Innovation',
    description: 'We embrace new ideas and cutting-edge technologies to build future-ready digital solutions.',
    color: 'green',
  },
  {
    id: 'collaboration',
    Icon: FaUsers,
    title: 'Collaboration',
    description: 'We believe teamwork, transparency, and strong partnerships create successful outcomes.',
    color: 'yellow',
  },
  {
    id: 'creativity',
    Icon: FaPalette,
    title: 'Creativity',
    description: 'We design engaging, user-focused solutions that inspire innovation and deliver exceptional experiences.',
    color: 'blue',
  },
  {
    id: 'growth',
    Icon: FaChartLine,
    title: 'Growth',
    description: 'We are committed to helping our clients and our team achieve sustainable growth through technology.',
    color: 'red',
  },
];

function About({ id }) {
  return (
    <section className="about" id={id} aria-labelledby="about-heading">
      <div className="about__container container">
        {/* Left Column: Context & Brand message */}
        <div className="about__content">
          <span className="about__eyebrow">ABOUT US</span>
          <h1 id="about-heading" className="about__heading">
            Four Minds.<br />
            One <span className="about__accent">Vision</span>.<br />
            Limitless <span className="about__accent">Impact</span>.
          </h1>
          <p className="about__description">
            Tetrionyx Technologies was founded by four passionate innovators with a shared vision of 
            building intelligent, scalable, and impactful digital solutions. We specialize in AI, 
            web development, mobile applications, cloud computing, cybersecurity, and digital transformation, 
            helping businesses grow through innovative technology.
          </p>
          <button 
            className="about__cta" 
            type="button" 
            aria-label="Know more about Tetrionyx Technologies"
          >
            Know More
          </button>
        </div>

        {/* Right Column: Value Grid */}
        <div className="about__grid">
          {FEATURES.map(({ id, Icon, title, description, color }) => (
            <div key={id} className="about__card">
              <div className={`about__icon-box icon-${color}`} aria-hidden="true">
                <Icon className={`about__icon icon-${color}`} />
              </div>
              <h3 className="about__card-title">{title}</h3>
              <p className="about__card-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
