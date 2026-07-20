import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import './CareersApplyPage.css';

function CareersApplyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Career application: ${data.get('role')} - ${data.get('name')}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Phone: ${data.get('phone') || 'Not provided'}`,
        `Role: ${data.get('role')}`,
        `Experience: ${data.get('experience')}`,
        `Resume / Portfolio: ${data.get('portfolio') || 'Not provided'}`,
        '',
        'About the applicant:',
        data.get('message'),
      ].join('\n')
    );

    window.location.href = `mailto:hello@tetrionyx.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="careers-apply" aria-labelledby="careers-apply-title">
      <div className="careers-apply__inner">
        <Link className="careers-apply__back" to="/#careers">
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

            <form className="careers-apply__form" onSubmit={handleSubmit}>
              <div className="careers-apply__row">
                <label>
                  <span>Full name *</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label>
                  <span>Email address *</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
              </div>

              <div className="careers-apply__row">
                <label>
                  <span>Phone number</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  <span>Role of interest *</span>
                  <select name="role" defaultValue="" required>
                    <option value="" disabled>Select a role</option>
                    <option>UI/UX Designer</option>
                    <option>Web Developer</option>
                    <option>Mobile App Developer</option>
                    <option>Video Editor</option>
                    <option>Branding &amp; Marketing</option>
                    <option>General Application</option>
                  </select>
                </label>
              </div>

              <div className="careers-apply__row">
                <label>
                  <span>Experience *</span>
                  <select name="experience" defaultValue="" required>
                    <option value="" disabled>Select experience</option>
                    <option>Fresher / Intern</option>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                </label>
                <label>
                  <span>Resume or portfolio link</span>
                  <input name="portfolio" type="url" placeholder="https://" />
                </label>
              </div>

              <label>
                <span>Why would you like to join us? *</span>
                <textarea name="message" rows="5" required />
              </label>

              <label className="careers-apply__consent">
                <input type="checkbox" required />
                <span>I agree to share these details for recruitment purposes.</span>
              </label>

              <button type="submit">
                Continue in email <HiArrowRight aria-hidden="true" />
              </button>
              <small>Your email application will open with these details ready to send.</small>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersApplyPage;
