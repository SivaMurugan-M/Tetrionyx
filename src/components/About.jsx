import React from "react";
import { FaLightbulb, FaUsers, FaPalette, FaChartLine } from "react-icons/fa";
import "./About.css";

// Static data for the feature cards.
// Keeping this as a config array (instead of hardcoding 4 JSX blocks)
// makes the grid easy to extend/edit later.
const features = [
  {
    id: "innovation",
    icon: <FaLightbulb aria-hidden="true" />,
    title: "Innovation",
    description:
      "We embrace new ideas and cutting-edge technologies to build future-ready digital solutions.",
  },
  {
    id: "collaboration",
    icon: <FaUsers aria-hidden="true" />,
    title: "Collaboration",
    description:
      "We believe teamwork, transparency, and strong partnerships create successful outcomes.",
  },
  {
    id: "creativity",
    icon: <FaPalette aria-hidden="true" />,
    title: "Creativity",
    description:
      "We design engaging, user-focused solutions that inspire innovation and deliver exceptional experiences.",
  },
  {
    id: "growth",
    icon: <FaChartLine aria-hidden="true" />,
    title: "Growth",
    description:
      "We are committed to helping our clients and our team achieve sustainable growth through technology.",
  },
];

function About() {
  return (
    <section className="about-section" aria-labelledby="about-heading">
      <div className="about-container">
        {/* ---------------- LEFT SECTION ---------------- */}
        <div className="about-left">
          <p className="about-eyebrow">ABOUT US</p>

          <h1 id="about-heading" className="about-heading">
            Four Minds.
            <br />
            One <span className="highlight-text">Vision.</span>
            <br />
            Limitless <span className="highlight-text">Impact.</span>
          </h1>

          <p className="about-description">
            Tetrionyx Technologies was founded by four passionate innovators
            with a shared vision of building intelligent, scalable, and
            impactful digital solutions. We specialize in AI, web
            development, mobile applications, cloud computing, cybersecurity,
            and digital transformation, helping businesses grow through
            innovative technology.
          </p>

          <button type="button" className="about-btn">
            Know More
          </button>
        </div>

        {/* ---------------- RIGHT SECTION ---------------- */}
        <div className="about-right">
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.id} tabIndex={0}>
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h2 className="feature-title">{feature.title}</h2>
                <p className="feature-description">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;