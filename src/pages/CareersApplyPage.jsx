import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import emailjs from '@emailjs/browser';
import './CareersApplyPage.css';

function CareersApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    portfolio: '',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const successTimeoutRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Full name is required.';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'role':
        if (!value) {
          error = 'Role of interest is required.';
        }
        break;
      case 'experience':
        if (!value) {
          error = 'Experience level is required.';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Please tell us why you would like to join us.';
        }
        break;
      case 'consent':
        if (!value) {
          error = 'You must agree to share details for recruitment purposes.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    setIsSuccess(false);
    setSubmitError('');

    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }

    if (touched[name]) {
      const error = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {
      name: true,
      email: true,
      role: true,
      experience: true,
      message: true,
      consent: true
    };
    setTouched(allTouched);
    setSubmitError('');
    setIsSuccess(false);

    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }

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
        const careersTemplateId = process.env.REACT_APP_EMAILJS_CAREERS_TEMPLATE_ID;
        const careersAutoReplyTemplateId = process.env.REACT_APP_EMAILJS_CAREERS_AUTOREPLY_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
        const web3formsKey = process.env.REACT_APP_WEB3FORMS_KEY;

        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          role: formData.role,
          experience: formData.experience,
          portfolio: formData.portfolio || 'Not provided',
          message: formData.message,
          consent: formData.consent,
          submission_date_time: new Date().toLocaleString()
        };

        if (serviceId && careersTemplateId && publicKey) {
          // Send via EmailJS API
          // 1. Send Admin Email
          await emailjs.send(
            serviceId,
            careersTemplateId,
            {
              applicant_name: payload.name,
              applicant_email: payload.email,
              phone_number: payload.phone,
              role_of_interest: payload.role,
              experience: payload.experience,
              portfolio_link: payload.portfolio,
              message: payload.message,
              submission_date: payload.submission_date_time,
              to_email: 'sivamurugan04012004@gmail.com'
            },
            publicKey
          );

          // 2. Send Auto-Reply to Applicant
          if (careersAutoReplyTemplateId) {
            await emailjs.send(
              serviceId,
              careersAutoReplyTemplateId,
              {
                applicant_name: payload.name,
                applicant_email: payload.email,
                role_of_interest: payload.role,
                to_email: payload.email
              },
              publicKey
            );
          } else {
            throw new Error('User confirmation template ID is missing. Please configure REACT_APP_EMAILJS_CAREERS_AUTOREPLY_TEMPLATE_ID.');
          }
        } else if (web3formsKey) {
          // Web3Forms
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: web3formsKey,
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              role: payload.role,
              experience: payload.experience,
              portfolio: payload.portfolio,
              message: payload.message,
              'Submission Date and Time': payload.submission_date_time,
              subject: `New Career Application - ${payload.name}`
            })
          });

          const resData = await response.json();
          if (!response.ok || !resData.success) {
            throw new Error(resData.message || 'Web3Forms submission failed');
          }
        } else {
          // FormSubmit Fallback with autoresponse to candidate
          const response = await fetch('https://formsubmit.co/ajax/sivamurugan04012004@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              role: payload.role,
              experience: payload.experience,
              portfolio: payload.portfolio,
              message: payload.message,
              'Submission Date and Time': payload.submission_date_time,
              _subject: `New Career Application - ${payload.name}`,
              _captcha: 'false',
              _template: 'table',
              _autoresponse: `Dear ${payload.name},\n\nThank you for applying to Tetrionyx Technology.\n\nWe have successfully received your job application for the position of ${payload.role}.\n\nOur recruitment team will carefully review your application. If your profile matches our requirements, we will contact you as soon as possible regarding the next steps in the hiring process.\n\nThank you for your interest in joining Tetrionyx Technology.\n\nBest Regards,\nTetrionyx Technology Recruitment Team`
            })
          });

          const resData = await response.json();
          if (!response.ok || (resData.success !== 'true' && resData.success !== true)) {
            throw new Error('FormSubmit submission failed');
          }
        }

        setIsSubmitting(false);
        setIsSuccess(true);
        // Clear all fields, reset dropdowns and consent checkbox
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          experience: '',
          portfolio: '',
          message: '',
          consent: false
        });
        setTouched({});

        // Auto-hide success notification after 2 seconds
        successTimeoutRef.current = setTimeout(() => {
          setIsSuccess(false);
        }, 2000);

      } catch (err) {
        console.error('Careers form submission error:', err);
        setIsSubmitting(false);
        setSubmitError(err.message || 'Failed to submit your application. Please try again later.');
      }
    } else {
      // Focus first invalid field
      const firstInvalidField = Object.keys(formErrors)[0];
      const element = document.getElementsByName(firstInvalidField)[0];
      if (element) {
        element.focus();
      }
    }
  };

  return (
    <section className="careers-apply" aria-labelledby="careers-apply-title">
      <div className="careers-apply__inner">
        <Link className="careers-apply__back" to="/careers">
          <HiArrowLeft aria-hidden="true" /> Back to careers
        </Link>

        <div className="careers-apply__layout">
          <aside className="careers-apply__intro" aria-label="Why join Tetrionyx">
            <p className="careers-apply__eyebrow">Careers at Tetrionyx</p>
            <h2>Build your next chapter with us.</h2>
            <p>
              Bring your ideas, curiosity, and craft. Work with a collaborative team
              creating meaningful digital products.
            </p>
            <ul>
              <li><span aria-hidden="true">✓</span>Meaningful digital projects</li>
              <li><span aria-hidden="true">✓</span>Supportive team culture</li>
              <li><span aria-hidden="true">✓</span>Continuous learning and growth</li>
            </ul>
            <div className="careers-apply__colour-line" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </aside>

          <div className="careers-apply__panel">
            <header className="careers-apply__heading">
              <p>Application form</p>
              <h1 id="careers-apply-title">Apply to join our team</h1>
              <span>Tell us about yourself and the role you are interested in.</span>
            </header>

            <form className="careers-apply__form" onSubmit={handleSubmit} noValidate>
              {isSuccess && (
                <div className="careers-apply__submit-success" role="alert">
                  Your application has been submitted successfully!
                </div>
              )}

              {submitError && (
                <div className="careers-apply__submit-err" role="alert">
                  {submitError}
                </div>
              )}

              <div className="careers-apply__row">
                <label>
                  <span>Full name *</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required
                  />
                  {touched.name && errors.name && (
                    <span style={{ color: '#ef4545', fontSize: '0.8rem', fontWeight: 500 }}>{errors.name}</span>
                  )}
                </label>
                <label>
                  <span>Email address *</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required
                  />
                  {touched.email && errors.email && (
                    <span style={{ color: '#ef4545', fontSize: '0.8rem', fontWeight: 500 }}>{errors.email}</span>
                  )}
                </label>
              </div>

              <div className="careers-apply__row">
                <label>
                  <span>Phone number</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                </label>
                <label>
                  <span>Role of interest *</span>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="" disabled>Select a role</option>
                    <option>UI/UX Designer</option>
                    <option>Web Developer</option>
                    <option>Mobile App Developer</option>
                    <option>Video Editor</option>
                    <option>Branding &amp; Marketing</option>
                    <option>General Application</option>
                  </select>
                  {touched.role && errors.role && (
                    <span style={{ color: '#ef4545', fontSize: '0.8rem', fontWeight: 500 }}>{errors.role}</span>
                  )}
                </label>
              </div>

              <div className="careers-apply__row">
                <label>
                  <span>Experience *</span>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="" disabled>Select experience</option>
                    <option>Fresher / Intern</option>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                  {touched.experience && errors.experience && (
                    <span style={{ color: '#ef4545', fontSize: '0.8rem', fontWeight: 500 }}>{errors.experience}</span>
                  )}
                </label>
                <label>
                  <span>Resume or portfolio link</span>
                  <input
                    name="portfolio"
                    type="url"
                    placeholder="https://"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {touched.portfolio && errors.portfolio && (
                    <span style={{ color: '#ef4545', fontSize: '0.8rem', fontWeight: 500 }}>{errors.portfolio}</span>
                  )}
                </label>
              </div>

              <label>
                <span>Why would you like to join us? *</span>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                />
                {touched.message && errors.message && (
                  <span style={{ color: '#ef4545', fontSize: '0.8rem', fontWeight: 500 }}>{errors.message}</span>
                )}
              </label>

              <label className="careers-apply__consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                />
                <span>I agree to share these details for recruitment purposes.</span>
              </label>
              {touched.consent && errors.consent && (
                <span style={{ color: '#ef4545', fontSize: '0.8rem', fontWeight: 500, marginTop: '-0.5rem', display: 'block' }}>{errors.consent}</span>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersApplyPage;
