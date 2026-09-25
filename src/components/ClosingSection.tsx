import { ArrowUpRight } from 'lucide-react';
import ideaIcon from '../assets/idea.svg';
import logo from '../assets/logo.svg';
import first from '../assets/avatars/portrait-1.jpg';
import second from '../assets/avatars/portrait-2.jpg';
import third from '../assets/avatars/portrait-3.jpg';

export default function ClosingSection({ showBanner = true }: { showBanner?: boolean }) {
  return (
    <div className="closing-sections">
      {showBanner && <section className="closing-banner" aria-labelledby="closing-title">
        <div className="closing-copy">
          <div className="closing-kicker"><span>Strategy • Design • Engineering</span></div>
          <h2 id="closing-title">Turn Your Product Vision Into<br className="closing-break" /> Business Growth <span className="closing-avatars" aria-hidden="true">{[first, second, third].map((src) => <img key={src} src={src} alt="" width="256" height="256" loading="lazy" />)}</span></h2>
          <p>From new digital products to AI-powered workflows, UXORA brings strategy, product design and software engineering together to build solutions that perform today and scale tomorrow.</p>
          <a className="closing-button" href="/contact">START A PROJECT<span><ArrowUpRight /></span></a>
        </div>
        <div className="closing-card-scene">
          <div className="expertise-card">
            <p><span>Expertise</span> <img src={ideaIcon} alt="" /> that<br />Combines<br />Strategy, <span>Data,</span><br />and Artificial<br /><span>Intelligence</span></p>
          </div>
          <div className="performance-card">
            <div className="performance-header"><p>Performance</p><span>In the past 7 days</span><svg viewBox="0 0 40 24" fill="none" aria-hidden="true"><path d="M3 19L14 8L22 15L37 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div className="performance-value"><strong>49%</strong><span>+2.5%</span></div>
            <p className="performance-caption">Business growth</p>
            <div className="performance-tags">
              {[
                ['Professional', 'Strategic', 'AI-Focused', 'Startup Feel'],
                ['Smarter', 'Grow Faster', 'Build Smart', 'Simple'],
              ].map((tags, row) => (
                <div className="performance-tag-row" key={row}>
                  <div className="performance-tag-track">
                    {[0, 1].map((copy) => (
                      <div className="performance-tag-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                        {tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-company">
            <a className="footer-logo" href="/" aria-label="UXORA home"><img src={logo} alt="UXORA" /><span aria-hidden="true" className="brand-mark" /></a>
            <p>UXORA is a digital product agency helping businesses design,<br className="footer-break" /> build and scale web applications, mobile products, AI automation<br className="footer-break" /> systems, e-commerce platforms and cloud-connected solutions.</p>
            <p>Have a product idea or business challenge? Let’s explore the right solution together.</p>
            <a className="footer-contact-button" href="/contact">CONTACT US<span><ArrowUpRight /></span></a>
            <div className="footer-socials" aria-label="UXORA social profiles">
              <a href="https://linkedin.com/company/uxoraco/" target="_blank" rel="noopener noreferrer" aria-label="UXORA on LinkedIn (opens in a new tab)"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.76 1.36-1.56 2.79-1.56 2.99 0 3.58 1.97 3.58 4.52v5.29Z" /></svg></a>
              <a href="https://www.instagram.com/tech.uxora/" target="_blank" rel="noopener noreferrer" aria-label="UXORA on Instagram (opens in a new tab)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a>
              <a href="https://uk.pinterest.com/uxoratech/" target="_blank" rel="noopener noreferrer" aria-label="UXORA on Pinterest (opens in a new tab)"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-1.02-.01-2.25.25-3.39l1.54-6.53s-.38-.77-.38-1.91c0-1.79 1.04-3.13 2.33-3.13 1.1 0 1.63.83 1.63 1.83 0 1.12-.71 2.78-1.07 4.32-.3 1.29.65 2.34 1.92 2.34 2.3 0 3.85-2.95 3.85-6.45 0-2.66-1.79-4.66-5.05-4.66-3.69 0-5.99 2.75-5.99 5.82 0 1.06.31 1.8.8 2.38.23.27.26.38.18.69l-.26 1c-.09.32-.33.44-.61.32-1.68-.69-2.46-2.54-2.46-4.62 0-3.44 2.9-7.57 8.65-7.57 4.62 0 7.66 3.35 7.66 6.95 0 4.76-2.65 8.31-6.56 8.31-1.31 0-2.54-.71-2.96-1.51l-.85 3.34c-.31 1.17-.92 2.35-1.48 3.27A12 12 0 1 0 12 0Z" /></svg></a>
            </div>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation"><h3>Navigation</h3><a href="/#home">Home</a><a href="/#about-us">About</a><a href="/#services">Services</a><a href="/#insights">Insights</a></nav>
          <div className="footer-contacts"><h3>Contact</h3><a href="mailto:tech.uxora@gmail.com">tech.uxora@gmail.com</a><a className="footer-phone" href="tel:+447901757510">+44 7901 757510</a><a href="https://uxora.co">uxora.co</a></div>
        </div>
        <div className="footer-legal"><p>© 2026 UXORA. All rights reserved.</p><p>UXORA | AI, Product Design &amp; Web Development Agency</p></div>
        <div className="footer-wordmark" aria-hidden="true">UXORA.CO</div>
      </footer>
    </div>
  );
}
