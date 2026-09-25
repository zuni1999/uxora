import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, Mail, Menu, X } from 'lucide-react';
import logo from './assets/logo.svg';
import HeroIllustration from './components/HeroIllustration';
import TechnologyMarquee from './components/TechnologyMarquee';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsFaq from './components/TestimonialsFaq';
import InsightsSection from './components/InsightsSection';
import BlogDetailPage from './components/BlogDetailPage';
import ClosingSection from './components/ClosingSection';
import ContactPage from './components/ContactPage';
import GevitiCaseStudy from './components/GevitiCaseStudy';
import ThakeelCaseStudy from './components/ThakeelCaseStudy';
import ServiceDetailPage from './components/ServiceDetailPage';
import ratingAvatar from './assets/rating-avatar.png';

const email = 'tech.uxora@gmail.com';
const links = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about-us' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Insights', href: '/#insights' },
];

export default function App() {
  const serviceSlug = window.location.pathname.match(/^\/services\/([^/]+)\/?$/)?.[1];
  const isBlogPage = /^\/insights\/(ecommerce-checkout-ux|improve-core-web-vitals|ai-agents-vs-workflow-automation)\/?$/.test(window.location.pathname);
  const isInsightsPage = /^\/insights\/?$/.test(window.location.pathname);
  const isContactPage = /^\/contact\/?$/.test(window.location.pathname);
  const isCaseStudy = /^\/work\/(geviti|givit|thakeel-al-arabia)\/?$/.test(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    // A cross-page hash can arrive before React has mounted its target.
    // Wait for fonts and initial images so the portfolio's measured height
    // is settled before choosing the section's final scroll position.
    if (window.location.pathname !== '/' || !window.location.hash) return;
    const initialHash = window.location.hash;
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    const cancel = () => { cancelled = true; };
    const navigateToSection = async () => {
      await document.fonts.ready;
      if (cancelled) return;
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          if (cancelled || window.location.hash !== initialHash) return;
          const target = document.getElementById(initialHash.slice(1));
          target?.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
            block: 'start',
          });
        });
      });
    };
    if (document.readyState === 'complete') void navigateToSection();
    else window.addEventListener('load', navigateToSection, { once: true });
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('pointerdown', cancel);
    window.addEventListener('keydown', cancel);
    return () => {
      cancelled = true;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.removeEventListener('load', navigateToSection);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <a className="brand" href="/" aria-label="UXORA home"><img src={logo} alt="UXORA" /></a>
        <nav className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
          {links.map(({ label, href }) => (
            <a key={label} href={href} aria-current={label === 'Home' && !isContactPage && !isCaseStudy && !serviceSlug && !isInsightsPage && !isBlogPage ? 'page' : label === 'Insights' && (isInsightsPage || isBlogPage) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="talk-button" href="/contact">Let’s Talk <span><ArrowRight /></span></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {isBlogPage ? <BlogDetailPage automation={window.location.pathname.includes("ai-agents-vs-workflow-automation")} webVitals={window.location.pathname.includes("improve-core-web-vitals")} /> : isInsightsPage ? <main><InsightsSection standalone /></main> : isContactPage ? <ContactPage /> : isCaseStudy ? (window.location.pathname.includes("thakeel-al-arabia") ? <ThakeelCaseStudy /> : <GevitiCaseStudy />) : serviceSlug ? <ServiceDetailPage slug={serviceSlug} /> : <main>
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="brand-mark" aria-hidden="true" /> AI, PRODUCT DESIGN &amp; DEVELOPMENT AGENCY</div>
            <h1 id="hero-title">We design and build<br /><span>digital products</span> that scale.</h1>
            <p className="hero-description">UXORA combines product strategy, human-centered design, software<br className="desktop-break" /> engineering and AI automation to turn complex ideas into high-<br className="desktop-break" />performing digital products—built to launch faster, operate smarter<br className="desktop-break" /> and scale with confidence.</p>
            <div className="hero-actions">
              <a className="pitch-button" href="/contact">PITCH US AN IDEA <span><ArrowUpRight /></span></a>
              <a className="work-button" href="#work">VIEW OUR WORK</a>
            </div>
          </div>
          <HeroIllustration />
          <div className="hero-contact">
            <div className="rating-card">
              <div className="rating-top"><div className="rating-stars"><img src={ratingAvatar} alt="Client portraits" /><span aria-label="5 stars">★★★★★</span></div><p>Rated 4.9/5 by 4,900+ clients</p></div>
              <p className="rating-tagline">Smart. Simple. Strategic.</p>
            </div>
            <div className="email-card">
              <div className="email-card-top"><span className="mail-icon"><Mail /></span><button onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'} title={copied ? 'Copied!' : 'Copy email address'}>{copied ? <Check /> : <Copy />}</button></div>
              <span className="reach-label" aria-live="polite">{copied ? 'EMAIL COPIED' : 'REACH US'}</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </section>
        <TechnologyMarquee />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsFaq />
        <InsightsSection />
      </main>}
      <ClosingSection showBanner={!isContactPage && !isCaseStudy && !serviceSlug && !isBlogPage} />
    </>
  );
}
