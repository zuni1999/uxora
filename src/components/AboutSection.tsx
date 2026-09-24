import { useEffect, useRef } from 'react';
import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import ideaIcon from '../assets/idea.svg';
import chartIcon from '../assets/chart.svg';
import CountUp from './CountUp';
import aboutImage from '../assets/about-card-image.jpg';
import logo from '../assets/logo.svg';
import portraitOne from '../assets/avatars/portrait-1.jpg';
import portraitTwo from '../assets/avatars/portrait-2.jpg';
import portraitThree from '../assets/avatars/portrait-3.jpg';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;
    const targets = section.querySelectorAll('.about-intro, .about-stats article');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          entry.target.classList.add('is-revealed');
        } else if (!entry.isIntersecting) {
          entry.target.classList.remove('is-revealed');
        }
      }
    }, { threshold: [0, 0.12] });

    targets.forEach((target) => {
      target.classList.add('reveal-ready');
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach((target) => target.classList.remove('reveal-ready', 'is-revealed'));
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about-us" aria-labelledby="about-heading">
      <div className="about-intro">
        <span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />About Us</span>
        <h2 id="about-heading">
          <span className="about-heading-line">One digital product partner</span>
          <span className="about-heading-line">
            <span>for smarter systems</span>{' '}
            <img className="about-heading-icon" src={chartIcon} alt="" width="48" height="48" />{' '}
            <span>and</span>
          </span>
          <span className="about-heading-line">
            <span>scalable</span>{' '}
            <img className="about-heading-icon" src={ideaIcon} alt="" width="48" height="48" />{' '}
            <span>growth.</span>
          </span>
        </h2>
      </div>
      <div className="about-stats">
        <article className="projects-stat">
          <img className="projects-photo" src={aboutImage} alt="A man in a blue hoodie against a clear blue sky" loading="lazy" />
          <div className="projects-brand"><img src={logo} alt="UXORA" /><span aria-hidden="true"><ChartNoAxesColumnIncreasing /></span></div>
          <div className="projects-detail">
            <h3>Projects Delivered</h3>
            <p className="projects-number"><CountUp value={25} suffix="+" /></p>
            <p>Digital products delivered across web, mobile, e-commerce and AI automation.</p>
          </div>
        </article>
        <article className="satisfaction-stat">
          <h3>Client Satisfaction</h3>
          <p className="stat-number"><CountUp value={98} suffix=" %" /></p>
          <div className="satisfaction-bottom"><div className="client-avatars" aria-hidden="true">{[portraitOne, portraitTwo, portraitThree].map((portrait) => <img key={portrait} src={portrait} alt="" width="256" height="256" loading="lazy" />)}</div><p>Trusted for clear communication, collaborative delivery and dependable execution.</p></div>
        </article>
        <div className="business-stats">
          <article className="business-stat">
            <h3>Businesses Supported</h3>
            <p className="stat-number"><CountUp value={20} suffix=" +" /></p>
            <p>We validate, design, build and improve digital products around customer needs and business goals.</p>
          </article>
          <article className="industries-stat"><h3>Industries Covered</h3><p className="stat-number"><CountUp value={6} suffix=" +" /></p></article>
        </div>
      </div>
    </section>
  );
}
