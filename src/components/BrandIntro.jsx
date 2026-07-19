import { useEffect, useState } from 'react';
import brandT from '../assets/logos/tetrionyx-t.png';
import brandWings from '../assets/logos/tetrionyx-wings.png';
import '../styles/brand-intro.css';

const BRAND_NAME = 'TETRIONYX';

// Keep these values aligned with the timing custom properties in brand-intro.css.
export const INTRO_TIMING = {
  revealHomepage: 3700,
  complete: 4600,
};

const PARTICLES = [
  { x: -150, y: -78, delay: 0, size: 3 },
  { x: -104, y: 102, delay: 120, size: 2 },
  { x: -48, y: -126, delay: 230, size: 4 },
  { x: 18, y: 120, delay: 80, size: 2 },
  { x: 72, y: -116, delay: 190, size: 3 },
  { x: 130, y: 76, delay: 290, size: 2 },
  { x: 164, y: -34, delay: 150, size: 3 },
  { x: -172, y: 28, delay: 310, size: 2 },
  { x: -88, y: -42, delay: 370, size: 2 },
  { x: 96, y: 32, delay: 420, size: 3 },
  { x: 42, y: -62, delay: 340, size: 2 },
  { x: -22, y: 66, delay: 250, size: 3 },
];

function BrandIntro({ onReveal, onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const revealTimer = window.setTimeout(() => {
      onReveal();
      setIsExiting(true);
    }, INTRO_TIMING.revealHomepage);

    const completeTimer = window.setTimeout(onComplete, INTRO_TIMING.complete);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, onReveal]);

  return (
    <div
      className={`brand-intro${isExiting ? ' brand-intro--exiting' : ''}`}
      role="status"
      aria-label="Tetrionyx is loading"
    >
      <div className="brand-intro__aurora" aria-hidden="true" />
      <div className="brand-intro__grid" aria-hidden="true" />

      <div className="brand-intro__content">
        <div className="brand-intro__particles" aria-hidden="true">
          {PARTICLES.map(({ x, y, delay, size }) => (
            <i
              key={`${x}-${y}`}
              style={{
                '--particle-x': `${x}px`,
                '--particle-y': `${y}px`,
                '--particle-delay': `${delay}ms`,
                '--particle-size': `${size}px`,
              }}
            />
          ))}
        </div>

        <div className="brand-intro__mark" aria-hidden="true">
          <span className="brand-intro__orbit" />
          <img
            className="brand-intro__wing brand-intro__wing--left"
            src={brandWings}
            alt=""
          />
          <img
            className="brand-intro__wing brand-intro__wing--right"
            src={brandWings}
            alt=""
          />
          <span
            className="brand-intro__t"
            style={{ '--t-mask': `url(${brandT})` }}
          />
          <span className="brand-intro__scan" />
        </div>

        <div className="brand-intro__word" aria-label="Tetrionyx">
          {BRAND_NAME.split('').map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              aria-hidden="true"
              style={{ '--letter-index': index }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="brand-intro__signature" aria-hidden="true">
          <span />
          <p>YOUR VISION&nbsp;&nbsp;&middot;&nbsp;&nbsp;OUR INNOVATION</p>
          <span />
        </div>
      </div>
    </div>
  );
}

export default BrandIntro;
