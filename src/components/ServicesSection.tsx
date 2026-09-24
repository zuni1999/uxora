import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused;

  return (
    <section className="services-section" id="services" aria-labelledby="services-heading">
      <header className="services-intro">
        <span className="services-eyebrow"><span className="brand-mark" aria-hidden="true" />Services</span>
        <h2 id="services-heading">Digital Product Services Built for Business Growth</h2>
        <p>From product strategy and UX design to software development, AI automation and cloud integration, UXORA brings the expertise needed to design, build and scale high-performing digital products.</p>
      </header>
      <div className="services-list" onPointerLeave={() => setHovered(null)}>
        {services.map((service, index) => {
          const isActive = active === index;
          return (
            <article key={service.title} className={`service-row${isActive ? ' is-active' : ''}`} onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(index); }}>
              <h3>
                <a className="service-trigger" href={`/services/${service.slug}`} id={`service-title-${index}`}
                  onFocus={() => setFocused(index)} onBlur={() => setFocused(null)}>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-title">{service.title}</span>
                  <span className="service-arrow" aria-hidden="true"><ArrowUpRight /></span>
                </a>
              </h3>
              <div className="service-detail" id={`service-detail-${index}`} role="region" aria-labelledby={`service-title-${index}`} aria-hidden={!isActive} inert={!isActive}>
                <div className="service-detail-inner"><p>{service.description}</p><div className="service-mobile-image-space" /></div>
              </div>
              <img className="service-image" src={service.image} alt="" loading="lazy" width="345" height="345" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
