import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
  HiClock,
  HiEnvelope,
  HiShieldCheck,
  HiSparkles,
} from 'react-icons/hi2';
import './GetStartedPage.css';

const NEXT_STEPS = [
  {
    number: '01',
    title: 'We review your goals',
    copy: 'Our team reads your brief and identifies the right capabilities for your project.',
  },
  {
    number: '02',
    title: 'You receive a clear plan',
    copy: 'We share recommended next steps, timing, and a practical project approach.',
  },
  {
    number: '03',
    title: 'We build together',
    copy: 'Once everything feels right, we begin with clear milestones and regular updates.',
  },
];

function GetStartedPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `New project enquiry: ${data.get('service')} - ${data.get('name')}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.get('name')}`,
        `Work email: ${data.get('email')}`,
        `Phone: ${data.get('phone') || 'Not provided'}`,
        `Company: ${data.get('company') || 'Not provided'}`,
        `Service: ${data.get('service')}`,
        `Budget: ${data.get('budget')}`,
        `Preferred timeline: ${data.get('timeline')}`,
        '',
        'Project details:',
        data.get('message'),
      ].join('\n')
    );

    window.location.href = `mailto:hello@tetrionyx.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="get-started">
      <section className="get-started__hero" aria-labelledby="get-started-title">
        <div className="get-started__hero-inner">
          <div className="get-started__intro">
            <Link className="get-started__back" to="/">
              <HiArrowLeft aria-hidden="true" /> Back to home
            </Link>

            <p className="get-started__eyebrow">
              <HiSparkles aria-hidden="true" /> Start a project
            </p>
            <h1 id="get-started-title">
              Tell us what you&apos;re ready to <span>build.</span>
            </h1>
            <p className="get-started__lead">
              Share a few details about your goals. We&apos;ll turn them into clear,
              practical next steps—without the technical guesswork.
            </p>

            <ul className="get-started__benefits">
              <li><HiCheckCircle aria-hidden="true" />A focused conversation about your goals</li>
              <li><HiClock aria-hidden="true" />A response within one business day</li>
              <li><HiShieldCheck aria-hidden="true" />Your project details stay confidential</li>
            </ul>

            <div className="get-started__direct-contact">
              <p>Prefer to contact us directly?</p>
              <div>
                <a href="mailto:marivignesh242004@gmail.com">
                  <HiEnvelope aria-hidden="true" /> marivignesh242004@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="get-started__form-card">
            <header className="get-started__form-heading">
              <span>Project enquiry</span>
              <h2>Let&apos;s understand your idea</h2>
              <p>Fields marked with * are required.</p>
            </header>

            <form className="get-started__form" onSubmit={handleSubmit}>
              <div className="get-started__form-row">
                <label>
                  <span>Full name *</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  <span>Work email *</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>

              <div className="get-started__form-row">
                <label>
                  <span>Phone number</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 00000 00000"
                  />
                </label>
                <label>
                  <span>Company name</span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your company"
                  />
                </label>
              </div>

              <div className="get-started__form-row">
                <label>
                  <span>What can we help with? *</span>
                  <select name="service" defaultValue="" required>
                    <option value="" disabled>Select a service</option>
                    <option>UI/UX Design</option>
                    <option>Web Development</option>
                    <option>Mobile App Design</option>
                    <option>Video Editing</option>
                    <option>Branding &amp; Marketing</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label>
                  <span>Estimated budget *</span>
                  <select name="budget" defaultValue="" required>
                    <option value="" disabled>Select a range</option>
                    <option>Under ₹50,000</option>
                    <option>₹50,000 – ₹1,50,000</option>
                    <option>₹1,50,000 – ₹5,00,000</option>
                    <option>₹5,00,000+</option>
                    <option>Need guidance</option>
                  </select>
                </label>
              </div>

              <label>
                <span>When would you like to start? *</span>
                <select name="timeline" defaultValue="" required>
                  <option value="" disabled>Select a timeline</option>
                  <option>As soon as possible</option>
                  <option>Within 1 month</option>
                  <option>Within 2–3 months</option>
                  <option>More than 3 months</option>
                  <option>Still exploring</option>
                </select>
              </label>

              <label>
                <span>Tell us about your project *</span>
                <textarea
                  name="message"
                  rows="5"
                  minLength="20"
                  placeholder="What are you building, who is it for, and what would success look like?"
                  required
                />
              </label>

              <label className="get-started__consent">
                <input type="checkbox" required />
                <span>I agree to be contacted about this project enquiry.</span>
              </label>

              <button type="submit">
                Continue in email <HiArrowRight aria-hidden="true" />
              </button>
              <small className="get-started__form-note">
                Your email app will open with your project details ready to send.
              </small>
            </form>
          </div>
        </div>
      </section>

      <section className="get-started__next" aria-labelledby="get-started-next-title">
        <div className="get-started__next-inner">
          <header>
            <p>Simple and transparent</p>
            <h2 id="get-started-next-title">What happens next?</h2>
          </header>
          <div className="get-started__steps">
            {NEXT_STEPS.map(({ number, title, copy }) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetStartedPage;
