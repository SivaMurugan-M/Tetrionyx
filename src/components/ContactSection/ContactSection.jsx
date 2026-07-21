/* ================================================================
   ContactSection.jsx — Minimal, premium, and responsive Contact section for Tetrionyx Technologies
   ================================================================ */

import React, { useState, useEffect, useRef } from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaSpinner,
  FaCheckCircle
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './ContactSection.css';

function ContactSection() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Animation intersection observer
  const sectionRef = useRef(null);
  const formInputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px' }
    );

    observer.observe(currentSection);
    return () => {
      if (currentSection) observer.disconnect();
    };
  }, []);

  // Validation
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Your name is required.';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters.';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Your email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'A message is required.';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark fields as touched
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    setSubmitError('');

    // Validate fields
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          // Send via EmailJS API if configured
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message,
              reply_to: formData.email,
              to_email: 'Test@Tetrionyx.com',
            },
            publicKey
          );
        } else {
          // Send directly via FormSubmit zero-config endpoint to Test@Tetrionyx.com
          const response = await fetch('https://formsubmit.co/ajax/Test@Tetrionyx.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              message: formData.message,
              _subject: `Tetrionyx Contact Form Inquiry from ${formData.name}`,
              _captcha: 'false',
              _template: 'table'
            }),
          });

          const resData = await response.json();
          if (!response.ok || (resData.success !== 'true' && resData.success !== true)) {
            // Fallback: trigger mailto client if network fails
            window.location.href = `mailto:Test@Tetrionyx.com?subject=${encodeURIComponent(
              `Tetrionyx Contact Form Inquiry from ${formData.name}`
            )}&body=${encodeURIComponent(
              `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;
          }
        }

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
      } catch (err) {
        console.error('Email submission error:', err);
        setIsSubmitting(false);
        setSubmitError(
          err.message || 'Failed to send message. Please try again or email us directly at Test@Tetrionyx.com.'
        );
      }
    } else {
      // Focus on the first invalid field
      const firstInvalidField = Object.keys(formErrors)[0];
      const element = document.getElementsByName(firstInvalidField)[0];
      if (element) {
        element.focus();
      }
    }
  };

  return (
    <section
      className={`contact-section ${isVisible ? 'contact-section--visible' : ''}`}
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-section-eyebrow"
    >
      <div className="contact-section__container container">
        <div className="contact-section__layout">
          
          {/* Left Column: Company Info */}
          <div className="contact-section__info-column">
            <span id="contact-section-eyebrow" className="contact-section__eyebrow">
              CONTACT US
            </span>
            <h2 className="contact-section__title">
              Let's Build Something<br />
              Amazing <span className="contact-section__title-accent">Together</span>
            </h2>
            <p className="contact-section__description">
              We help startups, businesses, and enterprises build innovative digital solutions through modern web development, mobile applications, UI/UX design, cloud solutions, and AI-powered technologies. Let's turn your ideas into reality.
            </p>

            {/* Simple Emojis/Details rows */}
            <div className="contact-details">
              <div className="contact-detail-row">
                <span className="contact-detail-row__icon" role="img" aria-label="Address">📍</span>
                <span className="contact-detail-row__text">Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="contact-detail-row">
                <span className="contact-detail-row__icon" role="img" aria-label="Email">✉️</span>
                <span className="contact-detail-row__text">
                  <a href="mailto:Test@Tetrionyx.com" className="contact-detail-row__link">
                    Test@Tetrionyx.com
                  </a>
                </span>
              </div>
            </div>

            {/* Social Square Links */}
            <div className="contact-social-section">
              <div className="contact-social-buttons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tetrionyx Technologies Facebook Page (Opens in new tab)"
                  className="contact-social-btn"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tetrionyx Technologies LinkedIn Page (Opens in new tab)"
                  className="contact-social-btn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tetrionyx Technologies X Profile (Opens in new tab)"
                  className="contact-social-btn"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tetrionyx Technologies Instagram Profile (Opens in new tab)"
                  className="contact-social-btn"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form floating card */}
          <div className="contact-section__form-column">
            <div className="contact-form-card">
              {isSuccess ? (
                <div className="contact-success" role="alert">
                  <FaCheckCircle className="contact-success__icon" />
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you for contacting Tetrionyx Technologies. Our team will review your message and reach out to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="contact-success__btn"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* Top Row: Name and Email */}
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="name" className="contact-form__label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        ref={formInputRef}
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={`contact-form__input ${touched.name && errors.name ? 'contact-form__input--invalid' : ''}`}
                        aria-required="true"
                        aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                        aria-describedby={touched.name && errors.name ? 'name-err' : undefined}
                        disabled={isSubmitting}
                      />
                      {touched.name && errors.name && (
                        <span id="name-err" className="contact-form__err" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="email" className="contact-form__label">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="john@example.com"
                        className={`contact-form__input ${touched.email && errors.email ? 'contact-form__input--invalid' : ''}`}
                        aria-required="true"
                        aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                        aria-describedby={touched.email && errors.email ? 'email-err' : undefined}
                        disabled={isSubmitting}
                      />
                      {touched.email && errors.email && (
                        <span id="email-err" className="contact-form__err" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Second Row: Message */}
                  <div className="contact-form__group">
                    <label htmlFor="message" className="contact-form__label">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Your Message"
                      rows="6"
                      className={`contact-form__textarea ${touched.message && errors.message ? 'contact-form__textarea--invalid' : ''}`}
                      aria-required="true"
                      aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                      aria-describedby={touched.message && errors.message ? 'message-err' : undefined}
                      disabled={isSubmitting}
                    />
                    {touched.message && errors.message && (
                      <span id="message-err" className="contact-form__err" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {submitError && (
                    <div className="contact-form__submit-err" role="alert">
                      {submitError}
                    </div>
                  )}

                  {/* Gradient Submit Button */}
                  <button
                    type="submit"
                    className="contact-form__submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="contact-form__spinner" /> Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
