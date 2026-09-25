import { ArrowUpRight, LayoutGrid, Users, Globe } from 'lucide-react';
import content from '../data/ezWageCaseStudy.json';

const capabilities = [
  ['Employee Wage Access', 'Accrued Salary Access · Available Balance Tracking · Payday Deductions'],
  ['Employer Coordination', 'Employee Eligibility · Payroll Integration · Account Controls'],
  ['Business Financial Services', 'Payroll Financing · Invoice Factoring · Payment Gateway'],
];
const results = [
  { Icon: LayoutGrid, title: '4 Services', text: 'Earned wage access, payroll financing, invoice factoring and payment gateway services presented within one website.' },
  { Icon: Users, title: '2 Audiences', text: 'Dedicated information for employers and employees, addressing different questions about onboarding, salary access and payroll coordination.' },
  { Icon: Globe, title: '1 Website', text: 'A central destination for exploring financial services, understanding how they work and requesting a demonstration.' },
];

export default function EzWageCaseStudy() {
  const metadata = [['Timeline', content.timeline], ['Role', content.role], ['Industry', 'FinTech / Financial Wellness'], ['Client', 'EZ Wage']].filter(([, value]) => value);
  return (
    <main className="case-page ezwage-case">
      <header className="case-intro">
        <span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />Case Study</span>
        <h1>{content.title}</h1>
        <p>{content.introduction}</p>
        <a className="case-live-button" href="https://ezwage.com/" target="_blank" rel="noopener noreferrer">VIEW LIVE SITE<span><ArrowUpRight /></span></a>
      </header>
      <dl className="case-metadata">{metadata.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="case-body">
        <section className="case-results" aria-labelledby="ezwage-results">
          <div><h2 id="ezwage-results">Results delivered</h2><p className="case-scope-label">Website scope at a glance</p>
            {results.map(({ Icon, title, text }) => <div className="case-result" key={title}><span className="case-result-icon"><Icon /></span><strong>{title}</strong><p>{text}</p></div>)}
          </div>
        </section>
        <img className="case-full-image" src="/images/case-study/ezwage1.jpg" alt="Four EZ Wage mobile screens showing payroll financing, employer requests, withdrawals and analytics" width="2140" height="1376" loading="lazy" />
        <section className="case-capabilities"><h2>Platform Capabilities &amp; Systems</h2><dl>{capabilities.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
        <section className="case-text"><h2>About the Project</h2>{content.about.map(text => <p key={text}>{text}</p>)}</section>
        <section className="case-text"><h2>Project Challenge</h2>{content.challenge.map(text => <p key={text}>{text}</p>)}</section>
        <img className="case-full-image" src="/images/case-study/ezwage2.jpg" alt="EZ Wage and EZ Pay desktop dashboards showing employees, invoices, transactions and financial reports" width="2140" height="900" loading="lazy" />
        <section className="case-text case-features"><h2>Key Features</h2><p>{content.featureIntroduction}</p>{content.features.map(feature => <div key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></div>)}<p className="case-feature-summary">{content.closing}</p></section>
      </div>
      <section className="case-talk"><p>Planning a financial services website or digital product?</p><h2>Build Better<br />Digital Products.</h2><a href="/contact">Discuss Your Project</a></section>
    </main>
  );
}
