import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
export const origin = 'https://www.uxora.co';
export const pages = {
  '/': ['UXORA | Custom Software Development & AI Automation', 'UXORA designs and develops custom websites, mobile apps and AI automations. Turn your business ideas into intuitive digital products built to scale.'],
  '/contact': ['Contact Us | UXORA', 'Discuss your next digital product with UXORA. Get in touch about custom software, web and mobile apps, design, and AI automation.'],
  '/insights': ['Insights | UXORA', 'Explore UXORA articles on e-commerce UX, website performance, AI agents, and workflow automation.'],
  '/work/geviti': ['Geviti — Personalized Health & Longevity Platform | UXORA', 'Explore UXORA’s Geviti case study: a connected health and longevity experience bringing testing, personalized insights, and care together.'],
  '/work/thakeel-al-arabia': ['Thakeel Al-Arabia Marketplace Case Study | UXORA', 'Explore Thakeel Al-Arabia’s heavy equipment marketplace case study, covering Arabic and English UX, equipment discovery, rentals, and professional profiles.'],
  '/insights/ecommerce-checkout-ux': ['E-commerce Checkout UX: 10 Practical Fixes | UXORA', 'Improve e-commerce checkout UX with 10 practical fixes for forms, delivery costs, payment flows, and mobile usability, plus a measurement checklist.'],
  '/insights/improve-core-web-vitals': ['How to Improve Core Web Vitals: Website Audit | UXORA', 'Learn how to improve Core Web Vitals with a practical audit of LCP, INP, and CLS. Identify bottlenecks, prioritize fixes, and verify real-user improvements.'],
  '/insights/ai-agents-vs-workflow-automation': ['AI Agents vs. Workflow Automation: A Business Guide | UXORA', 'Compare AI agents and workflow automation with practical business examples, cost considerations, approval controls, and a framework for choosing the right approach.'],
};
const services = readFileSync('src/data/services.ts', 'utf8');
for (const match of services.matchAll(/slug: '([^']+)', title: '([^']+)', image: \w+, description: '([^']+)'/g)) {
  pages[`/services/${match[1]}`] = [`${match[2]} | UXORA`, match[3].split('. ')[0]+'.'];
}
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function head(path) {
  const [title, description] = pages[path];
  const url = origin + (path === '/' ? '/' : path);
  return `<title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:site_name" content="UXORA" />
    <meta property="og:type" content="${path.startsWith('/insights/') ? 'article' : 'website'}" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/uxora-social.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="UXORA logo" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${origin}/uxora-social.png" />
    <meta name="twitter:image:alt" content="UXORA logo" />
    ${path === '/' ? `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebSite', name:'UXORA', url:origin+'/'})}</script>` : ''}`;
}
export function replaceHead(html, path) {
  return html.replace(/<!-- SEO START -->[\s\S]*?<!-- SEO END -->/, `<!-- SEO START -->\n    ${head(path)}\n    <!-- SEO END -->`);
}
if (process.argv.includes('--build')) {
  const template = readFileSync('dist/index.html','utf8');
  for (const path of Object.keys(pages)) {
    const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
    mkdirSync(dirname(file),{recursive:true});
    writeFileSync(file,replaceHead(template,path));
  }
  writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(path=>`\n  <url><loc>${origin}${path}</loc></url>`).join('')}\n</urlset>\n`);
  console.log(`Generated initial SEO metadata for ${Object.keys(pages).length} public pages.`);
}
