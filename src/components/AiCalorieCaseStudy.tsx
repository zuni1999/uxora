import { ArrowUpRight, Download, LayoutGrid, Activity } from 'lucide-react';
import content from '../data/aiCalorieCaseStudy.json';

const capabilities = [
  ['Nutrition Tracking', 'AI Meal Scanning · Calorie Logging · Entry History'],
  ['Daily Wellness', 'Heart Rate Records · Water Goals · Eye-Rest Reminders'],
  ['Activity Overview', 'Daily Dashboard · Tracking History · Reminder Support'],
];
const results = [
  { Icon: Download, title: '10K+', text: 'Downloads shown on the app’s Google Play listing.' },
  { Icon: Activity, title: '4 Tracking Areas', text: 'Calories, heart rate, water intake and eye-rest activity.' },
  { Icon: LayoutGrid, title: '1 Dashboard', text: 'A shared overview of daily tracking and recorded activity.' },
];

export default function AiCalorieCaseStudy() {
  const metadata = [['Timeline', content.timeline], ['Role', content.role], ['Industry', 'Health & Fitness / Consumer Wellness'], ['Publisher', 'Pentabit Labs']].filter(([, value]) => value);
  return (
    <main className="case-page ai-calorie-case">
      <header className="case-intro">
        <span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />Case Study</span>
        <h1>{content.title}</h1><p>{content.introduction}</p>
        <a className="case-live-button" href="https://play.google.com/store/apps/details?id=com.pentabit.heart.health.monitor.calorie.tracker&hl=en" target="_blank" rel="noopener noreferrer">View on Google Play<span><ArrowUpRight /></span></a>
      </header>
      <dl className="case-metadata">{metadata.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="case-body">
        <section className="case-results" aria-labelledby="ai-calorie-results">
          <div><h2 id="ai-calorie-results">Results delivered</h2><p className="case-scope-label">App reach and product scope</p>
            {results.map(({ Icon, title, text }) => <div className="case-result" key={title}><span className="case-result-icon"><Icon /></span><strong>{title}</strong><p>{text}</p></div>)}
            <p className="case-scope-label">Download milestone checked September 2026. Figures describe app reach and functionality, not measured project uplift.</p>
          </div>
        </section>
        <img className="case-full-image" src="/images/case-study/ai-calorie1.jpg" alt="Twelve AI Health app screens showing meal scanning, heart rate records, hydration, eye exercises, history and profile" width="2140" height="1376" loading="lazy" />
        <section className="case-capabilities"><h2>App Features &amp; Capabilities</h2><dl>{capabilities.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
        <section className="case-text"><h2>About the Project</h2>{content.about.map(text => <p key={text}>{text}</p>)}</section>
        <section className="case-text"><h2>Project Challenge</h2>{content.challenge.map(text => <p key={text}>{text}</p>)}</section>
        <img className="case-full-image" src="/images/case-study/ai-calorie2.jpg" alt="Wellness journey illustration connecting meal scanning, heart rate, hydration, eye rest, daily summary and AI guidance" width="2140" height="900" loading="lazy" />
        <section className="case-text case-features"><h2>Key Features</h2>{content.features.map(feature => <div key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></div>)}</section>
      </div>
      <section className="case-talk"><p>Planning a wellness app or digital product?</p><h2>Make Everyday Tasks<br />Feel Effortless.</h2><a href="/contact">Discuss Your App</a></section>
    </main>
  );
}
