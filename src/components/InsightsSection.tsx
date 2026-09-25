import { MessagesSquare } from 'lucide-react';
import commerceImage from '../assets/blog/e-commerblog.png';
import developmentImage from '../assets/blog/web-development-blog.png';
import automationImage from '../assets/blog/ai-automation-blog.png';

const articles = [
  {
    date: '2025-07-31',
    dateLabel: 'July 31, 2025',
    href: '/insights/ecommerce-checkout-ux',
    category: 'E-commerce UX',
    title: 'E-commerce Checkout UX: 10 Fixes That Reduce Friction',
    summary: 'Make buying easier with practical improvements to checkout forms, delivery costs, guest checkout, and error messages.',
    image: commerceImage,
    alt: 'Shopper completing an online checkout on a smartphone beside a laptop',
  },
  {
    date: '2025-07-31',
    dateLabel: 'July 31, 2025',
    href: '/insights/improve-core-web-vitals',
    category: 'Web Development',
    title: 'How to Improve Core Web Vitals: A Practical Website Audit',
    summary: 'Identify what slows your website down and prioritize fixes for loading speed, responsiveness, and visual stability.',
    image: developmentImage,
    alt: 'A development team working on web and mobile applications',
  },
  {
    date: '2025-07-31',
    dateLabel: 'July 31, 2025',
    href: '/insights/ai-agents-vs-workflow-automation',
    category: 'AI Automation',
    title: 'AI Agents vs. Workflow Automation: Which Does Your Business Need?',
    summary: 'Understand when to use workflows or AI agents, what each approach costs, and where human oversight matters.',
    image: automationImage,
    alt: 'An illustration of connected AI automation processes',
  },
];

export default function InsightsSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return (
    <section className="insights-section" id="insights" aria-labelledby="insights-title">
      <div className="insights-heading">
        <span className="insights-label"><span className="brand-mark" aria-hidden="true" /> Insights</span>
        <Heading id="insights-title">Insights for Better Digital Products</Heading>
      </div>
      <div className="insights-grid">
        {articles.map((article) => (
          <article className="insight-card" key={article.title}>
            <div className="insight-image-frame"><img className="insight-image" src={article.image} alt={article.alt} loading="lazy" width="1774" height="887" /></div>
            <div className="insight-content">
              <div className="insight-meta"><span>{article.category}</span>{article.date && <time dateTime={article.date}><MessagesSquare aria-hidden="true" />{article.dateLabel}</time>}</div>
              <h3>{article.href ? <a className="insight-article-link" href={article.href}>{article.title}</a> : article.title}</h3>
              <p>{article.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
