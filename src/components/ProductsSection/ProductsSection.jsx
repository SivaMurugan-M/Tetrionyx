import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import placementTestPreview from '../../assets/images/placement-preparation-test.jpg';
import './ProductsSection.css';

const PRODUCTS = [
  {
    name: 'Placement Preparation Test',
    description: 'A complete assessment covering aptitude, technical knowledge, MCQs, and hands-on coding skills.',
    type: 'placement',
    colour: 'red',
  },
  {
    name: 'ShopEase',
    comingSoon: true,
    colour: 'orange',
  },
  {
    name: 'AI Insights',
    comingSoon: true,
    colour: 'green',
  },
];

function ProductPreview({ type }) {
  if (type === 'placement') {
    return (
      <div className="products-section__mockup products-section__mockup--image">
        <img
          src={placementTestPreview}
          alt="Placement Preparation Test assessment starting page"
        />
      </div>
    );
  }

  if (type === 'shopease') {
    return (
      <div className="products-section__mockup products-section__mockup--shopease" aria-hidden="true">
        <div className="products-section__shop-nav"><i /><span /><span /></div>
        <div className="products-section__shop-hero">
          <div><i /><i /><i /></div>
          <span />
        </div>
        <div className="products-section__shop-products"><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className="products-section__mockup products-section__mockup--insights" aria-hidden="true">
      <div className="products-section__insight-nav"><i /><i /><i /></div>
      <div className="products-section__insight-metrics"><span /><span /><span /></div>
      <div className="products-section__charts">
        <svg viewBox="0 0 120 56"><path d="M2 48 20 35 34 41 52 18 68 29 84 10 101 18 118 4" /></svg>
        <svg viewBox="0 0 120 56"><path d="M2 44 19 39 34 24 50 31 67 13 82 25 100 8 118 14" /></svg>
        <svg viewBox="0 0 120 56"><path d="M2 49 19 32 35 37 51 20 68 26 84 12 101 20 118 5" /></svg>
      </div>
    </div>
  );
}

function ProductsSection() {
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
      { threshold: 0.14, rootMargin: '0px 0px -60px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="products-section"
      id="products"
      ref={sectionRef}
      aria-labelledby="products-section-title"
    >
      <div className="products-section__inner">
        <header className="products-section__header">
          <p>Our products</p>
          <h2 id="products-section-title">Innovative Products for a Better Tomorrow</h2>
        </header>

        <div className={`products-section__grid${visible ? ' products-section__grid--visible' : ''}`}>
          {PRODUCTS.map(({ name, description, type, colour, comingSoon }) => (
            <article
              className={`products-section__card products-section__card--${colour}${comingSoon ? ' products-section__card--coming-soon' : ''}`}
              key={name}
            >
              {comingSoon ? (
                <div className="products-section__coming-soon">
                  <span>Coming Soon</span>
                </div>
              ) : (
                <>
                  <ProductPreview type={type} />
                  <div className="products-section__card-body">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <Link to="/contact">View Details</Link>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>

        <div className="products-section__pagination" aria-hidden="true">
          <span />
          <span className="products-section__pagination-active" />
          <span />
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
