import { ArrowUpRight, Timer, Zap } from 'lucide-react';
import overview from '../assets/case-study/givit-image1.jpg';
import mobile from '../assets/case-study/givit-image2.jpg';
import resultsPhoto from '../assets/case-study/coder.jpg';

const capabilities = [
  ['AI-Powered Health Intelligence', 'Makor AI • Health-Context Conversations • Biomarker & Trend Insights'],
  ['Connected Health Data', '100+ Biomarkers • Genetics • Gut & Microbiome • Wearable Data'],
  ['Personalized Care & Monitoring', 'Living Health Blueprint • Longevity Specialists • Custom Protocols • Ongoing Retesting'],
];

export default function GevitiCaseStudy() {
  return (
    <main className="case-page">
      <header className="case-intro">
        <span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />Case Study</span>
        <h1>Geviti — Personalized Health<br className="case-title-break" /> &amp; Longevity Platform</h1>
        <p>A proactive health platform that combines comprehensive testing, personalized health plans, expert care, and AI-powered insights to help members better understand and optimize their long-term health.</p>
        <a className="case-live-button" href="https://www.gogeviti.com/" target="_blank" rel="noopener noreferrer">VISIT LIVE SITE<span><ArrowUpRight /></span></a>
      </header>
      <dl className="case-metadata">{[['Timeline', 'August 23, 2025'], ['Role', 'UI/UX Design & Web Experience'], ['Industry', 'HealthTech / Longevity'], ['Client', 'Geviti']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="case-body">
        <section className="case-results" aria-labelledby="results-title">
          <div><h2 id="results-title">Results delivered</h2>
            <div className="case-result"><span className="case-result-icon"><Zap /></span><strong>100%</strong><p>health markers tracked across bloodwork, metabolism, hormones, inflammation, and overall wellness</p></div>
            <div className="case-result"><span className="case-result-icon"><Timer /></span><strong>1 Unified</strong><p>personalized Health Blueprint connecting testing, insights, care guidance, and ongoing optimization</p></div>
            <div className="case-result"><span className="case-result-icon"><Zap /></span><strong>6-Month</strong><p>retesting cycle designed to monitor progress, refresh protocols, and support long-term health improvement</p></div>
          </div>
          <img className="case-results-image" src={resultsPhoto} alt="Person reviewing the Geviti health dashboard on a laptop beside a phone" />
        </section>
        <img className="case-full-image" src={overview} alt="Geviti website, personalized health dashboard, membership plans and onboarding designs" width="1070" height="688" loading="lazy" />
        <section className="case-capabilities"><h2>Platform Capabilities &amp; Systems</h2><dl>{capabilities.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
        <section className="case-text"><h2>About The Project</h2><p>Geviti is a personalized health and longevity platform designed to bring testing, health data, expert guidance, and ongoing care into one connected experience.</p><p>The platform combines comprehensive bloodwork covering 100+ health markers, personalized Health Blueprints, dedicated Longevity Specialists, custom supplements, and Makor AI to help members better understand their health and follow a plan that evolves as their data changes.</p></section>
        <section className="case-text"><h2>Projects Challenge</h2><p>The main challenge was presenting a complex healthcare ecosystem in a simple, trustworthy, and easy-to-understand digital experience.</p><p>Geviti brings together bloodwork, biomarker trends, genetics, gut health, lifestyle guidance, supplements, AI-powered insights, and professional care. The experience therefore needed clear information hierarchy and intuitive navigation so users could understand how each part of the service connects without feeling overwhelmed.</p></section>
        <img className="case-full-image" src={mobile} alt="Four Geviti mobile screens showing the health platform, home dashboard, testing shop and health reports" width="1070" height="450" loading="lazy" />
        <section className="case-text case-features"><h2>Key Features</h2><p>Geviti brings together comprehensive blood testing and tracks 100+ health markers, including hormones, metabolic health, cardiovascular health, inflammation, nutrients, and other health indicators.</p>
          <h3>Personalized Health Blueprint:</h3><p>Health data is transformed into an evolving Blueprint that combines biomarkers, lifestyle guidance, genetics, gut health, supplements, and relevant care recommendations in one connected experience.</p>
          <h3>Makor AI Health Assistant:</h3><p>Makor AI is integrated into the Geviti experience to help users understand biomarkers, trends, and their health information using context from their connected Geviti data.</p>
          <h3>Dedicated Care Team</h3><p>Members can access a connected care model that includes Longevity Specialists, clinicians, care coordinators, and AI-powered support working from the same health information and plan.</p>
          <p className="case-feature-summary">Geviti supports an ongoing cycle of testing, analysis, personalized planning, specialist guidance, and six-month retesting so the user’s health plan can evolve over time.</p>
        </section>
      </div>
      <section className="case-talk"><p>Have a project in mind? Just let us know!</p><h2>Let’s Start Talk</h2><a href="/contact">Connect With Us</a></section>
    </main>
  );
}
