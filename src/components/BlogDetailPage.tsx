import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, Copy, Hourglass } from 'lucide-react';
import ecommerceArticle from '../data/ecommerceArticle.json';
import automationArticle from '../data/automationArticle.json';
import automationCover from '../assets/blog/ai-automation-blog.png';
import webVitalsArticle from '../data/webVitalsArticle.json';
import webCover from '../assets/blog/web-development-blog.png';
import cover from '../assets/blog/e-commerblog.png';
import secondary from '../assets/services/e-commerce.png';
import quoteMark from '../assets/blog/quote.svg';
import gradientQuote from '../assets/blog/gradient-quote.svg';

export default function BlogDetailPage({ webVitals = false, automation = false }: { webVitals?: boolean; automation?: boolean }) {
  const article = automation ? automationArticle : webVitals ? webVitalsArticle : ecommerceArticle;
  const seoTitle = automation ? 'AI Agents vs. Workflow Automation: A Business Guide | UXORA' : webVitals ? 'How to Improve Core Web Vitals: Website Audit | UXORA' : 'E-commerce Checkout UX: 10 Practical Fixes | UXORA';
  const description = automation ? 'Compare AI agents and workflow automation with practical business examples, cost considerations, approval controls, and a framework for choosing the right approach.' : webVitals ? 'Learn how to improve Core Web Vitals with a practical audit of LCP, INP, and CLS. Identify bottlenecks, prioritize fixes, and verify real-user improvements.' : 'Improve e-commerce checkout UX with 10 practical fixes for forms, delivery costs, payment flows, and mobile usability, plus a measurement checklist.';
  const ctaTitle = automation ? 'Build Automation Around a Clear Business Outcome' : webVitals ? 'Build a Website That Feels Faster' : 'Where Are Customers Getting Stuck?';
  const ctaText = automation ? 'UXORA helps businesses design AI automation and connected workflows around their operational needs. Whether you need a defined process or a bounded AI agent, start with a focused use case and a practical evaluation plan.' : webVitals ? 'UXORA combines web development and UX design to help businesses improve their digital experiences. If your website feels slow or difficult to use, let’s identify the bottlenecks and define a practical improvement plan.' : 'UXORA helps businesses improve e-commerce experiences through UX design and development. Let’s review your buying journey and identify the changes worth prioritizing.';
  const ctaButton = automation ? 'Discuss Your Automation Project' : webVitals ? 'Discuss Your Website' : 'Discuss Your E-commerce Project';
  const readMinutes = Math.max(1, Math.ceil([article.title, ...article.intro, ...article.blocks.map(block => block.text), ctaTitle, ctaText].join(' ').split(/\s+/).length / 200));
  const [copyStatus, setCopyStatus] = useState('Copy link');
  useEffect(() => {
    const oldTitle = document.title;
    document.title = seoTitle;
    const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const meta = existing ?? document.createElement('meta');
    const previous = meta.content;
    meta.name = 'description';
    meta.content = description;
    if (!existing) document.head.append(meta);
    return () => { document.title = oldTitle; if (existing) meta.content = previous; else meta.remove(); };
  }, [seoTitle, description]);
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setCopyStatus('Link copied'); }
    catch { setCopyStatus('Copy the URL from your address bar'); }
  }
  return (
    <main className="blog-detail">
      <article>
        <header className="blog-heading">
          <h1>{article.title}</h1>
          <button className="blog-copy" onClick={copyLink}>{copyStatus === 'Link copied' ? <Check /> : <Copy />}<span aria-live="polite">{copyStatus}</span></button>
        </header>
        <div className="blog-intro">{article.intro.map((text) => <p key={text}>{text}</p>)}</div>
        <img className="blog-cover" src={automation ? automationCover : webVitals ? webCover : cover} alt={automation ? "Connected blue and green modules illustrating a fixed automation workflow and branching AI decisions." : webVitals ? "Developer reviewing a website performance audit on a laptop beside a mobile website preview." : "Shopper completing an online checkout on a smartphone beside a laptop"} width="1448" height="1086" fetchPriority="high" />
        <div className="blog-byline">
          {!webVitals && !automation && <div className="blog-author"><span className="blog-author-icon"><span className="brand-mark" aria-hidden="true" /></span><div><small>Post By</small><strong>UXORA Team</strong></div></div>}
          <div className="blog-publication">{!webVitals && !automation && <span><CalendarDays /><time dateTime="2025-07-31">July 31, 2025</time></span>}<span><Hourglass />{readMinutes} Min Read</span></div>
        </div>
        <div className="blog-body">
          {article.blocks.map((block, index) => {
            switch (block.kind) {
              case 'h2': return <h2 key={index}>{block.text}</h2>;
              case 'h3': return <h3 key={index}>{block.text}</h3>;
              case 'list': return <ul key={index}>{block.text.split('\n').map((item) => <li key={item}>{item}</li>)}</ul>;
              case 'automation-diagram': return <figure className="performance-example" key={index}><figcaption>Illustrative automation approaches</figcaption><div className="automation-comparison"><section><h3>Predefined process</h3><ol><li>Receive enquiry</li><li>Validate required information</li><li>Apply routing rules</li><li>Send to the assigned team</li></ol><p>The same defined sequence, with explicit exception handling.</p></section><section><h3>Adaptive investigation</h3><ol><li>Review the support question</li><li>Choose an approved source: order, delivery, or conversation history</li><li>Use the findings to select the next check</li><li>Propose a resolution for review</li></ol><p>The next action depends on evidence, within defined permissions.</p></section></div></figure>;
              case 'trace': return <figure className="performance-example" key={index}>
                <figcaption>Illustrative performance audit</figcaption>
                <p>Schematic interaction trace — not a measured client result.</p>
                <ol className="performance-trace"><li><strong>Input delay</strong><span>Tap waits while the main thread is busy</span></li><li><strong>Processing</strong><span>Event handler updates the filter</span></li><li><strong>Presentation delay</strong><span>Browser calculates layout and paints</span></li></ol>
                <p>Inspect each phase to locate the delay between the user’s action and the next visible update.</p>
              </figure>;
              case 'image': return <figure key={index}><img src={secondary} alt="An e-commerce business managing its online storefront and order fulfillment" loading="lazy" width="2172" height="724" /></figure>;
              case 'quote': return <blockquote key={index}><img className="blog-quote-mark" src={quoteMark} alt="" aria-hidden="true" /><p>{block.text}</p><img className="blog-quote-gradient" src={gradientQuote} alt="" aria-hidden="true" /></blockquote>;
              case 'table': {
                const rows = block.text.split('\n').map((line) => line.split('\t'));
                return <div className="blog-table" key={index}><table><caption>{automation ? (index < 5 ? "Automation approaches compared" : "Choosing an automation approach") : webVitals ? (index < 5 ? "Core Web Vitals targets" : "Prioritizing performance findings") : "Checkout signals to investigate"}</caption><thead><tr>{rows[0].map((cell) => <th scope="col" key={cell}>{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row) => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
              }
              default: return <p key={index}>{block.text}</p>;
            }
          })}
          <section className="blog-cta"><h2>{ctaTitle}</h2>{automation && <p>The first decision is what work should improve—not which AI tool to buy. Define the task, establish how success will be checked, and identify the actions that require approval.</p>}<p>{ctaText}</p><a className="footer-contact-button" href="/contact">{ctaButton}<span><ArrowUpRight /></span></a></section>

        </div>
      </article>
    </main>
  );
}
