import { useEffect } from 'react';
import { ArrowUpRight, LayoutGrid, Languages, Network } from 'lucide-react';
import overview from '../assets/case-study/thakeel-casestudy1.jpg';
import mobile from '../assets/case-study/thakeel-casestudy2.jpg';
import projectMockup from '../assets/projects/thakeel.jpg';
import content from '../data/thakeelCaseStudy.json';

const capabilities = [
  ['Equipment & Service Discovery', 'Equipment Sales · Rentals · Spare Parts · Search & Filters'],
  ['Workforce & Business Connections', 'Worker Profiles · Business Profiles · Job Opportunities'],
  ['Marketplace Participation', 'Listing Creation · Messaging · Saved Listings · Account Management'],
];
const highlights = [
  { Icon: LayoutGrid, title: '5 Core Categories', text: 'Equipment, rentals, spare parts, workers, and businesses—organized around the different reasons people visit the marketplace.' },
  { Icon: Languages, title: '2 Languages', text: 'Arabic and English experiences, with right-to-left and left-to-right layouts designed around each language.' },
  { Icon: Network, title: '1 Connected Marketplace', text: 'A shared destination for discovering listings, presenting services, and connecting with relevant marketplace participants.' },
];

export default function ThakeelCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Thakeel Al-Arabia Marketplace Case Study | UXORA';
    const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const meta = existing ?? document.createElement('meta');
    const previous = meta.content;
    meta.name = 'description';
    meta.content = 'Explore Thakeel Al-Arabia’s heavy equipment marketplace case study, covering Arabic and English UX, equipment discovery, rentals, and professional profiles.';
    if (!existing) document.head.append(meta);
    return () => { document.title = previousTitle; if (existing) meta.content = previous; else meta.remove(); };
  }, []);
  return (
    <main className="case-page thakeel-case">
      <header className="case-intro">
        <span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />Case Study</span>
        <h1>Thakeel Al-Arabia —<br className="case-title-break" /> Heavy Equipment Marketplace</h1>
        <p>A marketplace designed to connect equipment owners, buyers, rental providers, workers, and businesses across the GCC. Thakeel Al-Arabia brings machinery listings, spare parts, and workforce discovery into one accessible Arabic and English experience.</p>
        <a className="case-live-button" href="https://thakeelalarabia.com/" target="_blank" rel="noopener noreferrer">VIEW LIVE SITE<span><ArrowUpRight /></span></a>
      </header>
      <dl className="case-metadata">{[['Timeline', 'June 2026 – In Progress'], ['Role', 'UI/UX Design · Web & App Development'], ['Industry', 'Heavy Equipment · Gulf Market'], ['Client', 'Saudi Arabia']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="case-body">
        <section className="case-results" aria-labelledby="thakeel-highlights">
          <div><h2 id="thakeel-highlights">Platform at a Glance</h2>{highlights.map(({ Icon, title, text }) => <div className="case-result" key={title}><span className="case-result-icon"><Icon /></span><strong>{title}</strong><p>{text}</p></div>)}</div>
          <img className="case-results-image" src={projectMockup} alt="Thakeel Al-Arabia marketplace homepage and equipment discovery mockup" />
        </section>
        <img className="case-full-image" src={overview} alt="Thakeel Al-Arabia heavy equipment marketplace screens showing search, listings, and responsive layouts." width="1118" height="719" loading="lazy" />
        <section className="case-capabilities"><h2>Platform Capabilities &amp; Systems</h2><dl>{capabilities.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
        <section className="case-text"><h2>About the Project</h2>{content.about.map(text => <p key={text}>{text}</p>)}</section>
        <section className="case-text"><h2>Project Challenge</h2>{content.challenge.map(text => <p key={text}>{text}</p>)}</section>
        <img className="case-full-image" src={mobile} alt="Thakeel Al-Arabia mobile marketplace showing equipment discovery, listing details, and professional profiles." width="1118" height="471" loading="lazy" />
        <section className="case-text case-features"><h2>Key Features</h2>{content.features.map(feature => <div key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></div>)}<p className="case-feature-summary">Thakeel Al-Arabia connects equipment discovery, professional visibility, and marketplace communication in an experience built around the needs of the heavy equipment sector.</p></section>
      </div>
      <section className="case-talk"><p>Planning a marketplace or digital platform?</p><h2>Let’s Build Your Marketplace</h2><a href="/contact">Discuss Your Project</a></section>
    </main>
  );
}
